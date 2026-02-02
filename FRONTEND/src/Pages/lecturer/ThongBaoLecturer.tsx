import React, { useState } from "react";

const ThongBaoGiangVien: React.FC = () => {
  const [filter, setFilter] = useState("all");

  // Dữ liệu mẫu thông báo
  const notifications = [
    {
      id: 1,
      type: "urgent",
      title: "Hạn chót nộp bản thảo giáo trình",
      content:
        'Giáo trình "Lập trình Hướng đối tượng nâng cao" cần được nộp trước 17:00 ngày mai (25/10/2023). Vui lòng hoàn tất và tải lên hệ thống.',
      time: "1 giờ trước",
      isUnread: true,
      category: "deadline",
    },
    {
      id: 2,
      type: "feedback",
      title: "Phản hồi mới từ Trưởng bộ môn",
      content:
        'TS. Trần Văn B đã thêm 3 nhận xét mới vào giáo trình "Cơ sở dữ liệu phân tán". Vui lòng xem xét và chỉnh sửa.',
      time: "3 giờ trước",
      isUnread: true,
      category: "approval",
    },
    {
      id: 3,
      type: "system",
      title: "Bảo trì hệ thống định kỳ",
      content:
        "Hệ thống sẽ tạm ngưng hoạt động để bảo trì từ 22:00 đến 02:00 ngày 26/10/2023.",
      time: "5 giờ trước",
      isUnread: true,
      category: "system",
    },
    {
      id: 4,
      type: "approved",
      title: "Giáo trình đã được phê duyệt",
      content:
        'Giáo trình "Nhập môn Trí tuệ nhân tạo" đã được Hội đồng Khoa phê duyệt xuất bản.',
      time: "1 ngày trước",
      isUnread: false,
      category: "approval",
    },
  ];

  return (
    <main className="flex-1 overflow-y-auto bg-[#f6f6f8] dark:bg-[#101622] p-6 md:p-10 scroll-smooth">
      <div className="max-w-5xl mx-auto flex flex-col gap-6">
        {/* Page Heading */}
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div className="flex flex-col gap-2">
            <h1 className="text-slate-900 dark:text-white text-3xl md:text-4xl font-black leading-tight tracking-tight">
              Thông báo
            </h1>
            <p className="text-slate-500 dark:text-slate-400 text-base max-w-2xl">
              Cập nhật các tin tức mới nhất về hạn nộp và phê duyệt giáo trình
              của bạn.
            </p>
          </div>
          <button className="flex items-center justify-center gap-2 rounded-lg h-10 px-4 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-primary dark:text-blue-400 text-sm font-bold shadow-sm hover:bg-slate-50 transition-all">
            <span className="material-symbols-outlined text-[18px]">
              done_all
            </span>
            <span className="truncate">Đánh dấu tất cả đã đọc</span>
          </button>
        </div>

        {/* Search and Filters */}
        <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
          <div className="flex gap-2 overflow-x-auto pb-2 lg:pb-0 no-scrollbar">
            <FilterChip
              label="Tất cả"
              active={filter === "all"}
              onClick={() => setFilter("all")}
            />
            <FilterChip
              label="Chưa đọc"
              count={3}
              active={filter === "unread"}
              onClick={() => setFilter("unread")}
            />
            <FilterChip
              label="Hạn chót"
              active={filter === "deadline"}
              onClick={() => setFilter("deadline")}
            />
            <FilterChip
              label="Phê duyệt"
              active={filter === "approval"}
              onClick={() => setFilter("approval")}
            />
          </div>

          <div className="w-full lg:w-auto min-w-[320px]">
            <div className="relative group">
              <input
                className="w-full rounded-lg text-slate-900 dark:text-white bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 h-10 pl-10 pr-4 text-sm focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                placeholder="Tìm kiếm thông báo..."
              />
              <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary">
                <span className="material-symbols-outlined text-[20px]">
                  search
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Notifications List */}
        <div className="flex flex-col gap-3">
          {notifications.map((note) => (
            <NotificationItem key={note.id} {...note} />
          ))}
        </div>

        {/* Load More */}
        <div className="flex justify-center py-6">
          <button className="flex items-center gap-2 px-6 py-2.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-sm font-bold hover:bg-slate-50 transition-colors">
            Xem thêm thông báo cũ{" "}
            <span className="material-symbols-outlined text-[16px]">
              expand_more
            </span>
          </button>
        </div>
      </div>
    </main>
  );
};

