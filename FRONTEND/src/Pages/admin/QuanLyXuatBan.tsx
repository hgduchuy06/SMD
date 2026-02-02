import React from "react";

const QuanLyXuatBan: React.FC = () => {
  // Dữ liệu mẫu cho bảng xuất bản
  const publications = [
    {
      id: "GT-IT-2023-01",
      title: "Kỹ thuật Lập trình C++",
      department: "Khoa CNTT",
      author: "TS. Nguyễn Văn A",
      version: "v2.0",
      status: "Published",
      validity: "01/09/2023 - 31/08/2025",
    },
    {
      id: "GT-MATH-2024-05",
      title: "Toán Cao cấp A1",
      department: "Khoa Cơ Bản",
      author: "ThS. Trần Thị B",
      version: "v1.1",
      status: "Pending",
      validity: "Chưa thiết lập",
    },
    {
      id: "GT-ECO-2021-02",
      title: "Kinh tế Vi mô",
      department: "Khoa Kinh Tế",
      author: "PGS. TS. Lê Văn C",
      version: "v1.0",
      status: "Archived",
      validity: "01/01/2021 - 31/12/2022",
    },
    {
      id: "GT-PHIL-2023-10",
      title: "Triết học Mác - Lênin",
      department: "Khoa LLCT",
      author: "TS. Phạm Thị D",
      version: "v3.2",
      status: "Published",
      validity: "15/08/2023 - Vô thời hạn",
    },
  ];

  return (
    <div className="flex-1 overflow-y-auto p-8 bg-[#f6f6f8] dark:bg-[#101622]">
      <div className="max-w-7xl mx-auto w-full flex flex-col gap-6">
        {/* Breadcrumbs & Header (Thường nằm trong Main layout nhưng có thể để ở đây nếu cần) */}
        <div className="flex justify-between items-end">
          <div>
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white tracking-tight">
              Quản lý Xuất bản
            </h2>
            <p className="text-slate-500 dark:text-slate-400 mt-1">
              Kiểm soát quy trình phê duyệt, thiết lập thời gian hiệu lực và lưu
              trữ giáo trình.
            </p>
          </div>
          <div className="flex gap-3">
            <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg hover:bg-slate-50 transition-colors shadow-sm">
              <span className="material-symbols-outlined text-lg">history</span>{" "}
              Lịch sử Thay đổi
            </button>
            <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-primary rounded-lg hover:bg-blue-700 transition-colors shadow-md">
              <span className="material-symbols-outlined text-lg">add</span>{" "}
              Xuất bản Mới
            </button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatMiniCard
            label="Tổng giáo trình"
            value="1,250"
            icon="library_books"
          />
          <StatMiniCard
            label="Đang công bố"
            value="850"
            icon="check_circle"
            color="text-emerald-500"
          />
          <StatMiniCard
            label="Chờ phê duyệt"
            value="45"
            icon="pending"
            color="text-amber-500"
          />
          <StatMiniCard label="Đã lưu trữ" value="355" icon="archive" />
        </div>

        {/* Filters Area */}
        <div className="bg-white dark:bg-[#151b2b] p-4 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-wrap gap-4 items-center justify-between">
          <div className="flex flex-wrap items-center gap-3 flex-1">
            <div className="relative min-w-[280px]">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-xl">
                search
              </span>
              <input
                className="w-full pl-10 pr-4 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm focus:ring-2 focus:ring-primary/50 outline-none dark:text-white"
                placeholder="Tìm kiếm giáo trình, mã số..."
                type="text"
              />
            </div>
            <select className="px-3 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm text-slate-700 dark:text-slate-300">
              <option>Tất cả các khoa</option>
              <option>Khoa CNTT</option>
              <option>Khoa Kinh Tế</option>
            </select>
            <div className="flex items-center gap-2 px-3 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm text-slate-700 dark:text-slate-300 cursor-pointer hover:bg-slate-50">
              <span className="material-symbols-outlined text-lg text-slate-400">
                calendar_today
              </span>
              <span>Thời gian hiệu lực</span>
            </div>
          </div>
          <div className="flex gap-2">
            <IconButton icon="filter_list" title="Filter view" />
            <IconButton icon="download" title="Export" />
          </div>
        </div>

        {/* Table Area */}
        <div className="bg-white dark:bg-[#151b2b] rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-800 text-xs uppercase text-slate-500 dark:text-slate-400 font-semibold">
                  <th className="px-6 py-4 w-12">
                    <input
                      type="checkbox"
                      className="rounded text-primary focus:ring-primary"
                    />
                  </th>
                  <th className="px-6 py-4">Tên Giáo Trình</th>
                  <th className="px-6 py-4">Khoa / Tác giả</th>
                  <th className="px-6 py-4">Phiên bản</th>
                  <th className="px-6 py-4">Trạng thái</th>
                  <th className="px-6 py-4">Hiệu lực</th>
                  <th className="px-6 py-4 text-right">Hành động</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                {publications.map((item, idx) => (
                  <tr
                    key={idx}
                    className={`group hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors ${
                      item.status === "Pending"
                        ? "bg-amber-50/30 dark:bg-amber-900/5"
                        : ""
                    } ${item.status === "Archived" ? "opacity-75" : ""}`}
                  >
                    <td className="px-6 py-4">
                      <input
                        type="checkbox"
                        className="rounded text-primary focus:ring-primary"
                      />
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-col">
                        <span className="text-sm font-medium text-slate-900 dark:text-white">
                          {item.title}
                        </span>
                        <span className="text-xs text-slate-500">
                          {item.id}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-col">
                        <span className="text-sm text-slate-700 dark:text-slate-300">
                          {item.department}
                        </span>
                        <span className="text-xs text-slate-500">
                          {item.author}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm font-medium text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-700 px-2 py-0.5 rounded">
                        {item.version}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <StatusBadge status={item.status} />
                    </td>
                    <td className="px-6 py-4 text-xs text-slate-600 dark:text-slate-400">
                      {item.validity}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <ActionButtons status={item.status} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {/* Pagination */}
          <div className="bg-white dark:bg-[#151b2b] px-6 py-4 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between">
            <span className="text-sm text-slate-500">
              Hiển thị 4 trong tổng số 1,250 kết quả
            </span>
            <div className="flex gap-2">
              <button className="px-3 py-1 text-sm rounded border border-slate-200 dark:border-slate-700 text-slate-500 disabled:opacity-50">
                Trước
              </button>
              <button className="px-3 py-1 text-sm rounded bg-primary text-white">
                1
              </button>
              <button className="px-3 py-1 text-sm rounded border border-slate-200 dark:border-slate-700 text-slate-600">
                Sau
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- Sub-components ---

const StatMiniCard = ({
  label,
  value,
  icon,
  color = "text-slate-400",
}: any) => (
  <div className="bg-white dark:bg-[#151b2b] p-5 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col gap-1">
    <div className="flex items-center justify-between">
      <span className="text-slate-500 dark:text-slate-400 text-sm font-medium">
        {label}
      </span>
      <span className={`material-symbols-outlined ${color}`}>{icon}</span>
    </div>
    <span className="text-3xl font-bold text-slate-900 dark:text-white">
      {value}
    </span>
  </div>
);

const IconButton = ({ icon, title }: { icon: string; title: string }) => (
  <button
    className="p-2 text-slate-500 hover:text-primary hover:bg-primary/5 rounded-lg transition-colors"
    title={title}
  >
    <span className="material-symbols-outlined">{icon}</span>
  </button>
);

const StatusBadge = ({ status }: { status: string }) => {
  const styles: any = {
    Published:
      "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400 border-emerald-200",
    Pending:
      "bg-amber-100 text-amber-700 dark:bg-amber-500/10 dark:text-amber-400 border-amber-200",
    Archived:
      "bg-slate-100 text-slate-600 dark:bg-slate-700 dark:text-slate-400 border-slate-200",
  };
  const dotColor: any = {
    Published: "bg-emerald-500",
    Pending: "bg-amber-500 animate-pulse",
    Archived: "bg-slate-400",
  };
  const labels: any = {
    Published: "Đang công bố",
    Pending: "Chờ phê duyệt",
    Archived: "Đã lưu trữ",
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium border ${styles[status]}`}
    >
      <span className={`w-1.5 h-1.5 rounded-full ${dotColor[status]}`}></span>
      {labels[status]}
    </span>
  );
};

const ActionButtons = ({ status }: { status: string }) => (
  <div className="flex items-center justify-end gap-2 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity">
    {status === "Pending" ? (
      <>
        <button className="p-2 text-emerald-600 bg-emerald-50 dark:bg-emerald-500/10 rounded-lg hover:bg-emerald-100 transition-colors">
          <span className="material-symbols-outlined text-xl">check</span>
        </button>
        <button className="p-2 text-red-600 bg-red-50 dark:bg-red-500/10 rounded-lg hover:bg-red-100 transition-colors">
          <span className="material-symbols-outlined text-xl">close</span>
        </button>
      </>
    ) : (
      <>
        <button className="p-2 text-slate-500 hover:text-primary transition-colors">
          <span className="material-symbols-outlined text-xl">
            {status === "Archived" ? "restore" : "calendar_month"}
          </span>
        </button>
        <button className="p-2 text-slate-500 hover:text-primary transition-colors">
          <span className="material-symbols-outlined text-xl">visibility</span>
        </button>
      </>
    )}
  </div>
);

export default QuanLyXuatBan;
