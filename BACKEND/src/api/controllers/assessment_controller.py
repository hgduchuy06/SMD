from flask import Blueprint, request, jsonify
from datetime import datetime
from infrastructure.databases.mysql import SessionLocal
from infrastructure.models.assessment import AssessmentModel
from infrastructure.models.AssessmentCLOMapping import AssessmentCLOMappingModel
from infrastructure.models.clo import CLOModel

bp = Blueprint('assessment', __name__, url_prefix='/assessments')


@bp.route('/', methods=['POST'])
def create_assessment():
    data = request.get_json(silent=True) or {}
    versionID = data.get('versionID')
    assessmentType = data.get('assessmentType')
    title = data.get('title')
    weight = float(data.get('weightPercent', 0))
    createdBy = data.get('createdBy')
    notes = data.get('notes')

    db = SessionLocal()
    try:
        a = AssessmentModel(
            versionID=versionID,
            assessmentType=assessmentType,
            title=title,
            weightPercent=weight,
            createdBy=createdBy,
            createdAt=datetime.utcnow(),
            notes=notes
        )
        db.add(a)
        db.commit()
        db.refresh(a)
        return jsonify({'assessmentID': a.assessmentID}), 201
    finally:
        db.close()


@bp.route('/<int:assessment_id>', methods=['PUT'])
def edit_assessment(assessment_id: int):
    data = request.get_json(silent=True) or {}
    db = SessionLocal()
    try:
        a = db.get(AssessmentModel, assessment_id)
        if not a:
            return jsonify({'error': 'Assessment not found'}), 404
        if 'title' in data: a.title = data.get('title')
        if 'weightPercent' in data: a.weightPercent = float(data.get('weightPercent'))
        if 'notes' in data: a.notes = data.get('notes')
        db.commit()
        return jsonify({'assessmentID': a.assessmentID}), 200
    finally:
        db.close()


@bp.route('/<int:assessment_id>', methods=['DELETE'])
def delete_assessment(assessment_id: int):
    db = SessionLocal()
    try:
        a = db.get(AssessmentModel, assessment_id)
        if not a:
            return jsonify({'error': 'Assessment not found'}), 404
        db.delete(a)
        db.commit()
        return jsonify({'deleted': assessment_id}), 200
    finally:
        db.close()


@bp.route('/<int:assessment_id>/attach_clo', methods=['POST'])
def attach_clo(assessment_id: int):
    data = request.get_json(silent=True) or {}
    cloID = data.get('cloID')
    weight = int(data.get('weightPercent', 0))
    if not cloID:
        return jsonify({'error': 'cloID required'}), 400
    db = SessionLocal()
    try:
        # ensure CLO exists
        c = db.get(CLOModel, cloID)
        if not c:
            return jsonify({'error': 'CLO not found'}), 404
        m = AssessmentCLOMappingModel(assessmentID=assessment_id, cloID=cloID, weightPercent=weight)
        db.add(m)
        db.commit()
        db.refresh(m)
        return jsonify({'mappingID': m.mappingID}), 201
    finally:
        db.close()


@bp.route('/version/<int:version_id>/check_weights', methods=['GET'])
def check_weights(version_id: int):
    db = SessionLocal()
    try:
        rows = db.query(AssessmentModel).filter(AssessmentModel.versionID == version_id).all()
        total = sum((r.weightPercent or 0.0) for r in rows)
        return jsonify({'versionID': version_id, 'totalPercent': total, 'valid': abs(total - 100.0) < 0.001}), 200
    finally:
        db.close()
