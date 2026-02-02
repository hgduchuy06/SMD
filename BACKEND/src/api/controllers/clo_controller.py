from flask import Blueprint, request, jsonify
from datetime import datetime
from infrastructure.databases.mysql import SessionLocal
from infrastructure.models.clo import CLOModel
from infrastructure.models.CloPloMapping import CloPloMappingModel

bp = Blueprint('clo', __name__, url_prefix='/clos')


@bp.route('/', methods=['POST'])
def create_clo():
    data = request.get_json(silent=True) or {}
    versionID = data.get('versionID')
    cloCode = data.get('cloCode')
    cloDescription = data.get('cloDescription')
    knowledge = data.get('knowledgeLevel')
    skill = data.get('skillLevel')
    attitude = data.get('attitudeLevel')
    db = SessionLocal()
    try:
        c = CLOModel(
            versionID=versionID,
            cloCode=cloCode,
            cloDescription=cloDescription,
            knowledgeLevel=knowledge,
            skillLevel=skill,
            attitudeLevel=attitude
        )
        db.add(c)
        db.commit()
        db.refresh(c)
        return jsonify({'cloID': c.cloID}), 201
    finally:
        db.close()


@bp.route('/<int:clo_id>', methods=['PUT'])
def edit_clo(clo_id: int):
    data = request.get_json(silent=True) or {}
    db = SessionLocal()
    try:
        c = db.get(CLOModel, clo_id)
        if not c:
            return jsonify({'error': 'CLO not found'}), 404
        for k in ('cloCode','cloDescription','knowledgeLevel','skillLevel','attitudeLevel'):
            if k in data:
                setattr(c, k, data.get(k))
        db.commit()
        return jsonify({'cloID': c.cloID}), 200
    finally:
        db.close()


@bp.route('/<int:clo_id>', methods=['DELETE'])
def delete_clo(clo_id: int):
    db = SessionLocal()
    try:
        c = db.get(CLOModel, clo_id)
        if not c:
            return jsonify({'error': 'CLO not found'}), 404
        db.delete(c)
        db.commit()
        return jsonify({'deleted': clo_id}), 200
    finally:
        db.close()


@bp.route('/<int:clo_id>/map_plo', methods=['POST'])
def map_clo_plo(clo_id: int):
    data = request.get_json(silent=True) or {}
    ploID = data.get('ploID')
    mappingLevel = data.get('mappingLevel')
    if not ploID:
        return jsonify({'error': 'ploID required'}), 400
    db = SessionLocal()
    try:
        m = CloPloMappingModel(ploID=ploID, cloID=clo_id, mappingLevel=mappingLevel)
        db.add(m)
        db.commit()
        db.refresh(m)
        return jsonify({'mappingID': m.mappingID}), 201
    finally:
        db.close()
