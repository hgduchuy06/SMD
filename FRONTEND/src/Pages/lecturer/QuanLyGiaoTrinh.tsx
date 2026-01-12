import React from "react";

const QuanLyGiaoTrinh: React.FC = () => {
  // Dữ liệu mẫu cho bảng giáo trình
  const subjects = [
    {
      code: "CS101",
      name: "Nhập môn Lập trình",
      version: "v2.1",
      semester: "Học kỳ Thu 2023",
      mapping: 2,
      totalMapping: 3,
      status: "approved",
      updateDate: "10/12/23",
    },
    {
      code: "CS204",
      name: "Cấu trúc Dữ liệu & Giải thuật",
      version: "v3.0",
      semester: "Học kỳ Thu 2023",
      mapping: 3,
      totalMapping: 3,
      status: "pending",
      updateDate: "Nộp 2 ngày trước",
    },
    {
      code: "SE301",
      name: "Kỹ thuật Phần mềm",
      version: "v1.0",
      semester: "Spring 2024",
      mapping: 0,
      totalMapping: 3,
      status: "draft",
      updateDate: "Tạo 5 phút trước",
    },
    {
      code: "MATH101",
      name: "Giải tích I",
      version: "v1.5",
      semester: "Fall 2022",
      mapping: 2,
      totalMapping: 3,
      status: "update",
      updateDate: "Đã đánh dấu xem xét",
    },
    {
      code: "ENG202",
      name: "Viết kỹ thuật",
      version: "v4.2",
      semester: "Spring 2023",
      mapping: 3,
      totalMapping: 3,
      status: "archived",
      updateDate: "Thay thế bởi v5.0",
    },
  ];

  return (
    <main className="flex-1 px-6 py-8 md:px-12 lg:px-20 max-w-[1600px] mx-auto w-full bg-[#f6f6f8] dark:bg-[#101622]">
      {/* Page Heading */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
        <div className="flex flex-col gap-2 max-w-2xl">
          <h1 className="text-3xl md:text-4xl font-black tracking-tight text-slate-900 dark:text-white">
            Quản lý Giáo trình
          </h1>
          <p className="text-slate-500 dark:text-slate-400 text-lg">
            Quản lý và số hóa giáo trình của bạn, ánh xạ CLO-PLO, và theo dõi
            các phiên bản hiệu quả.
          </p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center justify-center rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 h-11 px-5 text-slate-700 dark:text-slate-200 text-sm font-bold shadow-sm hover:bg-slate-50 transition-colors">
            <span className="material-symbols-outlined mr-2 text-[20px]">
              cloud_upload
            </span>{" "}
            Nhập
          </button>
          <button className="flex items-center justify-center rounded-lg bg-primary h-11 px-5 text-white text-sm font-bold shadow-md hover:bg-blue-700 transition-colors">
            <span className="material-symbols-outlined mr-2 text-[20px]">
              add
            </span>{" "}
            Tạo Giáo trình Mới
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard
          label="Tổng số Giáo trình"
          value="12"
          trend="+2 học kỳ này"
          trendType="up"
          icon="library_books"
          iconColor="text-blue-600"
          bgColor="bg-blue-100"
        />
        <StatCard
          label="Môn học đang dạy"
          value="5"
          subLabel="Hiện đang giảng dạy"
          icon="check_circle"
          iconColor="text-green-600"
          bgColor="bg-green-100"
        />
        <StatCard
          label="Chờ Phê duyệt"
          value="2"
          subLabel="Yêu cầu hành động"
          icon="pending"
          iconColor="text-amber-600"
          bgColor="bg-amber-100"
        />
        <StatCard
          label="Cần Cập nhật"
          value="1"
          subLabel="Lỗi thời > 1 năm"
          icon="update"
          iconColor="text-red-600"
          bgColor="bg-red-100"
        />
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Main Table Column */}
        <div className="flex-1 flex flex-col gap-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white dark:bg-slate-800 p-4 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm">
            <div className="flex flex-1 gap-3 flex-wrap">
              <div className="relative min-w-[240px] flex-1">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 material-symbols-outlined text-[20px]">
                  search
                </span>
                <input
                  className="w-full pl-10 pr-4 h-10 rounded-lg border border-slate-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-primary/50 text-sm outline-none"
                  placeholder="Tìm kiếm theo Mã hoặc Tên môn học..."
                />
              </div>
            </div>
            <div className="flex gap-2 items-center overflow-x-auto no-scrollbar">
              <FilterButton label="Tất cả" active />
              <FilterButton label="Bản nháp" />
              <FilterButton label="Hoạt động" />
            </div>
          </div>

          <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50 dark:bg-slate-700/50 border-b border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-500 uppercase">
                    <th className="py-4 px-6">Thông tin môn học</th>
                    <th className="py-4 px-6">Phiên bản</th>
                    <th className="py-4 px-6">Học kỳ</th>
                    <th className="py-4 px-6">Ánh xạ CLO</th>
                    <th className="py-4 px-6">Trạng thái</th>
                    <th className="py-4 px-6 text-right">Hành động</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-700">
                  {subjects.map((sub, idx) => (
                    <SubjectRow key={idx} {...sub} />
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Sidebar Column */}
        <div className="w-full lg:w-80 flex flex-col gap-6">
          <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-slate-900 dark:text-white text-sm uppercase">
                Hoạt động Gần đây
              </h3>
              <button className="text-xs text-primary font-medium hover:underline">
                Xem tất cả
              </button>
            </div>
            <div className="relative pl-4 border-l border-slate-200 dark:border-slate-700 space-y-6">
              <ActivityItem
                title="CS101 v2.1 Đã phê duyệt"
                desc="Được Trưởng bộ môn phê duyệt."
                time="Hôm nay, 9:41 SA"
                dotColor="bg-green-500"
              />
              <ActivityItem
                title="Bình luận về CS204"
                desc='"Vui lòng cập nhật ánh xạ..."'
                time="Hôm qua"
                dotColor="bg-amber-500"
              />
              <ActivityItem
                title="Phiên bản mới được tạo"
                desc="Bản nháp SE301 v1.0 bắt đầu"
                time="2 ngày trước"
                dotColor="bg-blue-500"
              />
            </div>
          </div>

          <div className="bg-gradient-to-br from-primary to-blue-600 rounded-xl shadow-lg p-5 text-white relative overflow-hidden group cursor-pointer">
            <div className="relative z-10">
              <div className="h-10 w-10 bg-white/20 rounded-lg flex items-center justify-center mb-3 backdrop-blur-sm group-hover:bg-white/30 transition-colors">
                <span className="material-symbols-outlined text-white">
                  difference
                </span>
              </div>
              <h3 className="font-bold text-lg mb-1">So sánh Phiên bản</h3>
              <p className="text-blue-100 text-sm mb-3">
                Xem các thay đổi về CLO, nội dung và đánh giá giữa các phiên
                bản.
              </p>
              <button className="text-xs font-bold bg-white text-primary px-3 py-1.5 rounded shadow-sm hover:bg-blue-50">
                Thử ngay
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

// --- Sub-components ---

const StatCard = ({
  label,
  value,
  trend,
  subLabel,
  icon,
  iconColor,
  bgColor,
}: any) => (
  <div className="flex flex-col gap-1 rounded-xl bg-white dark:bg-slate-800 p-5 border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-md transition-shadow">
    <div className="flex items-center justify-between">
      <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">
        {label}
      </p>
      <div
        className={`${bgColor} dark:bg-opacity-20 ${iconColor} p-2 rounded-lg`}
      >
        <span className="material-symbols-outlined text-[20px]">{icon}</span>
      </div>
    </div>
    <p className="text-slate-900 dark:text-white text-3xl font-bold mt-2">
      {value}
    </p>
    {trend ? (
      <p className="text-green-600 text-xs font-medium flex items-center mt-1">
        <span className="material-symbols-outlined text-[14px] mr-1">
          trending_up
        </span>{" "}
        {trend}
      </p>
    ) : (
      <p className="text-slate-400 text-xs font-medium mt-1">{subLabel}</p>
    )}
  </div>
);

const FilterButton = ({
  label,
  active = false,
}: {
  label: string;
  active?: boolean;
}) => (
  <button
    className={`whitespace-nowrap px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
      active
        ? "bg-slate-900 dark:bg-white text-white dark:text-slate-900 shadow-sm"
        : "bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-200"
    }`}
  >
    {label}
  </button>
);

const SubjectRow = ({
  code,
  name,
  version,
  semester,
  mapping,
  totalMapping,
  status,
  updateDate,
}: any) => {
  const statusStyles: any = {
    approved: {
      bg: "bg-green-100 dark:bg-green-900/40",
      text: "text-green-700 dark:text-green-400",
      label: "Đã phê duyệt",
      dot: "bg-green-500",
    },
    pending: {
      bg: "bg-amber-100 dark:bg-amber-900/40",
      text: "text-amber-700 dark:text-amber-400",
      label: "Đang chờ",
      dot: "bg-amber-500 animate-pulse",
    },
    draft: {
      bg: "bg-slate-100 dark:bg-slate-700",
      text: "text-slate-600 dark:text-slate-400",
      label: "Bản nháp",
      dot: "bg-slate-400",
    },
    update: {
      bg: "bg-red-100 dark:bg-red-900/40",
      text: "text-red-700 dark:text-red-400",
      label: "Cần Cập nhật",
      dot: "bg-red-500",
    },
    archived: {
      bg: "bg-slate-100 dark:bg-slate-700",
      text: "text-slate-500 dark:text-slate-400",
      label: "Đã lưu trữ",
      dot: "bg-slate-400",
    },
  };

  const style = statusStyles[status];

  return (
    <tr className="group hover:bg-slate-50 dark:hover:bg-slate-700/30 transition-colors">
      <td className="py-4 px-6">
        <div className="flex flex-col">
          <span className="font-bold text-slate-900 dark:text-white text-sm">
            {code}
          </span>
          <span className="text-sm text-slate-500 dark:text-slate-400">
            {name}
          </span>
        </div>
      </td>
      <td className="py-4 px-6">
        <span className="inline-flex items-center px-2.5 py-1 rounded-md bg-slate-100 dark:bg-slate-700 text-xs font-medium border border-slate-200 dark:border-slate-600">
          {version}
        </span>
      </td>
      <td className="py-4 px-6 text-sm text-slate-600 dark:text-slate-300">
        {semester}
      </td>
      <td className="py-4 px-6">
        <div className="flex items-center gap-1">
          {[...Array(totalMapping)].map((_, i) => (
            <div
              key={i}
              className={`h-2.5 w-8 rounded-full ${
                i < mapping ? "bg-green-500" : "bg-slate-200 dark:bg-slate-600"
              }`}
            ></div>
          ))}
          <span className="text-xs text-slate-400 ml-1">
            {mapping}/{totalMapping}
          </span>
        </div>
      </td>
      <td className="py-4 px-6">
        <span
          className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full ${style.bg} ${style.text} text-xs font-bold`}
        >
          <span className={`h-1.5 w-1.5 rounded-full ${style.dot}`}></span>{" "}
          {style.label}
        </span>
        <div className="text-[10px] text-slate-400 mt-1">{updateDate}</div>
      </td>
      <td className="py-4 px-6 text-right">
        <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <button className="p-1.5 rounded text-slate-400 hover:text-primary hover:bg-blue-50 transition-colors">
            <span className="material-symbols-outlined text-[20px]">edit</span>
          </button>
          <button className="p-1.5 rounded text-slate-400 hover:text-primary hover:bg-blue-50 transition-colors">
            <span className="material-symbols-outlined text-[20px]">
              more_vert
            </span>
          </button>
        </div>
      </td>
    </tr>
  );
};

const ActivityItem = ({ title, desc, time, dotColor }: any) => (
  <div className="relative">
    <div
      className={`absolute -left-[21px] top-1 h-3 w-3 rounded-full border-2 border-white dark:border-slate-800 ${dotColor}`}
    ></div>
    <p className="text-sm font-medium text-slate-900 dark:text-white">
      {title}
    </p>
    <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{desc}</p>
    <p className="text-[10px] text-slate-400 mt-1 uppercase font-bold tracking-wider">
      {time}
    </p>
  </div>
);

export default QuanLyGiaoTrinh;
