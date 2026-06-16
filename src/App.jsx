import Home from "./pages/Home";
import AdminLeads from "./pages/AdminLeads";
import AdminLogin from "./pages/AdminLogin";
import AdminSiteContent from "./pages/AdminSiteContent";

export default function App() {
  const path = window.location.pathname;
  const isAuthenticated = localStorage.getItem("tria_admin_auth") === "true";

  if (path === "/admin/login") {
    return <AdminLogin />;
  }

  if (path === "/admin/leads") {
    if (!isAuthenticated) {
      window.location.href = "/admin/login";
      return null;
    }

    return <AdminLeads />;
  }

  if (path === "/admin/content") {
    if (!isAuthenticated) {
      window.location.href = "/admin/login";
      return null;
    }

    return <AdminSiteContent />;
  }

  return <Home />;
}