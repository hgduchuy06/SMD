import os
import datetime
import enum
import json
from functools import wraps

from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_jwt_extended import (
    JWTManager, create_access_token, jwt_required, get_jwt_identity, verify_jwt_in_request
)
from werkzeug.security import generate_password_hash, check_password_hash
from flask_cors import CORS

# ==========================================
# 1. CẤU HÌNH (CONFIG)
# ==========================================
app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///university_manager.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['JWT_SECRET_KEY'] = 'secret-key-change-me'
app.config['SECRET_KEY'] = 'super-secret-key'

db = SQLAlchemy(app)
jwt = JWTManager(app)
CORS(app)

# ==========================================
# 2. MODELS (CƠ SỞ DỮ LIỆU)
# ==========================================

# --- Bảng phụ cho quan hệ Môn tiên quyết ---
course_prerequisites = db.Table('course_prerequisites',
    db.Column('course_id', db.Integer, db.ForeignKey('syllabus.id'), primary_key=True),
    db.Column('prerequisite_id', db.Integer, db.ForeignKey('syllabus.id'), primary_key=True)
)

class UserRole(str, enum.Enum):
    ADMIN = "admin"
    LECTURE = "lecture"
    HEAD_DEPT = "head_of_department"
    STUDENT = "student"

class SyllabusStatus(str, enum.Enum):
    DRAFT = "Draft"
    PENDING = "Pending"     # Chờ duyệt
    APPROVED = "Approved"   # Đã duyệt 
    REJECTED = "Rejected"

class User(db.Model):
    __tablename__ = 'users'
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(50), unique=True, nullable=False)
    password_hash = db.Column(db.String(255), nullable=False)
    role = db.Column(db.Enum(UserRole), default=UserRole.LECTURE)
    full_name = db.Column(db.String(100))

    def set_password(self, password):
        self.password_hash = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password_hash, password)

class Syllabus(db.Model):
    __tablename__ = 'syllabus'
    
    id = db.Column(db.Integer, primary_key=True)
    course_name = db.Column(db.String(200), nullable=False)
    course_code = db.Column(db.String(50), nullable=False) 
    credits = db.Column(db.Integer, default=3)             
    version = db.Column(db.String(20), default="1.0")     
    status = db.Column(db.Enum(SyllabusStatus), default=SyllabusStatus.DRAFT)
    
    learning_outcomes = db.Column(db.JSON, default={}) 
    assessment_scheme = db.Column(db.JSON, default=[]) 
    schedule_plan = db.Column(db.JSON, default=[])     
    
    created_by = db.Column(db.Integer, db.ForeignKey('users.id'))
    created_at = db.Column(db.DateTime, default=datetime.datetime.utcnow)
    
    prerequisites = db.relationship(
        'Syllabus', 
        secondary=course_prerequisites,
        primaryjoin=(course_prerequisites.c.course_id == id),
        secondaryjoin=(course_prerequisites.c.prerequisite_id == id),
        backref=db.backref('required_by', lazy='dynamic'), 
        lazy='dynamic'
    )

    def to_dict(self):
        return {
            "id": self.id,
            "course_name": self.course_name,
            "course_code": self.course_code,
            "credits": self.credits,
            "version": self.version,
            "status": self.status.value,
            "learning_outcomes": self.learning_outcomes,
            "assessment_scheme": self.assessment_scheme,
            "prerequisites": [p.course_code for p in self.prerequisites],
            "created_at": self.created_at.isoformat()
        }

# ==========================================
# 3. HELPER FUNCTIONS (LOGIC XỬ LÝ)
# ==========================================

def role_required(allowed_roles):
    def wrapper(fn):
        @wraps(fn)
        def decorator(*args, **kwargs):
            verify_jwt_in_request()
            user_id = get_jwt_identity()
            user = User.query.get(user_id)
            if not user or user.role.value not in allowed_roles:
                return jsonify({"error": "Không có quyền truy cập"}), 403
            return fn(*args, **kwargs)
        return decorator
    return wrapper

def validate_assessment(schemes):
    """Kiểm tra tổng trọng số phải bằng 100%"""
    if not schemes: return
    total = sum([item.get('weight', 0) for item in schemes])
    if total != 100:
        raise ValueError(f"Tổng trọng số đánh giá phải là 100% (Hiện tại: {total}%)")

