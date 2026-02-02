import React from "react";

const QuanLyNguoiDung: React.FC = () => {
  // Dữ liệu mẫu cho bảng
  const users = [
    {
      id: 1,
      name: "Nguyễn Văn Hùng",
      email: "hung.nv@university.edu.vn",
      role: "Giảng viên",
      department: "Khoa Công nghệ thông tin",
      status: "Hoạt động",
      joinDate: "20/10/2023",
      avatar: "1",
    },
    {
      id: 2,
      name: "Trần Thị Lan",
      email: "lan.tt@university.edu.vn",
      role: "Sinh viên",
      department: "Khoa Kinh tế",
      status: "Hoạt động",
      joinDate: "15/09/2023",
      initial: "TL",
      color: "bg-purple-100 text-purple-600",
    },
    {
      id: 3,
      name: "Lê Văn Cường",
      email: "cuong.lv@university.edu.vn",
      role: "Quản trị viên",
      department: "Phòng Đào tạo",
      status: "Chờ duyệt",
      joinDate: "01/11/2023",
      avatar: "2",
    },
    {
      id: 4,
      name: "Phạm Minh",
      email: "minh.pm@university.edu.vn",
      role: "Sinh viên",
      department: "Khoa Ngoại ngữ",
      status: "Đã khóa",
      joinDate: "10/08/2023",
      initial: "PM",
      color: "bg-orange-100 text-orange-600",
    },
    {
      id: 5,
      name: "Hoàng Thu Trang",
      email: "trang.ht@university.edu.vn",
      role: "Giảng viên",
      department: "Khoa Luật",
      status: "Hoạt động",
      joinDate: "05/09/2023",
      avatar: "3",
    },
  ];

  return (
    <div className="max-w-[1400px] mx-auto flex flex-col gap-6 p-8">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div className="flex flex-col gap-2">
          <h1 className="text-[#0d121b] dark:text-white text-3xl font-black tracking-tight">
            Quản lý Người dùng
          </h1>
          <p className="text-[#4c669a] dark:text-gray-400 text-base max-w-2xl">
            Quản lý vòng đời tài khoản, phân quyền người dùng chi tiết, hỗ trợ
            nhập liệu nhanh từ file CSV và kiểm soát trạng thái khóa/mở khóa tài
            khoản.
          </p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg border border-[#d1d5db] dark:border-gray-600 bg-white dark:bg-surface-dark text-[#0d121b] dark:text-white font-semibold hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors shadow-sm">
            <span className="material-symbols-outlined text-[20px]">
              upload_file
            </span>
            <span>Nhập CSV</span>
          </button>
          <button className="flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg bg-primary text-white font-semibold hover:bg-primary/90 transition-colors shadow-md shadow-primary/20">
            <span className="material-symbols-outlined text-[20px]">add</span>
            <span>Thêm mới</span>
          </button>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="bg-surface-light dark:bg-surface-dark p-4 rounded-xl shadow-sm border border-[#e7ebf3] dark:border-gray-800">
        <div className="flex flex-col lg:flex-row gap-4 justify-between">
          <div className="relative flex-1 max-w-lg">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <span className="material-symbols-outlined text-[#9ca3af]">
                search
              </span>
            </div>
            <input
              className="block w-full pl-10 pr-3 py-2.5 border-none rounded-lg bg-background-light dark:bg-background-dark text-[#0d121b] dark:text-white placeholder-[#9ca3af] focus:ring-2 focus:ring-primary/50 transition-all text-sm"
              placeholder="Tìm kiếm theo tên, email hoặc mã số..."
              type="text"
            />
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-2 px-3 py-2.5 bg-background-light dark:bg-background-dark rounded-lg min-w-[160px]">
              <span className="material-symbols-outlined text-[#64748b] text-[20px]">
                school
              </span>
              <select className="bg-transparent border-none p-0 text-sm font-medium text-[#0d121b] dark:text-white focus:ring-0 w-full cursor-pointer">
                <option value="">Tất cả vai trò</option>
                <option value="admin">Admin</option>
                <option value="lecturer">Lecturer</option>
                <option value="academic">academic</option>
                <option value="hod">hod</option>
                <option value="principal">principal</option>
                <option value="student">Student</option>
              </select>
            </div>
            {/* Các select khác tương tự */}
            <button className="p-2.5 rounded-lg bg-primary/10 text-primary hover:bg-primary/20 transition-colors">
              <span className="material-symbols-outlined">tune</span>
            </button>
          </div>
        </div>
      </div>

      {/* Table Section */}
      <div className="bg-surface-light dark:bg-surface-dark rounded-xl shadow-sm border border-[#e7ebf3] dark:border-gray-800 overflow-hidden flex flex-col flex-1 min-h-[500px]">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#f8f9fc] dark:bg-gray-800/50 border-b border-[#e7ebf3] dark:border-gray-800">
                <th className="p-4 w-12 text-center">
                  <input
                    className="rounded border-gray-300 text-primary focus:ring-primary bg-white dark:bg-gray-700"
                    type="checkbox"
                  />
                </th>
                <th className="p-4 text-xs font-semibold text-[#4c669a] uppercase tracking-wider">
                  Thông tin người dùng
                </th>
                <th className="p-4 text-xs font-semibold text-[#4c669a] uppercase tracking-wider">
                  Vai trò
                </th>
                <th className="p-4 text-xs font-semibold text-[#4c669a] uppercase tracking-wider">
                  Khoa / Phòng ban
                </th>
                <th className="p-4 text-xs font-semibold text-[#4c669a] uppercase tracking-wider">
                  Trạng thái
                </th>
                <th className="p-4 text-xs font-semibold text-[#4c669a] uppercase tracking-wider text-right">
                  Ngày tham gia
                </th>
                <th className="p-4 text-xs font-semibold text-[#4c669a] uppercase tracking-wider text-right">
                  Thao tác
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#e7ebf3] dark:divide-gray-800">
              {users.map((user) => (
                <tr
                  key={user.id}
                  className="group hover:bg-[#f8f9fc] dark:hover:bg-gray-800/30 transition-colors"
                >
                  <td className="p-4 text-center">
                    <input
                      className="rounded border-gray-300 text-primary focus:ring-primary bg-white dark:bg-gray-700"
                      type="checkbox"
                    />
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      {user.avatar ? (
                        <div
                          className="w-10 h-10 rounded-full bg-gray-200 bg-cover bg-center flex-shrink-0"
                          style={{
                            backgroundImage: `url('http://googleusercontent.com/profile/picture/${user.avatar}')`,
                          }}
                        ></div>
                      ) : (
                        <div
                          className={`w-10 h-10 rounded-full ${user.color} flex items-center justify-center font-bold text-sm flex-shrink-0`}
                        >
                          {user.initial}
                        </div>
                      )}
                      <div className="flex flex-col">
                        <span className="text-[#0d121b] dark:text-white font-semibold text-sm">
                          {user.name}
                        </span>
                        <span className="text-[#4c669a] text-xs">
                          {user.email}
                        </span>
                      </div>
                    </div>
                  </td>
                  <td className="p-4">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300">
                      {user.role}
                    </span>
                  </td>
                  <td className="p-4 text-sm text-[#0d121b] dark:text-gray-300">
                    {user.department}
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-1.5">
                      <div
                        className={`w-2 h-2 rounded-full ${
                          user.status === "Hoạt động"
                            ? "bg-green-500"
                            : user.status === "Chờ duyệt"
                            ? "bg-orange-500"
                            : "bg-gray-400"
                        }`}
                      ></div>
                      <span
                        className={`text-sm font-medium ${
                          user.status === "Hoạt động"
                            ? "text-green-600"
                            : user.status === "Chờ duyệt"
                            ? "text-orange-600"
                            : "text-gray-500"
                        }`}
                      >
                        {user.status}
                      </span>
                    </div>
                  </td>
                  <td className="p-4 text-right text-sm text-[#4c669a]">
                    {user.joinDate}
                  </td>
                  <td className="p-4 text-right">
                    <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="p-1.5 rounded-lg text-gray-400 hover:text-primary transition-colors">
                        <span className="material-symbols-outlined text-[20px]">
                          edit
                        </span>
                      </button>
                      <button className="p-1.5 rounded-lg text-gray-400 hover:text-red-500 transition-colors">
                        <span className="material-symbols-outlined text-[20px]">
                          delete
                        </span>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="p-4 border-t border-[#e7ebf3] dark:border-gray-800 flex items-center justify-between">
          <p className="text-sm text-[#4c669a]">
            Hiển thị{" "}
            <span className="font-medium text-[#0d121b] dark:text-white">
              1
            </span>{" "}
            đến{" "}
            <span className="font-medium text-[#0d121b] dark:text-white">
              5
            </span>{" "}
            trong số{" "}
            <span className="font-medium text-[#0d121b] dark:text-white">
              128
            </span>{" "}
            kết quả
          </p>
          <div className="flex items-center gap-2">
            <button className="p-2 rounded-lg border border-[#e7ebf3] dark:border-gray-700 text-[#4c669a] hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
              <span className="material-symbols-outlined text-[20px]">
                chevron_left
              </span>
            </button>
            <button className="w-9 h-9 flex items-center justify-center rounded-lg bg-primary text-white text-sm font-medium">
              1
            </button>
            <button className="p-2 rounded-lg border border-[#e7ebf3] dark:border-gray-700 text-[#4c669a] hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
              <span className="material-symbols-outlined text-[20px]">
                chevron_right
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuanLyNguoiDung;
