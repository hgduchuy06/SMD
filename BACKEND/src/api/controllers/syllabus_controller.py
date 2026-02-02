from flask import Blueprint, request, jsonify
from datetime import datetime
from infrastructure.databases.mysql import SessionLocal
from infrastructure.models.syllabus import SyllabusModel
from infrastructure.models.syllabusversion import SyllabusVersionModel
from services.ai_service import semantic_diff

bp = Blueprint('syllabus', __name__, url_prefix='/syllabuses')


@bp.route('/', methods=['POST'])
def create_syllabus():
    data = request.get_json(silent=True) or {}
    academicYear = data.get('academicYear')
    subjectID = data.get('subjectID')
    createdBy = data.get('createdBy')
    content = data.get('content', '')
    changeSummary = data.get('changeSummary')

    db = SessionLocal()
    try:
        s = SyllabusModel(
            academicYear=academicYear,
            createdBy=createdBy,
            status='draft',
            createdAt=datetime.utcnow(),
            subjectID=subjectID
        )
        db.add(s)
        db.commit()
        db.refresh(s)

        v = SyllabusVersionModel(
            syllabusID=s.syllabusID,
            versionNumber=1,
            content=content,
            changeSummary=changeSummary,
            status='draft',
            createdBy=createdBy,
            createdAt=datetime.utcnow()
        )
        db.add(v)
        db.commit()
        db.refresh(v)

        s.currentVersionID = v.versionID
        db.commit()

        return jsonify({'syllabusID': s.syllabusID, 'versionID': v.versionID}), 201
    finally:
        db.close()


@bp.route('/<int:syllabus_id>', methods=['PUT'])
def edit_syllabus(syllabus_id: int):
    data = request.get_json(silent=True) or {}
    content = data.get('content', '')
    changeSummary = data.get('changeSummary')
    createdBy = data.get('createdBy')
    db = SessionLocal()
    try:
        s = db.get(SyllabusModel, syllabus_id)
        if not s:
            return jsonify({'error': 'Syllabus not found'}), 404

        # determine next version number
        q = db.query(SyllabusVersionModel).filter(SyllabusVersionModel.syllabusID == syllabus_id)
        last = q.order_by(SyllabusVersionModel.versionNumber.desc()).first()
        next_version = (last.versionNumber if last and last.versionNumber else 0) + 1

        v = SyllabusVersionModel(
            syllabusID=syllabus_id,
            versionNumber=next_version,
            content=content,
            changeSummary=changeSummary,
            status='draft',
            createdBy=createdBy,
            createdAt=datetime.utcnow()
        )
        db.add(v)
        db.commit()
        db.refresh(v)

        s.currentVersionID = v.versionID
        s.status = 'draft'
        db.commit()

        return jsonify({'versionID': v.versionID, 'versionNumber': v.versionNumber}), 200
    finally:
        db.close()


@bp.route('/<int:syllabus_id>/versions', methods=['GET'])
def list_versions(syllabus_id: int):
    limit = int(request.args.get('limit', '50'))
    db = SessionLocal()
    try:
        rows = db.query(SyllabusVersionModel).filter(SyllabusVersionModel.syllabusID == syllabus_id).order_by(SyllabusVersionModel.versionNumber.desc()).limit(limit).all()
        out = []
        for r in rows:
            out.append({
                'versionID': r.versionID,
                'versionNumber': r.versionNumber,
                'createdBy': r.createdBy,
                'createdAt': r.createdAt.isoformat() if r.createdAt else None,
                'changeSummary': r.changeSummary,
                'status': r.status
            })
        return jsonify(out), 200
    finally:
        db.close()


@bp.route('/<int:syllabus_id>/versions/<int:version_id>', methods=['GET'])
def get_version(syllabus_id: int, version_id: int):
    db = SessionLocal()
    try:
        v = db.get(SyllabusVersionModel, version_id)
        if not v or v.syllabusID != syllabus_id:
            return jsonify({'error': 'Version not found'}), 404
        return jsonify({
            'versionID': v.versionID,
            'versionNumber': v.versionNumber,
            'content': v.content,
            'changeSummary': v.changeSummary,
            'status': v.status,
            'createdBy': v.createdBy,
            'createdAt': v.createdAt.isoformat() if v.createdAt else None
        }), 200
    finally:
        db.close()


@bp.route('/compare', methods=['POST'])
def compare_versions():
    data = request.get_json(silent=True) or {}
    a = data.get('versionA')
    b = data.get('versionB')
    if not a or not b:
        return jsonify({'error': 'versionA and versionB are required'}), 400
    db = SessionLocal()
    try:
        va = db.get(SyllabusVersionModel, a)
        vb = db.get(SyllabusVersionModel, b)
        if not va or not vb:
            return jsonify({'error': 'version not found'}), 404
        result = semantic_diff(va.content or '', vb.content or '')
        result['versionA'] = a
        result['versionB'] = b
        return jsonify(result), 200
    finally:
        db.close()


@bp.route('/<int:syllabus_id>/versions/<int:version_id>/status', methods=['POST'])
def set_version_status(syllabus_id: int, version_id: int):
    data = request.get_json(silent=True) or {}
    status = data.get('status')
    if status not in ('draft', 'submitted', 'approved', 'rejected'):
        return jsonify({'error': 'Invalid status'}), 400
    db = SessionLocal()
    try:
        v = db.get(SyllabusVersionModel, version_id)
        if not v or v.syllabusID != syllabus_id:
            return jsonify({'error': 'Version not found'}), 404
        v.status = status
        # If approved/rejected/submitted, also set parent syllabus status
        s = db.get(SyllabusModel, syllabus_id)
        if s:
            s.status = status
        db.commit()
        return jsonify({'versionID': v.versionID, 'status': v.status}), 200
    finally:
        db.close()
