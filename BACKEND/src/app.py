from flask import Flask, jsonify
from flask_cors import CORS
from api.swagger import spec
from api.controllers.user_controller import bp as todo_bp
from api.controllers.auth_controller import auth_bp
from api.controllers.ai_controller import ai_bp
from api.controllers.workflow_controller import bp as workflow_bp
from api.controllers.workitem_controller import bp as workitem_bp
from api.controllers.syllabus_controller import bp as syllabus_bp
from api.controllers.clo_controller import bp as clo_bp
from api.controllers.assessment_controller import bp as assessment_bp
from api.middleware import middleware
from infrastructure.databases import init_db
from api.responses import success_response
from config import Config
from flasgger import Swagger
from config import SwaggerConfig
from flask_swagger_ui import get_swaggerui_blueprint


def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)
    CORS(app, resources={
    r"/*": {
        "origins": ["http://localhost:5173"],  # port React
        "supports_credentials": True
    }
})
    Swagger(app)
    # Đăng ký blueprint trước
    app.register_blueprint(auth_bp)
    app.register_blueprint(ai_bp)
    app.register_blueprint(syllabus_bp)
    app.register_blueprint(clo_bp)
    app.register_blueprint(assessment_bp)
    app.register_blueprint(workflow_bp)
    app.register_blueprint(workitem_bp)

     # Thêm Swagger UI blueprint
    SWAGGER_URL = '/docs'
    API_URL = '/swagger.json'
    swaggerui_blueprint = get_swaggerui_blueprint(
        SWAGGER_URL,
        API_URL,
        config={'app_name': "SMD API"}
    )
    app.register_blueprint(swaggerui_blueprint, url_prefix=SWAGGER_URL)

    try:
        init_db(app)
    except Exception as e:
        print(f"Error initializing database: {e}")

    # Register middleware
    middleware(app)

    # Register routes
    with app.test_request_context():
        for rule in app.url_map.iter_rules():
            # Thêm các endpoint khác nếu cần
            if rule.endpoint.startswith(('ai.','auth.','workflow.','workitem.')):
                view_func = app.view_functions[rule.endpoint]
                print(f"Adding path: {rule.rule} -> {view_func}")
                spec.path(view=view_func)

    @app.route("/swagger.json")
    def swagger_json():
        return jsonify(spec.to_dict())

    return app
# Run the application

if __name__ == '__main__':
    app = create_app()
    app.run(host='0.0.0.0', port=9999, debug=True)