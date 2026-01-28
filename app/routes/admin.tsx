import { Outlet, useNavigate, useLocation } from "react-router";
import { useEffect } from "react";

export default function AdminLayout() {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Check authentication
    const isAuthenticated = sessionStorage.getItem("adminAuth") === "true";

    if (!isAuthenticated && location.pathname !== "/admin/login") {
      navigate("/admin/login");
    }

    // Redirect /admin to /admin/dashboard if authenticated
    if (location.pathname === "/admin" && isAuthenticated) {
      navigate("/admin/dashboard");
    }
  }, [location.pathname, navigate]);

  return <Outlet />;
}
