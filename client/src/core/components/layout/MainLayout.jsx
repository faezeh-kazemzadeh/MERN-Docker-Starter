import React, { useEffect } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../../features/auth/hooks/useAuth";
import Header from "../Header";
import Footer from "../Footer";
function MainLayout() {
  const { clearAuthMessages } = useAuth();
  const location = useLocation();

  useEffect(() => {
    document.title = "Home - Your App Name";
  }, []);

  useEffect(() => {
    clearAuthMessages();
    return () => {
      clearAuthMessages();
    };
  }, [location.pathname, clearAuthMessages]);
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
}

export default MainLayout;
