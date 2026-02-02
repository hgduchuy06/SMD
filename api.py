from __future__ import annotations
import datetime as dt
import enum

from flask import Flask, jsonify, request
from flask_sqlalchemy import SQLAlchemy
from flask_jwt_extended import (
    JWTManager, create_access_token, jwt_required, get_jwt_identity
)
from werkzeug.security import generate_password_hash, check_password_hash
from flask_cors import CORS

# ==========================================
# 1. CONFIG
# ==========================================
app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///syllabus_core.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SECRET_KEY'] = 'dev-secret-key'
app.config['JWT_SECRET_KEY'] = 'jwt-super-secret'

db = SQLAlchemy(app)
jwt = JWTManager(app)
CORS(app)

# ==========================================
# 2. ENUMS
# ==========================================
class UserRole(str, enum.Enum):
    ADMIN = "admin"
    LECTURER = "lecturer"

class SyllabusStatus(str, enum.Enum):
    DRAFT = "Draft"
    APPROVED = "Approved"
    REJECTED = "Rejected"

# ==========================================
# 3. MODELS
# ==========================================
class User(db.Model):
    __tablename__ = 'users'
    userID = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(50), unique=True, nullable=False)
    password_hash = db.Column(db.String(255), nullable=False)
    role = db.Column(db.Enum(UserRole), default=UserRole.LECTURER)

    def set_password(self, password):
        self.password_hash = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password_hash, password)


class Syllabus(db.Model):
    __tablename__ = 'syllabuses'
    syllabusID = db.Column(db.Integer, primary_key=True)
    courseCode = db.Column(db.String(50), unique=True, nullable=False)
    courseName = db.Column(db.String(200), nullable=False)
    credits = db.Column(db.Integer, default=3)
    createdAt = db.Column(db.DateTime, default=dt.datetime.utcnow)

    versions = db.relationship("SyllabusVersion", backref="syllabus", lazy=True)

    def to_dict(self):
        latest = None
        if self.versions:
            latest = sorted(self.versions, key=lambda x: x.versionNumber, reverse=True)[0].to_dict()

        return {
            "syllabusID": self.syllabusID,
            "courseCode": self.courseCode,
            "courseName": self.courseName,
            "credits": self.credits,
            "currentVersion": latest
        }


class SyllabusVersion(db.Model):
    __tablename__ = 'syllabus_versions'

    versionID = db.Column(db.Integer, primary_key=True)
    syllabusID = db.Column(db.Integer, db.ForeignKey('syllabuses.syllabusID'), nullable=False)

    versionNumber = db.Column(db.Float, default=1.0)
    status = db.Column(db.Enum(SyllabusStatus), default=SyllabusStatus.DRAFT)
    content = db.Column(db.Text)

    createdBy = db.Column(db.Integer, db.ForeignKey('users.userID'))
    createdAt = db.Column(db.DateTime, default=dt.datetime.utcnow)

    clos = db.relationship("CLO", backref="version", lazy=True, cascade="all, delete-orphan")

    def to_dict(self):
        return {
            "versionID": self.versionID,
            "versionNumber": self.versionNumber,
            "status": self.status.value,
            "content": self.content,
            "createdAt": self.createdAt.isoformat(),
            "clos": [clo.to_dict() for clo in self.clos]
        }


class CLO(db.Model):
    __tablename__ = 'clos'
    cloID = db.Column(db.Integer, primary_key=True)
    versionID = db.Column(db.Integer, db.ForeignKey('syllabus_versions.versionID'))
    cloCode = db.Column(db.String(50))
    cloDescription = db.Column(db.Text)

    def to_dict(self):
        return {
            "id": self.cloID,
            "code": self.cloCode,
            "description": self.cloDescription
        }

# ==========================================
# 4. API
# ==========================================
@app.route('/api/login', methods=['POST'])
def login():
    data = request.json
    user = User.query.filter_by(username=data.get('username')).first()

    if user and user.check_password(data.get('password')):
        token = create_access_token(identity=user.userID)
        return jsonify({"token": token, "role": user.role.value}), 200

    return jsonify({"error": "Login failed"}), 401


@app.route('/api/syllabus', methods=['POST'])
@jwt_required()
def create_syllabus():
    user_id = get_jwt_identity()
    data = request.json

    try:
        syl = Syllabus(
            courseCode=data['courseCode'],
            courseName=data['courseName'],
            credits=data.get('credits', 3)
        )
        db.session.add(syl)
        db.session.flush()

        ver = SyllabusVersion(
            syllabusID=syl.syllabusID,
            versionNumber=1.0,
            content=data.get('content', ''),
            createdBy=user_id
        )
        db.session.add(ver)
        db.session.flush()

        for item in data.get('clos', []):
            db.session.add(CLO(
                versionID=ver.versionID,
                cloCode=item['code'],
                cloDescription=item['description']
            ))

        db.session.commit()
        return jsonify({"message": "Created successfully", "data": syl.to_dict()}), 201

    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 400


@app.route('/api/syllabus/<int:id>', methods=['PUT'])
@jwt_required()
def update_syllabus(id):
    user_id = get_jwt_identity()
    data = request.json

    syl = Syllabus.query.get_or_404(id)
    latest = sorted(syl.versions, key=lambda x: x.versionNumber, reverse=True)[0]

    if latest.status == SyllabusStatus.APPROVED:
        new_ver = SyllabusVersion(
            syllabusID=syl.syllabusID,
            versionNumber=latest.versionNumber + 1.0,
            content=data.get('content', latest.content),
            createdBy=user_id
        )
        db.session.add(new_ver)
        db.session.flush()

        for clo in data.get('clos', []):
            db.session.add(CLO(
                versionID=new_ver.versionID,
                cloCode=clo['code'],
                cloDescription=clo['description']
            ))

        msg = "Created new version"

    else:
        latest.content = data.get('content', latest.content)
        CLO.query.filter_by(versionID=latest.versionID).delete()

        for clo in data.get('clos', []):
            db.session.add(CLO(
                versionID=latest.versionID,
                cloCode=clo['code'],
                cloDescription=clo['description']
            ))

        msg = "Updated draft version"

    db.session.commit()
    return jsonify({"message": msg})


@app.route('/api/syllabus/<int:id>/approve', methods=['POST'])
@jwt_required()
def approve_syllabus(id):
    syl = Syllabus.query.get_or_404(id)
    latest = sorted(syl.versions, key=lambda x: x.versionNumber, reverse=True)[0]

    latest.status = SyllabusStatus.APPROVED
    db.session.commit()

    return jsonify({"message": "Approved"})


@app.route('/api/syllabus/<int:id>', methods=['GET'])
def get_syllabus(id):
    syl = Syllabus.query.get_or_404(id)
    return jsonify(syl.to_dict())
