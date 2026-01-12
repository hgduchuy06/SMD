import { Navigate } from "react-router-dom";

const RoleRoute = ({ allow, role, children }: any) => {
  if (!allow.includes(role)) return <Navigate to="/403" />;
  return children;
};

export default RoleRoute;
