import { Outlet, Navigate } from "react-router-dom";
import { useAuthStore } from "../auth/store/auth.store";

const PublicRoute = () => {
  const token = useAuthStore((state) => state.token);

  if (token) {
    return <Navigate to="/overview" replace />;
  }

  return <Outlet />;
};

export default PublicRoute;