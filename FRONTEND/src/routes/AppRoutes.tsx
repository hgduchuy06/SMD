import { useRoutes } from "react-router-dom";

import AdminLayout from "../Layouts/AdminLayout";
import LecturerLayout from "../Layouts/LecturerLayout";
import HodLayout from "../Layouts/HodLayout";
import AcademicLayout from "../Layouts/AcademicLayout";
import PrincipalLayout from "../Layouts/PrincipalLayout";
import StudentLayout from "../Layouts/StudentLayout";

import AdminDashboard from "../Pages/admin/QuanLyNguoiDung";
import LecturerDashboard from "../Pages/lecturer/LecturerDashboard";
import HodDashboard from "../Pages/hod/HodDashboard";
import AcademicDuyet from "../Pages/academic/DuyetGiaoTrinh";
import PrincipalDashboard from "../Pages/principal/PrincipalDashboard";
import StudentDashboard from "../Pages/student/StudentDashboard";

import ProtectedRoute from "./ProtectedRoute";
import RoleRoute from "./RoleRoute";
import { ROLES } from "../config/roles";

const AppRoutes = () =>
  useRoutes([
    {
      path: "/admin",
      element: (
        <ProtectedRoute>
          <RoleRoute allow={[ROLES.ADMIN]}>
            <AdminLayout />
          </RoleRoute>
        </ProtectedRoute>
      ),
      children: [{ index: true, element: <AdminDashboard /> }],
    },

    {
      path: "/lecturer",
      element: (
        <ProtectedRoute>
          <RoleRoute allow={[ROLES.LECTURER]}>
            <LecturerLayout />
          </RoleRoute>
        </ProtectedRoute>
      ),
      children: [{ index: true, element: <LecturerDashboard /> }],
    },

    {
      path: "/hod",
      element: (
        <ProtectedRoute>
          <RoleRoute allow={[ROLES.HOD]}>
            <HodLayout />
          </RoleRoute>
        </ProtectedRoute>
      ),
      children: [{ index: true, element: <HodDashboard /> }],
    },

    {
      path: "/academic",
      element: (
        <ProtectedRoute>
          <RoleRoute allow={[ROLES.ACADEMIC]}>
            <AcademicLayout />
          </RoleRoute>
        </ProtectedRoute>
      ),
      children: [{ index: true, element: <AcademicDuyet /> }],
    },

    {
      path: "/principal",
      element: (
        <ProtectedRoute>
          <RoleRoute allow={[ROLES.PRINCIPAL]}>
            <PrincipalLayout />
          </RoleRoute>
        </ProtectedRoute>
      ),
      children: [{ index: true, element: <PrincipalDashboard /> }],
    },

    // Student + Public
    {
      path: "/student",
      element: <StudentLayout />,
      children: [{ index: true, element: <StudentDashboard /> }],
    },
  ]);

export default AppRoutes;
