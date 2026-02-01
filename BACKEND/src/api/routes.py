from src.api.controllers.user_controller import bp as todo_bp
from api.controllers.ai_controller import ai_bp

def register_routes(app):
    app.register_blueprint(todo_bp) 
    app.register_blueprint(ai_bp)
