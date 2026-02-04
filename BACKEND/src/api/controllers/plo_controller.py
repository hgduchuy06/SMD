from flask import Blueprint, request, jsonify
from datetime import datetime

from infrastructure.databases.mysql import SessionLocal
from infrastructure.models.plo import PLOModel
from api.schemas.plo import PLOCreateRequestSchema, PLOEditRequestSchema, PLOResponseSchema

plo_bp = Blueprint('plo', __name__, url_prefix='/plos')

request_create_schema = PLOCreateRequestSchema()
request_edit_schema = PLOEditRequestSchema()
response_schema = PLOResponseSchema()


@plo_bp.route('/', methods=['GET'])
def list_plos():
    """
    List PLOs
    ---
    get:
      summary: List Program Learning Outcomes
      parameters:
        - name: programID
          in: query
          required: false
          schema:
            type: integer
      tags:
        - PLO
      responses:
        200:
          description: List of PLOs
    """
    program_id = request.args.get('programID')
    db = SessionLocal()
    try:
        q = db.query(PLOModel)
        if program_id:
            q = q.filter(PLOModel.programID == int(program_id))
        rows = q.all()
        out = [{
            'ploID': r.ploID,
            'programID': r.programID,
            'ploCode': r.ploCode,
            'ploDescription': r.ploDescription
        } for r in rows]
        return jsonify(response_schema.dump(out, many=True)), 200
    finally:
        db.close()


@plo_bp.route('/<int:plo_id>', methods=['GET'])
def get_plo(plo_id: int):
    """
    Get PLO by ID
    ---
    get:
      summary: Get a PLO
      parameters:
        - name: plo_id
          in: path
          required: true
          schema:
            type: integer
      tags:
        - PLO
      responses:
        200:
          description: PLO found
        404:
          description: Not found
    """
    db = SessionLocal()
    try:
        p = db.get(PLOModel, plo_id)
        if not p:
            return jsonify({'error': 'PLO not found'}), 404
        payload = {
            'ploID': p.ploID,
            'programID': p.programID,
            'ploCode': p.ploCode,
            'ploDescription': p.ploDescription
        }
        return jsonify(response_schema.dump(payload)), 200
    finally:
        db.close()


@plo_bp.route('/', methods=['POST'])
def create_plo():
    """
    Create a PLO
    ---
    post:
      summary: Create a Program Learning Outcome
      requestBody:
        required: true
        content:
          application/json:
            schema: {}
      tags:
        - PLO
      responses:
        201:
          description: Created
    """
    data = request.get_json(silent=True) or {}
    errors = request_create_schema.validate(data)
    if errors:
        return jsonify(errors), 400

    program_id = data.get('programID')
    plo_code = data.get('ploCode')
    plo_desc = data.get('ploDescription')

    db = SessionLocal()
    try:
        p = PLOModel(programID=program_id, ploCode=plo_code, ploDescription=plo_desc)
        db.add(p)
        db.commit()
        db.refresh(p)
        return jsonify({'ploID': p.ploID}), 201
    finally:
        db.close()


@plo_bp.route('/<int:plo_id>', methods=['PUT'])
def edit_plo(plo_id: int):
    """
    Edit a PLO
    ---
    put:
      summary: Update a PLO
      parameters:
        - name: plo_id
          in: path
          required: true
          schema:
            type: integer
      requestBody:
        required: true
        content:
          application/json:
            schema: {}
      tags:
        - PLO
      responses:
        200:
          description: Updated
        404:
          description: Not found
    """
    data = request.get_json(silent=True) or {}
    errors = request_edit_schema.validate(data)
    if errors:
        return jsonify(errors), 400

    db = SessionLocal()
    try:
        p = db.get(PLOModel, plo_id)
        if not p:
            return jsonify({'error': 'PLO not found'}), 404
        for k in ('programID', 'ploCode', 'ploDescription'):
            if k in data:
                setattr(p, k, data.get(k))
        db.commit()
        return jsonify({'ploID': p.ploID}), 200
    finally:
        db.close()


@plo_bp.route('/<int:plo_id>', methods=['DELETE'])
def delete_plo(plo_id: int):
    """
    Delete a PLO
    ---
    delete:
      summary: Delete a PLO
      parameters:
        - name: plo_id
          in: path
          required: true
          schema:
            type: integer
      tags:
        - PLO
      responses:
        200:
          description: Deleted
        404:
          description: Not found
    """
    db = SessionLocal()
    try:
        p = db.get(PLOModel, plo_id)
        if not p:
            return jsonify({'error': 'PLO not found'}), 404
        db.delete(p)
        db.commit()
        return jsonify({'deleted': plo_id}), 200
    finally:
        db.close()
