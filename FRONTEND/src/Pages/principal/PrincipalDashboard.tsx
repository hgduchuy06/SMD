import React from "react";

const PrincipalDashboard: React.FC = () => {
  const stats = [
    {
      label: "Tổng số Giáo trình",
      value: "1,250",
      trend: "+12%",
      icon: "library_books",
      color: "blue",
      isTrending: true,
    },
    {
      label: "Chờ duyệt",
      value: "15",
      trend: "5 Mới",
      icon: "pending_actions",
      color: "orange",
      isTrending: false,
    },
    {
      label: "Tỷ lệ Số hóa",
      value: "85%",
      trend: "+2%",
      icon: "cloud_upload",
      color: "purple",
      isTrending: false,
    },
    {
      label: "Sinh viên Active",
      value: "3,420",
      trend: "+8%",
      icon: "groups",
      color: "teal",
      isTrending: false,
    },
  ];

  return (
    /* THAY ĐỔI TẠI ĐÂY: Thay max-w-[1200px] mx-auto bằng w-full */
    <div className="w-full flex flex-col gap-8 pb-12">
      {/* Heading */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white tracking-tight">
            Dashboard Tổng quan
          </h2>
          <p className="text-gray-500 dark:text-gray-400 mt-1">
            Chào mừng trở lại. Đây là tóm tắt hoạt động trong ngày của trường.
          </p>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-500 bg-white dark:bg-gray-800 px-3 py-1.5 rounded-lg border border-gray-200 shadow-sm">
          <span className="material-symbols-outlined text-[18px]">
            calendar_today
          </span>
          <span>Tháng 10, 2023 - Học kỳ I</span>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, i) => (
          <div
            key={i}
            className="bg-white dark:bg-gray-900 rounded-xl p-5 border border-gray-100 dark:border-gray-800 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex items-center justify-between mb-4">
              <div
                className={`p-2 rounded-lg ${
                  stat.color === "blue"
                    ? "bg-blue-50 text-blue-600"
                    : stat.color === "orange"
                    ? "bg-orange-50 text-orange-600"
                    : stat.color === "purple"
                    ? "bg-purple-50 text-purple-600"
                    : "bg-teal-50 text-teal-600"
                }`}
              >
                <span className="material-symbols-outlined">{stat.icon}</span>
              </div>
              <span
                className={`text-xs font-medium px-2 py-1 rounded-full flex items-center gap-1 ${
                  stat.color === "orange"
                    ? "text-orange-600 bg-orange-50"
                    : "text-green-600 bg-green-50"
                }`}
              >
                {stat.isTrending && (
                  <span className="material-symbols-outlined text-[14px]">
                    trending_up
                  </span>
                )}
                {stat.trend}
              </span>
            </div>
            <p className="text-gray-500 dark:text-gray-400 text-sm font-medium">
              {stat.label}
            </p>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
              {stat.value}
            </h3>
          </div>
        ))}
      </div>

      {/* Chart Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-white dark:bg-gray-900 p-6 rounded-xl border border-gray-100 dark:border-gray-800 shadow-sm flex flex-col">
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Trạng thái Phê duyệt
            </h3>
            <p className="text-sm text-gray-500">Tổng quan học kỳ hiện tại</p>
          </div>
          <div className="space-y-6 flex-1 flex flex-col justify-center">
            <ProgressBar
              label="Đã duyệt (Approved)"
              value={950}
              total={1250}
              color="bg-green-500"
            />
            <ProgressBar
              label="Đang chờ (Pending)"
              value={150}
              total={1250}
              color="bg-[#135bec]"
            />
            <ProgressBar
              label="Từ chối / Chỉnh sửa"
              value={150}
              total={1250}
              color="bg-red-500"
            />
          </div>
          <div className="mt-6 pt-4 border-t border-gray-100 flex justify-between text-sm">
            <span className="text-gray-500">Tổng cộng</span>
            <span className="font-bold text-gray-900">1,250 hồ sơ</span>
          </div>
        </div>

        <div className="lg:col-span-2 bg-white dark:bg-gray-900 p-6 rounded-xl border border-gray-100 dark:border-gray-800 shadow-sm flex flex-col">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Xu hướng Sử dụng
              </h3>
              <p className="text-sm text-gray-500">
                Lượt xem tài liệu trong 6 tháng qua
              </p>
            </div>
            <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-1 flex">
              <button className="px-3 py-1 bg-white dark:bg-gray-700 shadow-sm rounded-md text-xs font-medium text-gray-900 dark:text-white">
                Tháng
              </button>
              <button className="px-3 py-1 text-xs font-medium text-gray-500">
                Quý
              </button>
            </div>
          </div>
          <div className="flex-1 min-h-[220px] w-full relative">
            <svg
              className="w-full h-full"
              preserveAspectRatio="none"
              viewBox="0 0 800 250"
            >
              <defs>
                <linearGradient id="chartGradient" x1="0" x2="0" y1="0" y2="1">
                  <stop offset="0%" stopColor="#135bec" stopOpacity="0.2" />
                  <stop offset="100%" stopColor="#135bec" stopOpacity="0" />
                </linearGradient>
              </defs>
              <path
                d="M0 200 Q 150 180 250 150 T 450 120 T 650 50 T 800 80 V 250 H 0 Z"
                fill="url(#chartGradient)"
              />
              <path
                d="M0 200 Q 150 180 250 150 T 450 120 T 650 50 T 800 80"
                fill="none"
                stroke="#135bec"
                strokeWidth="3"
                strokeLinecap="round"
              />
              {[250, 450, 650].map((cx, i) => (
                <circle
                  key={i}
                  cx={cx}
                  cy={[150, 120, 50][i]}
                  r="4"
                  fill="white"
                  stroke="#135bec"
                  strokeWidth="2"
                />
              ))}
            </svg>
            <div className="flex justify-between mt-2 text-xs text-gray-400 px-2 font-medium">
              <span>Thg 5</span>
              <span>Thg 6</span>
              <span>Thg 7</span>
              <span>Thg 8</span>
              <span>Thg 9</span>
              <span>Thg 10</span>
            </div>
          </div>
        </div>
      </div>

      {/* Table Section */}
      <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-100 dark:border-gray-800 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-gray-100 flex justify-between items-center">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Cần phê duyệt chiến lược
            </h3>
            <p className="text-sm text-gray-500">
              Danh sách các giáo trình trọng điểm đang chờ ý kiến
            </p>
          </div>
          <div className="flex gap-2">
            <button className="px-4 py-2 text-sm font-medium text-gray-600 bg-gray-50 rounded-lg">
              Lọc: Tất cả
            </button>
            <button className="bg-[#135bec] hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 transition-colors">
              <span className="material-symbols-outlined text-[18px]">
                done_all
              </span>{" "}
              Duyệt nhanh
            </button>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-50/50 dark:bg-gray-800/50 border-b border-gray-100">
              <tr>
                <th className="px-6 py-4 text-[11px] font-bold text-gray-500 uppercase tracking-wider">
                  Tên giáo trình
                </th>
                <th className="px-6 py-4 text-[11px] font-bold text-gray-500 uppercase tracking-wider text-center">
                  Khoa / Bộ môn
                </th>
                <th className="px-6 py-4 text-[11px] font-bold text-gray-500 uppercase tracking-wider">
                  Người trình
                </th>
                <th className="px-6 py-4 text-[11px] font-bold text-gray-500 uppercase tracking-wider text-center">
                  Trạng thái
                </th>
                <th className="px-6 py-4 text-[11px] font-bold text-gray-500 uppercase tracking-wider text-right">
                  Hành động
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
              <TableRow
                title="Toán cao cấp A1"
                code="MAT101 • V1.2"
                dept="Khoa Toán - Tin"
                author="TS. Nguyễn Văn A"
                status="Chờ duyệt"
                statusType="warning"
              />
              <TableRow
                title="Vật lý đại cương II"
                code="PHY102 • V2.0"
                dept="Khoa Vật lý"
                author="TS. Lê Thị B"
                status="Gấp"
                statusType="danger"
              />
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

