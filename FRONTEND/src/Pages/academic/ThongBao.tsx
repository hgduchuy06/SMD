import React from "react";

const ThongBao: React.FC = () => {
  // Dữ liệu mẫu cho thông báo
  const notifications = [
    {
      id: 1,
      type: "approval",
      title: "Yêu cầu phê duyệt: Toán Cao Cấp A1",
      desc: "Giáo trình mới được đệ trình bởi Khoa Toán - Tin. Cần phê duyệt trước ngày 15/10 để kịp tiến độ in ấn cho học kỳ tới.",
      time: "15 phút trước",
      isUrgent: true,
      isUnread: true,
      category: "today",
    },
    {
      id: 2,
      type: "warning",
      title: "Bảo trì hệ thống định kỳ",
      desc: "Hệ thống sẽ tạm ngưng hoạt động để bảo trì nâng cấp máy chủ từ 22:00 đến 23:00 tối nay. Vui lòng lưu lại các công việc đang dang dở.",
      time: "2 giờ trước",
      isUnread: true,
      category: "today",
    },
    {
      id: 3,
      type: "feedback",
      title: "Phản hồi mới về Giáo trình Vật lý đại cương",
      desc: "Giảng viên Nguyễn Văn A đã gửi phản hồi về cấu trúc chương 3.",
      time: "4 giờ trước",
      isUnread: false,
      category: "today",
      linkText: "Đọc phản hồi →",
    },
    {
      id: 4,
      type: "policy",
      title: "Cập nhật chính sách số hóa Q3/2023",
      desc: "Ban giám hiệu đã ban hành quy định mới về tiêu chuẩn định dạng file số hóa. Tất cả giáo trình mới phải tuân thủ chuẩn PDF/A.",
      time: "Hôm qua",
      isUnread: false,
      category: "yesterday",
    },
  ];

  return (
    <div className="flex-1 flex flex-col h-full overflow-hidden bg-[#f6f6f8] dark:bg-[#101622]">
      {/* Top Header & Filters */}
      <div className="flex-shrink-0 p-8 pb-0 max-w-5xl mx-auto w-full">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div className="flex flex-col gap-1">
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
              Thông báo
            </h2>
            <p className="text-slate-500 dark:text-slate-400 text-sm">
              Cập nhật quan trọng, yêu cầu phê duyệt và tin tức hệ thống.
            </p>
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-50 transition-colors shadow-sm">
            <span className="material-symbols-outlined text-lg">done_all</span>
            Đánh dấu tất cả là đã đọc
          </button>
        </div>

        {/* Chips / Filters */}
        <div className="flex gap-2 overflow-x-auto pb-4 no-scrollbar">
          <FilterChip label="Tất cả" count={12} active />
          <FilterChip label="Chưa đọc" count={4} />
          <FilterChip label="Khẩn cấp" />
          <FilterChip label="Yêu cầu phê duyệt" />
        </div>
      </div>

      {/* Scrollable List Area */}
      <div className="flex-1 overflow-y-auto px-8 py-4">
        <div className="max-w-5xl mx-auto flex flex-col gap-4 pb-12">
          <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 mt-2">
            Hôm nay
          </div>
          {notifications
            .filter((n) => n.category === "today")
            .map((note) => (
              <NotificationItem key={note.id} {...note} />
            ))}

          <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 mt-6">
            Hôm qua
          </div>
          {notifications
            .filter((n) => n.category === "yesterday")
            .map((note) => (
              <NotificationItem key={note.id} {...note} />
            ))}

          <div className="mt-4 flex justify-center">
            <button className="text-sm font-medium text-slate-500 hover:text-primary dark:text-slate-400 py-2 px-4 rounded-lg hover:bg-slate-100 transition-colors">
              Tải thêm thông báo cũ
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- Sub-components ---

const FilterChip = ({
  label,
  count,
  active = false,
}: {
  label: string;
  count?: number;
  active?: boolean;
}) => (
  <button
    className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
      active
        ? "bg-slate-900 dark:bg-white text-white dark:text-slate-900 shadow-sm"
        : "bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:bg-slate-50"
    }`}
  >
    {label}
    {count !== undefined && (
      <span
        className={`px-1.5 py-0.5 rounded-full text-xs ${
          active
            ? "bg-white/20 dark:bg-black/10"
            : "bg-primary/10 text-primary font-bold"
        }`}
      >
        {count}
      </span>
    )}
  </button>
);

const NotificationItem = ({
  type,
  title,
  desc,
  time,
  isUrgent,
  isUnread,
  linkText,
}: any) => {
  const getIcon = () => {
    switch (type) {
      case "approval":
        return {
          icon: "assignment_add",
          color: "text-primary",
          bg: "bg-blue-50 dark:bg-blue-900/30",
        };
      case "warning":
        return {
          icon: "warning",
          color: "text-amber-600",
          bg: "bg-amber-50 dark:bg-amber-900/20",
        };
      case "feedback":
        return {
          icon: "comment",
          color: "text-emerald-600",
          bg: "bg-emerald-50 dark:bg-emerald-900/20",
        };
      default:
        return {
          icon: "policy",
          color: "text-slate-500",
          bg: "bg-slate-200 dark:bg-slate-700",
        };
    }
  };

  const theme = getIcon();

  return (
    <div
      className={`group relative flex flex-col sm:flex-row gap-4 p-5 rounded-xl border transition-all duration-200 ${
        isUnread
          ? "bg-white dark:bg-slate-800 border-l-4 border-primary shadow-sm"
          : "bg-slate-50 dark:bg-slate-800/50 border-slate-100 dark:border-slate-800 opacity-80 hover:opacity-100"
      }`}
    >
      <div className="absolute top-4 right-4 sm:static sm:order-last flex flex-col items-end gap-1 shrink-0">
        {isUnread && (
          <span className="h-2.5 w-2.5 rounded-full bg-primary animate-pulse"></span>
        )}
        <span className="text-xs text-slate-400 whitespace-nowrap mt-1">
          {time}
        </span>
      </div>

      <div className="flex gap-4 flex-1">
        <div
          className={`h-12 w-12 rounded-lg ${theme.bg} ${theme.color} flex items-center justify-center shrink-0`}
        >
          <span className="material-symbols-outlined text-2xl">
            {theme.icon}
          </span>
        </div>
        <div className="flex flex-col gap-1 flex-1">
          <div className="flex items-center gap-2">
            <h3 className="text-base font-semibold text-slate-900 dark:text-white">
              {title}
            </h3>
            {isUrgent && (
              <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-red-100 text-red-700">
                Khẩn cấp
              </span>
            )}
          </div>
          <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed max-w-2xl">
            {desc}
          </p>

          {type === "approval" && (
            <div className="mt-3 flex gap-3">
              <button className="bg-primary text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-600 transition-colors">
                Phê duyệt ngay
              </button>
              <button className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 px-4 py-2 rounded-lg text-sm font-medium dark:text-white hover:bg-slate-50 transition-colors">
                Xem chi tiết
              </button>
            </div>
          )}
          {linkText && (
            <div className="mt-2">
              <button className="text-sm font-medium text-primary hover:underline">
                {linkText}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ThongBao;
