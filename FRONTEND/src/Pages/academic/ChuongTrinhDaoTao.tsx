import React from "react";

const ChuongTrinhDaoTao: React.FC = () => {
  // Dữ liệu mẫu cho các học kỳ
  const semesterData = [
    {
      id: 1,
      name: "Học kỳ 1",
      credits: 14,
      subjectsCount: 5,
      subjects: [
        {
          code: "IT001",
          name: "Nhập môn Lập trình",
          credits: 4,
          type: "Bắt buộc",
          prerequisite: "-",
          mapping: ["PLO1", "PLO2"],
        },
        {
          code: "MA003",
          name: "Đại số tuyến tính",
          credits: 3,
          type: "Bắt buộc",
          prerequisite: "-",
          mapping: ["PLO3"],
        },
        {
          code: "EN001",
          name: "Anh văn sơ cấp 1",
          credits: 3,
          type: "Đại cương",
          prerequisite: "-",
          mapping: ["PLO9"],
        },
      ],
    },
    {
      id: 2,
      name: "Học kỳ 2",
      credits: 18,
      subjectsCount: 6,
      subjects: [
        {
          code: "IT002",
          name: "Kỹ thuật Lập trình",
          credits: 4,
          type: "Bắt buộc",
          prerequisite: "IT001",
          mapping: ["PLO2", "PLO4"],
        },
        {
          code: "IT003",
          name: "Cấu trúc dữ liệu và Giải thuật",
          credits: 4,
          type: "Bắt buộc",
          prerequisite: "IT001",
          mapping: ["PLO4", "PLO5"],
        },
      ],
    },
  ];

  return (
    <div className="flex-1 overflow-y-auto p-8 scroll-smooth bg-[#f6f6f8] dark:bg-[#101622]">
      <div className="max-w-6xl mx-auto flex flex-col gap-6">
        {/* Page Heading */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-3 mb-1">
              <span className="bg-blue-100 dark:bg-blue-900 text-primary dark:text-blue-300 text-xs font-bold px-2 py-0.5 rounded uppercase tracking-wide">
                Đang hoạt động
              </span>
              <span className="text-[#4c669a] dark:text-slate-400 text-sm">
                Cập nhật lần cuối: 12/10/2023
              </span>
            </div>
            <h2 className="text-3xl font-black tracking-tight text-[#0d121b] dark:text-white">
              Kỹ thuật Phần mềm - Khóa K15
            </h2>
            <p className="text-[#4c669a] dark:text-slate-400 font-normal">
              Niên giám 2023 - 2027 • Khoa Công nghệ Thông tin
            </p>
          </div>
          <div className="flex gap-3">
            <button className="flex items-center justify-center gap-2 h-10 px-4 rounded-lg border border-[#cfd7e7] dark:border-slate-700 bg-white dark:bg-slate-800 text-[#0d121b] dark:text-white text-sm font-bold hover:bg-slate-50">
              <span className="material-symbols-outlined text-lg">
                upload_file
              </span>{" "}
              Import
            </button>
            <button className="flex items-center justify-center gap-2 h-10 px-4 rounded-lg bg-primary text-white text-sm font-bold hover:bg-blue-700 shadow-sm shadow-blue-500/30">
              <span className="material-symbols-outlined text-lg">
                picture_as_pdf
              </span>{" "}
              Xuất PDF
            </button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <StatCard
            label="Tổng tín chỉ"
            value="152"
            icon="school"
            color="text-primary"
          />
          <StatCard
            label="Tín chỉ bắt buộc"
            value="120"
            icon="check_circle"
            color="text-green-500"
          />
          <StatCard
            label="Tín chỉ tự chọn"
            value="32"
            icon="alt_route"
            color="text-orange-500"
          />
          <StatCard
            label="Tổng số môn"
            value="48"
            icon="library_books"
            color="text-purple-500"
          />
        </div>

        {/* Tabs */}
        <div className="border-b border-[#cfd7e7] dark:border-slate-700">
          <div className="flex gap-8 overflow-x-auto no-scrollbar">
            <TabItem label="Chuẩn đầu ra (PLO)" />
            <TabItem label="Cấu trúc chương trình" active />
            <TabItem label="Sơ đồ tiên quyết" />
            <TabItem label="Môn toàn trường" />
          </div>
        </div>

        {/* Program Structure Content */}
        <div className="flex flex-col gap-8 pb-10">
          {/* Controls */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div className="flex gap-2">
              <button className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white dark:bg-slate-800 border border-[#cfd7e7] dark:border-slate-700 text-sm font-medium">
                <span className="material-symbols-outlined text-lg">
                  filter_list
                </span>{" "}
                Lọc
              </button>
              <button className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white dark:bg-slate-800 border border-[#cfd7e7] dark:border-slate-700 text-sm font-medium">
                <span className="material-symbols-outlined text-lg">
                  swap_vert
                </span>{" "}
                Sắp xếp
              </button>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm text-[#4c669a]">Chế độ xem:</span>
              <div className="flex bg-[#cfd7e7] dark:bg-slate-800 p-1 rounded-lg">
                <button className="p-1 rounded bg-white dark:bg-slate-600 shadow-sm text-primary">
                  <span className="material-symbols-outlined text-lg">
                    table_rows
                  </span>
                </button>
                <button className="p-1 rounded text-[#4c669a]">
                  <span className="material-symbols-outlined text-lg">
                    grid_view
                  </span>
                </button>
              </div>
            </div>
          </div>

          {/* Semesters List */}
          {semesterData.map((semester) => (
            <SemesterBlock key={semester.id} semester={semester} />
          ))}

          {/* Add Semester Button */}
          <button className="w-full py-4 border-2 border-dashed border-[#cfd7e7] dark:border-slate-700 rounded-xl flex items-center justify-center gap-2 text-[#4c669a] font-bold hover:bg-white dark:hover:bg-slate-800/50 hover:border-primary/50 hover:text-primary transition-all">
            <span className="material-symbols-outlined">add_circle</span> Thêm
            Học kỳ Mới
          </button>
        </div>
      </div>
    </div>
  );
};

// --- Sub-components ---

const StatCard = ({ label, value, icon, color }: any) => (
  <div className="flex flex-col gap-1 rounded-xl p-5 border border-[#cfd7e7] dark:border-slate-700 bg-white dark:bg-surface-dark shadow-sm">
    <div className="flex items-center justify-between">
      <p className="text-[#4c669a] text-sm font-medium">{label}</p>
      <span className={`material-symbols-outlined ${color} text-xl`}>
        {icon}
      </span>
    </div>
    <p className="text-2xl font-bold tracking-tight mt-2 dark:text-white">
      {value}
    </p>
  </div>
);

const TabItem = ({
  label,
  active = false,
}: {
  label: string;
  active?: boolean;
}) => (
  <a className="group flex flex-col pb-3 pt-2 min-w-fit cursor-pointer">
    <span
      className={`text-sm font-medium transition-colors ${
        active
          ? "text-primary dark:text-blue-400 font-bold"
          : "text-[#4c669a] group-hover:text-primary"
      }`}
    >
      {label}
    </span>
    <span
      className={`h-0.5 w-full mt-2 transition-colors ${
        active
          ? "bg-primary rounded-t-full"
          : "bg-transparent group-hover:bg-primary/50"
      }`}
    ></span>
  </a>
);

const SemesterBlock = ({ semester }: any) => (
  <div className="flex flex-col bg-white dark:bg-surface-dark border border-[#cfd7e7] dark:border-slate-700 rounded-xl shadow-sm overflow-hidden">
    <div className="flex items-center justify-between px-6 py-4 bg-gray-50 dark:bg-slate-800/50 border-b border-[#cfd7e7] dark:border-slate-700">
      <div className="flex items-center gap-3">
        <div className="size-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-sm">
          {semester.id}
        </div>
        <div>
          <h3 className="text-base font-bold text-[#0d121b] dark:text-white">
            {semester.name}
          </h3>
          <p className="text-xs text-[#4c669a]">
            {semester.credits} Tín chỉ • {semester.subjectsCount} Môn học
          </p>
        </div>
      </div>
      <button className="flex items-center gap-1 text-primary text-sm font-bold hover:bg-primary/5 px-3 py-1.5 rounded-lg transition-colors">
        <span className="material-symbols-outlined text-lg">add</span> Thêm môn
        học
      </button>
    </div>
    <div className="overflow-x-auto">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="text-xs font-semibold text-[#4c669a] border-b border-[#cfd7e7] dark:border-slate-700">
            <th className="px-6 py-3 w-24">Mã HP</th>
            <th className="px-6 py-3">Tên học phần</th>
            <th className="px-6 py-3 w-24 text-center">Số TC</th>
            <th className="px-6 py-3 w-32">Loại</th>
            <th className="px-6 py-3 w-40">Tiên quyết</th>
            <th className="px-6 py-3 w-40">PLO Mapping</th>
            <th className="px-6 py-3 w-20 text-center"></th>
          </tr>
        </thead>
        <tbody className="text-sm">
          {semester.subjects.map((sub: any) => (
            <tr
              key={sub.code}
              className="group hover:bg-slate-50 dark:hover:bg-slate-800/50 border-b border-[#cfd7e7] dark:border-slate-700 last:border-0 transition-colors"
            >
              <td className="px-6 py-4 font-mono text-[#4c669a]">{sub.code}</td>
              <td className="px-6 py-4 font-medium text-[#0d121b] dark:text-white">
                {sub.name}
              </td>
              <td className="px-6 py-4 text-center dark:text-white">
                {sub.credits}
              </td>
              <td className="px-6 py-4">
                <span
                  className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${
                    sub.type === "Bắt buộc"
                      ? "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
                      : "bg-gray-100 text-gray-800 dark:bg-slate-700 dark:text-gray-300"
                  }`}
                >
                  {sub.type}
                </span>
              </td>
              <td className="px-6 py-4 text-[#4c669a] italic">
                {sub.prerequisite !== "-" ? (
                  <a className="text-primary hover:underline font-medium text-xs flex items-center gap-1 cursor-pointer">
                    {sub.prerequisite}{" "}
                    <span className="material-symbols-outlined text-xs">
                      open_in_new
                    </span>
                  </a>
                ) : (
                  "-"
                )}
              </td>
              <td className="px-6 py-4">
                <div className="flex gap-1">
                  {sub.mapping.map((plo: string) => (
                    <span
                      key={plo}
                      className="px-1.5 py-0.5 rounded border border-[#cfd7e7] dark:border-slate-700 text-[10px] font-medium bg-white dark:bg-slate-700 text-[#4c669a] dark:text-gray-300"
                    >
                      {plo}
                    </span>
                  ))}
                </div>
              </td>
              <td className="px-6 py-4 text-center">
                <div className="invisible group-hover:visible flex items-center justify-center gap-1">
                  <button className="p-1 rounded hover:bg-gray-200 dark:hover:bg-slate-600 text-[#4c669a]">
                    <span className="material-symbols-outlined text-lg">
                      edit
                    </span>
                  </button>
                  <button className="p-1 rounded hover:bg-red-100 text-red-500">
                    <span className="material-symbols-outlined text-lg">
                      delete
                    </span>
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

export default ChuongTrinhDaoTao;
