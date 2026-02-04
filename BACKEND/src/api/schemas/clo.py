from marshmallow import Schema, fields


class CloCreateRequestSchema(Schema):
    versionID = fields.Integer(required=True)
    cloCode = fields.String(required=True)
    cloDescription = fields.String(required=True)
    knowledgeLevel = fields.String(allow_none=True)
    skillLevel = fields.String(allow_none=True)
    attitudeLevel = fields.String(allow_none=True)


class CloEditRequestSchema(Schema):
    cloCode = fields.String()
    cloDescription = fields.String()
    knowledgeLevel = fields.String()
    skillLevel = fields.String()
    attitudeLevel = fields.String()


class CloMapRequestSchema(Schema):
    ploID = fields.Integer(required=True)
    mappingLevel = fields.String(allow_none=True)


class CloResponseSchema(Schema):
    cloID = fields.Integer()
    versionID = fields.Integer()
    cloCode = fields.String()
    cloDescription = fields.String()
    knowledgeLevel = fields.String(allow_none=True)
    skillLevel = fields.String(allow_none=True)
    attitudeLevel = fields.String(allow_none=True)


class CloPloMappingItemSchema(Schema):
    ploID = fields.Integer()
    ploCode = fields.String(allow_none=True)
    mappingLevel = fields.String(allow_none=True)


class CloMappingsSchema(Schema):
    cloID = fields.Integer()
    versionID = fields.Integer(allow_none=True)
    cloCode = fields.String()
    cloDescription = fields.String()
    plos = fields.List(fields.Nested(CloPloMappingItemSchema))
