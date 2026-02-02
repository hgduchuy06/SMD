from flask import Blueprint, request, jsonify
from services.workflow_service import start_workflow, get_workflow_status, approve

bp = Blueprint('workflow', __name__, url_prefix='/workflows')


@bp.route('/<int:version_id>/start', methods=['POST'])
def start(version_id: int):
    
    data = request.get_json(silent=True) or {}
    initiator = data.get('initiatorID')
    wf = data.get('workflow', 'default')
    if not initiator:
        return jsonify({'error': 'initiatorID is required'}), 400
    res = start_workflow(version_id, initiator, workflow_name=wf)
    return jsonify(res), 201


@bp.route('/<int:version_id>/status', methods=['GET'])
def status(version_id: int):
    res = get_workflow_status(version_id)
    return jsonify(res), 200


@bp.route('/<int:version_id>/approve', methods=['POST'])
def approve_step(version_id: int):
    data = request.get_json(silent=True) or {}
    actor = data.get('actorID')
    decision = data.get('decision')
    comment = data.get('comment', '')
    if not actor or not decision:
        return jsonify({'error': 'actorID and decision are required'}), 400
    try:
        res = approve(version_id, actor, decision, comment)
        return jsonify(res), 200
    except PermissionError as e:
        return jsonify({'error': str(e)}), 403
    except Exception as e:
        return jsonify({'error': str(e)}), 400
