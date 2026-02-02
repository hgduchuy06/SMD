import React, { useState } from "react";

const TaoGiaoTrinhMoi: React.FC = () => {
  const [activeTab, setActiveTab] = useState("general");

  return (
    <div className="flex-1 h-full flex flex-col relative overflow-hidden bg-[#f6f6f8]">
      {/* Header Sticky */}
      <header className="bg-white border-b border-[#e5e7eb] px-8 py-4 flex flex-col gap-4 z-20 sticky top-0 shadow-sm">
        {/* Breadcrumbs */}
        <div className="flex items-center gap-2 text-sm text-[#4c669a]">
          <a className="hover:text-primary transition-colors" href="#">
            Trang chủ
          </a>
          <span>/</span>
          <a className="hover:text-primary transition-colors" href="#">
            Quản lý Giáo trình
          </a>
          <span>/</span>
          <span className="text-[#0d121b] font-medium">Tạo mới</span>
        </div>

        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-[#0d121b] tracking-tight">
              Tạo Giáo trình mới
            </h1>
            <p className="text-[#4c669a] text-sm mt-1">
              Nhập thông tin chi tiết, chuẩn đầu ra và nội dung học phần.
            </p>
          </div>
          <div className="flex gap-3">
            <button className="px-5 py-2.5 rounded-lg border border-[#e5e7eb] bg-white text-[#0d121b] font-medium text-sm hover:bg-gray-50 transition-colors flex items-center gap-2">
              <span className="material-symbols-outlined text-xl">save</span>{" "}
              Lưu nháp
            </button>
            <button className="px-5 py-2.5 rounded-lg bg-primary text-white font-medium text-sm hover:bg-blue-700 shadow-lg shadow-primary/20 transition-all flex items-center gap-2">
              <span className="material-symbols-outlined text-xl">send</span>{" "}
              Gửi duyệt
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-8 border-b border-[#e5e7eb] mt-2 overflow-x-auto no-scrollbar">
          <TabItem
            label="Thông tin chung"
            active={activeTab === "general"}
            onClick={() => setActiveTab("general")}
          />
          <TabItem
            label="Chuẩn đầu ra (CLO/PLO)"
            active={activeTab === "clo"}
            onClick={() => setActiveTab("clo")}
          />
          <TabItem
            label="Mối quan hệ học phần"
            active={activeTab === "relation"}
            onClick={() => setActiveTab("relation")}
          />
          <TabItem
            label="Nội dung chi tiết"
            active={activeTab === "content"}
            onClick={() => setActiveTab("content")}
          />
        </div>
      </header>

      {/* Scrollable Form Area */}
      <div className="flex-1 overflow-y-auto p-8">
        <div className="max-w-5xl mx-auto flex flex-col gap-6 pb-20">
          {/* Section 1: General Information */}
          <section className="bg-white rounded-xl shadow-sm border border-[#e5e7eb] p-6">
            <SectionHeader icon="info" title="Thông tin học phần" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <InputField
                label="Tên học phần"
                placeholder="Ví dụ: Lập trình Web"
                required
              />
              <div className="grid grid-cols-2 gap-4">
                <InputField
                  label="Mã học phần"
                  placeholder="INT3306"
                  required
                />
                <InputField
                  label="Số tín chỉ"
                  type="number"
                  defaultValue="3"
                  required
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <SelectField
                label="Loại học phần"
                options={["Bắt buộc", "Tự chọn"]}
              />
              <SelectField
                label="Ngôn ngữ giảng dạy"
                options={["Tiếng Việt", "Tiếng Anh"]}
              />
            </div>
            <div className="flex flex-col gap-2">
              <span className="text-sm font-medium text-[#0d121b]">
                Mô tả học phần
              </span>
              <RichTextEditorPlaceholder />
            </div>
          </section>

          {/* Section 2: CLO/PLO Mapping */}
          <section className="bg-white rounded-xl shadow-sm border border-[#e5e7eb] p-6">
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-[#e5e7eb]">
              <SectionHeader
                icon="target"
                title="Chuẩn đầu ra (CLO & PLO)"
                subTitle="Thiết lập CLO và ánh xạ tới PLO của chương trình"
                noBorder
              />
              <button className="text-primary hover:bg-primary/5 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors flex items-center gap-1">
                <span className="material-symbols-outlined text-lg">
                  add_circle
                </span>{" "}
                Thêm CLO
              </button>
            </div>
            <CLOMatrixTable />
          </section>

          {/* Section 3: Relations */}
          <section className="bg-white rounded-xl shadow-sm border border-[#e5e7eb] p-6">
            <SectionHeader icon="account_tree" title="Mối quan hệ học phần" />
            <div className="space-y-4">
              <RelationCard
                title="Học phần Tiên quyết"
                desc="Sinh viên bắt buộc phải đạt học phần này trước."
                selectedItems={["INT1004 - Tin học cơ sở"]}
              />
              <RelationCard
                title="Học phần Học trước"
                desc="Sinh viên cần học (không bắt buộc đạt) trước."
                disabled
              />
            </div>
          </section>

          <div className="flex justify-end pt-4">
            <button className="px-8 py-3 rounded-xl bg-primary text-white font-bold text-base hover:bg-blue-700 shadow-lg shadow-primary/20 transition-all flex items-center gap-2">
              Gửi duyệt cho Trưởng bộ môn{" "}
              <span className="material-symbols-outlined">arrow_forward</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- Sub-components ---

const TabItem = ({ label, active, onClick }: any) => (
  <button
    onClick={onClick}
    className={`pb-3 border-b-[3px] font-medium text-sm whitespace-nowrap px-1 transition-all ${
      active
        ? "border-primary text-primary font-semibold"
        : "border-transparent text-[#4c669a] hover:text-[#0d121b]"
    }`}
  >
    {label}
  </button>
);

const SectionHeader = ({ icon, title, subTitle, noBorder }: any) => (
  <div
    className={`flex items-center gap-3 mb-6 ${
      noBorder ? "" : "pb-4 border-b border-[#e5e7eb]"
    }`}
  >
    <div className="p-2 bg-primary/10 rounded-lg text-primary">
      <span className="material-symbols-outlined">{icon}</span>
    </div>
    <div>
      <h2 className="text-lg font-bold text-[#0d121b]">{title}</h2>
      {subTitle && <p className="text-xs text-[#4c669a]">{subTitle}</p>}
    </div>
  </div>
);

const InputField = ({ label, required, ...props }: any) => (
  <label className="flex flex-col gap-2">
    <span className="text-sm font-medium text-[#0d121b]">
      {label} {required && <span className="text-red-500">*</span>}
    </span>
    <input
      className="w-full rounded-lg border-[#e5e7eb] bg-[#f6f6f8] focus:border-primary focus:ring-primary/20 text-sm h-11 px-4 outline-none transition-all"
      {...props}
    />
  </label>
);

const SelectField = ({ label, options }: any) => (
  <label className="flex flex-col gap-2">
    <span className="text-sm font-medium text-[#0d121b]">{label}</span>
    <select className="w-full rounded-lg border-[#e5e7eb] bg-[#f6f6f8] focus:border-primary focus:ring-primary/20 text-sm h-11 px-4 outline-none">
      {options.map((opt: string) => (
        <option key={opt}>{opt}</option>
      ))}
    </select>
  </label>
);

const RichTextEditorPlaceholder = () => (
  <div className="w-full rounded-lg border border-[#e5e7eb] overflow-hidden bg-[#f6f6f8]">
    <div className="flex items-center gap-1 p-2 border-b border-[#e5e7eb] bg-gray-50">
      {[
        "format_bold",
        "format_italic",
        "format_underlined",
        "|",
        "format_list_bulleted",
        "format_list_numbered",
        "|",
        "link",
      ].map((icon, i) =>
        icon === "|" ? (
          <div key={i} className="w-px h-5 bg-[#e5e7eb] mx-1" />
        ) : (
          <button
            key={i}
            className="p-1.5 hover:bg-gray-200 rounded text-[#4c669a] transition-colors"
          >
            <span className="material-symbols-outlined text-[20px]">
              {icon}
            </span>
          </button>
        )
      )}
    </div>
    <textarea
      className="w-full p-4 bg-white focus:outline-none min-h-[120px] text-sm text-[#0d121b] resize-y border-0"
      placeholder="Nhập mô tả chi tiết học phần..."
    />
  </div>
);

const CLOMatrixTable = () => (
  <div className="overflow-x-auto rounded-lg border border-[#e5e7eb]">
    <table className="w-full text-sm text-left">
      <thead className="bg-gray-50 text-[#0d121b] font-semibold border-b border-[#e5e7eb]">
        <tr>
          <th className="px-4 py-3 w-1/3">Nội dung CLO</th>
          {["PLO 1", "PLO 2", "PLO 3", "PLO 4"].map((plo) => (
            <th
              key={plo}
              className="px-4 py-3 text-center border-l border-[#e5e7eb] w-24"
            >
              {plo}
            </th>
          ))}
          <th className="px-4 py-3 w-16 text-center border-l border-[#e5e7eb]">
            Xóa
          </th>
        </tr>
      </thead>
      <tbody className="divide-y divide-[#e5e7eb] bg-white">
        <CLORow
          id="CLO1"
          text="Hiểu và áp dụng các khái niệm cơ bản về lập trình hướng đối tượng."
          checkedIndices={[0]}
        />
        <CLORow
          id="CLO2"
          text="Phân tích yêu cầu và thiết kế hệ thống phần mềm đơn giản."
          checkedIndices={[1, 2]}
        />
      </tbody>
    </table>
    <div className="bg-gray-50 p-3 border-t border-[#e5e7eb] flex gap-3">
      <input
        className="flex-1 bg-white border border-[#e5e7eb] rounded px-3 py-2 text-sm outline-none focus:ring-1 focus:ring-primary/20"
        placeholder="Nhập CLO mới..."
      />
      <button className="bg-white border border-[#e5e7eb] px-4 py-2 rounded text-sm font-medium hover:bg-gray-100 transition-colors">
        Thêm
      </button>
    </div>
  </div>
);

const CLORow = ({ id, text, checkedIndices }: any) => (
  <tr className="group hover:bg-gray-50 transition-colors">
    <td className="px-4 py-3">
      <div className="flex gap-2 items-start">
        <span className="font-bold text-primary bg-primary/5 px-1.5 rounded text-xs mt-0.5">
          {id}
        </span>
        <p className="text-[#0d121b] line-clamp-2">{text}</p>
      </div>
    </td>
    {[0, 1, 2, 3].map((i) => (
      <td key={i} className="px-4 py-3 text-center border-l border-[#e5e7eb]">
        <input
          type="checkbox"
          defaultChecked={checkedIndices.includes(i)}
          className="rounded border-gray-300 text-primary focus:ring-primary/20 size-5 cursor-pointer"
        />
      </td>
    ))}
    <td className="px-4 py-3 text-center border-l border-[#e5e7eb]">
      <button className="text-[#4c669a] hover:text-red-500 transition-colors">
        <span className="material-symbols-outlined">delete</span>
      </button>
    </td>
  </tr>
);

const RelationCard = ({ title, desc, selectedItems = [], disabled }: any) => (
  <div
    className={`flex flex-col md:flex-row items-start gap-4 p-4 border border-[#e5e7eb] rounded-lg bg-gray-50/50 ${
      disabled ? "opacity-60 grayscale" : ""
    }`}
  >
    <div className="mt-1 min-w-[200px]">
      <label className="inline-flex items-center">
        <input
          type="checkbox"
          defaultChecked={!disabled}
          disabled={disabled}
          className="rounded border-gray-300 text-primary size-5"
        />
        <span className="ml-2 text-sm font-bold text-[#0d121b]">{title}</span>
      </label>
      <p className="text-xs text-[#4c669a] mt-1 pl-7">{desc}</p>
    </div>
    <div className="flex-1 w-full">
      <div className="relative">
        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-[#4c669a]">
          <span className="material-symbols-outlined text-lg">search</span>
        </span>
        <input
          disabled={disabled}
          className="w-full pl-10 pr-4 py-2 rounded-lg border border-[#e5e7eb] text-sm focus:border-primary outline-none"
          placeholder="Tìm học phần..."
        />
      </div>
      <div className="flex gap-2 mt-3 flex-wrap">
        {selectedItems.map((item: string) => (
          <div
            key={item}
            className="bg-white border border-[#e5e7eb] rounded-full px-3 py-1 text-sm flex items-center gap-2 shadow-sm"
          >
            <span className="font-medium text-[#0d121b]">{item}</span>
            {!disabled && (
              <button className="text-[#4c669a] hover:text-red-500">
                <span className="material-symbols-outlined text-base">
                  close
                </span>
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  </div>
);

export default TaoGiaoTrinhMoi;
