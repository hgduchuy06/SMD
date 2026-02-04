from flask import Blueprint, request, jsonify
from services.workitem_service import create_workitem, reassign_workitem, set_workitem_status, list_workitems_for_user
from datetime import datetime

workitem_bp = Blueprint('workitem', __name__, url_prefix='/workitems')


@workitem_bp.route('/', methods=['POST'])
def create():
    """
    Create a work item (task) for a reviewer
    ---
    post:
      summary: Create work item
      requestBody:
        required: true
        content:
          application/json:
            schema:
              type: object
              properties:
                versionID:
                  type: integer
                reviewerID:
                  type: integer
                assignedBy:
                  type: integer
                dueAt:
                  type: string
              required: [versionID, reviewerID, assignedBy]
      tags:
        - WorkItems
      responses:
        201:
          description: Work item created
    """
    data = request.get_json(silent=True) or {}
    version_id = data.get('versionID')
    reviewer_id = data.get('reviewerID')
    assigned_by = data.get('assignedBy')
    due_at = data.get('dueAt')
    if due_at:
        due_at = datetime.fromisoformat(due_at)
    res = create_workitem(version_id, reviewer_id, assigned_by, due_at)
    return jsonify(res), 201


@workitem_bp.route('/<int:workitem_id>/reassign', methods=['PUT'])
def reassign(workitem_id: int):
    """
    Reassign a work item to a different reviewer
    ---
    put:
      summary: Reassign work item
      requestBody:
        required: true
        content:
          application/json:
            schema:
              type: object
              properties:
                newReviewerID:
                  type: integer
                reassignerID:
                  type: integer
              required: [newReviewerID, reassignerID]
      tags:
        - WorkItems
      responses:
        200:
          description: Work item reassigned
    """
    data = request.get_json(silent=True) or {}
    new_reviewer = data.get('newReviewerID')
    reassigner = data.get('reassignerID')
    res = reassign_workitem(workitem_id, new_reviewer, reassigner)
    return jsonify(res), 200


@workitem_bp.route('/<int:workitem_id>/status', methods=['PUT'])
def status(workitem_id: int):
    """
    Update work item status
    ---
    put:
      summary: Update work item status
      requestBody:
        required: true
        content:
          application/json:
            schema:
              type: object
              properties:
                status:
                  type: string
              required: [status]
      tags:
        - WorkItems
      responses:
        200:
          description: Status updated
    """
    data = request.get_json(silent=True) or {}
    status = data.get('status')
    res = set_workitem_status(workitem_id, status)
    return jsonify(res), 200


@workitem_bp.route('/', methods=['GET'])
def list_for_user():
    """
    List work items for a reviewer
    ---
    get:
      summary: List work items for a reviewer
      parameters:
        - name: userID
          in: query
          required: true
          schema:
            type: integer
      tags:
        - WorkItems
      responses:
        200:
          description: List of work items
    """
    user_id = request.args.get('userID')
    if not user_id:
        return jsonify({'error': 'userID query param required'}), 400
    res = list_workitems_for_user(int(user_id))
    return jsonify(res), 200
