import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/userAuth";

const ProtectedRoute = ({ children }: any) => {
  const { token } = useAuth();
  if (!token) return <Navigate to="/login" />;
  return children;
};

export default ProtectedRoute;
