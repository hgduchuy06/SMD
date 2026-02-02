import React from "react";

const ChiTietGiaoTrinh: React.FC = () => {
  return (
    <div className="flex-1 bg-[#f8f9fc] dark:bg-[#101622] min-h-screen font-display">
      <main className="w-full max-w-[1440px] mx-auto px-4 md:px-8 xl:px-40 py-8 flex flex-col gap-6">
        {/* Breadcrumbs */}

        {/* Header Title Section */}
        <div className="flex flex-col md:flex-row justify-between items-start gap-6 pb-8 border-b border-slate-200">
          <div className="flex flex-col gap-3">
            <div className="flex gap-2">
              <Badge
                label="Đang giảng dạy"
                color="bg-green-100 text-green-700"
              />
              <Badge label="Hệ chính quy" color="bg-blue-100 text-blue-700" />
            </div>
            <h1 className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white leading-tight">
              CS101 - Nhập môn Lập trình
            </h1>
            <div className="flex flex-wrap gap-4 text-slate-500 text-sm font-medium items-center">
              <span className="flex items-center gap-1">
                <span className="material-symbols-outlined text-lg">
                  domain
                </span>{" "}
                Khoa CNTT
              </span>
              <span className="flex items-center gap-1">
                <span className="material-symbols-outlined text-lg">
                  workspace_premium
                </span>{" "}
                3 Tín chỉ
              </span>
              <span className="flex items-center gap-1">
                <span className="material-symbols-outlined text-lg">
                  translate
                </span>{" "}
                Tiếng Việt
              </span>
              <span className="flex items-center gap-1">
                <span className="material-symbols-outlined text-lg">
                  calendar_month
                </span>{" "}
                Năm học 2023-2024
              </span>
            </div>
          </div>
          <div className="flex gap-3">
            <button className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-slate-100 text-slate-700 font-bold text-sm hover:bg-slate-200 transition-all">
              <span className="material-symbols-outlined text-xl">share</span>{" "}
              Chia sẻ
            </button>
            <button className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-primary text-white font-bold text-sm shadow-lg shadow-blue-200 hover:bg-blue-700 transition-all">
              <span className="material-symbols-outlined text-xl">
                download
              </span>{" "}
              Tải xuống PDF
            </button>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8 relative">
          {/* Sidebar (Khớp Ảnh 2) */}
          <aside className="w-full lg:w-64 shrink-0">
            <div className="lg:sticky lg:top-24 flex flex-col gap-6 bg-white dark:bg-slate-900 p-5 rounded-xl border border-slate-200 shadow-sm">
              <div>
                <h3 className="font-bold text-slate-900 dark:text-white text-sm uppercase tracking-wider mb-4">
                  Mục lục
                </h3>
                <nav className="flex flex-col gap-1">
                  <SidebarLink
                    icon="auto_awesome"
                    label="Tóm tắt & AI"
                    active
                  />
                  <SidebarLink icon="hub" label="Sơ đồ môn học" />
                  <SidebarLink icon="table_chart" label="Chuẩn đầu ra (Map)" />
                  <SidebarLink icon="menu_book" label="Nội dung chi tiết" />
                  <SidebarLink icon="person" label="Giảng viên" />
                </nav>
              </div>
              <div className="pt-4 border-t border-slate-100 flex items-center gap-3">
                <div
                  className="size-10 rounded-full bg-slate-200"
                  style={{
                    backgroundImage:
                      "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCacNWsMJdsi1YWere2kJSYwipiO7T80PPeO3QZgNx1bRh4V9bg39ma4mQFEyehG-j37T17sbRzMIPrrLaDyIGJyRCjFRLZrwWZeE9nvOWnAV00XlqijuA-6B88wCSs2GJtDIssJ2SfHrvb5Ygvx80FaLWIZm0BmSJqRcVFuT7WqCQJW8nQq55lDFju_g3kWufQIq3ue6xCvIsn7cL90Gqb-RPPbQdiePxK_m1JbWGhSIoW1m1XsatToB45Hx8Cn6N45oh-Fk07cXc')",
                    backgroundSize: "cover",
                  }}
                ></div>
                <div className="flex flex-col">
                  <p className="text-sm font-bold text-slate-900 dark:text-white">
                    TS. Nguyễn Văn A
                  </p>
                  <p className="text-[11px] text-slate-500 font-medium">
                    Trưởng bộ môn
                  </p>
                </div>
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <div className="flex-1 flex flex-col gap-10">
            {/* AI Summary Section */}
            <section className="bg-white dark:bg-slate-900 rounded-2xl p-8 border border-slate-200 shadow-sm relative overflow-hidden">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg text-white shadow-md">
                  <span className="material-symbols-outlined">
                    auto_awesome
                  </span>
                </div>
                <h2 className="text-xl font-bold dark:text-white">
                  Tóm tắt nội dung bởi AI
                </h2>
              </div>
              <p className="text-lg leading-relaxed text-slate-700 dark:text-slate-300 font-light mb-8">
                Môn học cung cấp nền tảng vững chắc về tư duy lập trình, kỹ
                thuật giải quyết vấn đề và cú pháp cơ bản của ngôn ngữ C++. Sinh
                viên sẽ học cách phân tích bài toán, thiết kế thuật toán và hiện
                thực hóa thông qua mã nguồn. AI nhận định môn học này có tính{" "}
                <span className="font-bold text-primary">thực tiễn cao</span> và
                là{" "}
                <span className="font-bold text-primary">
                  điều kiện tiên quyết
                </span>{" "}
                quan trọng cho các môn chuyên ngành.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <AICard
                  icon="psychology"
                  title="Tư duy logic"
                  desc="Phát triển thuật toán và cấu trúc dữ liệu."
                />
                <AICard
                  icon="terminal"
                  title="Kỹ năng C++"
                  desc="Làm chủ cú pháp và quản lý bộ nhớ."
                />
                <AICard
                  icon="extension"
                  title="Giải quyết vấn đề"
                  desc="Áp dụng code vào bài toán thực tế."
                />
              </div>
            </section>

            {/* Diagram Section */}
            {/* Diagram Section */}
            <section>
              <h2 className="text-xl font-bold mb-1 dark:text-white">
                Sơ đồ Mối quan hệ Môn học
              </h2>
              <p className="text-sm text-slate-500 mb-6">
                Vị trí của môn học trong chương trình đào tạo
              </p>

              <div className="relative bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 p-10 shadow-sm overflow-hidden">
                {/* Background dots */}
                <div
                  className="absolute inset-0 opacity-[0.04]"
                  style={{
                    backgroundImage:
                      "radial-gradient(#4c669a 1px, transparent 1px)",
                    backgroundSize: "20px 20px",
                  }}
                />

                {/* Prerequisite label */}
                <div className="absolute top-6 left-1/2 -translate-x-1/2 z-10">
                  <span className="px-4 py-1 text-xs font-bold tracking-wide rounded-full bg-blue-50 text-blue-600 border border-blue-200">
                    TIÊN QUYẾT (PREREQUISITE)
                  </span>
                </div>

                {/* Diagram content */}
                <div className="relative z-10 flex items-center justify-center gap-16 mt-16">
                  <DiagramNode label="MATH100" sub="Toán rời rạc" dashed />

                  <span className="material-symbols-outlined text-slate-300 text-3xl">
                    chevron_right
                  </span>

                  <DiagramNode
                    label="CS101"
                    sub="Nhập môn Lập trình"
                    active
                    showDot
                  />

                  <span className="material-symbols-outlined text-slate-300 text-3xl">
                    chevron_right
                  </span>

                  <div className="flex flex-col gap-6">
                    <DiagramNode label="CS102" sub="Cấu trúc dữ liệu" />
                    <DiagramNode label="CS112" sub="Lập trình HĐT" />
                  </div>
                </div>

                {/* Legend */}
                <div className="relative z-10 flex justify-center gap-10 text-[11px] font-bold text-slate-400 mt-12">
                  <div className="flex items-center gap-2">
                    <span className="size-2 rounded-full bg-primary"></span>
                    Môn đang xem
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="size-2 rounded-full border-2 border-dashed border-slate-300"></span>
                    Môn tiên quyết
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="size-2 rounded-full bg-slate-300"></span>
                    Môn học sau
                  </div>
                </div>
              </div>
            </section>

            {/* CLO-PLO Table Section (Khớp Ảnh 2) */}
            <section>
              <h2 className="text-xl font-bold mb-6 dark:text-white">
                Bản đồ Chuẩn đầu ra (CLO–PLO Map)
              </h2>
              <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm text-left border-collapse">
                    <thead className="bg-slate-50 dark:bg-slate-800 font-bold text-slate-700 dark:text-white border-b border-slate-200">
                      <tr>
                        <th className="px-6 py-5 min-w-[250px]">
                          Chuẩn đầu ra môn học (CLO)
                        </th>
                        <th className="px-4 py-5 text-center">
                          PLO 1<br />
                          <span className="text-[9px] uppercase opacity-50">
                            Kiến thức
                          </span>
                        </th>
                        <th className="px-4 py-5 text-center">
                          PLO 2<br />
                          <span className="text-[9px] uppercase opacity-50">
                            Phân tích
                          </span>
                        </th>
                        <th className="px-4 py-5 text-center">
                          PLO 3<br />
                          <span className="text-[9px] uppercase opacity-50">
                            Thiết kế
                          </span>
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      <CLORow
                        id="1"
                        text="Hiểu các khái niệm cơ bản về lập trình C++."
                        map={["I", "", ""]}
                      />
                      <CLORow
                        id="2"
                        text="Phân tích bài toán và xây dựng thuật toán."
                        map={["", "M", "R"]}
                      />
                    </tbody>
                  </table>
                </div>
                <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex flex-wrap gap-6 text-[10px] font-bold text-slate-400">
                  <span className="text-slate-700">CHÚ THÍCH:</span>
                  <div className="flex items-center gap-1.5">
                    <span className="size-4 rounded-full bg-primary text-white flex items-center justify-center text-[8px]">
                      I
                    </span>{" "}
                    Introduce
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="size-4 rounded-full bg-blue-50 text-primary border border-blue-100 flex items-center justify-center text-[8px]">
                      R
                    </span>{" "}
                    Reinforce
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="size-4 rounded-full bg-primary text-white flex items-center justify-center text-[8px]">
                      M
                    </span>{" "}
                    Master
                  </div>
                </div>
              </div>
            </section>

            {/* Course Content Accordion (Mới thêm cho giống Ảnh 2) */}
            <section>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold dark:text-white">
                  Nội dung chi tiết
                </h2>
                <button className="text-primary text-xs font-bold hover:underline">
                  Mở rộng tất cả
                </button>
              </div>
              <div className="flex flex-col gap-3">
                <ContentAccordion
                  step="01"
                  title="Giới thiệu về Máy tính & Lập trình"
                  sub="Tuần 1 • 3 Tiết"
                  active
                />
                <ContentAccordion
                  step="02"
                  title="Biến, Kiểu dữ liệu & Toán tử"
                  sub="Tuần 2 • 3 Tiết"
                />
                <ContentAccordion
                  step="03"
                  title="Cấu trúc điều khiển (If-Else, Switch)"
                  sub="Tuần 3 • 3 Tiết"
                />
                <ContentAccordion
                  step="04"
                  title="Vòng lặp (Loops)"
                  sub="Tuần 4 • 3 Tiết"
                />
              </div>
            </section>
          </div>
        </div>
      </main>

      {/* Footer (Khớp Ảnh 2) */}
      <footer className="mt-20 py-12 bg-white border-t border-slate-200">
        <div className="max-w-[1440px] mx-auto px-40 flex justify-between items-center">
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2 font-bold text-slate-900">
              <span className="material-symbols-outlined text-primary">
                school
              </span>{" "}
              UniSyllabus
            </div>
            <p className="text-xs text-slate-400">
              © 2024 Đại học Công nghệ. All rights reserved.
            </p>
          </div>
          <div className="flex gap-8 text-xs font-bold text-slate-400">
            <a href="#" className="hover:text-primary transition-colors">
              Điều khoản
            </a>
            <a href="#" className="hover:text-primary transition-colors">
              Quyền riêng tư
            </a>
            <a href="#" className="hover:text-primary transition-colors">
              Trợ giúp
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

// --- Sub-components ---

const Badge = ({ label, color }: { label: string; color: string }) => (
  <span
    className={`px-2 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider ${color}`}
  >
    {label}
  </span>
);

const SidebarLink = ({ icon, label, active = false }: any) => (
  <a
    className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-all ${
      active
        ? "bg-primary text-white shadow-md shadow-blue-100"
        : "text-slate-500 hover:bg-slate-50"
    }`}
    href="#"
  >
    <span className="material-symbols-outlined text-xl">{icon}</span>
    <span className="text-xs font-bold">{label}</span>
  </a>
);

const AICard = ({ icon, title, desc }: any) => (
  <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-100 flex flex-col gap-3 group hover:border-primary transition-all">
    <span className="material-symbols-outlined text-primary text-3xl">
      {icon}
    </span>
    <div>
      <h3 className="font-bold text-slate-900 dark:text-white text-sm">
        {title}
      </h3>
      <p className="text-xs text-slate-500 mt-1 leading-relaxed">{desc}</p>
    </div>
  </div>
);

const DiagramNode = ({ label, sub, active = false, dashed = false }: any) => (
  <div className="flex flex-col items-center gap-2">
    <div
      className={`w-32 h-16 rounded-xl flex items-center justify-center font-black border-2 transition-all text-sm ${
        active
          ? "bg-primary text-white border-primary shadow-xl shadow-blue-500/20 scale-110"
          : dashed
          ? "border-dashed border-slate-300 text-slate-400"
          : "bg-white border-slate-200 text-slate-800"
      }`}
    >
      {label}
    </div>
    <span className="text-[9px] text-slate-400 font-bold uppercase tracking-tighter">
      {sub}
    </span>
  </div>
);

const CLORow = ({ id, text, map }: any) => (
  <tr className="hover:bg-slate-50 transition-colors">
    <td className="px-6 py-5">
      <div className="flex flex-col gap-1">
        <span className="font-black text-primary text-[10px]">CLO {id}</span>
        <span className="text-slate-700 font-medium leading-relaxed">
          {text}
        </span>
      </div>
    </td>
    {map.map((val: string, i: number) => (
      <td key={i} className="px-4 py-5 text-center">
        {val ? (
          <span
            className={`inline-flex items-center justify-center size-8 rounded-full font-black text-xs ${
              val === "M" || val === "I"
                ? "bg-primary text-white shadow-md"
                : "bg-blue-50 text-primary border border-blue-100"
            }`}
          >
            {val}
          </span>
        ) : (
          <span className="size-1.5 rounded-full bg-slate-200 inline-block" />
        )}
      </td>
    ))}
  </tr>
);

const ContentAccordion = ({ step, title, sub, active = false }: any) => (
  <div
    className={`border border-slate-100 rounded-2xl overflow-hidden transition-all ${
      active ? "ring-2 ring-primary/5" : ""
    }`}
  >
    <div className="flex items-center justify-between p-4 bg-white cursor-pointer">
      <div className="flex items-center gap-4">
        <div
          className={`size-10 rounded-xl flex items-center justify-center font-black text-sm ${
            active
              ? "bg-primary/10 text-primary"
              : "bg-slate-100 text-slate-400"
          }`}
        >
          {step}
        </div>
        <div className="flex flex-col">
          <span className="font-bold text-slate-900 text-sm">{title}</span>
          <span className="text-[11px] text-slate-400 font-medium">{sub}</span>
        </div>
      </div>
      <span className="material-symbols-outlined text-slate-300">
        {active ? "expand_less" : "expand_more"}
      </span>
    </div>
    {active && (
      <div className="p-5 pt-0 bg-white text-xs text-slate-500 leading-relaxed border-t border-slate-50">
        Tìm hiểu về lịch sử máy tính, nguyên lý hoạt động cơ bản. Giới thiệu
        ngôn ngữ C++, cài đặt môi trường phát triển (IDE).
        <div className="mt-3 flex gap-2">
          <span className="px-2 py-1 bg-slate-50 rounded border border-slate-100 font-bold text-slate-600">
            Chương 1: Giáo trình C++
          </span>
        </div>
      </div>
    )}
  </div>
);

export default ChiTietGiaoTrinh;
