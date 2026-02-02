from __future__ import annotations
import datetime as dt
import enum
import os

from flask import Flask, jsonify, request
from flask_sqlalchemy import SQLAlchemy
from flask_jwt_extended import (
    JWTManager, create_access_token, jwt_required, get_jwt_identity
)
from werkzeug.security import generate_password_hash, check_password_hash
from flask_cors import CORS

# ==================================================
# 1. CONFIG
# ==================================================
app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///syllabus_core.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['JWT_SECRET_KEY'] = 'jwt-secret'

db = SQLAlchemy(app)
jwt = JWTManager(app)
CORS(app)

UPLOAD_FOLDER = 'uploads'
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

# ==================================================
# 2. ENUMS
# ==================================================
class UserRole(str, enum.Enum):
    ADMIN = "admin"
    LECTURER = "lecturer"

class SyllabusStatus(str, enum.Enum):
    DRAFT = "Draft"
    APPROVED = "Approved"
    REJECTED = "Rejected"

# ==================================================
# 3. MODELS (ENTITY)
# ==================================================
class User(db.Model):
    __tablename__ = 'users'
    userID = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(50), unique=True)
    password_hash = db.Column(db.String(255))
    role = db.Column(db.Enum(UserRole), default=UserRole.LECTURER)

    def set_password(self, pw):
        self.password_hash = generate_password_hash(pw)

    def check_password(self, pw):
        return check_password_hash(self.password_hash, pw)


class Syllabus(db.Model):
    __tablename__ = 'syllabuses'
    syllabusID = db.Column(db.Integer, primary_key=True)
    courseCode = db.Column(db.String(50), unique=True)
    courseName = db.Column(db.String(200))
    credits = db.Column(db.Integer, default=3)
    createdAt = db.Column(db.DateTime, default=dt.datetime.utcnow)

    versions = db.relationship("SyllabusVersion", backref="syllabus", lazy=True)

    def to_dict(self):
        latest = max(self.versions, key=lambda v: v.versionNumber, default=None)
        return {
            "syllabusID": self.syllabusID,
            "courseCode": self.courseCode,
            "courseName": self.courseName,
            "credits": self.credits,
            "currentVersion": latest.to_dict() if latest else None
        }


class SyllabusVersion(db.Model):
    __tablename__ = 'syllabus_versions'
    versionID = db.Column(db.Integer, primary_key=True)
    syllabusID = db.Column(db.Integer, db.ForeignKey('syllabuses.syllabusID'))
    versionNumber = db.Column(db.Float, default=1.0)
    status = db.Column(db.Enum(SyllabusStatus), default=SyllabusStatus.DRAFT)
    content = db.Column(db.Text)
    createdBy = db.Column(db.Integer, db.ForeignKey('users.userID'))
    createdAt = db.Column(db.DateTime, default=dt.datetime.utcnow)

    clos = db.relationship("CLO", cascade="all, delete-orphan")
    modules = db.relationship("Module", cascade="all, delete-orphan")
    assessments = db.relationship("Assessment", cascade="all, delete-orphan")
    attachments = db.relationship("Attachment", cascade="all, delete-orphan")

    def to_dict(self):
        return {
            "versionNumber": self.versionNumber,
            "status": self.status.value,
            "content": self.content,
            "CLOs": [c.to_dict() for c in self.clos],
            "Modules": [m.to_dict() for m in self.modules],
            "Assessments": [a.to_dict() for a in self.assessments],
            "Attachments": [f.filename for f in self.attachments]
        }


class CLO(db.Model):
    __tablename__ = 'clos'
    cloID = db.Column(db.Integer, primary_key=True)
    versionID = db.Column(db.Integer, db.ForeignKey('syllabus_versions.versionID'))
    cloCode = db.Column(db.String(50))
    cloDescription = db.Column(db.Text)

    def to_dict(self):
        return {"code": self.cloCode, "description": self.cloDescription}


class PLO(db.Model):
    __tablename__ = 'plos'
    ploID = db.Column(db.Integer, primary_key=True)
    ploCode = db.Column(db.String(50))
    ploDescription = db.Column(db.Text)


class CLO_PLO(db.Model):
    __tablename__ = 'clo_plo'
    id = db.Column(db.Integer, primary_key=True)
    cloID = db.Column(db.Integer, db.ForeignKey('clos.cloID'))
    ploID = db.Column(db.Integer, db.ForeignKey('plos.ploID'))


