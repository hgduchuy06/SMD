import React from "react";

const DuyetGiaoTrinh: React.FC = () => {
  const pendingItems = [
    {
      id: "CS101",
      title: "Nhập môn Khoa học Máy tính",
      teacher: "TS. Trần Minh Tuấn",
      time: "2 giờ trước",
      status: "pending",
      active: true,
    },
    {
      id: "MKT202",
      title: "Marketing Căn bản",
      teacher: "ThS. Lê Thị Bích",
      time: "5 giờ trước",
      status: "pending",
    },
    {
      id: "ENG105",
      title: "Tiếng Anh Chuyên ngành 1",
      teacher: "Michael Johnson",
      time: "1 ngày trước",
      status: "edited",
    },
    {
      id: "MATH301",
      title: "Xác suất thống kê nâng cao",
      teacher: "PGS.TS Phạm Văn D",
      time: "2 ngày trước",
      status: "pending",
    },
  ];

  return (
    <div className="bg-[#f8fafc] min-h-screen p-4 md:p-8 font-sans">
      <div className="max-w-[1440px] mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-[#1e293b] text-3xl font-bold mb-2">
              Phê duyệt Giáo trình - Cấp 2
            </h1>
            <p className="text-[#64748b]">
              Kiểm tra và phê duyệt sự ánh xạ CLO-PLO và tuân thủ chuẩn chương
              trình đào tạo.
            </p>
          </div>
          <div className="flex gap-3">
            <button className="flex items-center gap-2 bg-white border border-slate-200 px-4 py-2 rounded-lg text-sm font-semibold text-slate-700 hover:bg-slate-50 transition-all shadow-sm">
              <span className="material-symbols-outlined text-lg">
                file_download
              </span>{" "}
              Xuất báo cáo
            </button>
            <button className="flex items-center gap-2 bg-[#1d4ed8] text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-blue-700 transition-all shadow-md">
              <span className="material-symbols-outlined text-lg">history</span>{" "}
              Lịch sử phê duyệt
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <StatCard
            label="Chờ phê duyệt"
            value="12"
            sub="+2 yêu cầu mới hôm nay"
            icon="hourglass_empty"
            color="text-orange-500"
            bgColor="bg-orange-50"
          />
          <StatCard
            label="Yêu cầu chỉnh sửa"
            value="5"
            sub="Cần giảng viên phản hồi"
            icon="edit_note"
            color="text-red-500"
            bgColor="bg-red-50"
          />
          <StatCard
            label="Đã duyệt hôm nay"
            value="28"
            sub="Đạt 100% chỉ tiêu"
            icon="check_circle"
            color="text-green-500"
            bgColor="bg-green-50"
          />
        </div>

        <div className="grid grid-cols-12 gap-6">
          {/* Left: Sidebar List */}
          <div className="col-span-12 lg:col-span-3 flex flex-col gap-4">
            <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
              <div className="relative mb-3">
                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                  search
                </span>
                <input
                  className="w-full bg-slate-50 border-none rounded-lg py-2 pl-10 pr-4 text-sm focus:ring-2 focus:ring-blue-500"
                  placeholder="Tìm theo mã HP, tên..."
                />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <select className="bg-slate-50 border-none rounded-lg p-2 text-xs font-medium text-slate-600">
                  <option>Tất cả Khoa</option>
                </select>
                <select className="bg-slate-50 border-none rounded-lg p-2 text-xs font-medium text-slate-600">
                  <option>Mới nhất</option>
                </select>
              </div>
            </div>

            <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
              {pendingItems.map((item) => (
                <div
                  key={item.id}
                  className={`p-4 border-b last:border-0 cursor-pointer transition-all ${
                    item.active
                      ? "bg-blue-50/50 border-l-4 border-l-blue-600"
                      : "hover:bg-slate-50"
                  }`}
                >
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider bg-slate-100 text-slate-600 px-2 py-0.5 rounded border border-slate-200">
                      {item.id}
                    </span>
                    <span className="text-[11px] text-slate-400 font-medium">
                      {item.time}
                    </span>
                  </div>
                  <h3
                    className={`text-sm font-bold mb-1 ${
                      item.active ? "text-blue-900" : "text-slate-800"
                    }`}
                  >
                    {item.title}
                  </h3>
                  <p className="text-xs text-slate-500 mb-3">
                    GV: {item.teacher}
                  </p>
                  <span
                    className={`inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      item.status === "edited"
                        ? "bg-red-50 text-red-600"
                        : "bg-orange-50 text-orange-600"
                    }`}
                  >
                    <span className="material-symbols-outlined text-xs">
                      {item.status === "edited" ? "error" : "pending"}
                    </span>
                    {item.status === "edited" ? "Đã chỉnh sửa" : "Chờ duyệt"}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Detailed Content */}
          <div className="col-span-12 lg:col-span-9 bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden flex flex-col">
            <div className="p-6 flex justify-between items-start border-b">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <h2 className="text-2xl font-black text-slate-800 tracking-tight">
                    Nhập môn Khoa học Máy tính
                  </h2>
                  <span className="bg-blue-100 text-blue-700 px-2 py-0.5 rounded text-xs font-bold">
                    CS101
                  </span>
                </div>
                <div className="flex items-center gap-4 text-sm font-medium text-slate-500">
                  <span className="flex items-center gap-1">
                    <span className="material-symbols-outlined text-lg">
                      person
                    </span>{" "}
                    TS. Trần Minh Tuấn
                  </span>
                  <span className="flex items-center gap-1">
                    <span className="material-symbols-outlined text-lg">
                      domain
                    </span>{" "}
                    Khoa CNTT
                  </span>
                  <span className="flex items-center gap-1">
                    <span className="material-symbols-outlined text-lg">
                      calendar_today
                    </span>{" "}
                    Học kỳ 1, 2024-2025
                  </span>
                </div>
              </div>
              <button className="text-slate-400 hover:text-blue-600 p-2 rounded-lg hover:bg-slate-50 transition-all">
                <span className="material-symbols-outlined">open_in_new</span>
              </button>
            </div>

            {/* Tabs */}
            <div className="flex bg-slate-50/50 px-6 border-b">
              {["Thông tin chung", "Ma trận CLO-PLO", "Kiểm tra Tuân thủ"].map(
                (tab, idx) => (
                  <button
                    key={tab}
                    className={`px-6 py-4 text-sm font-bold transition-all relative ${
                      idx === 1
                        ? "text-blue-600 border-b-2 border-blue-600 bg-white"
                        : "text-slate-500 hover:text-slate-700"
                    }`}
                  >
                    {tab}{" "}
                    {idx === 2 && (
                      <span className="absolute top-4 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
                    )}
                  </button>
                )
              )}
            </div>

            <div className="p-8">
              {/* Warning Alert */}
              <div className="mb-8 bg-amber-50 border border-amber-200 p-4 rounded-xl flex gap-4 text-amber-800">
                <span className="material-symbols-outlined text-amber-500">
                  warning
                </span>
                <div>
                  <h4 className="font-bold text-sm">Cảnh báo hệ thống</h4>
                  <p className="text-sm opacity-90">
                    Có 2 PLO chưa được ánh xạ đầy đủ mức độ (Mastered). Vui lòng
                    kiểm tra kỹ ma trận bên dưới trước khi phê duyệt.
                  </p>
                </div>
              </div>

              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-black text-slate-800">
                  Chi tiết Ánh xạ CLO-PLO
                </h3>
                <div className="flex gap-4 text-xs font-bold text-slate-500">
                  <span className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full border-2 border-green-500 bg-green-50"></span>{" "}
                    Mapped
                  </span>
                  <span className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full border-2 border-slate-200"></span>{" "}
                    Empty
                  </span>
                </div>
              </div>

              {/* Table */}
              <div className="border border-slate-200 rounded-xl overflow-hidden mb-8">
                <table className="w-full text-sm">
                  <thead className="bg-slate-50 text-[11px] font-bold text-slate-500 uppercase">
                    <tr>
                      <th className="px-6 py-4 text-left border-r w-1/3">
                        Chuẩn đầu ra (CLOs)
                      </th>
                      {["PLO 1", "PLO 2", "PLO 3", "PLO 4", "PLO 5"].map(
                        (p) => (
                          <th
                            key={p}
                            className="px-4 py-4 text-center border-r last:border-0"
                          >
                            <div className="flex flex-col">
                              <span>{p}</span>
                              <span className="text-[9px] font-normal lowercase mt-1 opacity-70">
                                Kỹ năng...
                              </span>
                            </div>
                          </th>
                        )
                      )}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    <TableRow
                      clo="CL01"
                      desc="Hiểu các khái niệm cơ bản về thuật toán và cấu trúc dữ liệu."
                      cells={["I", "", "", "", "I"]}
                    />
                    <TableRow
                      clo="CL02"
                      desc="Vận dụng giải thuật để giải quyết bài toán thực tế."
                      cells={["", "R", "R", "", ""]}
                    />
                    <TableRow
                      clo="CL03"
                      desc="Phân tích độ phức tạp của thuật toán."
                      cells={["", "M", "", "", ""]}
                      isWarning
                    />
                    <TableRow
                      clo="CL04"
                      desc="Làm việc nhóm hiệu quả trong dự án lập trình."
                      cells={["", "", "R", "I", ""]}
                    />
                  </tbody>
                </table>
              </div>
              <p className="text-[11px] text-slate-500 font-medium mb-8">
                <span className="font-bold text-blue-600 mr-2">I:</span>{" "}
                Introduce (Giới thiệu) <span className="mx-2">|</span>
                <span className="font-bold text-blue-600 mr-2">R:</span>{" "}
                Reinforce (Củng cố) <span className="mx-2">|</span>
                <span className="font-bold text-blue-600 mr-2">M:</span> Master
                (Thành thạo)
              </p>

              <div className="grid grid-cols-2 gap-6">
                <CheckList
                  title="Kiểm tra Hình thức"
                  items={[
                    "Sử dụng Template 2024",
                    "Đủ thông tin Giảng viên",
                    "Đính kèm tài liệu tham khảo",
                  ]}
                />
                <CheckList
                  title="Kiểm tra Học thuật"
                  items={["Tối thiểu 4 CLOs", "Thang đánh giá Rubric hợp lệ"]}
                  warning="Độ phủ PLO > 80% (Hiện tại: 75%)"
                />
              </div>
            </div>

            {/* Footer Actions */}
            <div className="p-6 bg-slate-50 border-t mt-auto">
              <label className="block text-xs font-bold text-slate-500 uppercase mb-2">
                Ghi chú phê duyệt / Lý do từ chối
              </label>
              <textarea
                className="w-full p-4 border rounded-xl text-sm mb-4 focus:ring-2 focus:ring-blue-500 outline-none"
                rows={3}
                placeholder="Nhập nhận xét..."
              ></textarea>
              <div className="flex justify-end gap-3">
                <button className="px-6 py-2.5 rounded-lg text-sm font-bold text-red-600 hover:bg-red-50 transition-all">
                  Từ chối
                </button>
                <button className="px-6 py-2.5 rounded-lg text-sm font-bold text-slate-600 bg-white border border-slate-200 hover:bg-slate-50 transition-all">
                  Yêu cầu chỉnh sửa
                </button>
                <button className="px-8 py-2.5 rounded-lg text-sm font-bold text-white bg-[#1d4ed8] hover:bg-blue-700 shadow-lg shadow-blue-200 flex items-center gap-2">
                  <span className="material-symbols-outlined">
                    check_circle
                  </span>{" "}
                  Phê duyệt Giáo trình
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- Helpers ---

const StatCard = ({ label, value, sub, icon, color, bgColor }: any) => (
  <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
    <div className="flex justify-between items-start mb-4">
      <span className="text-slate-500 text-sm font-bold">{label}</span>
      <span
        className={`material-symbols-outlined p-2 rounded-xl ${bgColor} ${color}`}
      >
        {icon}
      </span>
    </div>
    <div className="text-3xl font-black text-slate-800 mb-1">{value}</div>
    <div className="text-xs font-medium text-slate-400">{sub}</div>
  </div>
);

const TableRow = ({ clo, desc, cells, isWarning }: any) => (
  <tr className="hover:bg-slate-50/50">
    <td className="px-6 py-4 border-r border-slate-100">
      <div className="flex gap-3">
        <span className="bg-slate-100 text-slate-700 text-[10px] font-bold px-1.5 py-0.5 rounded h-fit">
          {clo}
        </span>
        <span className="text-xs text-blue-900 font-medium leading-relaxed">
          {desc}
        </span>
      </div>
    </td>
    {cells.map((val: string, i: number) => (
      <td
        key={i}
        className={`px-4 py-4 text-center border-r last:border-0 ${
          val ? "bg-green-50/30" : ""
        }`}
      >
        <span
          className={`text-sm font-bold ${
            isWarning && val === "M"
              ? "text-red-600 border-2 border-red-200 px-3 py-1 rounded-md"
              : "text-green-600"
          }`}
        >
          {val}
        </span>
      </td>
    ))}
  </tr>
);

const CheckList = ({ title, items, warning }: any) => (
  <div className="border border-slate-200 rounded-xl p-5">
    <h4 className="text-sm font-black text-slate-800 uppercase mb-4 tracking-wider">
      {title}
    </h4>
    <div className="space-y-3">
      {items.map((item: string) => (
        <div
          key={item}
          className="flex items-center gap-3 text-sm font-medium text-slate-600"
        >
          <span className="material-symbols-outlined text-green-500 font-bold">
            check
          </span>{" "}
          {item}
        </div>
      ))}
      {warning && (
        <div className="flex items-center gap-3 text-sm font-medium text-amber-600">
          <span className="material-symbols-outlined text-amber-500">
            warning
          </span>{" "}
          {warning}
        </div>
      )}
    </div>
  </div>
);

export default DuyetGiaoTrinh;
