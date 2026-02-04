from flask import Blueprint, request, jsonify
from datetime import datetime
from infrastructure.databases.mysql import SessionLocal
from infrastructure.models.subscription import SubscriptionModel
from infrastructure.models.user import UserModel
from api.schemas.subscription import SubscriptionRequestSchema, SubscriptionResponseSchema

subscription_bp = Blueprint('subscription', __name__, url_prefix='/subscriptions')


@subscription_bp.route('/', methods=['POST'])
def follow_syllabus():
    """
        Follow syllabus (create subscription)
        ---
        post:
            summary: Subscribe a user to a syllabus
            tags:
                - Subscriptions
            requestBody:
                required: true
                content:
                    application/json:
                        schema:
                            type: object
                            properties:
                                userID:
                                    type: integer
                                syllabusID:
                                    type: integer
                            required: [userID, syllabusID]
            responses:
                201:
                    description: Subscription created
                    content:
                        application/json:
                            schema:
                                type: object
                                properties:
                                    subscriptionID:
                                        type: integer
                400:
                    description: Validation error
        """
    data = request.get_json(silent=True) or {}
    request_schema = SubscriptionRequestSchema()
    errors = request_schema.validate(data)
    if errors:
        return jsonify(errors), 400
    userID = data.get('userID')
    syllabusID = data.get('syllabusID')
    db = SessionLocal()
    try:
        existing = db.query(SubscriptionModel).filter(SubscriptionModel.userID == userID, SubscriptionModel.syllabusID == syllabusID).first()
        if existing:
            return jsonify(SubscriptionResponseSchema().dump({'subscriptionID': existing.subscriptionID, 'userID': existing.userID, 'syllabusID': existing.syllabusID, 'createdAt': existing.createdAt})), 200
        s = SubscriptionModel(userID=userID, syllabusID=syllabusID, createdAt=datetime.utcnow())
        db.add(s)
        db.commit()
        db.refresh(s)
        return jsonify(SubscriptionResponseSchema().dump({'subscriptionID': s.subscriptionID, 'userID': s.userID, 'syllabusID': s.syllabusID, 'createdAt': s.createdAt})), 201
    finally:
        db.close()


@subscription_bp.route('/', methods=['DELETE'])
def unfollow_syllabus():
    """
        Unfollow syllabus (delete subscription)
        ---
        delete:
            summary: Unsubscribe a user from a syllabus
            tags:
                - Subscriptions
            requestBody:
                required: true
                content:
                    application/json:
                        schema:
                            type: object
                            properties:
                                userID:
                                    type: integer
                                syllabusID:
                                    type: integer
                            required: [userID, syllabusID]
            responses:
                200:
                    description: Deletion result
                    content:
                        application/json:
                            schema:
                                type: object
                                properties:
                                    deleted:
                                        type: boolean
                400:
                    description: Validation error
        """
    data = request.get_json(silent=True) or {}
    request_schema = SubscriptionRequestSchema()
    errors = request_schema.validate(data)
    if errors:
        return jsonify(errors), 400
    userID = data.get('userID')
    syllabusID = data.get('syllabusID')
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


@subscription_bp.route('/syllabus/<int:syllabus_id>/followers', methods=['GET'])
def list_followers(syllabus_id: int):
    """
        List followers for a syllabus
        ---
        get:
            summary: List users who follow a syllabus
            tags:
                - Subscriptions
            parameters:
                - in: path
                    name: syllabus_id
                    schema:
                        type: integer
                    required: true
            responses:
                200:
                    description: List of followers
                    content:
                        application/json:
                            schema:
                                type: array
                                items:
                                    type: object
                                    properties:
                                        subscriptionID:
                                            type: integer
                                        userID:
                                            type: integer
        """
    db = SessionLocal()
    try:
        rows = db.query(SubscriptionModel).filter(SubscriptionModel.syllabusID == syllabus_id).all()
        out = [SubscriptionResponseSchema().dump({'subscriptionID': r.subscriptionID, 'userID': r.userID, 'syllabusID': r.syllabusID, 'createdAt': r.createdAt}) for r in rows]
        return jsonify(out), 200
    finally:
        db.close()
