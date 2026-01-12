export const ROLES = {
  ADMIN: "SYSTEM_ADMIN",
  LECTURER: "LECTURER",
  HOD: "HOD",
  ACADEMIC: "ACADEMIC_AFFAIRS",
  PRINCIPAL: "PRINCIPAL",
  STUDENT: "STUDENT",
  PUBLIC: "PUBLIC",
} as const;

export type Role = (typeof ROLES)[keyof typeof ROLES];
