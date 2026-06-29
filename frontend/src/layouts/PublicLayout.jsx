import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../components/layout/public/Header";
import Footer from "../components/layout/public/Footer";

const PublicLayout = () => {
  return (
    <div>
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
};

export default PublicLayout;
