import { decodeToken } from "../utils/jwt";

export const useAuth = () => {
  const token = localStorage.getItem("token");

  const login = (token: string) => {
    localStorage.setItem("token", token);
  };

  const logout = () => {
    localStorage.removeItem("token");
  };

  const user = token ? decodeToken(token) : null;

  return { token, user, login, logout };
};