def create_new_version(old_syl, data, user_id):
    """Tạo bản sao version mới (VD: 1.0 -> 2.0)"""
    try:
        major_ver = int(float(old_syl.version))
    except: major_ver = 1
    
    new_version_str = f"{major_ver + 1}.0"
    
    new_syl = Syllabus(
        course_name=data.get('course_name', old_syl.course_name),
        course_code=old_syl.course_code,
        credits=old_syl.credits,
        version=new_version_str,
        status=SyllabusStatus.DRAFT, 
        created_by=user_id,
        learning_outcomes=data.get('learning_outcomes', old_syl.learning_outcomes),
        assessment_scheme=data.get('assessment_scheme', old_syl.assessment_scheme),
        schedule_plan=data.get('schedule_plan', old_syl.schedule_plan)
    )

    new_syl.prerequisites.extend(old_syl.prerequisites)
    db.session.add(new_syl)
    db.session.commit()
    return new_syl

# ==========================================
# 4. API ROUTES
# ==========================================

# --- Auth ---
@app.route('/api/auth/register', methods=['POST'])
def register():
    data = request.json
    if User.query.filter_by(username=data['username']).first():
        return jsonify({"error": "Username tồn tại"}), 400
    
    new_user = User(
        username=data['username'],
        full_name=data.get('full_name'),
        role=UserRole(data.get('role', 'lecture'))
    )
    new_user.set_password(data['password'])
    db.session.add(new_user)
    db.session.commit()
    return jsonify({"message": "Đăng ký thành công"}), 201

@app.route('/api/auth/login', methods=['POST'])
def login():
    data = request.json
    user = User.query.filter_by(username=data.get('username')).first()
    if user and user.check_password(data.get('password')):
        token = create_access_token(identity=user.id)
        return jsonify({"token": token, "role": user.role.value}), 200
    return jsonify({"error": "Sai thông tin đăng nhập"}), 401

# --- Syllabus Core (Module 3) ---

@app.route('/api/syllabus', methods=['POST'])
@jwt_required()
@role_required(['lecture', 'admin'])
def create_syllabus():
    try:
        user_id = get_jwt_identity()
        data = request.json
        
        validate_assessment(data.get('assessment_scheme', []))
        
        new_syl = Syllabus(
            course_name=data['course_name'],
            course_code=data['course_code'],
            credits=data.get('credits', 3),
            version="1.0",
            status=SyllabusStatus.DRAFT,
            created_by=user_id,
            learning_outcomes=data.get('learning_outcomes', {}),
            assessment_scheme=data.get('assessment_scheme', []),
            schedule_plan=data.get('schedule_plan', [])
        )
        
        if 'prerequisite_ids' in data:
            pres = Syllabus.query.filter(Syllabus.id.in_(data['prerequisite_ids'])).all()
            new_syl.prerequisites.extend(pres)

        db.session.add(new_syl)
        db.session.commit()
        return jsonify(new_syl.to_dict()), 201

    except ValueError as e:
        return jsonify({"error": str(e)}), 400

@app.route('/api/syllabus/<int:id>', methods=['PUT'])
@jwt_required()
@role_required(['lecture', 'admin'])
def update_syllabus(id):
    try:
        user_id = get_jwt_identity()
        data = request.json
        syl = Syllabus.query.get_or_404(id)

        if syl.status == SyllabusStatus.APPROVED:
            new_ver_syl = create_new_version(syl, data, user_id)
            return jsonify({
                "message": f"Giáo trình cũ đã duyệt. Đã tạo version mới {new_ver_syl.version}",
                "data": new_ver_syl.to_dict()
            }), 200

        # Update bình thường (Draft)
        if 'course_name' in data: syl.course_name = data['course_name']
        if 'learning_outcomes' in data: syl.learning_outcomes = data['learning_outcomes']
        if 'assessment_scheme' in data:
            validate_assessment(data['assessment_scheme'])
            syl.assessment_scheme = data['assessment_scheme']
        
        db.session.commit()
        return jsonify({"message": "Cập nhật thành công", "data": syl.to_dict()}), 200

    except ValueError as e:
        return jsonify({"error": str(e)}), 400

@app.route('/api/syllabus/<int:id>', methods=['GET'])
def get_syllabus(id):
    syl = Syllabus.query.get_or_404(id)
    return jsonify(syl.to_dict())

@app.route('/api/syllabus', methods=['GET'])
def list_syllabus():
    syls = Syllabus.query.all()
    return jsonify([s.to_dict() for s in syls])

# ==========================================
# 5. KHỞI CHẠY (MAIN)
# ==========================================
if __name__ == '__main__':
    if not os.path.exists('university_manager.db'):
        with app.app_context():
            db.create_all()
            print("--- Database created! ---")
            
            # Tạo Admin mẫu
            if not User.query.filter_by(username='admin').first():
                adm = User(username='admin', role=UserRole.ADMIN, full_name='Admin')
                adm.set_password('admin123')
                db.session.add(adm)
                db.session.commit()
                print("--- Admin created: admin / admin123 ---")
                
    app.run(debug=True, port=5000)