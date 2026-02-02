from flask import Blueprint, request, jsonify
from datetime import datetime
from infrastructure.databases.mysql import SessionLocal
from infrastructure.models.feeback import FeedbackModel
from services.notification_service import notify_syllabus_event

bp = Blueprint('feedback', __name__, url_prefix='/feedbacks')


@bp.route('/', methods=['POST'])
def create_feedback():
    data = request.get_json(silent=True) or {}
    syllabusID = data.get('syllabusID')
    userID = data.get('userID')
    content = data.get('content')
    if not syllabusID or not userID or not content:
        return jsonify({'error': 'syllabusID, userID and content required'}), 400
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
        return jsonify({'feedbackID': f.feedbackID}), 201
    finally:
        db.close()


@bp.route('/syllabus/<int:syllabus_id>', methods=['GET'])
def list_feedbacks(syllabus_id: int):
    # Only HoD / AA should call this in UI; no auth enforced here
    db = SessionLocal()
    try:
        rows = db.query(FeedbackModel).filter(FeedbackModel.syllabusID == syllabus_id).all()
        out = [{'feedbackID': r.feedbackID, 'userID': r.userID, 'content': r.content} for r in rows]
        return jsonify(out), 200
    finally:
        db.close()
