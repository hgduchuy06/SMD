from marshmallow import Schema, fields

class FeedbackRequestSchema(Schema):
    syllabusID = fields.Int(required=True)
    userID = fields.Int(required=True)
    content = fields.Str(required=True)

class FeedbackResponseSchema(Schema):
    feedbackID = fields.Int(required=True)
    syllabusID = fields.Int(required=True)
    userID = fields.Int(required=True)
    content = fields.Str(required=True)
