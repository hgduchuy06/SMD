import React from "react";

const TraCuuPhanTich: React.FC = () => {
  // Dữ liệu mẫu cho bảng giáo trình
  const curriculumData = [
    {
      id: 1,
      name: "Giáo trình Lập trình Hướng đối tượng Java",
      author: "TS. Nguyễn Văn A",
      dept: "Công nghệ thông tin",
      year: 2022,
      format: "PDF + Sách in",
      usage: "1,205 lượt",
      rating: 4.8,
      status: "good",
    },
    {
      id: 2,
      name: "Kinh tế vi mô đại cương",
      author: "PGS.TS. Trần Thị B",
      dept: "Kinh tế",
      year: 2018,
      format: "Sách in",
      usage: "850 lượt",
      rating: 3.5,
      status: "update",
    },
    {
      id: 3,
      name: "Luật Dân sự Việt Nam - Tập 1",
      author: "TS. Lê Văn C",
      dept: "Luật",
      year: 2023,
      format: "E-book",
      usage: "2,100 lượt",
      rating: 4.9,
      status: "good",
    },
    {
      id: 4,
      name: "Tiếng Anh chuyên ngành Xây dựng",
      author: "ThS. Phạm Thị D",
      dept: "Ngoại ngữ",
      year: 2021,
      format: "PDF + Sách in",
      usage: "950 lượt",
      rating: 4.5,
      status: "good",
    },
    {
      id: 5,
      name: "Kết cấu bê tông cốt thép",
      author: "PGS.TS. Đặng Hùng V",
      dept: "Xây dựng",
      year: 2020,
      format: "Sách in",
      usage: "600 lượt",
      rating: 4.2,
      status: "good",
    },
  ];

  return (
    <div className="flex-1 w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-8 bg-[#f6f6f8] dark:bg-[#101622]">
      {/* Page Heading */}
      <div className="flex flex-wrap justify-between items-end gap-4 px-4 mb-8">
        <div className="flex flex-col gap-2">
          <h1 className="text-[#0d121b] dark:text-white text-3xl md:text-4xl font-black tracking-tight">
            Tra cứu & Phân tích Giáo trình
          </h1>
          <p className="text-[#4c669a] dark:text-gray-400 text-base max-w-2xl">
            Theo dõi tình hình biên soạn, số hóa và chất lượng giáo trình toàn
            trường.
          </p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white dark:bg-[#1a202c] border border-[#cfd7e7] dark:border-[#2a3441] text-sm font-bold dark:text-white hover:bg-gray-50 transition-colors">
            <span className="material-symbols-outlined text-[20px]">
              file_upload
            </span>{" "}
            Nhập dữ liệu
          </button>
          <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-white text-sm font-bold hover:bg-blue-700 transition-colors">
            <span className="material-symbols-outlined text-[20px]">
              download
            </span>{" "}
            Xuất báo cáo
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 px-4 mb-8">
        <StatCard
          title="Tổng số giáo trình"
          value="2,850"
          trend="+5%"
          icon="library_books"
          color="text-primary"
        />
        <StatCard
          title="Tỷ lệ số hóa"
          value="78.5%"
          trend="+12%"
          icon="devices"
          color="text-purple-600"
          showProgress
        />
        <StatCard
          title="Đánh giá trung bình"
          value="4.2/5"
          trend="+0.1"
          icon="star"
          color="text-yellow-600"
          isRating
        />
        <StatCard
          title="Cần cập nhật"
          value="124"
          trend="Cao"
          icon="update"
          color="text-red-600"
          isAlert
        />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 px-4 mb-8">
        {/* Bar Chart Representation */}
        <div className="bg-white dark:bg-[#1a202c] rounded-xl border border-[#e7ebf3] dark:border-[#2a3441] p-6 shadow-sm">
          <h3 className="text-[#0d121b] dark:text-white text-lg font-bold mb-6">
            Phân bố giáo trình theo Khoa
          </h3>
          <div className="grid h-[220px] grid-flow-col gap-4 items-end justify-items-center">
            <Bar label="CNTT" height="85%" value="450" />
            <Bar label="Kinh tế" height="65%" value="320" color="bg-blue-400" />
            <Bar
              label="Xây dựng"
              height="55%"
              value="280"
              color="bg-blue-300"
            />
            <Bar
              label="Ngoại ngữ"
              height="40%"
              value="190"
              color="bg-blue-200"
            />
            <Bar label="Luật" height="25%" value="120" color="bg-blue-100" />
          </div>
        </div>

        {/* Line Chart Representation (SVG) */}
        <div className="bg-white dark:bg-[#1a202c] rounded-xl border border-[#e7ebf3] dark:border-[#2a3441] p-6 shadow-sm">
          <div className="flex justify-between mb-6">
            <h3 className="text-[#0d121b] dark:text-white text-lg font-bold">
              Xu hướng xuất bản
            </h3>
            <div className="flex gap-4 text-xs text-[#4c669a]">
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-primary"></span> Mới
              </span>
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-gray-300"></span> Cập
                nhật
              </span>
            </div>
          </div>
          <div className="h-[200px] w-full relative">
            <svg
              className="w-full h-full overflow-visible"
              viewBox="0 0 500 200"
              preserveAspectRatio="none"
            >
              <path
                d="M0,150 C50,140 100,100 125,90 S200,120 250,80 S350,40 375,30 S450,10 500,20"
                fill="none"
                stroke="#135bec"
                strokeWidth="3"
              />
              <path
                d="M0,180 C50,170 100,140 125,130 S200,150 250,110 S350,80 375,90 S450,60 500,70"
                fill="none"
                stroke="#cbd5e1"
                strokeDasharray="6 4"
                strokeWidth="2"
              />
            </svg>
            <div className="flex justify-between mt-4 text-xs text-[#4c669a]">
              <span>2019</span>
              <span>2020</span>
              <span>2021</span>
              <span>2022</span>
              <span>2023</span>
            </div>
          </div>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="px-4 mb-6">
        <div className="bg-white dark:bg-[#1a202c] rounded-xl border border-[#e7ebf3] dark:border-[#2a3441] p-4 shadow-sm flex flex-col lg:flex-row gap-4">
          <div className="flex-1 relative">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[#4c669a]">
              search
            </span>
            <input
              className="w-full h-10 pl-10 pr-4 rounded-lg bg-[#f8f9fc] dark:bg-[#101622] border-none ring-1 ring-[#e7ebf3] dark:ring-[#2a3441] text-sm dark:text-white outline-none focus:ring-2 focus:ring-primary"
              placeholder="Tìm kiếm giáo trình..."
              type="text"
            />
          </div>
          <div className="flex flex-wrap gap-2">
            <select className="h-10 px-3 rounded-lg bg-[#f8f9fc] dark:bg-[#101622] border-none ring-1 ring-[#e7ebf3] text-sm dark:text-white">
              <option>Tất cả Khoa</option>
            </select>
            <select className="h-10 px-3 rounded-lg bg-[#f8f9fc] dark:bg-[#101622] border-none ring-1 ring-[#e7ebf3] text-sm dark:text-white">
              <option>Năm học</option>
            </select>
            <button className="h-10 px-4 rounded-lg bg-primary text-white text-sm font-medium flex items-center gap-1 hover:bg-blue-700 transition-colors">
              <span className="material-symbols-outlined text-[18px]">
                filter_list
              </span>{" "}
              Lọc
            </button>
          </div>
        </div>
      </div>

      {/* Table Section */}
      <div className="px-4 mb-12">
        <div className="bg-white dark:bg-[#1a202c] border border-[#e7ebf3] dark:border-[#2a3441] rounded-xl overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[#f8f9fc] dark:bg-[#202836] border-b border-[#e7ebf3] dark:border-[#2a3441] text-xs font-bold uppercase text-[#4c669a]">
                  <th className="py-4 px-6">Tên Giáo trình / Tác giả</th>
                  <th className="py-4 px-6">Khoa</th>
                  <th className="py-4 px-6">Năm XB</th>
                  <th className="py-4 px-6">Định dạng</th>
                  <th className="py-4 px-6">Sử dụng</th>
                  <th className="py-4 px-6">Chất lượng</th>
                  <th className="py-4 px-6 text-right">Thao tác</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#e7ebf3] dark:divide-[#2a3441]">
                {curriculumData.map((book) => (
                  <tr
                    key={book.id}
                    className="hover:bg-gray-50 dark:hover:bg-[#202836] transition-colors group"
                  >
                    <td className="py-4 px-6">
                      <div className="flex gap-3 items-center">
                        <div className="w-10 h-14 bg-gray-200 rounded shrink-0 bg-gradient-to-br from-blue-500 to-primary opacity-80" />
                        <div>
                          <p className="text-sm font-bold text-[#0d121b] dark:text-white line-clamp-1">
                            {book.name}
                          </p>
                          <p className="text-xs text-[#4c669a] mt-0.5">
                            {book.author}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-6 text-sm dark:text-gray-300">
                      {book.dept}
                    </td>
                    <td className="py-4 px-6 text-sm dark:text-gray-300">
                      {book.year}
                    </td>
                    <td className="py-4 px-6">
                      <span className="px-2 py-1 rounded text-[11px] font-medium bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300 border border-blue-100 dark:border-blue-800">
                        {book.format}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-sm font-medium dark:text-gray-300">
                      {book.usage}
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-1">
                        <span
                          className={`text-sm font-bold ${
                            book.status === "update"
                              ? "text-orange-500"
                              : "text-[#0d121b] dark:text-white"
                          }`}
                        >
                          {book.rating}
                        </span>
                        <span className="material-symbols-outlined text-yellow-400 text-[16px] fill-current">
                          star
                        </span>
                        {book.status === "update" && (
                          <span className="text-[10px] text-red-500 font-medium ml-1">
                            Cần cập nhật
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="py-4 px-6 text-right">
                      <button className="text-[#4c669a] hover:text-primary p-2 rounded-full">
                        <span className="material-symbols-outlined">
                          more_vert
                        </span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- Sub-components ---

const StatCard = ({
  title,
  value,
  trend,
  icon,
  color,
  showProgress,
  isRating,
  isAlert,
}: any) => (
  <div className="flex flex-col gap-2 rounded-xl p-6 bg-white dark:bg-[#1a202c] border border-[#e7ebf3] dark:border-[#2a3441] shadow-sm">
    <div className="flex items-center justify-between">
      <p className="text-[#4c669a] dark:text-gray-400 text-sm font-medium uppercase tracking-wider">
        {title}
      </p>
      <span
        className={`material-symbols-outlined ${color} bg-current/10 p-1.5 rounded-lg`}
      >
        {icon}
      </span>
    </div>
    <div className="flex items-baseline gap-2 mt-2">
      <p className="text-[#0d121b] dark:text-white text-3xl font-bold">
        {value}
      </p>
      <span
        className={`text-sm font-medium px-1.5 py-0.5 rounded ${
          isAlert ? "bg-red-50 text-red-600" : "bg-green-50 text-green-700"
        }`}
      >
        {trend}
      </span>
    </div>
    {showProgress && (
      <div className="w-full bg-gray-200 rounded-full h-1.5 mt-2 dark:bg-gray-700 overflow-hidden">
        <div className="bg-purple-600 h-full" style={{ width: value }}></div>
      </div>
    )}
    {isRating && (
      <div className="flex text-yellow-400 mt-1">
        {[1, 2, 3, 4].map((i) => (
          <span
            key={i}
            className="material-symbols-outlined text-[18px] fill-current"
          >
            star
          </span>
        ))}
        <span className="material-symbols-outlined text-[18px]">star_half</span>
      </div>
    )}
    {isAlert && <p className="text-[#4c669a] text-xs">Quá hạn 5 năm</p>}
  </div>
);

const Bar = ({ label, height, value, color = "bg-primary" }: any) => (
  <div className="flex flex-col items-center w-full group cursor-pointer gap-2 h-full">
    <div className="text-xs font-bold text-primary opacity-0 group-hover:opacity-100 transition-opacity">
      {value}
    </div>
    <div className="bg-primary/10 w-full rounded-t-md relative flex-1 overflow-hidden">
      <div
        className={`absolute bottom-0 w-full ${color} rounded-t-md transition-all duration-500`}
        style={{ height }}
      ></div>
    </div>
    <p className="text-[#4c669a] text-xs font-medium mt-2">{label}</p>
  </div>
);

export default TraCuuPhanTich;
