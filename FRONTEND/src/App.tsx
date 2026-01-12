import { Routes, Route } from "react-router-dom";

import Login from "./Pages/auth/Login";
//admin(xong)
import AdminLayout from "./Layouts/AdminLayout";
import QuanLyNguoiDung from "./Pages/admin/QuanLyNguoiDung";
import CauHinhHeThong from "./Pages/admin/CauHinhHeThong";
import QuanLyXuatBan from "./Pages/admin/QuanLyXuatBan";

//hod(xong)
import HodLayout from "./Layouts/HodLayout";
import DuyetCap1 from "./Pages/hod/DuyetCap1";
import QuanLyPhanBien from "./Pages/hod/QuanLyPhanBien";
import TraCuuPhanTichHod from "./Pages/hod/TraCuuPhanTichHod";
import ThongBaoHod from "./Pages/hod/ThongBaoHod";

//principal(xong)
import PrincipalLayout from "./Layouts/PrincipalLayout";
import PrincipalDashboard from "./Pages/principal/PrincipalDashboard";
import PrincipalApprovalDetail from "./Pages/principal/PrincipalApprovalDetail";

//Lecturer(xong)
import LecturerLayout from "./Layouts/LecturerLayout";
import QuanLyGiaoTrinh from "./Pages/lecturer/QuanLyGiaoTrinh";
import PhanBien from "./Pages/lecturer/PhanBien";
import TaoGiaoTrinh from "./Pages/lecturer/TaoGiaoTrinh";
import CapNhatGiaoTrinh from "./Pages/lecturer/CapNhatGiaoTrinh";
import ThongBaoLecturer from "./Pages/lecturer/ThongBaoLecturer";

//Student
import StudentLayout from "./Layouts/StudentLayout";
import TimKiemGiaoTrinh from "./Pages/student/TimKiemGiaoTrinh";
import ChiTietGiaoTrinh from "./Pages/student/ChiTietGiaoTrinh";
import TheoDoi from "./Pages/student/TheoDoi";
import PhanHoiLoi from "./Pages/student/PhanHoiLoi";
//academic(xong)
import AcademicLayout from "./Layouts/AcademicLayout";
import DuyetGiaoTrinh from "./Pages/academic/DuyetGiaoTrinh";
import ThongKe from "./Pages/academic/ThongKe";
import TraCuuPhanTich from "./Pages/academic/TraCuuPhanTich";
import ChuongTrinhDaoTao from "./Pages/academic/ChuongTrinhDaoTao";
import ThongBao from "./Pages/academic/ThongBao";

function App() {
  return (
    <Routes>
      {/* Public */}
      <Route path="/" element={<Login />} />

      {/* Admin */}
      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<QuanLyNguoiDung />} />
        {/* Route mới thêm vào đây */}
        <Route path="system" element={<CauHinhHeThong />} />
        <Route path="manager" element={<QuanLyXuatBan />} />
      </Route>

      {/* Lecturer */}
      <Route path="/lecturer" element={<LecturerLayout />}>
        <Route index element={<QuanLyGiaoTrinh />} />
        {/* Route mới thêm vào đây */}
        <Route path="tao" element={<TaoGiaoTrinh />} />
        <Route path="capnhat" element={<CapNhatGiaoTrinh />} />
        <Route path="phanbien" element={<PhanBien />} />
        <Route path="thongbao" element={<ThongBaoLecturer />} />
      </Route>

      {/* Student */}
      <Route path="/student" element={<StudentLayout />}>
        <Route index element={<TimKiemGiaoTrinh />} />
        {/* Route mới thêm vào đây */}
        <Route path="chitiet" element={<ChiTietGiaoTrinh />} />
        <Route path="theodoi" element={<TheoDoi />} />
        <Route path="phanhoi" element={<PhanHoiLoi />} />
      </Route>

      {/* Principal */}
      <Route path="/principal" element={<PrincipalLayout />}>
        <Route index element={<PrincipalDashboard />} />
        {/* Route mới thêm vào đây */}
        <Route path="approval" element={<PrincipalApprovalDetail />} />
      </Route>

      {/* hod */}
      <Route path="/hod" element={<HodLayout />}>
        <Route index element={<DuyetCap1 />} />
        {/* Route mới thêm vào đây */}
        <Route path="phanbien" element={<QuanLyPhanBien />} />
        <Route path="tracuu" element={<TraCuuPhanTichHod />} />
        <Route path="thongbao" element={<ThongBaoHod />} />
      </Route>

      {/* Academic */}
      <Route path="/academic" element={<AcademicLayout />}>
        <Route index element={<ThongKe />} />
        {/* Route mới thêm vào đây */}
        <Route path="duyet" element={<DuyetGiaoTrinh />} />
        <Route path="chuongtrinh" element={<ChuongTrinhDaoTao />} />
        <Route path="tracuu" element={<TraCuuPhanTich />} />
        <Route path="thongbao" element={<ThongBao />} />
      </Route>
    </Routes>
  );
}

export default App;
