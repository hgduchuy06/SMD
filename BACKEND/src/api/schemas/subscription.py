from marshmallow import Schema, fields

class SubscriptionRequestSchema(Schema):
    userID = fields.Int(required=True)
    syllabusID = fields.Int(required=True)

class SubscriptionResponseSchema(Schema):
    subscriptionID = fields.Int(required=True)
    userID = fields.Int(required=True)
    syllabusID = fields.Int(required=True)
    createdAt = fields.Raw()
