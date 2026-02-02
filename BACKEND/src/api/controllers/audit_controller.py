from flask import Blueprint, request, jsonify
from services.audit_service import record_audit, query_audits

bp = Blueprint('audit', __name__, url_prefix='/audits')


@bp.route('/', methods=['GET'])
def list_audits():
    entity = request.args.get('entityType')
    entity_id = request.args.get('entityID')
    limit = int(request.args.get('limit', '100'))
    res = query_audits(entity, int(entity_id) if entity_id else None, limit)
    return jsonify(res), 200


@bp.route('/', methods=['POST'])
def create_audit():
    data = request.get_json(silent=True) or {}
    entity = data.get('entityType')
    entity_id = data.get('entityID')
    action = data.get('action')
    user_id = data.get('userID')
    details = data.get('details')
    if not entity or entity_id is None or not action:
        return jsonify({'error': 'entityType, entityID and action are required'}), 400
    aid = record_audit(entity, entity_id, action, user_id, details)
    return jsonify({'auditID': aid}), 201
