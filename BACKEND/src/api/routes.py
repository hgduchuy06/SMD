from api.controllers.auth_controller import auth_bp
from api.controllers.course_controller import course_bp
from api.controllers.ai_controller import ai_bp
from api.controllers.user_controller import bp as user_bp

def register_routes(app):
    app.register_blueprint(auth_bp)
    app.register_blueprint(course_bp)
    app.register_blueprint(ai_bp)
    app.register_blueprint(user_bp)
