from flask import Blueprint, request, jsonify
from datetime import datetime
import threading
import time

from infrastructure.databases.mysql import SessionLocal
from infrastructure.models.AIprocesslog import AIProcessLogModel

ai_bp = Blueprint("ai", __name__, url_prefix="/ai")


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
                $ref: '#/components/schemas/AITaskDetail'
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
