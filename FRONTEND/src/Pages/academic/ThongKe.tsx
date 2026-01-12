import React from "react";

const ThongKe: React.FC = () => {
  return (
    <div className="flex flex-col gap-6 animate-in fade-in duration-500">
      {/* Page Heading */}
      <div className="flex flex-wrap justify-between gap-4 items-end border-b border-gray-200 dark:border-slate-700 pb-6">
        <div className="flex flex-col gap-1">
          <h1 className="text-slate-900 dark:text-white text-3xl font-black tracking-tight">
            Thống kê Chương trình Đào tạo
          </h1>
          <p className="text-slate-500 dark:text-slate-400 text-sm">
            Theo dõi số liệu và hiệu quả sử dụng giáo trình theo từng ngành học.
          </p>
        </div>
        <button className="flex items-center gap-2 bg-primary hover:bg-blue-600 text-white px-4 py-2.5 rounded-lg text-sm font-bold shadow-lg shadow-primary/20 transition-all active:scale-95">
          <span className="material-symbols-outlined text-[20px]">
            download
          </span>
          <span>Xuất báo cáo</span>
        </button>
      </div>

      {/* Filters Area */}
      <div className="bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-xl p-4 flex flex-col md:flex-row gap-4 items-end">
        <div className="flex-1 w-full grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="flex flex-col gap-1.5">
            <span className="text-slate-500 dark:text-slate-400 text-xs font-semibold uppercase tracking-wider">
              Khoa / Viện
            </span>
            <div className="relative">
              <select className="w-full appearance-none rounded-lg bg-gray-50 dark:bg-slate-900 border border-gray-200 dark:border-slate-700 text-slate-900 dark:text-white py-2 px-4 pr-10 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-sm outline-none">
                <option>Công nghệ Thông tin</option>
                <option>Kinh tế & Quản lý</option>
                <option>Điện tử Viễn thông</option>
              </select>
              <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">
                expand_more
              </span>
            </div>
          </div>
          <div className="flex flex-col gap-1.5">
            <span className="text-slate-500 dark:text-slate-400 text-xs font-semibold uppercase tracking-wider">
              Chương trình đào tạo
            </span>
            <div className="relative">
              <select className="w-full appearance-none rounded-lg bg-gray-50 dark:bg-slate-900 border border-gray-200 dark:border-slate-700 text-slate-900 dark:text-white py-2 px-4 pr-10 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-sm outline-none">
                <option>Kỹ thuật Phần mềm (CLC)</option>
                <option>Khoa học Máy tính</option>
                <option>Hệ thống Thông tin</option>
              </select>
              <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">
                expand_more
              </span>
            </div>
          </div>
          <div className="flex flex-col gap-1.5">
            <span className="text-slate-500 dark:text-slate-400 text-xs font-semibold uppercase tracking-wider">
              Năm học
            </span>
            <div className="relative">
              <select className="w-full appearance-none rounded-lg bg-gray-50 dark:bg-slate-900 border border-gray-200 dark:border-slate-700 text-slate-900 dark:text-white py-2 px-4 pr-10 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-sm outline-none">
                <option>2023 - 2024</option>
                <option>2022 - 2023</option>
                <option>2021 - 2022</option>
              </select>
              <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">
                expand_more
              </span>
            </div>
          </div>
        </div>
        <button className="h-[38px] px-6 bg-slate-900 dark:bg-primary text-white rounded-lg font-bold text-sm hover:opacity-90 transition-opacity shrink-0">
          Áp dụng
        </button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {[
          {
            label: "Tổng số Giáo trình",
            val: "124",
            color: "text-primary",
            bg: "bg-primary/10",
            icon: "library_books",
            trend: "+12%",
          },
          {
            label: "Môn học đã phủ",
            val: "48/52",
            color: "text-orange-500",
            bg: "bg-orange-500/10",
            icon: "layers",
            trend: "92%",
          },
          {
            label: "Đánh giá trung bình",
            val: "4.6",
            color: "text-yellow-500",
            bg: "bg-yellow-500/10",
            icon: "reviews",
            trend: "Rất tốt",
          },
          {
            label: "Lượt truy cập số",
            val: "15.2k",
            color: "text-purple-500",
            bg: "bg-purple-500/10",
            icon: "visibility",
            trend: "+8.5%",
          },
        ].map((card, idx) => (
          <div
            key={idx}
            className="bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-xl p-5 flex items-start justify-between group hover:shadow-md transition-all"
          >
            <div className="flex flex-col gap-1">
              <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">
                {card.label}
              </p>
              <h3 className="text-slate-900 dark:text-white text-3xl font-bold">
                {card.val}
              </h3>
              <div className="flex items-center gap-1 text-emerald-500 text-xs font-bold mt-1">
                <span className="material-symbols-outlined text-[14px]">
                  trending_up
                </span>
                <span>{card.trend}</span>
              </div>
            </div>
            <div
              className={`size-10 rounded-lg ${card.bg} flex items-center justify-center ${card.color}`}
            >
              <span className="material-symbols-outlined">{card.icon}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Bar Chart Mockup */}
        <div className="lg:col-span-2 bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-xl p-6">
          <div className="flex justify-between items-center mb-8">
            <h3 className="text-slate-900 dark:text-white text-lg font-bold">
              Số lượng giáo trình theo kỳ học
            </h3>
            <button className="text-primary hover:underline text-sm font-bold flex items-center gap-1">
              Chi tiết{" "}
              <span className="material-symbols-outlined text-[16px]">
                arrow_forward
              </span>
            </button>
          </div>
          <div className="flex items-end justify-between gap-2 h-48 border-b border-gray-100 dark:border-slate-700 pb-2">
            {[32, 40, 24, 56, 48, 36, 20, 16].map((h, idx) => (
              <div
                key={idx}
                className="flex flex-col items-center gap-2 flex-1 group"
              >
                <div
                  className="w-full max-w-[32px] bg-primary/20 dark:bg-primary/30 rounded-t-sm group-hover:bg-primary transition-all duration-300 relative"
                  style={{ height: `${h * 2}px` }}
                >
                  <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-[10px] font-bold py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                    {Math.floor(h / 2)}
                  </div>
                </div>
                <span className="text-slate-400 text-[10px] font-bold">
                  HK{idx + 1}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Donut Chart Mockup */}
        <div className="bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-xl p-6 flex flex-col items-center">
          <h3 className="text-slate-900 dark:text-white text-lg font-bold self-start mb-6">
            Tỷ lệ số hóa
          </h3>
          <div
            className="relative size-40 rounded-full flex items-center justify-center mb-6"
            style={{
              background: "conic-gradient(#135bec 0% 75%, #e2e8f0 75% 100%)",
            }}
          >
            <div className="size-28 bg-white dark:bg-slate-800 rounded-full flex flex-col items-center justify-center shadow-inner">
              <span className="text-3xl font-black text-slate-900 dark:text-white">
                75%
              </span>
              <span className="text-[10px] text-slate-500 font-bold uppercase tracking-tight">
                E-Book
              </span>
            </div>
          </div>
          <div className="flex w-full justify-around pt-4 border-t border-gray-50 dark:border-slate-700">
            <div className="flex items-center gap-2">
              <div className="size-2 rounded-full bg-primary"></div>
              <span className="text-xs font-bold dark:text-white">
                93 E-book
              </span>
            </div>
            <div className="flex items-center gap-2">
              <div className="size-2 rounded-full bg-gray-200"></div>
              <span className="text-xs font-bold dark:text-white">
                31 Bản in
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Leaderboard Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pb-8">
        {/* Trend Line Chart (SVG) */}
        <div className="bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-xl p-6">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h3 className="text-slate-900 dark:text-white text-lg font-bold">
                Xu hướng truy cập
              </h3>
              <p className="text-slate-500 text-xs mt-1">6 tháng gần nhất</p>
            </div>
            <div className="flex items-center gap-2 text-[10px] font-bold text-primary bg-primary/5 px-2 py-1 rounded">
              <span className="size-2 bg-primary rounded-full"></span> LƯỢT XEM
            </div>
          </div>
          <div className="w-full h-48 mt-4">
            <svg
              className="w-full h-full"
              viewBox="0 0 500 200"
              preserveAspectRatio="none"
            >
              <path
                d="M0,150 Q50,120 100,130 T200,90 T300,60 T400,80 T500,20"
                fill="none"
                stroke="#135bec"
                strokeWidth="4"
                strokeLinecap="round"
              />
              <path
                d="M0,150 Q50,120 100,130 T200,90 T300,60 T400,80 T500,20 V200 H0 Z"
                fill="url(#lineGradient)"
                opacity="0.1"
              />
              <defs>
                <linearGradient id="lineGradient" x1="0" x2="0" y1="0" y2="1">
                  <stop offset="0%" stopColor="#135bec" />
                  <stop offset="100%" stopColor="transparent" />
                </linearGradient>
              </defs>
            </svg>
            <div className="flex justify-between mt-2 text-[10px] font-bold text-slate-400">
              <span>T2</span>
              <span>T3</span>
              <span>T4</span>
              <span>T5</span>
              <span>T6</span>
              <span>T7</span>
            </div>
          </div>
        </div>

        {/* Top Textbooks List */}
        <div className="bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-xl p-6">
          <h3 className="text-slate-900 dark:text-white text-lg font-bold mb-4">
            Giáo trình phổ biến nhất
          </h3>
          <div className="space-y-4">
            {[
              {
                title: "Nhập môn Kỹ thuật Phần mềm",
                author: "TS. Nguyễn Văn A",
                views: "2.4k",
              },
              {
                title: "Cấu trúc dữ liệu & Giải thuật",
                author: "PGS. Trần Thị B",
                views: "1.8k",
              },
              {
                title: "Hệ quản trị Cơ sở dữ liệu",
                author: "ThS. Lê Văn C",
                views: "1.5k",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="flex items-center gap-4 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-slate-900 transition-colors cursor-pointer group"
              >
                <span className="text-lg font-black text-slate-300 group-hover:text-primary">
                  {i + 1}
                </span>
                <div className="size-10 bg-slate-100 dark:bg-slate-700 rounded shrink-0 flex items-center justify-center">
                  <span className="material-symbols-outlined text-slate-400">
                    book
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white truncate">
                    {item.title}
                  </h4>
                  <p className="text-xs text-slate-500 truncate">
                    {item.author}
                  </p>
                </div>
                <div className="text-right">
                  <span className="text-sm font-bold text-primary">
                    {item.views}
                  </span>
                  <p className="text-[10px] font-bold text-slate-400 uppercase">
                    Views
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ThongKe;
