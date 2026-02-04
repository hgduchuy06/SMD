from marshmallow import Schema, fields


class WorkItemCreateRequestSchema(Schema):
    versionID = fields.Integer(required=True)
    reviewerID = fields.Integer(required=True)
    assignedBy = fields.Integer(required=True)
    dueAt = fields.DateTime(allow_none=True)


class WorkItemReassignRequestSchema(Schema):
    newReviewerID = fields.Integer(required=True)
    reassignerID = fields.Integer(required=True)


class WorkItemStatusUpdateSchema(Schema):
    status = fields.Str(required=True)


class WorkItemResponseSchema(Schema):
    workItemID = fields.Integer()
    versionID = fields.Integer()
    reviewerID = fields.Integer()
    assignedBy = fields.Integer()
    status = fields.Str()
    dueAt = fields.DateTime(allow_none=True)
    createdAt = fields.DateTime(allow_none=True)
    updatedAt = fields.DateTime(allow_none=True)


class WorkItemListSchema(Schema):
    items = fields.List(fields.Nested(WorkItemResponseSchema))
