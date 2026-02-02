import React from "react";

const ThongBaoHod: React.FC = () => {
  // Dữ liệu mẫu - Sau này bạn có thể fetch từ API
  const notifications = [
    {
      id: 1,
      type: "approval",
      title: 'Giáo trình "Cơ sở dữ liệu nâng cao" chờ phê duyệt',
      content:
        "Giảng viên Nguyễn Văn A đã nộp bản thảo cuối cùng. Vui lòng xem xét và đưa ra quyết định duyệt trước ngày 25/10.",
      time: "2 giờ trước",
      from: "Hội đồng khoa",
      isUnread: true,
      category: "today",
    },
    {
      id: 2,
      type: "review",
      title: 'Phản hồi mới cho "Trí tuệ nhân tạo"',
      content:
        "Hội đồng thẩm định đã gửi 3 ý kiến đóng góp mới cho giáo trình này. Cần chuyển tiếp cho tác giả.",
      time: "5 giờ trước",
      isUnread: true,
      category: "today",
    },
    {
      id: 3,
      type: "system",
      title: "Thông báo bảo trì hệ thống",
      content:
        "Hệ thống sẽ tạm ngưng hoạt động để nâng cấp server vào lúc 22:00 ngày 20/10/2023. Thời gian dự kiến: 2 giờ.",
      time: "Hôm qua",
      isUnread: false,
      category: "earlier",
    },
    {
      id: 4,
      type: "campaign",
      title: "Nhắc nhở: Hạn nộp đề cương môn học",
      content:
        "Hạn cuối nộp đề cương chi tiết cho các môn học chuyên ngành là ngày 30/10. Vui lòng đôn đốc các giảng viên.",
      time: "2 ngày trước",
      isUnread: false,
      category: "earlier",
    },
  ];

  return (
    <div className="flex-1 flex flex-col h-full overflow-hidden bg-[#f6f6f8] dark:bg-[#101622]">
      {/* Top Header & Filters */}
      <div className="flex-shrink-0 p-8 pb-0 max-w-[1000px] mx-auto w-full">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-[#0d121b] dark:text-white">
              Thông báo
            </h1>
            <p className="text-[#4c669a] dark:text-slate-400 mt-1 text-sm">
              Cập nhật tin tức và các hoạt động quan trọng trong bộ môn.
            </p>
          </div>
          <div className="flex gap-3">
            <HeaderButton icon="done_all" label="Đánh dấu đã đọc" />
            <HeaderButton icon="settings" label="Cài đặt" />
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <StatCard
            icon="gavel"
            label="Chờ duyệt"
            value="4"
            color="text-blue-600"
            bgColor="bg-blue-50"
            hasDot
            dotColor="bg-red-500"
          />
          <StatCard
            icon="rate_review"
            label="Phản biện mới"
            value="12"
            color="text-purple-600"
            bgColor="bg-purple-50"
            hasDot
            dotColor="bg-green-500"
          />
          <StatCard
            icon="campaign"
            label="Tin tức bộ môn"
            value="2"
            color="text-orange-600"
            bgColor="bg-orange-50"
          />
        </div>

        {/* Search & Filter Chips */}
        <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between bg-white dark:bg-[#1e293b] p-2 rounded-xl border border-[#e2e8f0] dark:border-[#334155] shadow-sm mb-6">
          <div className="relative w-full lg:w-96 group">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[#4c669a] group-focus-within:text-primary">
              search
            </span>
            <input
              className="block w-full pl-10 pr-3 py-2.5 bg-[#f6f6f8] dark:bg-slate-900 border-none rounded-lg text-sm dark:text-white outline-none focus:ring-2 focus:ring-primary/20"
              placeholder="Tìm kiếm thông báo..."
            />
          </div>
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar w-full lg:w-auto px-2">
            <FilterChip label="Tất cả" icon="view_list" active />
            <FilterChip label="Cần duyệt" icon="gavel" />
            <FilterChip label="Phản biện" icon="star" />
            <FilterChip label="Hệ thống" icon="dns" />
          </div>
        </div>
      </div>

      {/* Notification List Area */}
      <div className="flex-1 overflow-y-auto px-8 py-4">
        <div className="max-w-[1000px] mx-auto flex flex-col gap-4 pb-12">
          <SectionHeader title="Mới nhất" badge="Hôm nay" />
          <div className="bg-white dark:bg-[#1e293b] rounded-xl border border-[#e2e8f0] dark:border-[#334155] shadow-sm overflow-hidden divide-y divide-[#e2e8f0] dark:divide-[#334155]">
            {notifications
              .filter((n) => n.category === "today")
              .map((item) => (
                <NotificationRow key={item.id} {...item} />
              ))}
          </div>

          <SectionHeader title="Trước đó" />
          <div className="bg-white dark:bg-[#1e293b] rounded-xl border border-[#e2e8f0] dark:border-[#334155] shadow-sm overflow-hidden divide-y divide-[#e2e8f0] dark:divide-[#334155]">
            {notifications
              .filter((n) => n.category === "earlier")
              .map((item) => (
                <NotificationRow key={item.id} {...item} />
              ))}
          </div>

          <div className="mt-4 flex justify-center">
            <button className="text-sm text-[#4c669a] hover:text-primary font-medium flex items-center gap-2 transition-colors">
              Xem thêm thông báo cũ hơn{" "}
              <span className="material-symbols-outlined text-[18px]">
                expand_more
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- Sub-components for better maintainability ---

const HeaderButton = ({ icon, label }: { icon: string; label: string }) => (
  <button className="px-4 py-2 bg-white dark:bg-slate-800 border border-[#e2e8f0] dark:border-[#334155] rounded-lg text-sm font-medium hover:bg-gray-50 dark:hover:bg-slate-700 transition-colors flex items-center gap-2 shadow-sm dark:text-white">
    <span className="material-symbols-outlined text-[18px]">{icon}</span>{" "}
    {label}
  </button>
);

const StatCard = ({
  icon,
  label,
  value,
  color,
  bgColor,
  hasDot,
  dotColor,
}: any) => (
  <div className="flex flex-col p-5 bg-white dark:bg-[#1e293b] rounded-xl border border-[#e2e8f0] dark:border-[#334155] shadow-sm hover:shadow-md transition-shadow">
    <div className="flex items-start justify-between mb-4">
      <div className={`${bgColor} dark:bg-opacity-10 p-2 rounded-lg ${color}`}>
        <span className="material-symbols-outlined">{icon}</span>
      </div>
      {hasDot && (
        <span className={`flex h-2 w-2 rounded-full ${dotColor}`}></span>
      )}
    </div>
    <p className="text-[#4c669a] dark:text-slate-400 text-sm font-medium">
      {label}
    </p>
    <p className="text-3xl font-bold dark:text-white mt-1">{value}</p>
  </div>
);

const FilterChip = ({
  label,
  icon,
  active = false,
}: {
  label: string;
  icon: string;
  active?: boolean;
}) => (
  <button
    className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium shrink-0 transition-all ${
      active
        ? "bg-primary text-white shadow-sm"
        : "bg-[#f6f6f8] dark:bg-slate-800 text-[#4c669a] hover:bg-gray-200"
    }`}
  >
    <span className="material-symbols-outlined text-[18px]">{icon}</span>{" "}
    {label}
  </button>
);

const SectionHeader = ({ title, badge }: { title: string; badge?: string }) => (
  <div className="flex items-center justify-between px-2 mb-2 mt-4">
    <h3 className="font-semibold text-[#0d121b] dark:text-white">{title}</h3>
    {badge && (
      <span className="text-xs font-medium text-[#4c669a] uppercase tracking-wider">
        {badge}
      </span>
    )}
  </div>
);

const NotificationRow = ({
  type,
  title,
  content,
  time,
  from,
  isUnread,
}: any) => {
  const getIcon = () => {
    switch (type) {
      case "approval":
        return {
          icon: "gavel",
          color: "text-primary",
          bg: "bg-blue-100 dark:bg-blue-900/40",
        };
      case "review":
        return {
          icon: "rate_review",
          color: "text-purple-600",
          bg: "bg-purple-100 dark:bg-purple-900/40",
        };
      case "campaign":
        return {
          icon: "campaign",
          color: "text-orange-600",
          bg: "bg-orange-100 dark:bg-orange-900/40",
        };
      default:
        return {
          icon: "dns",
          color: "text-gray-500",
          bg: "bg-gray-100 dark:bg-slate-700",
        };
    }
  };
  const theme = getIcon();

  return (
    <div
      className={`group relative flex flex-col sm:flex-row gap-4 p-5 hover:bg-gray-50 dark:hover:bg-slate-800/50 transition-colors ${
        isUnread ? "bg-blue-50/30 dark:bg-blue-900/10" : ""
      }`}
    >
      {isUnread && (
        <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary"></div>
      )}
      <div className="shrink-0 pt-1">
        <div
          className={`size-10 rounded-full ${theme.bg} ${theme.color} flex items-center justify-center`}
        >
          <span className="material-symbols-outlined fill-1">{theme.icon}</span>
        </div>
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-4 mb-1">
          <h4
            className={`text-base truncate pr-4 ${
              isUnread
                ? "font-bold text-[#0d121b] dark:text-white"
                : "font-medium text-slate-600 dark:text-slate-300"
            }`}
          >
            {title}
          </h4>
          {isUnread && (
            <span className="flex items-center gap-1 text-xs font-medium text-primary bg-primary/10 px-2 py-0.5 rounded shrink-0">
              <span className="material-symbols-outlined text-[14px]">
                fiber_manual_record
              </span>{" "}
              Mới
            </span>
          )}
        </div>
        <p className="text-sm text-[#4c669a] dark:text-slate-400 leading-relaxed mb-3">
          {content}
        </p>
        <div className="flex items-center gap-4 text-xs text-[#4c669a] dark:text-slate-500">
          <span className="flex items-center gap-1">
            <span className="material-symbols-outlined text-[16px]">
              schedule
            </span>{" "}
            {time}
          </span>
          {from && (
            <span className="flex items-center gap-1">
              <span className="material-symbols-outlined text-[16px]">
                person
              </span>{" "}
              Từ: {from}
            </span>
          )}
        </div>
      </div>
      <div className="flex items-center sm:self-center shrink-0 pt-2 sm:pt-0">
        <button
          className={`px-4 py-2 text-sm font-medium rounded-lg transition-all w-full sm:w-auto ${
            type === "approval"
              ? "bg-primary text-white hover:bg-blue-700"
              : "bg-white dark:bg-slate-800 border border-[#e2e8f0] dark:border-[#334155] text-[#0d121b] dark:text-white hover:bg-gray-50"
          }`}
        >
          {type === "approval" ? "Xem xét ngay" : "Chi tiết"}
        </button>
      </div>
    </div>
  );
};

export default ThongBaoHod;
