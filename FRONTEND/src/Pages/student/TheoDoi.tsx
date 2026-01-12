import React, { useState } from "react";

const TheoDoi: React.FC = () => {
  const [trackedItems] = useState([
    {
      id: "GT-INT3306",
      title: "Phát triển Ứng dụng Web",
      description:
        "Cập nhật chương về ReactJS và NodeJS mới nhất. Bổ sung bài tập thực hành tuần 5.",
      status: "updating",
      department: "Khoa CNTT",
      lastUpdated: "2 giờ trước",
      icon: "terminal",
      iconBg: "bg-blue-50",
      iconColor: "text-primary",
      notify: true,
    },
    {
      id: "GT-INT3202",
      title: "Hệ quản trị CSDL",
      description:
        "Nội dung chuẩn hóa về các mô hình dữ liệu, ngôn ngữ truy vấn SQL và tối ưu hóa.",
      status: "stable",
      department: "Khoa CNTT",
      lastUpdated: "3 tuần trước",
      icon: "database",
      iconBg: "bg-orange-50",
      iconColor: "text-orange-600",
      notify: false,
    },
    {
      id: "GT-PHI1005",
      title: "Tâm lý học đại cương",
      description:
        "Giáo trình bản mềm, bao gồm các bài đọc thêm về hành vi xã hội.",
      status: "stable",
      department: "Khoa KHXH&NV",
      lastUpdated: "2 tháng trước",
      icon: "psychology",
      iconBg: "bg-purple-50",
      iconColor: "text-purple-600",
      notify: true,
    },
    {
      id: "GT-MAT1093",
      title: "Giải tích 1",
      description: "Cập nhật ví dụ và bài tập phần Tích phân suy rộng.",
      status: "incoming",
      department: "Khoa Toán - Cơ",
      lastUpdated: "5 ngày trước",
      icon: "calculate",
      iconBg: "bg-teal-50",
      iconColor: "text-teal-600",
      notify: true,
    },
    {
      id: "GT-ENG1001",
      title: "Tiếng Anh A1",
      description: "File nghe và bài tập bổ trợ kỹ năng giao tiếp cơ bản.",
      status: "stable",
      department: "Khoa Ngoại Ngữ",
      lastUpdated: "1 tháng trước",
      icon: "translate",
      iconBg: "bg-rose-50",
      iconColor: "text-rose-600",
      notify: false,
    },
  ]);

  return (
    <div className="flex-1 bg-[#f6f6f8]">
      <div className="mx-auto max-w-[1280px] px-6 py-8">
        {/* Title */}
        <h1 className="text-4xl font-black mb-2">Theo dõi Giáo trình</h1>
        <p className="text-[#4c669a] mb-8 max-w-2xl">
          Quản lý danh sách các giáo trình bạn quan tâm, nhận thông báo ngay lập
          tức về thay đổi nội dung và các tài liệu số hóa mới nhất.
        </p>

        {/* Summary */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
          <SummaryCard
            label="Đang theo dõi"
            value="12 giáo trình"
            icon="bookmarks"
          />
          <SummaryCard
            label="Cập nhật tuần này"
            value="3 giáo trình"
            icon="edit_document"
          />
          <SummaryCard label="Thông báo mới" value="5" icon="notifications" />
        </div>

        {/* Toolbar */}
        <div className="flex justify-between items-center bg-white p-3 rounded-xl border mb-6">
          <div className="flex gap-2">
            <ToolbarButton icon="filter_list" label="Lọc" />
            <ToolbarButton icon="sort" label="Sắp xếp" />
          </div>
          <button className="bg-primary text-white px-5 py-2 rounded-lg font-semibold flex items-center gap-2">
            <span className="material-symbols-outlined">add_circle</span>
            Theo dõi giáo trình mới
          </button>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {trackedItems.map((item) => (
            <TrackedCard key={item.id} {...item} />
          ))}

          {/* Discover */}
          <div className="flex flex-col items-center justify-center border-2 border-dashed rounded-xl bg-white text-center">
            <div className="size-14 rounded-full border flex items-center justify-center mb-3">
              <span className="material-symbols-outlined text-3xl">add</span>
            </div>
            <h3 className="font-bold">Khám phá thêm</h3>
            <p className="text-sm text-[#4c669a] mt-1">
              Tìm kiếm các giáo trình khác trong hệ thống
            </p>
          </div>
        </div>

        <p className="text-center text-sm text-[#4c669a] mt-6">
          Hiển thị 5/12 giáo trình đang theo dõi
        </p>
      </div>
    </div>
  );
};

/* ---------------- COMPONENTS ---------------- */

const SummaryCard = ({ label, value, icon }: any) => (
  <div className="bg-white border rounded-xl p-5">
    <div className="flex items-center gap-2 text-primary mb-1">
      <span className="material-symbols-outlined">{icon}</span>
      <span className="text-sm font-medium">{label}</span>
    </div>
    <p className="text-3xl font-bold">{value}</p>
  </div>
);

const ToolbarButton = ({ icon, label }: any) => (
  <button className="flex items-center gap-2 px-4 py-2 border rounded-lg text-sm">
    <span className="material-symbols-outlined">{icon}</span>
    {label}
  </button>
);

const TrackedCard = ({
  id,
  title,
  description,
  status,
  department,
  lastUpdated,
  icon,
  iconBg,
  iconColor,
  notify,
}: any) => {
  const [isNotify, setIsNotify] = useState(notify);

  return (
    <div className="bg-white border rounded-xl p-5 flex flex-col">
      {/* Header */}
      <div className="flex justify-between mb-3">
        <div className="flex gap-3">
          <div
            className={`size-12 rounded-lg ${iconBg} flex items-center justify-center ${iconColor}`}
          >
            <span className="material-symbols-outlined text-2xl">{icon}</span>
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-[10px] bg-gray-100 px-2 py-0.5 rounded font-semibold">
              {id}
            </span>
            <h3 className="font-bold line-clamp-1">{title}</h3>
          </div>
        </div>
        <span className="material-symbols-outlined text-[#4c669a] cursor-pointer">
          bookmark
        </span>
      </div>

      {/* Description */}
      <p className="text-sm text-[#4c669a] line-clamp-2 mb-3">{description}</p>

      {/* Status */}
      <div className="flex items-center gap-2 mb-4">
        <StatusBadge type={status} />
        <span className="text-xs text-[#4c669a]">{department}</span>
      </div>

      {/* Footer */}
      <div className="mt-auto pt-4 border-t flex justify-between items-center text-xs text-[#4c669a]">
        <div className="flex items-center gap-1">
          <span className="material-symbols-outlined text-[16px]">history</span>
          {lastUpdated}
        </div>

        {/* Toggle */}
        <div className="flex items-center gap-2">
          Nhận thông báo
          <label className="relative inline-flex cursor-pointer items-center">
            <input
              type="checkbox"
              checked={isNotify}
              onChange={() => setIsNotify(!isNotify)}
              className="sr-only peer"
            />
            <div
              className="w-9 h-5 bg-gray-200 rounded-full peer peer-checked:bg-primary
              after:content-[''] after:absolute after:top-[2px] after:left-[2px]
              after:bg-white after:rounded-full after:h-4 after:w-4
              after:transition-all peer-checked:after:translate-x-4"
            ></div>
          </label>
        </div>
      </div>
    </div>
  );
};

const StatusBadge = ({ type }: any) => {
  const map: any = {
    updating: "bg-green-100 text-green-700",
    stable: "bg-blue-100 text-blue-700",
    incoming: "bg-yellow-100 text-yellow-700",
  };
  const label: any = {
    updating: "Đang cập nhật",
    stable: "Ổn định",
    incoming: "Sắp có thay đổi",
  };

  return (
    <span
      className={`text-[10px] font-bold px-2.5 py-1 rounded-full ${map[type]}`}
    >
      {label[type]}
    </span>
  );
};

export default TheoDoi;
