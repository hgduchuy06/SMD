import { ROLES } from "./roles";

export interface MenuItem {
  label: string;
  path: string;
  roles: string[];
}

export const MENU_CONFIG: MenuItem[] = [
  { label: "Admin Dashboard", path: "/admin", roles: [ROLES.ADMIN] },
  { label: "Users", path: "/admin/users", roles: [ROLES.ADMIN] },

  { label: "My Syllabus", path: "/lecturer", roles: [ROLES.LECTURER] },

  { label: "Approval", path: "/hod", roles: [ROLES.HOD] },

  { label: "Academic Review", path: "/academic", roles: [ROLES.ACADEMIC] },

  { label: "Reports", path: "/principal", roles: [ROLES.PRINCIPAL] },

  { label: "Student", path: "/student", roles: [ROLES.STUDENT] },
];
