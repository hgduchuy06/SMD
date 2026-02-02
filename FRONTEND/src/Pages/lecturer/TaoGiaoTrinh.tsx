import React, { useState } from "react";
import axios from "axios";

/* ================== CONFIG API ================== */
const API_BASE_URL = "http://localhost:9999/syllabus/create";

const TaoGiaoTrinhMoi: React.FC = () => {
  const [activeTab, setActiveTab] = useState("general");

  /* ===== FORM STATE ===== */
  const [departmentID, setDepartmentID] = useState<number | null>(null);
  const [departmentName, setDepartmentName] = useState("");

  const [subjectID, setSubjectID] = useState<number | null>(null);
  const [subjectName, setSubjectName] = useState("");
  const [subjectCode, setSubjectCode] = useState("");
  const [credit, setCredit] = useState<number | null>(null);
  const [academicYear, setAcademicYear] = useState("");

  /* ===== SUBMIT ===== */
  const handleSubmit = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      alert("❌ Bạn chưa đăng nhập");
      return;
    }

    if (!academicYear) {
      alert("❌ Vui lòng nhập năm học");
      return;
    }

    if (!departmentID && !departmentName) {
      alert("❌ Vui lòng chọn hoặc nhập khoa (department)");
      return;
    }

    if (!subjectID) {
      if (!subjectName || !subjectCode || !credit) {
        alert("❌ Vui lòng nhập đầy đủ thông tin học phần");
        return;
      }
    }

    try {
      const payload = {
        departmentID,
        departmentName,
        subjectID,
        subjectName,
        subjectCode,
        credit,
        academicYear,
      };

      console.log("SEND:", payload);

      await axios.post(API_BASE_URL, payload, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      alert("✅ Tạo giáo trình thành công");

      // Reset
      setDepartmentID(null);
      setDepartmentName("");
      setSubjectID(null);
      setSubjectName("");
      setSubjectCode("");
      setCredit(null);
      setAcademicYear("");
    } catch (err: any) {
      console.error(err);
      alert(err.response?.data?.message || "❌ Lỗi tạo giáo trình");
    }
  };

  const isUsingOldSubject = !!subjectID;
  const isUsingOldDepartment = !!departmentID;

  return (
    <div className="flex-1 h-full flex flex-col bg-[#f6f6f8]">
      {/* HEADER */}
      <header className="bg-white border-b px-8 py-4">
        <h1 className="text-2xl font-bold">Tạo Giáo trình mới</h1>
      </header>

      {/* CONTENT */}
      <div className="flex-1 overflow-y-auto p-8">
        <div className="max-w-4xl mx-auto space-y-6">
          <section className="bg-white p-6 rounded-xl border">
            <SectionHeader icon="info" title="Thông tin khoa & học phần" />

            <div className="grid grid-cols-2 gap-4">
              {/* ===== DEPARTMENT ===== */}
              <InputField
                label="Department ID (nếu dùng khoa có sẵn)"
                type="number"
                placeholder="VD: 2"
                value={departmentID ?? ""}
                onChange={(e: any) =>
                  setDepartmentID(
                    e.target.value ? Number(e.target.value) : null,
                  )
                }
              />

              <InputField
                label="Tên khoa"
                required
                disabled={isUsingOldDepartment}
                placeholder="Công nghệ thông tin"
                value={departmentName}
                onChange={(e: any) => setDepartmentName(e.target.value)}
              />

              {/* ===== SUBJECT ===== */}
              <InputField
                label="Subject ID (nếu dùng môn có sẵn)"
                type="number"
                placeholder="VD: 5"
                value={subjectID ?? ""}
                onChange={(e: any) =>
                  setSubjectID(e.target.value ? Number(e.target.value) : null)
                }
              />

              <InputField
                label="Tên học phần"
                required
                disabled={isUsingOldSubject}
                placeholder="Mạng máy tính"
                value={subjectName}
                onChange={(e: any) => setSubjectName(e.target.value)}
              />

              <InputField
                label="Mã học phần"
                required
                disabled={isUsingOldSubject}
                placeholder="NET101"
                value={subjectCode}
                onChange={(e: any) => setSubjectCode(e.target.value)}
              />

              <InputField
                label="Số tín chỉ"
                type="number"
                required
                disabled={isUsingOldSubject}
                placeholder="3"
                value={credit ?? ""}
                onChange={(e: any) =>
                  setCredit(e.target.value ? Number(e.target.value) : null)
                }
              />

              <InputField
                label="Năm học"
                required
                placeholder="2026-2027"
                value={academicYear}
                onChange={(e: any) => setAcademicYear(e.target.value)}
              />
            </div>
          </section>

          <div className="flex justify-end">
            <button
              onClick={handleSubmit}
              className="px-8 py-3 bg-primary text-white rounded-xl font-bold hover:bg-blue-700"
            >
              Gửi duyệt giáo trình
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

/* ===== SUB COMPONENTS ===== */

const SectionHeader = ({ icon, title }: any) => (
  <div className="flex items-center gap-3 mb-6 pb-4 border-b">
    <span className="material-symbols-outlined text-primary">{icon}</span>
    <h2 className="text-lg font-bold">{title}</h2>
  </div>
);

const InputField = ({ label, required, ...props }: any) => (
  <label className="flex flex-col gap-1">
    <span className="text-sm font-medium">
      {label} {required && <span className="text-red-500">*</span>}
    </span>
    <input
      {...props}
      className="h-11 px-4 rounded-lg border bg-gray-50 outline-none focus:border-primary disabled:bg-gray-200"
    />
  </label>
);

export default TaoGiaoTrinhMoi;
