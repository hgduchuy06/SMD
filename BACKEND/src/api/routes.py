from api.controllers.auth_controller import auth_bp
from api.controllers.course_controller import course_bp
from api.controllers.ai_controller import ai_bp
from api.controllers.user_controller import bp as user_bp
from api.controllers.workitem_controller import workitem_bp
from api.controllers.clo_controller import clo_bp
from api.controllers.audit_controller import audit_bp
from api.controllers.plo_controller import plo_bp
from api.controllers.subscription_controller import subscription_bp
from api.controllers.feedback_controller import feedback_bp

def register_routes(app):
    app.register_blueprint(auth_bp)
    app.register_blueprint(course_bp)
    app.register_blueprint(ai_bp)
    app.register_blueprint(user_bp)
    app.register_blueprint(workitem_bp)
    app.register_blueprint(clo_bp)
    app.register_blueprint(audit_bp)
    app.register_blueprint(plo_bp)
    app.register_blueprint(subscription_bp)
    app.register_blueprint(feedback_bp)