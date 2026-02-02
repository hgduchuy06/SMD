from flask import Blueprint, request, jsonify
from datetime import datetime
from infrastructure.databases.mysql import SessionLocal
from infrastructure.models.clo import CLOModel
from infrastructure.models.CloPloMapping import CloPloMappingModel
from infrastructure.models.syllabusversion import SyllabusVersionModel
from infrastructure.models.plo import PLOModel
from services.event_service import emit_syllabus_action

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


@bp.route('/version/<int:version_id>/mappings', methods=['GET'])
def version_mappings(version_id: int):
    """Get CLO->PLO mappings for a syllabus version

    ---
    tags:
      - CLO
    parameters:
      - name: version_id
        in: path
        type: integer
        required: true
    responses:
      200:
        description: Mapping table
    """
    db = SessionLocal()
    try:
        clos = db.query(CLOModel).filter(CLOModel.versionID == version_id).all()
        mappings = db.query(CloPloMappingModel).all()
        plos = {p.ploID: p for p in db.query(PLOModel).all()}
        out = []
        for c in clos:
            related = [m for m in mappings if m.cloID == c.cloID]
            out.append({
                'cloID': c.cloID,
                'cloCode': c.cloCode,
                'cloDescription': c.cloDescription,
                'plos': [{'ploID': m.ploID, 'ploCode': plos.get(m.ploID).ploCode if plos.get(m.ploID) else None, 'mappingLevel': m.mappingLevel} for m in related]
            })
        return jsonify(out), 200
    finally:
        db.close()


@bp.route('/syllabus/<int:syllabus_id>/mappings', methods=['GET'])
def syllabus_mappings(syllabus_id: int):
    """Get CLO->PLO mappings across all versions for a syllabus

    ---
    tags:
      - CLO
    parameters:
      - name: syllabus_id
        in: path
        type: integer
        required: true
    responses:
      200:
        description: Mapping table
    """
    db = SessionLocal()
    try:
        sv_rows = db.query(SyllabusVersionModel).filter(SyllabusVersionModel.syllabusID == syllabus_id).all()
        version_ids = [v.versionID for v in sv_rows]
        clos = db.query(CLOModel).filter(CLOModel.versionID.in_(version_ids)).all() if version_ids else []
        mappings = db.query(CloPloMappingModel).all()
        plos = {p.ploID: p for p in db.query(PLOModel).all()}
        out = []
        for c in clos:
            related = [m for m in mappings if m.cloID == c.cloID]
            out.append({
                'cloID': c.cloID,
                'versionID': c.versionID,
                'cloCode': c.cloCode,
                'cloDescription': c.cloDescription,
                'plos': [{'ploID': m.ploID, 'ploCode': plos.get(m.ploID).ploCode if plos.get(m.ploID) else None, 'mappingLevel': m.mappingLevel} for m in related]
            })
        return jsonify(out), 200
    finally:
        db.close()
