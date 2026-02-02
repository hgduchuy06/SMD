from flask import Blueprint, request, jsonify
from services.workflow_service import start_workflow

bp = Blueprint('integration', __name__, url_prefix='/integration')


@bp.route('/workflow/start', methods=['POST'])
def start_from_external():
    """
    Start a workflow from an external system
    ---
    post:
      summary: Start workflow triggered by external integration
      requestBody:
        required: true
        content:
          application/json:
            schema:
              type: object
              properties:
                versionID:
                  type: integer
                initiatorID:
                  type: integer
                workflow:
                  type: string
              required: [versionID, initiatorID]
      tags:
        - Integration
      responses:
        201:
          description: Workflow started
    """
    data = request.get_json(silent=True) or {}
    version_id = data.get('versionID')
    initiator = data.get('initiatorID')
    wf = data.get('workflow', 'default')
    if not version_id or not initiator:
        return jsonify({'error': 'versionID and initiatorID are required'}), 400
    res = start_workflow(version_id, initiator, workflow_name=wf)
    return jsonify(res), 201
