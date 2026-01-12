import React from "react";

const TimKiemGiaoTrinh: React.FC = () => {
  // Dữ liệu mẫu cho danh sách giáo trình nổi bật
  const featuredBooks = [
    {
      id: 1,
      title: "Lập trình Hướng đối tượng (Java Core)",
      author: "TS. Nguyễn Văn A",
      dept: "CNTT & TT",
      year: "2024",
      views: "1.2k",
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuBz_fZeG57Z3IgQ7WFA46UKcFakp4xVjCtnW3ld-M37kL9-iWgzFf93vUQQ1D6LF7IzjT8MM3TDGXhF-iT_WWklNJJiDcB1lhbLrepM_wsCa7gJfgn2eR4Y5uU4Dx3J0xKFNkTSvVQbjY-_fNOYHwYgxj-y09guBFjD8HdB9OnjFiMVC-xz0SqTQLpLoulSlurjfDxL3oKRULVcUQTWik54DFljwZGO5tPXMlN89i5fS26cNtzogyARs4zO5KJqTkiFxhYiEz2HXaM",
      color: "text-primary",
    },
    {
      id: 2,
      title: "Kinh tế Vi mô 1: Lý thuyết và Ứng dụng",
      author: "PGS.TS Trần Thị B",
      dept: "Kinh tế",
      year: "2023",
      views: "850",
      icon: "bar_chart",
      color: "text-orange-600",
    },
    {
      id: 3,
      title: "English Syntax & Morphology",
      author: "ThS. Le Hoang C",
      dept: "Ngoại ngữ",
      year: "2022",
      views: "2.3k",
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuAqb4I2-QHossaBgUnc63lMzSjKdEhN59IkGt6YSpTkYp_NI5qISltnNuJXCKyExW_MgvLGXNvs05PxvXRdRXZ4D1ePDpg-RfYhoUdW1QzUmai-SWKuWOuJcMDmIZZ0qLtiR2jcWQGP4S8u6xfgyGmYNXg9SF40cqMkOHyPnIbWu1OhEer2TKx6BWIUxFarYpjwf_-qRBAhTmbyRk2qVd31z-QuAl3lDtQCVAhhUmzOpd2CA8MrB_O8rMeU12siNJV1LmH5wWKX4gI",
      color: "text-pink-600",
    },
    {
      id: 4,
      title: "Nhập môn Khoa học dữ liệu và Ứng dụng AI",
      author: "TS. Pham Minh D",
      dept: "Khoa học dữ liệu",
      year: "2024",
      views: "5.1k",
      icon: "hub",
      color: "text-emerald-600",
    },
  ];

  return (
    <div className="flex-1 flex flex-col items-center w-full bg-[#f6f6f8] dark:bg-[#101622]">
      {/* Hero & Search Section */}
      <section className="w-full bg-white dark:bg-[#1a2332] pb-16 pt-10 px-4 flex flex-col items-center border-b border-[#e7ebf3] dark:border-gray-800">
        <div className="max-w-[960px] w-full text-center mb-8">
          <h1 className="text-[#0d121b] dark:text-white tracking-tight text-3xl md:text-[40px] font-bold leading-tight pb-3">
            Thư viện Giáo trình Số
          </h1>
          <p className="text-[#4c669a] dark:text-gray-400 text-base md:text-lg max-w-2xl mx-auto">
            Tìm kiếm tài liệu học tập, giáo trình và công trình nghiên cứu chính
            thức của nhà trường phục vụ cho giảng dạy và học tập.
          </p>
        </div>

        <div className="max-w-[1024px] w-full bg-[#f6f6f8] dark:bg-[#232e42] p-6 rounded-2xl shadow-sm border border-[#e7ebf3] dark:border-gray-700">
          <div className="relative w-full mb-6">
            <div className="flex w-full h-14 rounded-xl shadow-sm overflow-hidden">
              <div className="text-[#4c669a] dark:text-gray-400 flex border border-r-0 border-[#cfd7e7] dark:border-gray-600 bg-white dark:bg-slate-800 items-center justify-center pl-5">
                <span className="material-symbols-outlined text-[24px]">
                  search
                </span>
              </div>
              <input
                className="flex-1 border border-l-0 border-[#cfd7e7] dark:border-gray-600 bg-white dark:bg-slate-800 px-4 text-base outline-none focus:border-primary transition-colors dark:text-white"
                placeholder="Nhập tên giáo trình, mã môn học hoặc từ khóa..."
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <FilterSelect
              label="Ngành học"
              options={[
                "Tất cả",
                "Khoa học máy tính",
                "Quản trị kinh doanh",
                "Luật Kinh tế",
              ]}
            />
            <FilterSelect
              label="Học kỳ"
              options={[
                "Tất cả học kỳ",
                "Học kỳ 1 (2024-2025)",
                "Học kỳ 2 (2023-2024)",
              ]}
            />
            <div className="flex flex-col">
              <label className="text-[#0d121b] dark:text-gray-300 text-sm font-medium pb-2">
                Mã môn học
              </label>
              <input
                className="bg-white dark:bg-slate-800 border border-[#cfd7e7] dark:border-gray-600 p-3 rounded-lg text-sm outline-none focus:ring-1 focus:ring-primary dark:text-white"
                placeholder="VD: IT3040..."
              />
            </div>
            <FilterSelect
              label="Năm xuất bản"
              options={["Mới nhất", "2023 - 2024", "Trước 2020"]}
            />
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-[#e7ebf3] dark:border-gray-700 pt-5">
            <div className="flex flex-wrap gap-2 items-center">
              <span className="text-xs font-semibold text-[#4c669a] dark:text-gray-400 uppercase mr-1">
                Phổ biến:
              </span>
              {[
                "Đại số tuyến tính",
                "Triết học Mác-Lênin",
                "Python cơ bản",
              ].map((tag) => (
                <a
                  key={tag}
                  className="px-3 py-1 rounded-full bg-white dark:bg-gray-700 border border-[#e7ebf3] dark:border-gray-600 text-xs font-medium hover:text-primary transition-colors dark:text-gray-200"
                  href="#"
                >
                  {tag}
                </a>
              ))}
            </div>
            <button className="w-full sm:w-auto flex items-center justify-center gap-2 bg-primary hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-xl shadow-lg shadow-primary/30 transition-all">
              <span className="material-symbols-outlined">search</span> Tìm kiếm
            </button>
          </div>
        </div>
      </section>

      {/* Featured Books Section */}
      <section className="w-full max-w-[1280px] px-4 md:px-10 py-12">
        <div className="flex items-center justify-between mb-8">
          <h3 className="text-2xl font-bold text-[#0d121b] dark:text-white flex items-center gap-2">
            <span className="material-symbols-outlined text-primary">
              auto_awesome
            </span>{" "}
            Giáo trình Nổi bật
          </h3>
          <a
            className="text-primary hover:underline font-medium text-sm flex items-center gap-1 group"
            href="#"
          >
            Xem tất cả{" "}
            <span className="material-symbols-outlined text-lg group-hover:translate-x-1 transition-transform">
              arrow_forward
            </span>
          </a>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredBooks.map((book) => (
            <BookCard key={book.id} {...book} />
          ))}
        </div>
      </section>

      {/* Departments Section */}
      <section className="w-full bg-white dark:bg-[#1a2332] py-12 px-4 border-t border-[#e7ebf3] dark:border-gray-800">
        <div className="max-w-[1280px] mx-auto">
          <h3 className="text-xl font-bold text-[#0d121b] dark:text-white mb-6">
            Khám phá theo Khoa / Viện
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            <DeptItem
              icon="computer"
              label="CNTT & TT"
              color="text-primary"
              bgColor="bg-blue-100 dark:bg-blue-900/30"
            />
            <DeptItem
              icon="trending_up"
              label="Kinh tế"
              color="text-green-600"
              bgColor="bg-green-100 dark:bg-green-900/30"
            />
            <DeptItem
              icon="translate"
              label="Ngoại ngữ"
              color="text-purple-600"
              bgColor="bg-purple-100 dark:bg-purple-900/30"
            />
            <DeptItem
              icon="engineering"
              label="Cơ khí"
              color="text-orange-600"
              bgColor="bg-orange-100 dark:bg-orange-900/30"
            />
            <DeptItem
              icon="gavel"
              label="Luật"
              color="text-red-600"
              bgColor="bg-red-100 dark:bg-red-900/30"
            />
            <DeptItem
              icon="grid_view"
              label="Xem tất cả"
              color="text-gray-600"
              bgColor="bg-gray-200 dark:bg-gray-700"
            />
          </div>
        </div>
      </section>
    </div>
  );
};

