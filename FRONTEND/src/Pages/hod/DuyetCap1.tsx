import React from "react";

const DuyetCap1: React.FC = () => {
  // Dữ liệu mẫu cho bảng giáo trình chờ duyệt
  const textbooks = [
    {
      id: 1,
      title: "Kỹ thuật Lập trình C++",
      version: "Phiên bản 2.0",
      lecturer: "ThS. Nguyễn Văn A",
      lecturerAvatar: "21",
      courseCode: "INT1004",
      courseName: "Tin học cơ sở 4",
      submitDate: "24/05/2024",
      cloStatus: "Phù hợp 100%",
      cloColor: "bg-green-100 text-green-800",
      cloDot: "bg-green-500",
      coverGradient: "linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%)",
    },
    {
      id: 2,
      title: "Cấu trúc dữ liệu & Giải thuật",
      version: "Bản thảo lần 1",
      lecturer: "TS. Trần Thị B",
      lecturerAvatar: "22",
      courseCode: "INT2001",
      courseName: "Cấu trúc dữ liệu",
      submitDate: "22/05/2024",
      cloStatus: "Cần rà soát CLO",
      cloColor: "bg-yellow-100 text-yellow-800",
      cloDot: "bg-yellow-500",
      coverGradient: "linear-gradient(135deg, #fb923c 0%, #ea580c 100%)",
    },
    {
      id: 3,
      title: "Nhập môn Mạng máy tính",
      version: "Tái bản 2024",
      lecturer: "ThS. Lê Văn C",
      lecturerAvatar: "23",
      courseCode: "INT2004",
      courseName: "Mạng máy tính",
      submitDate: "20/05/2024",
      cloStatus: "Phù hợp 95%",
      cloColor: "bg-green-100 text-green-800",
      cloDot: "bg-green-500",
      coverGradient: "linear-gradient(135deg, #10b981 0%, #047857 100%)",
    },
    {
      id: 4,
      title: "Trí tuệ nhân tạo cơ bản",
      version: "Giáo trình mới",
      lecturer: "TS. Phạm Văn D",
      lecturerAvatar: "24",
      courseCode: "INT3005",
      courseName: "Trí tuệ nhân tạo",
      submitDate: "18/05/2024",
      cloStatus: "Phù hợp 100%",
      cloColor: "bg-green-100 text-green-800",
      cloDot: "bg-green-500",
      coverGradient: "linear-gradient(135deg, #8b5cf6 0%, #6d28d9 100%)",
    },
  ];

  return (
    <div className="flex flex-1 justify-center py-8 px-4 sm:px-6 lg:px-8 bg-[#f8f9fc] dark:bg-[#101622]">
      <div className="flex flex-col max-w-[1200px] flex-1 w-full gap-8">
        {/* Heading */}
        <div className="flex flex-wrap justify-between gap-6 items-end">
          <div className="flex min-w-72 flex-col gap-2">
            <h1 className="text-[#0d121b] dark:text-white text-3xl md:text-4xl font-black tracking-tight">
              Phê duyệt Giáo trình
            </h1>
            <p className="text-[#4c669a] text-base max-w-2xl">
              Kiểm tra nội dung, rà soát sự phù hợp của Chuẩn đầu ra (CLO) và
              phê duyệt các giáo trình được nộp bởi giảng viên bộ môn.
            </p>
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-slate-800 border border-[#e7ebf3] dark:border-slate-700 rounded-lg text-[#0d121b] dark:text-white text-sm font-bold shadow-sm hover:bg-gray-50">
            <span className="material-symbols-outlined text-[20px]">
              file_download
            </span>{" "}
            Xuất báo cáo
          </button>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <StatCard
            label="Chờ duyệt"
            value="12"
            icon="hourglass_top"
            colorClass="bg-blue-100 text-primary"
            bgCircle="bg-blue-50"
          />
          <StatCard
            label="Đã duyệt"
            value="45"
            icon="check_circle"
            colorClass="bg-green-100 text-green-700"
            bgCircle="bg-green-50"
          />
          <StatCard
            label="Từ chối"
            value="3"
            icon="cancel"
            colorClass="bg-red-100 text-red-700"
            bgCircle="bg-red-50"
          />
        </div>

        {/* Filters */}
        <div className="flex flex-col lg:flex-row gap-4 justify-between items-start lg:items-center bg-white dark:bg-slate-900 p-4 rounded-xl border border-[#e7ebf3] dark:border-slate-800 shadow-sm">
          <div className="relative w-full lg:w-96 h-11">
            <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-[#4c669a]">
              search
            </span>
            <input
              className="w-full h-full pl-12 pr-4 rounded-lg bg-[#f8f9fc] dark:bg-slate-800 border-none text-sm outline-none focus:ring-2 focus:ring-primary/20"
              placeholder="Tìm kiếm giáo trình..."
            />
          </div>
          <div className="flex flex-wrap gap-3 w-full lg:w-auto">
            <select className="h-11 px-4 rounded-lg bg-[#f8f9fc] dark:bg-slate-800 border border-[#e7ebf3] dark:border-slate-700 text-sm font-medium dark:text-white outline-none">
              <option>Học kỳ 1 - 2024</option>
            </select>
            <select className="h-11 px-4 rounded-lg bg-[#f8f9fc] dark:bg-slate-800 border border-[#e7ebf3] dark:border-slate-700 text-sm font-medium dark:text-white outline-none">
              <option>Tất cả Bộ môn</option>
            </select>
            <button className="h-11 px-4 rounded-lg bg-white dark:bg-slate-800 border border-[#e7ebf3] dark:border-slate-700 text-[#4c669a] hover:text-primary transition-colors">
              <span className="material-symbols-outlined">tune</span>
            </button>
          </div>
        </div>

        {/* Table Area */}
        <div className="bg-white dark:bg-slate-900 rounded-xl border border-[#e7ebf3] dark:border-slate-800 overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[1000px]">
              <thead>
                <tr className="bg-[#f8f9fc] dark:bg-slate-800/50 border-b border-[#e7ebf3] dark:border-slate-700">
                  <th className="p-5 text-xs font-bold uppercase tracking-wider text-[#4c669a]">
                    Giáo trình
                  </th>
                  <th className="p-5 text-xs font-bold uppercase tracking-wider text-[#4c669a]">
                    Giảng viên
                  </th>
                  <th className="p-5 text-xs font-bold uppercase tracking-wider text-[#4c669a]">
                    Môn học
                  </th>
                  <th className="p-5 text-xs font-bold uppercase tracking-wider text-[#4c669a]">
                    Ngày nộp
                  </th>
                  <th className="p-5 text-xs font-bold uppercase tracking-wider text-[#4c669a]">
                    Trạng thái CLO
                  </th>
                  <th className="p-5 text-xs font-bold uppercase tracking-wider text-[#4c669a] text-right">
                    Hành động
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#e7ebf3] dark:divide-slate-800">
                {textbooks.map((item) => (
                  <tr
                    key={item.id}
                    className="group hover:bg-[#f8f9fc] dark:hover:bg-slate-800/30 transition-colors"
                  >
                    <td className="p-5">
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-16 rounded overflow-hidden shrink-0 border border-[#e7ebf3] shadow-sm relative group-hover:scale-105 transition-transform">
                          <div
                            className="w-full h-full"
                            style={{
                              backgroundImage: item.coverGradient,
                              backgroundSize: "cover",
                            }}
                          ></div>
                        </div>
                        <div>
                          <p className="text-sm font-bold text-[#0d121b] dark:text-white group-hover:text-primary transition-colors">
                            {item.title}
                          </p>
                          <p className="text-xs text-[#4c669a] flex items-center gap-1">
                            <span className="material-symbols-outlined text-[14px]">
                              history
                            </span>{" "}
                            {item.version}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="p-5">
                      <div className="flex items-center gap-2">
                        <div
                          className="size-6 rounded-full bg-gray-200"
                          style={{
                            backgroundImage: `url('http://googleusercontent.com/profile/picture/${item.lecturerAvatar}')`,
                            backgroundSize: "cover",
                          }}
                        ></div>
                        <span className="text-sm font-medium text-[#0d121b] dark:text-slate-300">
                          {item.lecturer}
                        </span>
                      </div>
                    </td>
                    <td className="p-5">
                      <div className="flex flex-col">
                        <span className="text-sm font-bold text-[#0d121b] dark:text-white">
                          {item.courseCode}
                        </span>
                        <span className="text-xs text-[#4c669a]">
                          {item.courseName}
                        </span>
                      </div>
                    </td>
                    <td className="p-5 text-sm text-[#0d121b] dark:text-slate-400">
                      {item.submitDate}
                    </td>
                    <td className="p-5">
                      <div className="flex items-center gap-2">
                        <span className="relative flex h-2 w-2">
                          <span
                            className={`relative inline-flex rounded-full h-2 w-2 ${item.cloDot}`}
                          ></span>
                        </span>
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded text-xs font-medium ${item.cloColor}`}
                        >
                          {item.cloStatus}
                        </span>
                      </div>
                    </td>
                    <td className="p-5 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button className="p-2 text-[#4c669a] hover:text-primary rounded-lg transition-colors">
                          <span className="material-symbols-outlined text-[20px]">
                            visibility
                          </span>
                        </button>
                        <button className="p-2 text-[#4c669a] hover:text-red-600 rounded-lg transition-colors">
                          <span className="material-symbols-outlined text-[20px]">
                            close
                          </span>
                        </button>
                        <button className="bg-primary hover:bg-blue-700 text-white text-xs font-bold px-3 py-1.5 rounded-lg transition-all shadow-sm ml-2 flex items-center gap-1">
                          <span className="material-symbols-outlined text-[16px]">
                            check
                          </span>{" "}
                          Phê duyệt
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-between p-4 border-t border-[#e7ebf3] dark:border-slate-800 bg-[#f8f9fc] dark:bg-slate-800/50">
            <p className="text-sm text-[#4c669a]">
              Hiển thị <span className="font-medium">1-4</span> trong số{" "}
              <span className="font-medium">12</span> giáo trình
            </p>
            <div className="flex gap-2">
              <button className="size-8 rounded border border-[#e7ebf3] bg-white dark:bg-slate-700 flex items-center justify-center text-[#4c669a] disabled:opacity-50">
                <span className="material-symbols-outlined text-[18px]">
                  chevron_left
                </span>
              </button>
              <button className="size-8 rounded bg-primary text-white text-sm font-medium">
                1
              </button>
              <button className="size-8 rounded border border-[#e7ebf3] bg-white dark:bg-slate-700 text-sm font-medium text-[#0d121b] dark:text-white">
                2
              </button>
              <button className="size-8 rounded border border-[#e7ebf3] bg-white dark:bg-slate-700 flex items-center justify-center text-[#4c669a]">
                <span className="material-symbols-outlined text-[18px]">
                  chevron_right
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* Info Box */}
        <div className="flex gap-4 p-4 rounded-lg bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800 text-blue-900 dark:text-blue-200 items-start">
          <span className="material-symbols-outlined text-blue-600">info</span>
          <div className="text-sm">
            <p className="font-bold mb-1">Hướng dẫn phê duyệt nhanh</p>
            <p className="opacity-80">
              Hệ thống sẽ tự động đối soát nội dung chương với CLO môn học. Nếu
              giáo trình chưa đáp ứng đủ 100% CLO, hệ thống sẽ cảnh báo bằng màu
              vàng. Vui lòng rà soát kỹ trước khi phê duyệt chính thức.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- Sub-components ---

const StatCard = ({ label, value, icon, colorClass, bgCircle }: any) => (
  <div className="flex flex-col gap-3 rounded-xl p-6 bg-white dark:bg-slate-900 border border-[#e7ebf3] dark:border-slate-800 shadow-sm relative overflow-hidden group">
    <div
      className={`absolute right-[-10px] top-[-10px] size-24 ${bgCircle} dark:opacity-10 rounded-full group-hover:scale-110 transition-transform`}
    ></div>
    <div className="flex items-center gap-3 relative z-10">
      <div className={`p-2 rounded-lg ${colorClass}`}>
        <span className="material-symbols-outlined">{icon}</span>
      </div>
      <p className="text-[#4c669a] text-sm font-medium uppercase tracking-wider">
        {label}
      </p>
    </div>
    <p className="text-[#0d121b] dark:text-white tracking-tight text-3xl font-bold leading-tight relative z-10">
      {value}
    </p>
  </div>
);

export default DuyetCap1;
