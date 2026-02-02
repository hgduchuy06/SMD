from flask import Blueprint, request, jsonify
from datetime import datetime
import threading
import time
import json
import logging

from infrastructure.databases.mysql import SessionLocal
from infrastructure.models.AIprocesslog import AIProcessLogModel
from infrastructure.models.syllabusversion import SyllabusVersionModel
from infrastructure.models.airesult import AIResultModel
from services.event_service import emit_event
from services.notification_service import notify_ai_completion
from services.ai_service import semantic_diff, clo_plo_consistency, summarize_syllabus

ai_bp = Blueprint("ai", __name__, url_prefix="/ai")

def _set_status(task_id: int, status: str, result_obj=None):
    db = SessionLocal()
    try:
        task = db.get(AIProcessLogModel, task_id)
        if not task:
            return
        task.status = status
        if result_obj is not None:
            task.result = json.dumps(result_obj, ensure_ascii=False)
        db.commit()
    finally:
        db.close()

def _complete(task_id: int):
  try:
    emit_event("ai.task.completed", {"taskID": task_id})
    try:
      notify_ai_completion(task_id)
    except Exception:
      logging.debug("notify_ai_completion failed for task %s", task_id)
  except Exception:
    logging.debug(f"AI task completed: {task_id}")


def _job_semantic_diff(task_id: int, version_a: int, version_b: int):
    _set_status(task_id, "RUNNING")
    db = SessionLocal()
    try:
        va = db.get(SyllabusVersionModel, version_a)
        vb = db.get(SyllabusVersionModel, version_b)

        if not va or not vb:
            _set_status(task_id, "FAILED", {"error": "Version not found"})
            _complete(task_id)
            return

        result = semantic_diff(va.content or "", vb.content or "")
        result["versionA"] = version_a
        result["versionB"] = version_b

        _set_status(task_id, "DONE", result)
        # persist structured AI result
        try:
          db2 = SessionLocal()
          res = AIResultModel(
            aiTaskID=task_id,
            versionID=version_b,
            resultType="DIFF",
            payload=json.dumps(result, ensure_ascii=False),
            createdAt=datetime.utcnow()
          )
          db2.add(res)
          db2.commit()
        except Exception:
          logging.exception("Failed to persist AIResultModel for semantic diff")
        finally:
          try:
            db2.close()
          except Exception:
            pass

        try:
          emit_event("ai.diff.completed", {"taskID": task_id, "versionA": version_a, "versionB": version_b})
        except Exception:
          logging.debug("emit_event failed for ai.diff.completed")

        _complete(task_id)
    except Exception as e:
        _set_status(task_id, "FAILED", {"error": str(e)})
        _complete(task_id)
    finally:
        db.close()


def fake_ai_job(task_id: int):
    db = SessionLocal()
    try:
        task = db.query(AIProcessLogModel).get(task_id)
        task.status = "RUNNING"
        db.commit()

        # giả lập AI chạy
        time.sleep(3)

        task.status = "DONE"
        task.result = """
        {
          "clos": [
            {"code": "CLO1", "description": "Explain core concepts"},
            {"code": "CLO2", "description": "Apply methods"},
            {"code": "CLO3", "description": "Evaluate outcomes"}
          ]
        }
        """
        db.commit()
    finally:
        db.close()


