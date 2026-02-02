from api.controllers.auth_controller import get_current_user_id
from flask import Blueprint, request, jsonify
from sqlalchemy import or_
from datetime import datetime
from infrastructure.databases.mysql import SessionLocal
from infrastructure.models.syllabus import SyllabusModel
from infrastructure.models.subject import SubjectModel
from infrastructure.models.deparment import DepartmentModel
from infrastructure.models.user import UserModel

syllabus_bp = Blueprint("syllabus", __name__, url_prefix="/syllabus")


@syllabus_bp.route("/search", methods=["GET"])
def search_syllabus():
    session = SessionLocal()
    try:
        # ===== Query params =====
        keyword = request.args.get("keyword")
        department_id = request.args.get("departmentID", type=int)
        academic_year = request.args.get("academicYear")
        subject_code = request.args.get("subjectCode")
        page = request.args.get("page", 1, type=int)
        limit = request.args.get("limit", 8, type=int)

        # ===== Base query =====
        query = (
            session.query(
                SyllabusModel.syllabusID,
                SyllabusModel.academicYear,
                SubjectModel.subjectName,
                SubjectModel.subjectCode,
                DepartmentModel.departmentName,
                UserModel.fullName.label("author")
            )
            .join(SubjectModel, SyllabusModel.subjectID == SubjectModel.subjectID)
            .join(DepartmentModel, SubjectModel.departmentID == DepartmentModel.departmentID)
            .join(UserModel, SyllabusModel.createdBy == UserModel.userID)
            .filter(SyllabusModel.status == "APPROVED")
        )

        # ===== Filters =====
        if keyword:
            query = query.filter(
                or_(
                    SubjectModel.subjectName.ilike(f"%{keyword}%"),
                    SubjectModel.subjectCode.ilike(f"%{keyword}%")
                )
            )

        if department_id:
            query = query.filter(DepartmentModel.departmentID == department_id)

        if academic_year:
            query = query.filter(SyllabusModel.academicYear == academic_year)

        if subject_code:
            query = query.filter(SubjectModel.subjectCode.ilike(f"%{subject_code}%"))

        # ===== Pagination =====
        total = query.count()

        results = (
            query.order_by(SyllabusModel.createdAt.desc())
            .offset((page - 1) * limit)
            .limit(limit)
            .all()
        )

        # ===== Response =====
        return jsonify({
            "page": page,
            "limit": limit,
            "total": total,
            "items": [
                {
                    "id": r.syllabusID,
                    "title": r.subjectName,
                    "subjectCode": r.subjectCode,
                    "author": r.author,
                    "dept": r.departmentName,
                    "year": r.academicYear,
                    "views": "1.2k"
                }
                for r in results
            ]
        })

    except Exception as e:
        return jsonify({"error": str(e)}), 500

    finally:
        session.close()

@syllabus_bp.route("/create", methods=["POST"])
def create_syllabus():
    data = request.get_json(silent=True) or {}

    subject_id = data.get("subjectID")
    subject_name = data.get("subjectName")
    subject_code = data.get("subjectCode")
    credit = data.get("credit")
    academic_year = data.get("academicYear")

    department_id = data.get("departmentID")
    department_name = data.get("departmentName")

    # ===== USER ĐĂNG NHẬP =====
    created_by = get_current_user_id()
    if not created_by:
        return jsonify({"message": "Unauthorized"}), 401

    if not academic_year:
        return jsonify({"message": "academicYear là bắt buộc"}), 400

    session = SessionLocal()
    try:
        # ===== CHECK USER =====
        user = session.get(UserModel, created_by)
        if not user:
            return jsonify({"message": "User không tồn tại"}), 404

        # ===== XỬ LÝ DEPARTMENT =====
        department = None

        if department_id:
            department = session.get(DepartmentModel, department_id)
            if not department:
                return jsonify({"message": "Department không tồn tại"}), 404
        else:
            if not department_name:
                return jsonify({
                    "message": "departmentID hoặc departmentName là bắt buộc"
                }), 400

            department = (
                session.query(DepartmentModel)
                .filter(DepartmentModel.departmentName == department_name)
                .first()
            )

            if not department:
                department = DepartmentModel(
                    departmentName=department_name
                )
                session.add(department)
                session.flush()  # lấy departmentID

        # ===== XỬ LÝ SUBJECT =====
        subject = None

        if subject_id:
            subject = session.get(SubjectModel, subject_id)
            if not subject:
                return jsonify({"message": "Subject không tồn tại"}), 404
        else:
            if not subject_name or not subject_code or credit is None:
                return jsonify({
                    "message": "subjectName, subjectCode và credit là bắt buộc"
                }), 400

            if credit <= 0:
                return jsonify({"message": "credit phải > 0"}), 400

            subject = (
                session.query(SubjectModel)
                .filter(
                    (SubjectModel.subjectCode == subject_code) |
                    (SubjectModel.subjectName == subject_name)
                )
                .first()
            )

            if not subject:
                subject = SubjectModel(
                    subjectCode=subject_code,
                    subjectName=subject_name,
                    credit=credit,
                    departmentID=department.departmentID
                )
                session.add(subject)
                session.flush()

        # ===== CHECK SYLLABUS TRÙNG =====
        existed = (
            session.query(SyllabusModel)
            .filter(
                SyllabusModel.subjectID == subject.subjectID,
                SyllabusModel.academicYear == academic_year
            )
            .first()
        )

        if existed:
            return jsonify({
                "message": "Syllabus cho môn học và năm học này đã tồn tại"
            }), 409

        # ===== TẠO SYLLABUS =====
        syllabus = SyllabusModel(
            subjectID=subject.subjectID,
            academicYear=academic_year,
            createdBy=created_by,
            status="APPROVED",
            createdAt=datetime.utcnow(),
            currentVersionID=1
        )

        session.add(syllabus)
        session.commit()
        session.refresh(syllabus)

        return jsonify({
            "message": "Tạo syllabus thành công",
            "data": {
                "syllabusID": syllabus.syllabusID,
                "subjectID": subject.subjectID,
                "subjectName": subject.subjectName,
                "departmentID": department.departmentID,
                "departmentName": department.departmentName,
                "academicYear": syllabus.academicYear,
                "status": syllabus.status
            }
        }), 201

    except Exception as e:
        session.rollback()
        return jsonify({"error": str(e)}), 500

    finally:
        session.close()
