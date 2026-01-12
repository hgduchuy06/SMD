import React from "react";

const CapNhatGiaoTrinh: React.FC = () => {
  return (
    <div className="flex-1 w-full max-w-[1440px] mx-auto flex flex-col bg-[#f8f9fc] dark:bg-[#101622] min-h-screen">
      {/* 2. PAGE CONTENT */}
      <div className="p-4 md:p-8 flex flex-col gap-6">
        {/* Breadcrumbs & Title */}
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-2 text-xs text-slate-400"></div>
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-3">
                <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
                  Cập nhật Giáo trình
                </h1>
                <span className="px-2 py-0.5 bg-yellow-100 text-yellow-700 text-[10px] font-bold rounded-full uppercase border border-yellow-200">
                  Bản nháp
                </span>
              </div>
              <p className="text-slate-400 text-sm">
                Học kỳ 1, Năm học 2024-2025 • Cập nhật lần cuối: 2 phút trước
              </p>
            </div>
            <div className="flex items-center gap-3">
              <button className="flex items-center gap-2 h-10 px-4 rounded-lg border border-slate-200 bg-white text-sm font-semibold hover:bg-slate-50 transition-all">
                <span className="material-symbols-outlined text-xl">save</span>{" "}
                Lưu nháp
              </button>
              <button className="flex items-center gap-2 h-10 px-4 rounded-lg bg-primary hover:bg-blue-700 text-white text-sm font-semibold shadow-md shadow-blue-500/20">
                <span className="material-symbols-outlined text-xl">send</span>{" "}
                Gửi Trưởng bộ môn
              </button>
            </div>
          </div>
        </div>

        {/* Feedback Alert */}
        <div className="bg-orange-50 border border-orange-200 rounded-xl p-4 flex items-start gap-4 shadow-sm relative">
          <div className="bg-orange-100 text-orange-600 rounded-full p-1.5 mt-0.5">
            <span className="material-symbols-outlined text-xl">warning</span>
          </div>
          <div className="flex-1">
            <h3 className="text-orange-900 font-bold text-sm mb-1">
              Yêu cầu chỉnh sửa từ Trưởng bộ môn (TS. Nguyễn Văn A)
            </h3>
            <p className="text-orange-800 text-sm leading-relaxed">
              "Nội dung chương 3 cần cập nhật thêm các tài liệu tham khảo mới
              nhất năm 2023-2024 về Trí tuệ nhân tạo. Phần đánh giá giữa kỳ nên
              làm rõ tỷ trọng điểm số."
            </p>
          </div>
          <button className="text-orange-400 hover:text-orange-600">
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Main Editor Section */}
          <div className="lg:col-span-9 flex flex-col gap-6">
            {/* Metadata inputs */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
              <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4">
                Thông tin chung
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div>
                  <label className="block text-[11px] font-bold text-slate-500 mb-1">
                    Mã học phần
                  </label>
                  <input
                    className="w-full h-10 px-3 bg-slate-50 border border-slate-200 rounded-lg text-sm"
                    value="CS101"
                    readOnly
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-[11px] font-bold text-slate-500 mb-1">
                    Tên học phần
                  </label>
                  <input
                    className="w-full h-10 px-3 border border-slate-200 rounded-lg text-sm focus:border-primary focus:ring-1 focus:ring-primary outline-none"
                    defaultValue="Nhập môn Khoa học máy tính"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-slate-500 mb-1">
                    Số tín chỉ
                  </label>
                  <input
                    className="w-full h-10 px-3 border border-slate-200 rounded-lg text-sm focus:border-primary outline-none"
                    type="number"
                    defaultValue="3"
                  />
                </div>
              </div>
            </div>

            {/* Simulated Editor (Giống ảnh 2 nhất) */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden flex flex-col min-h-[800px]">
              {/* Editor Toolbar */}
              <div className="flex flex-wrap items-center gap-1 p-2 bg-slate-50 border-b border-slate-100">
                <ToolbarButton icon="undo" />
                <ToolbarButton icon="redo" />
                <div className="w-px h-5 bg-slate-300 mx-2"></div>
                <div className="flex items-center bg-white border border-slate-200 rounded px-2 h-8 text-xs font-medium cursor-pointer">
                  Normal Text{" "}
                  <span className="material-symbols-outlined text-sm ml-1">
                    expand_more
                  </span>
                </div>
                <div className="w-px h-5 bg-slate-300 mx-2"></div>
                <ToolbarButton icon="format_bold" active />
                <ToolbarButton icon="format_italic" />
                <ToolbarButton icon="format_underlined" />
                <div className="w-px h-5 bg-slate-300 mx-2"></div>
                <ToolbarButton icon="format_list_bulleted" />
                <ToolbarButton icon="format_list_numbered" />
                <div className="w-px h-5 bg-slate-300 mx-2"></div>
                <ToolbarButton icon="image" />
                <ToolbarButton icon="table" />
                <ToolbarButton icon="link" />
              </div>

              {/* Editor Canvas (Nơi nội dung hiển thị) */}
              <div className="p-12 md:p-16 max-w-4xl mx-auto w-full text-slate-800 leading-relaxed">
                <h2 className="text-3xl font-black text-slate-900 mb-8">
                  Đề cương chi tiết học phần
                </h2>

                {/* Section 1 */}
                <h3 className="text-lg font-bold text-primary mb-4">
                  1. Mục tiêu môn học (Course Objectives)
                </h3>
                <p className="mb-4">
                  Môn học này cung cấp cho sinh viên những kiến thức nền tảng về
                  khoa học máy tính, bao gồm lịch sử phát triển, các khái niệm
                  cơ bản về phần cứng, phần mềm, mạng máy tính và tư duy lập
                  trình. Sau khi hoàn thành môn học, sinh viên sẽ có khả năng:
                </p>
                <ul className="list-disc pl-6 space-y-2 mb-8">
                  <li>
                    Hiểu rõ cấu trúc và nguyên lý hoạt động của máy tính điện
                    tử.
                  </li>
                  <li>
                    Vận dụng tư duy thuật toán để giải quyết các bài toán đơn
                    giản.
                  </li>
                  <li>
                    Sử dụng thành thạo các công cụ văn phòng và công cụ hỗ trợ
                    lập trình cơ bản.
                  </li>
                  <li className="bg-yellow-100 p-1 rounded font-medium">
                    Có khả năng làm việc nhóm và trình bày ý tưởng kỹ thuật.
                    (Nội dung mới cập nhật)
                  </li>
                </ul>

                {/* Section 2 */}
                <h3 className="text-lg font-bold text-primary mb-4">
                  2. Tài liệu tham khảo (References)
                </h3>
                <div className="bg-slate-50 p-5 rounded-xl border border-slate-100 mb-8">
                  <p className="font-bold italic text-slate-700 mb-2">
                    Giáo trình chính:
                  </p>
                  <p className="mb-4">
                    [1] Brookshear, J. G., & Brylow, D. (2019). Computer
                    Science: An Overview (13th ed.). Pearson.
                  </p>
                  <p className="font-bold italic text-slate-700 mb-2">
                    Tài liệu bổ sung:
                  </p>
                  <p>
                    [2] Các bài giảng điện tử trên hệ thống E-learning của
                    trường.
                  </p>
                </div>

                {/* Section 3 */}
                <h3 className="text-lg font-bold text-primary mb-4">
                  3. Kế hoạch giảng dạy (Weekly Schedule)
                </h3>
                <div className="overflow-hidden border border-slate-200 rounded-lg">
                  <table className="w-full text-sm text-left border-collapse">
                    <thead className="bg-slate-50 text-slate-600 font-bold uppercase text-[10px]">
                      <tr className="border-b border-slate-200">
                        <th className="px-4 py-3 w-16">Tuần</th>
                        <th className="px-4 py-3">Nội dung</th>
                        <th className="px-4 py-3 w-32">Hoạt động</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      <ScheduleRow
                        week="1"
                        content="Giới thiệu môn học & Lịch sử máy tính"
                        action="Giảng lý thuyết"
                      />
                      <ScheduleRow
                        week="2"
                        content="Biểu diễn thông tin trong máy tính (Hệ nhị phân, Hex)"
                        action="Bài tập nhóm"
                      />
                      <ScheduleRow
                        week="3"
                        content="Cấu trúc máy tính & Phần cứng"
                        action="Thực hành Lab"
                      />
                    </tbody>
                  </table>
                </div>
                {/* Cursor indicator */}
                <div className="w-0.5 h-6 bg-primary animate-pulse mt-10"></div>
              </div>
            </div>

            {/* Change Log Textarea */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-5">
              <h3 className="flex items-center gap-2 text-sm font-bold text-slate-700 mb-3 uppercase tracking-wider text-[11px]">
                <span className="material-symbols-outlined text-lg">
                  edit_note
                </span>{" "}
                Ghi chú thay đổi (Change Log)
              </h3>
              <textarea
                className="w-full h-24 p-3 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:ring-1 focus:ring-primary outline-none"
                placeholder="Mô tả ngắn gọn các thay đổi bạn đã thực hiện trong phiên bản này để Trưởng bộ môn dễ theo dõi..."
              />
            </div>
          </div>

          {/* Right Column: Sidebar */}
          <div className="lg:col-span-3 flex flex-col gap-6">
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden sticky top-20">
              <div className="p-4 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
                <h3 className="font-bold text-slate-800 text-[11px] uppercase">
                  Lịch sử phiên bản
                </h3>
                <button className="text-primary text-[11px] font-bold hover:underline">
                  So sánh
                </button>
              </div>
              <div className="flex flex-col">
                <VersionItem
                  version="v2.1"
                  status="Đang soạn"
                  time="Hôm nay, 10:30 AM"
                  active
                />
                <VersionItem
                  version="v2.0"
                  status="Từ chối"
                  time="20 Th8, 2024"
                  comment="Cần bổ sung tài liệu tham khảo..."
                />
                <VersionItem
                  version="v1.0"
                  status="Đã duyệt"
                  time="15 Th1, 2024"
                />
              </div>
              <div className="p-4 border-t border-slate-100 text-center">
                <button className="text-[11px] font-bold text-slate-400 hover:text-primary uppercase flex items-center justify-center gap-1 w-full">
                  Xem tất cả phiên bản{" "}
                  <span className="material-symbols-outlined text-sm">
                    arrow_forward
                  </span>
                </button>
              </div>
            </div>

            <div className="bg-gradient-to-br from-primary to-blue-700 rounded-xl shadow-lg p-5 text-white">
              <h3 className="font-bold text-sm mb-2 flex items-center gap-2">
                <span className="material-symbols-outlined">help_center</span>{" "}
                Cần trợ giúp?
              </h3>
              <p className="text-[11px] text-blue-100 mb-4 leading-relaxed">
                Xem hướng dẫn quy chuẩn soạn thảo giáo trình mới nhất năm 2024
                hoặc liên hệ bộ phận đào tạo.
              </p>
              <button className="w-full py-2 bg-white text-primary text-[11px] font-bold rounded-lg hover:bg-blue-50 transition-colors">
                Xem hướng dẫn
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- Sub-components (Dùng cho giao diện ảnh 2) ---

const ToolbarButton = ({ icon, active = false }: any) => (
  <button
    className={`p-1.5 rounded transition-colors ${
      active ? "bg-blue-100 text-primary" : "hover:bg-slate-200 text-slate-600"
    }`}
  >
    <span className="material-symbols-outlined text-[20px]">{icon}</span>
  </button>
);

const ScheduleRow = ({ week, content, action }: any) => (
  <tr className="hover:bg-slate-50 transition-colors">
    <td className="px-4 py-4 font-bold text-slate-800">{week}</td>
    <td className="px-4 py-4 text-slate-700">{content}</td>
    <td className="px-4 py-4 text-slate-500 font-medium">{action}</td>
  </tr>
);

const VersionItem = ({
  version,
  status,
  time,
  active = false,
  comment,
}: any) => {
  const statusColors: any = {
    "Đang soạn": "bg-blue-100 text-blue-700",
    "Từ chối": "bg-red-50 text-red-600",
    "Đã duyệt": "bg-green-100 text-green-700",
  };
  return (
    <div
      className={`p-4 border-l-4 transition-colors cursor-pointer ${
        active
          ? "border-primary bg-blue-50/40"
          : "border-transparent hover:bg-slate-50"
      }`}
    >
      <div className="flex justify-between items-start mb-1">
        <span
          className={`text-sm font-bold ${
            active ? "text-primary" : "text-slate-700"
          }`}
        >
          {version}
        </span>
        <span
          className={`px-2 py-0.5 text-[9px] font-bold rounded uppercase ${statusColors[status]}`}
        >
          {status}
        </span>
      </div>
      <p className="text-[10px] text-slate-400 mb-2">{time}</p>
      {active && (
        <div className="flex items-center gap-1.5 text-[10px] text-slate-600 font-medium">
          <div className="size-4 rounded-full bg-slate-200"></div> Bạn (Giảng
          viên)
        </div>
      )}
      {comment && (
        <p className="text-[10px] text-slate-500 italic bg-slate-100 p-2 rounded mt-1">
          "{comment}"
        </p>
      )}
    </div>
  );
};

export default CapNhatGiaoTrinh;
