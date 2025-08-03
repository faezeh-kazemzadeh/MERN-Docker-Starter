import React, {useEffect} from "react";
import { Outlet } from "react-router-dom";
import Header from "../Header";
import Footer from "../Footer"; 
function MainLayout() {
    useEffect(() => {
        document.title = "Home - Your App Name";
    }, []);
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
}

export default MainLayout;
