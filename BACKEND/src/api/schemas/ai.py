from marshmallow import Schema, fields

class AITaskRequestSchema(Schema):
    versionID = fields.Integer(required=True)

class AITaskResponseSchema(Schema):
    taskID = fields.Integer()
    status = fields.String()

class AITaskDetailSchema(Schema):
    taskID = fields.Integer()
    taskType = fields.String()
    status = fields.String()
    result = fields.String()
