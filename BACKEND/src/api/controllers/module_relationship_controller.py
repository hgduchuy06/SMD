from flask import Blueprint, request, jsonify
from infrastructure.databases.mysql import SessionLocal
from infrastructure.models.mouldeRelationship import ModuleRelationshipModel
from infrastructure.models.syllabus import SyllabusModel

bp = Blueprint('module_relationship', __name__, url_prefix='/module_relationships')


@bp.route('/', methods=['POST'])
def create_relationship():
    data = request.get_json(silent=True) or {}
    syllabusID = data.get('syllabusID')
    relatedSyllabusID = data.get('relatedSyllabusID')
    relationType = data.get('relationType')  # prerequisite|parallel|complementary
    if not syllabusID or not relatedSyllabusID or not relationType:
        return jsonify({'error': 'syllabusID, relatedSyllabusID and relationType required'}), 400
    db = SessionLocal()
    try:
        r = ModuleRelationshipModel(syllabusID=syllabusID, relatedSyllabusID=relatedSyllabusID, relationType=relationType)
        db.add(r)
        db.commit()
        db.refresh(r)
        return jsonify({'relationID': r.relationID}), 201
    finally:
        db.close()


@bp.route('/<int:syllabus_id>', methods=['GET'])
def list_relationships(syllabus_id: int):
    fmt = request.args.get('format', 'table')
    db = SessionLocal()
    try:
        rows = db.query(ModuleRelationshipModel).filter(ModuleRelationshipModel.syllabusID == syllabus_id).all()
        if fmt == 'tree':
            # build a simple tree of related modules (one level)
            tree = { 'syllabusID': syllabus_id, 'relations': [] }
            for r in rows:
                tree['relations'].append({'relatedSyllabusID': r.relatedSyllabusID, 'relationType': r.relationType})
            return jsonify(tree), 200
        else:
            out = []
            for r in rows:
                out.append({'relationID': r.relationID, 'relatedSyllabusID': r.relatedSyllabusID, 'relationType': r.relationType})
            return jsonify(out), 200
    finally:
        db.close()


@bp.route('/<int:relation_id>', methods=['DELETE'])
def delete_relationship(relation_id: int):
    db = SessionLocal()
    try:
        r = db.get(ModuleRelationshipModel, relation_id)
        if not r:
            return jsonify({'error': 'Relation not found'}), 404
        db.delete(r)
        db.commit()
        return jsonify({'deleted': relation_id}), 200
    finally:
        db.close()