const ProgressBar = ({ label, value, total, color }: any) => (
  <div className="space-y-2">
    <div className="flex justify-between text-sm">
      <span className="font-medium text-gray-700 dark:text-gray-300">
        {label}
      </span>
      <span className="font-bold text-gray-900 dark:text-white">{value}</span>
    </div>
    <div className="w-full bg-gray-100 dark:bg-gray-800 rounded-full h-2.5 overflow-hidden">
      <div
        className={`${color} h-full rounded-full`}
        style={{ width: `${(value / total) * 100}%` }}
      ></div>
    </div>
  </div>
);

const TableRow = ({ title, code, dept, author, status, statusType }: any) => (
  <tr className="hover:bg-gray-50/50 transition-colors group">
    <td className="px-6 py-4">
      <div className="text-sm font-semibold text-gray-900 dark:text-white">
        {title}
      </div>
      <div className="text-xs text-gray-500">Mã: {code}</div>
    </td>
    <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-300 text-center">
      {dept}
    </td>
    <td className="px-6 py-4">
      <div className="flex items-center gap-2">
        <div className="h-6 w-6 rounded-full bg-gray-200 overflow-hidden">
          <img src={`https://i.pravatar.cc/150?u=${author}`} alt="avatar" />
        </div>
        <span className="text-sm text-gray-700 dark:text-gray-300">
          {author}
        </span>
      </div>
    </td>
    <td className="px-6 py-4 text-center">
      <span
        className={`px-3 py-1 rounded-full text-[11px] font-bold ${
          statusType === "warning"
            ? "bg-yellow-100 text-yellow-700"
            : "bg-red-100 text-red-700"
        }`}
      >
        {status}
      </span>
    </td>
    <td className="px-6 py-4 text-right">
      <button className="text-[#135bec] hover:text-blue-700 text-sm font-bold">
        Xem chi tiết
      </button>
    </td>
  </tr>
);

export default PrincipalDashboard;
