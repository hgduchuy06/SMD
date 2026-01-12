import React from "react";
import { Outlet, Link, useLocation } from "react-router-dom";

const AdminLayout: React.FC = () => {
  const location = useLocation();

  const menuItems = [
    { icon: "group", label: "Người dùng", path: "/admin" },
    { icon: "bar_chart", label: "Quản Lý xuất bản", path: "/admin/manager" },
    { icon: "settings", label: "Cấu hình", path: "/admin/system" },
  ];

  return (
    <div className="flex h-screen w-full bg-[#f6f6f8] font-['Lexend'] text-gray-900 antialiased">
      {/* ================= Sidebar ================= */}
      <aside className="w-64 flex-shrink-0 border-r border-gray-200 bg-white flex flex-col">
        {/* Logo */}
        <div className="p-6 border-b border-gray-100">
          <div className="flex gap-3 items-center">
            <div className="bg-[#135bec] rounded-full h-10 w-10 flex items-center justify-center text-white font-bold shadow-sm">
              U
            </div>
            <div>
              <h1 className="text-base font-semibold leading-tight">
                UTH PORTAL
              </h1>
              <p className="text-xs text-gray-500">Admin Portal</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
          {menuItems.map((item, index) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={index}
                to={item.path}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${
                  isActive
                    ? "bg-[#135bec] text-white"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                <span className="material-symbols-outlined">{item.icon}</span>
                <span className="text-sm font-medium">{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Bottom */}
        <div className="p-3 border-t border-gray-100">
          <Link
            to="#"
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-gray-700 hover:bg-gray-100"
          >
            <span className="material-symbols-outlined">settings</span>
            <span className="text-sm font-medium">Cài đặt</span>
          </Link>

          <Link
            to="/"
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-red-600 hover:bg-red-50 mt-1"
          >
            <span className="material-symbols-outlined">logout</span>
            <span className="text-sm font-medium">Đăng xuất</span>
          </Link>
        </div>
      </aside>

      {/* ================= Main Area ================= */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Header */}
        <header className="h-16 w-full flex items-center justify-between px-8 bg-white border-b border-gray-200 flex-shrink-0">
          {/* Search */}
          <div className="hidden md:block relative w-96">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 material-symbols-outlined text-[20px]">
              search
            </span>
            <input
              type="text"
              placeholder="Tìm kiếm giáo trình, báo cáo..."
              className="w-full pl-10 pr-4 py-2 bg-gray-50 rounded-lg text-sm focus:ring-2 focus:ring-[#135bec]/20"
            />
          </div>

          {/* User */}
          <div className="flex items-center gap-4">
            <button className="relative p-2 text-gray-500 hover:bg-gray-100 rounded-full">
              <span className="material-symbols-outlined">notifications</span>
              <span className="absolute top-2 right-2 h-2 w-2 bg-red-500 rounded-full border-2 border-white" />
            </button>

            <div className="h-8 w-px bg-gray-200" />

            <div className="flex items-center gap-3">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-medium"></p>
                <p className="text-xs text-gray-500"></p>
              </div>
              <div className="h-10 w-10 rounded-full bg-gray-200 overflow-hidden">
                <img
                  src="https://i.pravatar.cc/150?u=sarah"
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 w-full overflow-y-auto p-8">
          <div className="w-full min-w-0">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
