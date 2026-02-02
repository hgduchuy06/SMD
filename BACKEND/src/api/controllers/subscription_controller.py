from flask import Blueprint, request, jsonify
from datetime import datetime
from infrastructure.databases.mysql import SessionLocal
from infrastructure.models.subscription import SubscriptionModel
from infrastructure.models.user import UserModel

bp = Blueprint('subscription', __name__, url_prefix='/subscriptions')


@bp.route('/', methods=['POST'])
def follow_syllabus():
    data = request.get_json(silent=True) or {}
    userID = data.get('userID')
    syllabusID = data.get('syllabusID')
    if not userID or not syllabusID:
        return jsonify({'error': 'userID and syllabusID required'}), 400
    db = SessionLocal()
    try:
        existing = db.query(SubscriptionModel).filter(SubscriptionModel.userID == userID, SubscriptionModel.syllabusID == syllabusID).first()
        if existing:
            return jsonify({'subscriptionID': existing.subscriptionID}), 200
        s = SubscriptionModel(userID=userID, syllabusID=syllabusID, createdAt=datetime.utcnow())
        db.add(s)
        db.commit()
        db.refresh(s)
        return jsonify({'subscriptionID': s.subscriptionID}), 201
    finally:
        db.close()


@bp.route('/', methods=['DELETE'])
def unfollow_syllabus():
    data = request.get_json(silent=True) or {}
    userID = data.get('userID')
    syllabusID = data.get('syllabusID')
    if not userID or not syllabusID:
        return jsonify({'error': 'userID and syllabusID required'}), 400
    db = SessionLocal()
    try:
        existing = db.query(SubscriptionModel).filter(SubscriptionModel.userID == userID, SubscriptionModel.syllabusID == syllabusID).first()
        if not existing:
            return jsonify({'deleted': False}), 200
        db.delete(existing)
        db.commit()
        return jsonify({'deleted': True}), 200
    finally:
        db.close()


@bp.route('/syllabus/<int:syllabus_id>/followers', methods=['GET'])
def list_followers(syllabus_id: int):
    db = SessionLocal()
    try:
        rows = db.query(SubscriptionModel).filter(SubscriptionModel.syllabusID == syllabus_id).all()
        out = [{'subscriptionID': r.subscriptionID, 'userID': r.userID} for r in rows]
        return jsonify(out), 200
    finally:
        db.close()