// --- Sub-components ---

const FilterChip = ({ label, count, active, onClick }: any) => (
  <button
    onClick={onClick}
    className={`flex h-9 shrink-0 items-center justify-center gap-x-2 rounded-full px-4 text-sm font-medium transition-all ${
      active
        ? "bg-primary text-white shadow-md"
        : "bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-50"
    }`}
  >
    <span>{label}</span>
    {count && (
      <span className="bg-red-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">
        {count}
      </span>
    )}
  </button>
);

const NotificationItem = ({ type, title, content, time, isUnread }: any) => {
  const getIconConfig = () => {
    switch (type) {
      case "urgent":
        return {
          icon: "warning",
          color: "text-red-600",
          bg: "bg-red-50 dark:bg-red-900/20",
          border: "border-red-500",
        };
      case "feedback":
        return {
          icon: "comment",
          color: "text-primary",
          bg: "bg-blue-50 dark:bg-blue-900/20",
          border: "border-primary",
        };
      case "system":
        return {
          icon: "campaign",
          color: "text-orange-600",
          bg: "bg-orange-50 dark:bg-orange-900/20",
          border: "border-primary",
        };
      case "approved":
        return {
          icon: "check_circle",
          color: "text-green-600",
          bg: "bg-green-50 dark:bg-green-900/20",
          border: "",
        };
      default:
        return {
          icon: "info",
          color: "text-slate-500",
          bg: "bg-slate-50 dark:bg-slate-700",
          border: "",
        };
    }
  };

  const config = getIconConfig();

  return (
    <div
      className={`group relative flex flex-col md:flex-row gap-4 p-5 bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-100 dark:border-slate-700/50 hover:shadow-md transition-all cursor-pointer ${
        !isUnread ? "opacity-75 hover:opacity-100" : ""
      }`}
    >
      {isUnread && config.border && (
        <div
          className={`absolute left-0 top-4 bottom-4 w-1 ${config.border} rounded-r-full`}
        ></div>
      )}

      <div className="flex-shrink-0">
        <div
          className={`size-12 rounded-full ${config.bg} ${config.color} flex items-center justify-center`}
        >
          <span className="material-symbols-outlined">{config.icon}</span>
        </div>
      </div>

      <div className="flex-1 flex flex-col gap-1">
        <div className="flex justify-between items-start w-full">
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2">
              <h3 className="text-base font-bold text-slate-900 dark:text-white group-hover:text-primary transition-colors">
                {title}
              </h3>
              {isUnread && (
                <span className="size-2 rounded-full bg-primary animate-pulse"></span>
              )}
            </div>
            <p
              className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed"
              dangerouslySetInnerHTML={{ __html: content }}
            ></p>
          </div>
          <span className="text-xs font-medium text-slate-400 whitespace-nowrap ml-2">
            {time}
          </span>
        </div>

        <div className="mt-2 flex gap-3">
          {type === "urgent" && (
            <button className="text-xs font-bold text-white bg-primary px-3 py-1.5 rounded hover:bg-blue-700 transition-colors">
              Nộp ngay
            </button>
          )}
          {type === "approved" ? (
            <button className="text-xs font-bold text-slate-500 hover:text-primary">
              Xem chứng nhận
            </button>
          ) : (
            <button className="text-xs font-bold text-slate-500 hover:text-primary">
              Chi tiết
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ThongBaoGiangVien;