// --- Sub-components ---

const FilterSelect = ({
  label,
  options,
}: {
  label: string;
  options: string[];
}) => (
  <div className="flex flex-col">
    <label className="text-[#0d121b] dark:text-gray-300 text-sm font-medium pb-2">
      {label}
    </label>
    <div className="relative">
      <select className="appearance-none w-full bg-white dark:bg-slate-800 border border-[#cfd7e7] dark:border-gray-600 text-sm rounded-lg p-3 pr-8 focus:ring-1 focus:ring-primary outline-none dark:text-white">
        {options.map((opt) => (
          <option key={opt}>{opt}</option>
        ))}
      </select>
      <span className="material-symbols-outlined absolute right-2 top-1/2 -translate-y-1/2 text-[#4c669a] pointer-events-none">
        expand_more
      </span>
    </div>
  </div>
);

const BookCard = ({
  title,
  author,
  dept,
  year,
  views,
  image,
  icon,
  color,
}: any) => (
  <div className="group bg-white dark:bg-[#1a2332] rounded-2xl border border-[#e7ebf3] dark:border-gray-800 p-4 hover:shadow-xl transition-all duration-300 flex flex-col h-full cursor-pointer">
    <div className="relative w-full aspect-[3/4] rounded-xl overflow-hidden mb-4 bg-gray-100 dark:bg-gray-800">
      {image ? (
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
      ) : (
        <div className="w-full h-full flex items-center justify-center bg-gradient-to-tr from-slate-100 to-slate-50 dark:from-slate-800 dark:to-slate-900">
          <span
            className={`material-symbols-outlined text-6xl opacity-20 ${color}`}
          >
            {icon}
          </span>
        </div>
      )}
      <div className="absolute top-2 right-2 bg-black/60 backdrop-blur-sm text-white text-[10px] font-bold px-2 py-1 rounded-md">
        {year}
      </div>
    </div>
    <div className="flex flex-col flex-1">
      <span
        className={`text-[10px] font-bold uppercase tracking-wider mb-1 ${color}`}
      >
        {dept}
      </span>
      <h4 className="text-base font-bold text-[#0d121b] dark:text-white leading-tight mb-2 line-clamp-2 group-hover:text-primary transition-colors">
        {title}
      </h4>
      <p className="text-sm text-[#4c669a] dark:text-gray-400 mb-4">{author}</p>
      <div className="mt-auto pt-4 border-t border-[#f0f2f5] dark:border-gray-700 flex items-center justify-between">
        <div className="flex items-center gap-1 text-xs text-[#4c669a]">
          <span className="material-symbols-outlined text-sm">visibility</span>{" "}
          {views}
        </div>
        <button className="text-primary hover:bg-primary/10 p-2 rounded-full transition-colors">
          <span className="material-symbols-outlined">arrow_outward</span>
        </button>
      </div>
    </div>
  </div>
);

const DeptItem = ({ icon, label, color, bgColor }: any) => (
  <a
    className="flex flex-col items-center justify-center p-6 bg-[#f6f6f8] dark:bg-[#1f2937] hover:bg-white dark:hover:bg-slate-800 border border-transparent hover:border-primary rounded-xl transition-all group"
    href="#"
  >
    <div
      className={`w-12 h-12 rounded-full ${bgColor} flex items-center justify-center ${color} mb-3 group-hover:scale-110 transition-transform`}
    >
      <span className="material-symbols-outlined">{icon}</span>
    </div>
    <span className="text-sm font-medium text-[#0d121b] dark:text-gray-200 text-center">
      {label}
    </span>
  </a>
);

export default TimKiemGiaoTrinh;
