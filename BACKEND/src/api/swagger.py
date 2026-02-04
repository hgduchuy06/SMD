from apispec import APISpec
from apispec.ext.marshmallow import MarshmallowPlugin
from apispec_webframeworks.flask import FlaskPlugin

from api.schemas.user import UserRequestSchema, UserResponseSchema
from api.schemas.ai import AITaskRequestSchema, AITaskResponseSchema, AITaskDetailSchema
from api.schemas.workitem import WorkItemCreateRequestSchema, WorkItemReassignRequestSchema, WorkItemStatusUpdateSchema, WorkItemResponseSchema, WorkItemListSchema
from api.schemas.clo import CloCreateRequestSchema, CloEditRequestSchema, CloMapRequestSchema, CloResponseSchema, CloPloMappingItemSchema, CloMappingsSchema
from api.schemas.audit import AuditCreateRequestSchema, AuditResponseSchema
from api.schemas.plo import PLOCreateRequestSchema, PLOResponseSchema, PLOEditRequestSchema, PLOListSchema
from api.schemas.subscription import SubscriptionRequestSchema, SubscriptionResponseSchema
from api.schemas.feedback import FeedbackRequestSchema, FeedbackResponseSchema



spec = APISpec(
    title="SMD API",
    version="1.0.0",
    openapi_version="3.0.2",
    plugins=[FlaskPlugin(), MarshmallowPlugin()],
)

spec.components.schema("UserRequest", schema=UserRequestSchema)
spec.components.schema("UserResponse", schema=UserResponseSchema)

spec.components.schema("AITaskRequest", schema=AITaskRequestSchema)
spec.components.schema("AITaskResponse", schema=AITaskResponseSchema)
spec.components.schema("AITaskDetail", schema=AITaskDetailSchema)

spec.components.schema("WorkItemCreateRequest", schema=WorkItemCreateRequestSchema)
spec.components.schema("WorkItemReassignRequest", schema=WorkItemReassignRequestSchema)
spec.components.schema("WorkItemStatusUpdate", schema=WorkItemStatusUpdateSchema)   
spec.components.schema("WorkItemResponse", schema=WorkItemResponseSchema)
spec.components.schema("WorkItemList", schema=WorkItemListSchema)   

spec.components.schema("CloCreateRequest", schema=CloCreateRequestSchema)
spec.components.schema("CloEditRequest", schema=CloEditRequestSchema)       
spec.components.schema("CloMapRequest", schema=CloMapRequestSchema)
spec.components.schema("CloResponse", schema=CloResponseSchema) 
spec.components.schema("CloPloMappingItem", schema=CloPloMappingItemSchema)
spec.components.schema("CloMappings", schema=CloMappingsSchema)

spec.components.schema("AuditCreateRequest", schema=AuditCreateRequestSchema)
spec.components.schema("AuditResponse", schema=AuditResponseSchema)
   
spec.components.schema("PLOCreateRequest", schema=PLOCreateRequestSchema)
spec.components.schema("PLOResponse", schema=PLOResponseSchema) 
spec.components.schema("PLOEditRequest", schema=PLOEditRequestSchema)
spec.components.schema("PLOList", schema=PLOListSchema)

spec.components.schema("SubscriptionRequest", schema=SubscriptionRequestSchema)
spec.components.schema("SubscriptionResponse", schema=SubscriptionResponseSchema)

spec.components.schema("FeedbackRequest", schema=FeedbackRequestSchema)
spec.components.schema("FeedbackResponse", schema=FeedbackResponseSchema)
