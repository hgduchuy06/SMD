import React from "react";

const CauHinhHeThong: React.FC = () => {
  // Dữ liệu mẫu cho danh sách học kỳ
  const semesters = [
    {
      name: "Học kỳ 1",
      year: "2024-2025",
      code: "HK1_2425",
      time: "05/09/2024 - 15/01/2025",
      status: "Hoạt động",
      color: "bg-green-500",
    },
    {
      name: "Học kỳ 2",
      year: "2024-2025",
      code: "HK2_2425",
      time: "20/01/2025 - 30/05/2025",
      status: "Sắp tới",
      color: "bg-blue-500",
    },
    {
      name: "Học kỳ Hè",
      year: "2023-2024",
      code: "HK3_2324",
      time: "01/06/2024 - 15/08/2024",
      status: "Đã đóng",
      color: "bg-gray-400",
    },
    {
      name: "Học kỳ 2",
      year: "2023-2024",
      code: "HK2_2324",
      time: "15/01/2024 - 30/05/2024",
      status: "Đã đóng",
      color: "bg-gray-400",
    },
  ];

  return (
    <div className="max-w-[1200px] mx-auto flex flex-col gap-6 p-6 md:p-8">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div className="flex flex-col gap-2">
          <h2 className="text-3xl md:text-4xl font-display font-black tracking-tight text-[#0d121b] dark:text-white">
            Cấu hình Hệ thống
          </h2>
          <p className="text-[#4c669a] text-base max-w-2xl">
            Quản lý học kỳ, thang điểm, mẫu đề cương, nội dung và quy tắc nghiệp
            vụ.
          </p>
        </div>
        <button className="flex items-center justify-center gap-2 px-4 py-2 bg-white dark:bg-surface-dark border border-[#e7ebf3] dark:border-border-dark rounded-lg shadow-sm text-[#0d121b] dark:text-white font-medium hover:bg-gray-50 transition-all">
          <span className="material-symbols-outlined text-[20px]">history</span>
          <span>Lịch sử thay đổi</span>
        </button>
      </div>

      {/* Tabs Navigation */}
      <div className="w-full border-b border-[#e7ebf3] dark:border-border-dark">
        <div className="flex gap-8 overflow-x-auto no-scrollbar">
          <TabButton icon="calendar_month" label="Quản lý Học kỳ" active />
          <TabButton icon="score" label="Thang điểm" />
          <TabButton icon="description" label="Template CLO/PLO" />
          <TabButton icon="gavel" label="Quy trình & Quy tắc" />
          <TabButton icon="edit_document" label="Nội dung Tĩnh" />
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <StatCard
          icon="event_available"
          label="Học kỳ hiện tại"
          value="HK1 2024-2025"
          subValue="Đang diễn ra"
          color="text-primary"
          bgColor="bg-blue-50"
        />
        <StatCard
          icon="date_range"
          label="Tuần học"
          value="Tuần 8 / 15"
          subValue="Kết thúc: 15/01/2025"
          color="text-purple-600"
          bgColor="bg-purple-50"
        />
        <StatCard
          icon="upcoming"
          label="Học kỳ tiếp theo"
          value="HK2 2024-2025"
          subValue="Bắt đầu: 20/01/2025"
          color="text-orange-600"
          bgColor="bg-orange-50"
        />
      </div>

      {/* Filter & Actions */}
      <div className="flex flex-col sm:flex-row justify-between gap-4 items-center bg-white dark:bg-surface-dark p-4 rounded-xl border border-[#e7ebf3] dark:border-border-dark shadow-sm">
        <div className="relative w-full sm:w-96">
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[#4c669a] text-[20px]">
            search
          </span>
          <input
            className="w-full pl-10 pr-4 py-2 rounded-lg border border-[#e7ebf3] dark:border-border-dark bg-[#f6f6f8] dark:bg-background-dark text-[#0d121b] dark:text-white focus:ring-2 focus:ring-primary outline-none text-sm"
            placeholder="Tìm kiếm học kỳ, năm học..."
            type="text"
          />
        </div>
        <div className="flex gap-3 w-full sm:w-auto">
          <button className="flex-1 sm:flex-none px-4 py-2 border border-[#e7ebf3] dark:border-border-dark rounded-lg text-sm font-medium hover:text-primary transition-colors">
            Bộ lọc
          </button>
          <button className="flex-1 sm:flex-none px-4 py-2 bg-primary text-white rounded-lg shadow-md text-sm font-medium hover:bg-blue-700 transition-colors">
            Thêm Học kỳ
          </button>
        </div>
      </div>

      {/* Table Section */}
      <div className="bg-white dark:bg-surface-dark rounded-xl border border-[#e7ebf3] dark:border-border-dark shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 dark:bg-gray-800/50 border-b border-[#e7ebf3] dark:border-border-dark text-xs uppercase text-[#4c669a] font-semibold">
                <th className="px-6 py-4">Tên Học kỳ</th>
                <th className="px-6 py-4">Mã HK</th>
                <th className="px-6 py-4">Thời gian</th>
                <th className="px-6 py-4 text-center">Trạng thái</th>
                <th className="px-6 py-4 text-right">Thao tác</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {semesters.map((item, idx) => (
                <tr
                  key={idx}
                  className={`group border-b border-[#e7ebf3] dark:border-border-dark hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors ${
                    item.status === "Đã đóng" ? "opacity-75" : ""
                  }`}
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div
                        className={`size-2 rounded-full ${item.color}`}
                      ></div>
                      <div>
                        <p className="font-bold text-[#0d121b] dark:text-white">
                          {item.name}
                        </p>
                        <p className="text-xs text-[#4c669a]">
                          Năm học {item.year}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 font-mono text-[#4c669a]">
                    {item.code}
                  </td>
                  <td className="px-6 py-4 text-[#0d121b] dark:text-gray-300">
                    {item.time}
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusStyle(
                        item.status
                      )}`}
                    >
                      {item.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity">
                      <button className="p-2 text-[#4c669a] hover:text-primary">
                        <span className="material-symbols-outlined text-[20px]">
                          edit
                        </span>
                      </button>
                      <button className="p-2 text-[#4c669a] hover:text-primary">
                        <span className="material-symbols-outlined text-[20px]">
                          settings
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

      {/* Feature Cards Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Rules Card */}
        <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-xl p-6 text-white shadow-lg relative overflow-hidden group cursor-pointer">
          <span className="material-symbols-outlined absolute right-0 top-0 opacity-10 text-[200px] translate-x-10 -translate-y-10 group-hover:scale-110 transition-transform">
            gavel
          </span>
          <div className="relative z-10">
            <h3 className="text-xl font-bold mb-2">Quy tắc & Quy trình</h3>
            <p className="text-sm opacity-80 mb-4">
              Thiết lập luồng duyệt tự động và các quy tắc nghiệp vụ.
            </p>
            <button className="px-4 py-2 bg-white/20 backdrop-blur-sm rounded-lg text-sm font-medium border border-white/10">
              Thiết lập ngay
            </button>
          </div>
        </div>

        {/* Scoring Card */}
        <div className="bg-white dark:bg-surface-dark border border-[#e7ebf3] dark:border-border-dark rounded-xl p-6 shadow-sm hover:border-primary/50 transition-colors cursor-pointer">
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-lg font-bold text-[#0d121b] dark:text-white">
              Cấu hình Thang điểm
            </h3>
            <span className="material-symbols-outlined text-[#4c669a]">
              score
            </span>
          </div>
          <p className="text-sm text-[#4c669a] mb-3">
            Quản lý thang điểm 10, thang điểm 4 và quy tắc làm tròn.
          </p>
          <div className="flex gap-2">
            <span className="px-2 py-1 bg-purple-50 dark:bg-purple-900/20 text-purple-700 text-xs rounded">
              Thang 10/4
            </span>
            <span className="px-2 py-1 bg-purple-50 dark:bg-purple-900/20 text-purple-700 text-xs rounded">
              Làm tròn
            </span>
          </div>
        </div>

        {/* Templates Card */}
        <div className="bg-white dark:bg-surface-dark border border-[#e7ebf3] dark:border-border-dark rounded-xl p-6 shadow-sm hover:border-primary/50 transition-colors cursor-pointer">
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-lg font-bold text-[#0d121b] dark:text-white">
              Mẫu CLO/PLO
            </h3>
            <span className="material-symbols-outlined text-[#4c669a]">
              description
            </span>
          </div>
          <div className="space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-[#4c669a]">Template Kỹ thuật</span>
              <span className="font-medium text-[#0d121b] dark:text-white">
                V.2.1
              </span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 h-1.5 rounded-full overflow-hidden">
              <div
                className="bg-orange-500 h-full"
                style={{ width: "70%" }}
              ></div>
            </div>
            <p className="text-xs text-[#4c669a]">70% giáo trình đã cập nhật</p>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- Sub-components for better organization ---

const TabButton = ({
  icon,
  label,
  active = false,
}: {
  icon: string;
  label: string;
  active?: boolean;
}) => (
  <button
    className={`flex items-center gap-2 border-b-[3px] pb-3 pt-2 px-1 whitespace-nowrap transition-colors ${
      active
        ? "border-primary text-primary"
        : "border-transparent text-[#4c669a] hover:text-[#0d121b]"
    }`}
  >
    <span className="material-symbols-outlined text-[20px]">{icon}</span>
    <span className="text-sm font-bold tracking-wide">{label}</span>
  </button>
);

const StatCard = ({ icon, label, value, subValue, color, bgColor }: any) => (
  <div className="bg-white dark:bg-surface-dark p-5 rounded-xl border border-[#e7ebf3] dark:border-border-dark shadow-sm flex items-center gap-4">
    <div
      className={`size-12 rounded-full ${bgColor} flex items-center justify-center ${color}`}
    >
      <span className="material-symbols-outlined">{icon}</span>
    </div>
    <div>
      <p className="text-[#4c669a] text-xs font-medium uppercase tracking-wider">
        {label}
      </p>
      <p className="text-lg font-bold text-[#0d121b] dark:text-white">
        {value}
      </p>
      <p
        className={`text-xs ${
          subValue.includes("Đang diễn ra")
            ? "text-green-600"
            : "text-[#4c669a]"
        } font-medium`}
      >
        {subValue}
      </p>
    </div>
  </div>
);

const getStatusStyle = (status: string) => {
  switch (status) {
    case "Hoạt động":
      return "bg-green-100 text-green-700 border-green-200 dark:bg-green-900/30 dark:text-green-400";
    case "Sắp tới":
      return "bg-blue-100 text-blue-700 border-blue-200 dark:bg-blue-900/30 dark:text-blue-400";
    default:
      return "bg-gray-100 text-gray-700 border-gray-200 dark:bg-gray-800 dark:text-gray-400";
  }
};

export default CauHinhHeThong;
