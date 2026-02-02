import React from "react";

const TraCuuPhanTichHod: React.FC = () => {
  // Dữ liệu mẫu cho bảng so sánh nội dung (Diff)
  const diffData = [
    {
      stt: "01",
      chapter: "Chương 1: Giới thiệu",
      oldContent: "Tổng quan về máy tính",
      newContent: "Tổng quan về máy tính",
      status: "Giữ nguyên",
      type: "normal",
    },
    {
      stt: "02",
      chapter: "Chương 2: Biến số",
      oldContent: "Khai báo biến cơ bản",
      newContent: "Khai báo biến & Kiểu dữ liệu nâng cao",
      status: "Chỉnh sửa",
      type: "modified",
    },
    {
      stt: "03",
      chapter: "Chương 3: Con trỏ (Pointers)",
      oldContent: "Quản lý bộ nhớ thủ công",
      newContent: "-- Không có --",
      status: "Đã xóa",
      type: "deleted",
    },
    {
      stt: "04",
      chapter: "Chương 3: Quản lý bộ nhớ hiện đại",
      oldContent: "-- Không có --",
      newContent: "Smart Pointers (std::unique_ptr)",
      status: "Mới thêm",
      type: "added",
    },
    {
      stt: "05",
      chapter: "Chương 4: Cấu trúc điều khiển",
      oldContent: "If/Else, Loops",
      newContent: "If/Else, Loops, Switch/Case",
      status: "Giữ nguyên",
      type: "normal",
    },
  ];

  return (
    <div className="flex-1 min-w-0 bg-[#f8f9fc] dark:bg-background-dark min-h-screen">
      <div className="p-6 md:p-10 max-w-[1200px] mx-auto flex flex-col gap-8">
        {/* Page Header */}
        <div className="flex flex-wrap justify-between items-end gap-4">
          <div className="flex flex-col gap-1">
            <h1 className="text-[#0d121b] dark:text-white text-3xl md:text-4xl font-black leading-tight tracking-tight">
              So sánh Giáo trình
            </h1>
            <p className="text-[#4c669a] text-base font-normal">
              Phân tích sự thay đổi giữa phiên bản{" "}
              <span className="font-bold text-primary">2022-2023</span> và{" "}
              <span className="font-bold text-primary">2023-2024</span>
            </p>
          </div>
          <div className="flex gap-3">
            <button className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-slate-800 border border-[#cfd7e7] dark:border-slate-700 rounded-lg text-sm font-medium text-[#0d121b] dark:text-white hover:bg-gray-50 transition-colors shadow-sm">
              <span className="material-symbols-outlined text-[20px]">
                print
              </span>{" "}
              In báo cáo
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors shadow-sm">
              <span className="material-symbols-outlined text-[20px]">
                download
              </span>{" "}
              Xuất PDF
            </button>
          </div>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <KPICard
            title="Tổng số tín chỉ"
            value="4"
            change="+1"
            trend="up"
            subText="Tăng từ 3 tín chỉ (2022)"
            icon="timer"
          />
          <KPICard
            title="Số chương mục"
            value="12"
            change="-2"
            trend="down"
            subText="Giảm từ 14 chương (2022)"
            icon="book_2"
          />
          <KPICard
            title="Trạng thái cập nhật"
            value="Mới"
            subText="Cập nhật lần cuối: 15/08/2023"
            icon="update"
            color="text-orange-500"
          />
        </div>

        {/* Analysis Charts Area */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          {/* Credit Distribution */}
          <div className="bg-white dark:bg-slate-900 rounded-xl border border-[#e7ebf3] dark:border-slate-800 shadow-sm p-6">
            <div className="flex justify-between items-center mb-6">
              <h4 className="text-[#0d121b] dark:text-white text-lg font-bold">
                Phân bổ thời lượng
              </h4>
              <div className="flex gap-4 text-xs font-medium dark:text-slate-300">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-primary rounded-sm"></div> Lý
                  thuyết
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-blue-300 rounded-sm"></div> Thực
                  hành
                </div>
              </div>
            </div>
            <div className="space-y-6">
              <DurationBar
                label="2022-2023"
                total="45 Tiết"
                lt={66}
                th={34}
                ltLabel="30LT"
                thLabel="15TH"
              />
              <DurationBar
                label="2023-2024"
                total="60 Tiết"
                lt={50}
                th={50}
                ltLabel="30LT"
                thLabel="30TH"
                active
              />
            </div>
          </div>

          {/* Skill Outcomes */}
          <div className="bg-white dark:bg-slate-900 rounded-xl border border-[#e7ebf3] dark:border-slate-800 shadow-sm p-6">
            <h4 className="text-[#0d121b] dark:text-white text-lg font-bold mb-6">
              Độ phủ chuẩn đầu ra (Skill Coverage)
            </h4>
            <div className="flex flex-col gap-5">
              <SkillProgress
                label="Tư duy thuật toán"
                oldVal={60}
                newVal={75}
                change="+15%"
              />
              <SkillProgress
                label="Lập trình Hướng đối tượng"
                oldVal={40}
                newVal={40}
                change="0%"
              />
              <SkillProgress
                label="Kỹ năng làm việc nhóm"
                oldVal={30}
                newVal={50}
                change="+20%"
              />
              <SkillProgress
                label="Kiến trúc máy tính"
                oldVal={40}
                newVal={30}
                change="-10%"
                isDown
              />
            </div>
          </div>
        </div>

        {/* Detailed Diff Table */}
        <div className="bg-white dark:bg-slate-900 rounded-xl border border-[#e7ebf3] dark:border-slate-800 shadow-sm overflow-hidden flex flex-col">
          <div className="p-6 border-b border-[#e7ebf3] dark:border-slate-800 flex flex-wrap justify-between items-center gap-4 bg-gray-50 dark:bg-slate-800/50">
            <h4 className="text-[#0d121b] dark:text-white text-lg font-bold">
              Chi tiết thay đổi nội dung (Content Diff)
            </h4>
            <div className="flex gap-2">
              <LegendBadge
                label="Mới thêm"
                color="bg-green-100 text-green-800"
              />
              <LegendBadge label="Đã xóa" color="bg-red-100 text-red-800" />
              <LegendBadge
                label="Chỉnh sửa"
                color="bg-yellow-100 text-yellow-800"
              />
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm whitespace-nowrap">
              <thead>
                <tr className="bg-white dark:bg-slate-900 text-[#4c669a] border-b border-[#e7ebf3] dark:border-slate-800">
                  <th className="px-6 py-4 font-semibold w-16">STT</th>
                  <th className="px-6 py-4 font-semibold w-1/4">Chương mục</th>
                  <th className="px-6 py-4 font-semibold w-1/4">
                    Nội dung 2022-2023
                  </th>
                  <th className="px-6 py-4 font-semibold w-1/4">
                    Nội dung 2023-2024
                  </th>
                  <th className="px-6 py-4 font-semibold text-right">
                    Trạng thái
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#e7ebf3] dark:divide-slate-800">
                {diffData.map((row, idx) => (
                  <tr
                    key={idx}
                    className={`${getRowBg(
                      row.type
                    )} transition-colors hover:bg-opacity-80`}
                  >
                    <td className="px-6 py-4 text-[#4c669a]">{row.stt}</td>
                    <td className="px-6 py-4 font-medium text-[#0d121b] dark:text-white">
                      {row.chapter}
                    </td>
                    <td
                      className={`px-6 py-4 ${
                        row.type === "deleted"
                          ? "text-red-700"
                          : "text-gray-600 dark:text-slate-400"
                      } ${
                        row.type === "modified"
                          ? "line-through decoration-red-400"
                          : ""
                      }`}
                    >
                      {row.oldContent}
                    </td>
                    <td
                      className={`px-6 py-4 ${
                        row.type === "added"
                          ? "text-green-700 font-medium"
                          : "text-[#0d121b] dark:text-slate-300"
                      } ${
                        row.type === "deleted" ? "italic text-gray-400" : ""
                      }`}
                    >
                      {row.newContent}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusBadgeClass(
                          row.type
                        )}`}
                      >
                        {row.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="px-6 py-4 border-t border-[#e7ebf3] dark:border-slate-800 flex justify-center bg-gray-50 dark:bg-slate-800/30">
            <button className="text-primary text-sm font-bold hover:underline flex items-center gap-1">
              Xem toàn bộ 12 chương{" "}
              <span className="material-symbols-outlined text-[16px]">
                expand_more
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- Sub-components ---

const KPICard = ({
  title,
  value,
  change,
  trend,
  subText,
  icon,
  color = "text-primary",
}: any) => (
  <div className="bg-white dark:bg-slate-900 rounded-xl p-6 border border-[#e7ebf3] dark:border-slate-800 shadow-sm flex flex-col gap-2 relative overflow-hidden group">
    <div className="absolute right-0 top-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
      <span className={`material-symbols-outlined text-8xl ${color}`}>
        {icon}
      </span>
    </div>
    <p className="text-[#4c669a] text-sm font-medium uppercase tracking-wider">
      {title}
    </p>
    <div className="flex items-baseline gap-2">
      <h3 className="text-[#0d121b] dark:text-white text-4xl font-bold">
        {value}
      </h3>
      {change && (
        <span
          className={`text-xs font-bold px-2 py-1 rounded-full flex items-center ${
            trend === "up"
              ? "text-green-600 bg-green-50"
              : "text-red-600 bg-red-50"
          }`}
        >
          <span className="material-symbols-outlined text-[14px]">
            {trend === "up" ? "arrow_upward" : "arrow_downward"}
          </span>{" "}
          {change}
        </span>
      )}
    </div>
    <p className="text-sm text-[#4c669a] mt-1">{subText}</p>
  </div>
);

const DurationBar = ({
  label,
  total,
  lt,
  th,
  ltLabel,
  thLabel,
  active = false,
}: any) => (
  <div className="flex flex-col gap-1">
    <div className="flex justify-between text-sm text-[#4c669a] mb-1">
      <span className={active ? "font-bold text-primary" : ""}>{label}</span>
      <span className="font-bold dark:text-white">{total}</span>
    </div>
    <div
      className={`flex w-full h-8 rounded-full overflow-hidden bg-gray-100 dark:bg-slate-800 ${
        active
          ? "ring-2 ring-primary ring-offset-2 dark:ring-offset-slate-900"
          : ""
      }`}
    >
      <div
        className="bg-primary/80 h-full flex items-center justify-center text-[10px] text-white font-bold"
        style={{ width: `${lt}%` }}
      >
        {ltLabel}
      </div>
      <div
        className="bg-blue-300/80 h-full flex items-center justify-center text-[10px] text-blue-900 font-bold"
        style={{ width: `${th}%` }}
      >
        {thLabel}
      </div>
    </div>
  </div>
);

const SkillProgress = ({
  label,
  oldVal,
  newVal,
  change,
  isDown = false,
}: any) => (
  <div>
    <div className="flex justify-between text-sm mb-1">
      <span className="font-medium text-[#0d121b] dark:text-slate-200">
        {label}
      </span>
      <span
        className={`text-xs font-bold ${
          isDown ? "text-red-500" : "text-green-600"
        }`}
      >
        {change}
      </span>
    </div>
    <div className="relative h-2.5 w-full bg-gray-100 dark:bg-slate-800 rounded-full overflow-hidden">
      <div
        className="absolute top-0 left-0 h-full bg-gray-300 dark:bg-slate-700 rounded-full"
        style={{ width: `${oldVal}%`, zIndex: 0 }}
      ></div>
      <div
        className="absolute top-0 left-0 h-full bg-primary/80 rounded-full mix-blend-multiply"
        style={{ width: `${newVal}%`, zIndex: 10 }}
      ></div>
    </div>
  </div>
);

const LegendBadge = ({ label, color }: any) => (
  <span
    className={`px-3 py-1 rounded text-xs font-medium border ${color} border-current border-opacity-20`}
  >
    {label}
  </span>
);

const getRowBg = (type: string) => {
  switch (type) {
    case "modified":
      return "bg-yellow-50/50 dark:bg-yellow-900/10";
    case "deleted":
      return "bg-red-50/50 dark:bg-red-900/10";
    case "added":
      return "bg-green-50/50 dark:bg-green-900/10";
    default:
      return "hover:bg-gray-50 dark:hover:bg-slate-800/50";
  }
};

const getStatusBadgeClass = (type: string) => {
  switch (type) {
    case "modified":
      return "bg-yellow-100 text-yellow-800";
    case "deleted":
      return "bg-red-100 text-red-800";
    case "added":
      return "bg-green-100 text-green-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

export default TraCuuPhanTichHod;
