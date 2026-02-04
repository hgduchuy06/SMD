from marshmallow import Schema, fields


class AuditCreateRequestSchema(Schema):
    entityType = fields.String(required=True)
    entityID = fields.Integer(required=True)
    action = fields.String(required=True)
    userID = fields.Integer(allow_none=True)
    details = fields.Dict(allow_none=True)


class AuditResponseSchema(Schema):
    auditID = fields.Integer()
    entityType = fields.String()
    entityID = fields.Integer()
    action = fields.String()
    userID = fields.Integer(allow_none=True)
    details = fields.Raw(allow_none=True)
    createdAt = fields.DateTime(allow_none=True)
