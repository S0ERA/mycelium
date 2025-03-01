import { Navigate, Outlet } from "react-router-dom";

const SecuredRoute = () => {
  const isAuthenticated = !!localStorage.getItem("currentUser");

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default SecuredRoute;
