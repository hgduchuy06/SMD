from apispec import APISpec
from apispec.ext.marshmallow import MarshmallowPlugin
from apispec_webframeworks.flask import FlaskPlugin
from api.schemas.user import UserRequestSchema, UserResponseSchema
from api.schemas.ai import AITaskRequestSchema, AITaskResponseSchema, AITaskDetailSchema


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