class Assessment(db.Model):
    __tablename__ = 'assessments'
    assessmentID = db.Column(db.Integer, primary_key=True)
    versionID = db.Column(db.Integer, db.ForeignKey('syllabus_versions.versionID'))
    name = db.Column(db.String(100))
    weight = db.Column(db.Float)
    method = db.Column(db.String(100))

    def to_dict(self):
        return {"name": self.name, "weight": self.weight, "method": self.method}


class Module(db.Model):
    __tablename__ = 'modules'
    moduleID = db.Column(db.Integer, primary_key=True)
    versionID = db.Column(db.Integer, db.ForeignKey('syllabus_versions.versionID'))
    title = db.Column(db.String(200))
    description = db.Column(db.Text)

    def to_dict(self):
        return {"title": self.title, "description": self.description}


class Prerequisite(db.Model):
    __tablename__ = 'prerequisites'
    id = db.Column(db.Integer, primary_key=True)
    syllabusID = db.Column(db.Integer, db.ForeignKey('syllabuses.syllabusID'))
    requiredCourseCode = db.Column(db.String(50))


class Attachment(db.Model):
    __tablename__ = 'attachments'
    attachmentID = db.Column(db.Integer, primary_key=True)
    versionID = db.Column(db.Integer, db.ForeignKey('syllabus_versions.versionID'))
    filename = db.Column(db.String(255))


class Follow(db.Model):
    __tablename__ = 'follows'
    id = db.Column(db.Integer, primary_key=True)
    userID = db.Column(db.Integer, db.ForeignKey('users.userID'))
    syllabusID = db.Column(db.Integer, db.ForeignKey('syllabuses.syllabusID'))

# ==================================================
# 4. VALIDATION (DTO)
# ==================================================
def validate_syllabus(data):
    for f in ['courseCode', 'courseName']:
        if f not in data:
            return f"Missing {f}"
    return None

# ==================================================
# 5. API
# ==================================================
@app.route('/api/login', methods=['POST'])
def login():
    data = request.json
    user = User.query.filter_by(username=data['username']).first()
    if user and user.check_password(data['password']):
        return jsonify({
            "token": create_access_token(identity=user.userID),
            "role": user.role.value
        })
    return jsonify({"error": "Login failed"}), 401


@app.route('/api/syllabus', methods=['POST'])
@jwt_required()
def create_syllabus():
    data = request.json
    err = validate_syllabus(data)
    if err:
        return jsonify({"error": err}), 400

    uid = get_jwt_identity()
    syl = Syllabus(
        courseCode=data['courseCode'],
        courseName=data['courseName'],
        credits=data.get('credits', 3)
    )
    db.session.add(syl)
    db.session.flush()

    ver = SyllabusVersion(
        syllabusID=syl.syllabusID,
        content=data.get('content', ''),
        createdBy=uid
    )
    db.session.add(ver)
    db.session.flush()

    for c in data.get('clos', []):
        db.session.add(CLO(
            versionID=ver.versionID,
            cloCode=c['code'],
            cloDescription=c['description']
        ))

    db.session.commit()
    return jsonify(syl.to_dict()), 201


@app.route('/api/syllabus/<int:id>/approve', methods=['POST'])
@jwt_required()
def approve(id):
    syl = Syllabus.query.get_or_404(id)
    latest = max(syl.versions, key=lambda v: v.versionNumber)
    latest.status = SyllabusStatus.APPROVED
    db.session.commit()
    return jsonify({"message": "Approved"})


@app.route('/api/syllabus/<int:id>', methods=['GET'])
def get_syllabus(id):
    return jsonify(Syllabus.query.get_or_404(id).to_dict())


@app.route('/api/syllabus/<int:id>/follow', methods=['POST'])
@jwt_required()
def follow(id):
    db.session.add(Follow(
        userID=get_jwt_identity(),
        syllabusID=id
    ))
    db.session.commit()
    return jsonify({"message": "Followed"})


@app.route('/api/syllabus/<int:id>/upload', methods=['POST'])
@jwt_required()
def upload(id):
    file = request.files['file']
    path = os.path.join(UPLOAD_FOLDER, file.filename)
    file.save(path)

    syl = Syllabus.query.get_or_404(id)
    latest = max(syl.versions, key=lambda v: v.versionNumber)

    db.session.add(Attachment(
        versionID=latest.versionID,
        filename=file.filename
    ))
    db.session.commit()
    return jsonify({"message": "Uploaded"})


# ==================================================
# 6. RUN
# ==================================================
if __name__ == "__main__":
    with app.app_context():
        db.create_all()
    app.run(debug=True)
