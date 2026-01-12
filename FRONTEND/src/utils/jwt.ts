export interface JwtPayload {
  role: string;
  exp?: number;
}

export const decodeToken = (token: string): JwtPayload => {
  try {
    return JSON.parse(atob(token.split(".")[1]));
  } catch {
    return { role: "" };
  }
};