def _job_summarize(task_id: int, version_id: int):
    _set_status(task_id, "RUNNING")
    db = SessionLocal()
    try:
      sv = db.get(SyllabusVersionModel, version_id)
      if not sv:
        _set_status(task_id, "FAILED", {"error": "Version not found"})
        _complete(task_id)
        return

      # try parse structured content first, else use raw content
      text = sv.content or ""
      try:
        payload = json.loads(text or "{}")
        text = payload.get("fullText") or payload.get("content") or text
      except Exception:
        pass

      result = summarize_syllabus(text)
      result["versionID"] = version_id

      _set_status(task_id, "DONE", result)
      try:
        db2 = SessionLocal()
        res = AIResultModel(
          aiTaskID=task_id,
          versionID=version_id,
          resultType="SUMMARY",
          payload=json.dumps(result, ensure_ascii=False),
          createdAt=datetime.utcnow()
        )
        db2.add(res)
        db2.commit()
      except Exception:
        logging.exception("Failed to persist AIResultModel for summary")
      finally:
        try:
          db2.close()
        except Exception:
          pass

      try:
        emit_event("ai.summarize.completed", {"taskID": task_id, "versionID": version_id})
      except Exception:
        logging.debug("emit_event failed for ai.summarize.completed")

      _complete(task_id)
    except Exception as e:
      _set_status(task_id, "FAILED", {"error": str(e)})
      _complete(task_id)
    finally:
      db.close()


@ai_bp.route("/tasks/compare", methods=["POST"])
def create_semantic_diff_task():
    """
    Create semantic diff task
    ---
    post:
      summary: Create semantic diff task comparing two syllabus versions
      requestBody:
        required: true
        content:
          application/json:
            schema:
              type: object
              properties:
                versionAId:
                  type: integer
                versionBId:
                  type: integer
              required: [versionAId, versionBId]
      tags:
        - AI
      responses:
        201:
          description: Task created successfully
    """
    data = request.get_json(silent=True) or {}
    version_a = data.get("versionAId")
    version_b = data.get("versionBId")

    if not version_a or not version_b:
      return jsonify({"error": "versionAId and versionBId are required"}), 400

    db = SessionLocal()
    try:
      task = AIProcessLogModel(
        versionID=version_b,
        taskType="SEMANTIC_DIFF",
        status="PENDING",
        createdAt=datetime.utcnow()
      )
      db.add(task)
      db.commit()
      db.refresh(task)

      thread = threading.Thread(target=_job_semantic_diff, args=(task.aiTaskID, version_a, version_b))
      thread.start()

      return jsonify({"taskID": task.aiTaskID, "status": task.status}), 201
    finally:
      db.close()


def _job_clo_check(task_id: int, version_id: int, clos=None, plos=None, mappings=None):
    _set_status(task_id, "RUNNING")
    db = SessionLocal()
    try:
      # attempt to load CLO/PLO data from provided args or from syllabus content
      if not (clos and plos and mappings):
        sv = db.get(SyllabusVersionModel, version_id)
        if not sv:
          _set_status(task_id, "FAILED", {"error": "Version not found"})
          _complete(task_id)
          return
        try:
          payload = json.loads(sv.content or "{}")
          clos = clos or payload.get("clos", [])
          plos = plos or payload.get("plos", [])
          mappings = mappings or payload.get("mappings", [])
        except Exception:
          _set_status(task_id, "FAILED", {"error": "Unable to parse syllabus content for CLO/PLO data"})
          _complete(task_id)
          return

      result = clo_plo_consistency(clos or [], plos or [], mappings or [])
      result["versionID"] = version_id

      _set_status(task_id, "DONE", result)
      try:
        db2 = SessionLocal()
        res = AIResultModel(
          aiTaskID=task_id,
          versionID=version_id,
          resultType="CLO_PLO_CHECK",
          payload=json.dumps(result, ensure_ascii=False),
          createdAt=datetime.utcnow()
        )
        db2.add(res)
        db2.commit()
      except Exception:
        logging.exception("Failed to persist AIResultModel for CLO check")
      finally:
        try:
          db2.close()
        except Exception:
          pass

      try:
        emit_event("ai.clo_check.completed", {"taskID": task_id, "versionID": version_id})
      except Exception:
        logging.debug("emit_event failed for ai.clo_check.completed")

      _complete(task_id)
    except Exception as e:
      _set_status(task_id, "FAILED", {"error": str(e)})
      _complete(task_id)
    finally:
      db.close()


