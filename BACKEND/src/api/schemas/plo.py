from marshmallow import Schema, fields


class PLOCreateRequestSchema(Schema):
    programID = fields.Integer(allow_none=True)
    ploCode = fields.String(required=True)
    ploDescription = fields.String(required=True)


class PLOEditRequestSchema(Schema):
    programID = fields.Integer()
    ploCode = fields.String()
    ploDescription = fields.String()


class PLOResponseSchema(Schema):
    ploID = fields.Integer()
    programID = fields.Integer(allow_none=True)
    ploCode = fields.String()
    ploDescription = fields.String()


class PLOListSchema(Schema):
    items = fields.List(fields.Nested(PLOResponseSchema))
