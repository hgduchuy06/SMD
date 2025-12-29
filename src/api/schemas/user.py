from marshmallow import Schema, fields

class UserRequestSchema(Schema):
    username = fields.Str(required=True)
    email = fields.Email(required=True)
    password = fields.Str(load_only=True)

class UserResponseSchema(Schema):
    id = fields.Int()
    username = fields.Str()
    email = fields.Email()