@ai_bp.route("/tasks/clo-check", methods=["POST"])
def create_clo_check_task():
    """
    Create CLO-PLO consistency check task
    ---
    post:
      summary: Create CLO <-> PLO consistency check task
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/AITaskRequest'
      tags:
        - AI
      responses:
        201:
          description: Task created successfully
    """
    data = request.get_json(silent=True) or {}
    version_id = data.get("versionID")
    clos = data.get("clos")
    plos = data.get("plos")
    mappings = data.get("mappings")

    if not version_id and not (clos and plos and mappings):
      return jsonify({"error": "Provide versionID or clos+plos+mappings payload"}), 400

    db = SessionLocal()
    try:
      task = AIProcessLogModel(
        versionID=version_id,
        taskType="CLO_PLO_CHECK",
        status="PENDING",
        createdAt=datetime.utcnow()
      )
      db.add(task)
      db.commit()
      db.refresh(task)

      thread = threading.Thread(target=_job_clo_check, args=(task.aiTaskID, version_id, clos, plos, mappings))
      thread.start()

      return jsonify({"taskID": task.aiTaskID, "status": task.status}), 201
    finally:
      db.close()


@ai_bp.route("/tasks/summarize", methods=["POST"])
def create_summarize_task():
    """
    Create syllabus summarization task
    ---
    post:
      summary: Create AI summarization task for students (runs in background)
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/AITaskRequest'
      tags:
        - AI
      responses:
        201:
          description: Task created successfully
    """

    data = request.get_json(silent=True) or {}
    version_id = data.get("versionID")

    if not version_id:
      return jsonify({"error": "versionID is required"}), 400

    db = SessionLocal()
    try:
      task = AIProcessLogModel(
        versionID=version_id,
        taskType="SUMMARIZE",
        status="PENDING",
        createdAt=datetime.utcnow()
      )
      db.add(task)
      db.commit()
      db.refresh(task)

      thread = threading.Thread(target=_job_summarize, args=(task.aiTaskID, version_id))
      thread.start()

      return jsonify({"taskID": task.aiTaskID, "status": task.status}), 201
    finally:
      db.close()


@ai_bp.route("/tasks/generate-clo", methods=["POST"])
def generate_clo():
    """
    Create generate CLO task
    ---
    post:
      summary: Create generate CLO task
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/AITaskRequest'
      tags:
        - AI
      responses:
        201:
          description: Task created successfully
    """

    data = request.get_json(silent=True) or {}
    version_id = data.get("versionID")

    if not version_id:
        return jsonify({"error": "versionID is required"}), 400

    db = SessionLocal()
    try:
        task = AIProcessLogModel(
            versionID=version_id,
            taskType="GENERATE_CLO",
            status="PENDING",
            createdAt=datetime.utcnow()
        )
        db.add(task)
        db.commit()
        db.refresh(task)

        thread = threading.Thread(target=fake_ai_job, args=(task.aiTaskID,))
        thread.start()

        return jsonify({
            "taskID": task.aiTaskID,
            "status": task.status
        }), 201
    finally:
        db.close()


@ai_bp.route("/tasks/<int:task_id>", methods=["GET"])
def get_task(task_id: int):
    """
    Get task by id
    ---
    get:
      summary: Get task status
      parameters:
        - name: task_id
          in: path
          required: true
          schema:
            type: integer
          description: ID của task cần lấy
      tags:
        - AI
      responses:
        200:
          description: Task Info
          content:
            application/json:
              schema:
                type: array
                items:
                  $ref: '#/components/schemas/AITaskResponse'
        404:
          description: Task not found
    """
    db = SessionLocal()
    try:
        task = db.query(AIProcessLogModel).get(task_id)
        if not task:
            return jsonify({"message": "Task not found"}), 404

        return jsonify({
            "taskID": task.aiTaskID,
            "taskType": task.taskType,
            "status": task.status,
            "result": task.result
        }), 200
    finally:
        db.close()
