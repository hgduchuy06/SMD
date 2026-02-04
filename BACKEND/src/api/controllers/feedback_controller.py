from flask import Blueprint, request, jsonify
from datetime import datetime
from infrastructure.databases.mysql import SessionLocal
from infrastructure.models.feeback import FeedbackModel
from services.notification_service import notify_syllabus_event

from api.schemas.feedback import FeedbackRequestSchema, FeedbackResponseSchema

feedback_bp = Blueprint('feedback', __name__, url_prefix='/feedbacks')


@feedback_bp.route('/', methods=['POST'])
def create_feedback():
    """
        Create feedback
        ---
        post:
            summary: Submit feedback for a syllabus
            tags:
                - Feedback
            requestBody:
                required: true
                content:
                    application/json:
                        schema:
                            type: object
                            properties:
                                syllabusID:
                                    type: integer
                                userID:
                                    type: integer
                                content:
                                    type: string
                            required: [syllabusID, userID, content]
            responses:
                201:
                    description: Feedback created
                    content:
                        application/json:
                            schema:
                                type: object
                                properties:
                                    feedbackID:
                                        type: integer
                400:
                    description: Validation error
        """
    data = request.get_json(silent=True) or {}
    request_schema = FeedbackRequestSchema()
    errors = request_schema.validate(data)
    if errors:
        return jsonify(errors), 400
    syllabusID = data.get('syllabusID')
    userID = data.get('userID')
    content = data.get('content')
    db = SessionLocal()
    try:
        f = FeedbackModel(syllabusID=syllabusID, userID=userID, content=content)
        db.add(f)
        db.commit()
        db.refresh(f)
        # notify HoD / AA about new feedback
        try:
            notify_syllabus_event('feedback_received', version_id=None, actor_id=userID, include_students=False)
        except Exception:
            pass
        return jsonify(response_schema.dump({'feedbackID': f.feedbackID, 'syllabusID': f.syllabusID, 'userID': f.userID, 'content': f.content})), 201
    finally:
        db.close()


@feedback_bp.route('/syllabus/<int:syllabus_id>', methods=['GET'])
def list_feedbacks(syllabus_id: int):
    """
        List feedbacks for syllabus
        ---
        get:
            summary: Retrieve feedback entries for a syllabus
            tags:
                - Feedback
            parameters:
                - in: path
                    name: syllabus_id
                    schema:
                        type: integer
                    required: true
            responses:
                200:
                    description: List of feedbacks
                    content:
                        application/json:
                            schema:
                                type: array
                                items:
                                    type: object
                                    properties:
                                        feedbackID:
                                            type: integer
                                        userID:
                                            type: integer
                                        content:
                                            type: string
        """
    # Only HoD / AA should call this in UI; no auth enforced here
    db = SessionLocal()
    try:
        rows = db.query(FeedbackModel).filter(FeedbackModel.syllabusID == syllabus_id).all()
        response_schema = FeedbackResponseSchema()
        out = [response_schema.dump({'feedbackID': r.feedbackID, 'syllabusID': r.syllabusID, 'userID': r.userID, 'content': r.content}) for r in rows]
        return jsonify(out), 200
    finally:
        db.close()
