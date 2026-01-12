from src.api.controllers.user_controller import bp as todo_bp

def register_routes(app):
    app.register_blueprint(todo_bp) 