import React, { useContext } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Authcontext from "../context/Authcontext/Authcontext";
import Loading from "../layouts/Loading"
const MainLayout = () => {
  const { loading } = useContext(Authcontext);

  if (loading) {
    return <Loading />;
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen">
        <Outlet />
      </div>
      <Footer />
    </>
  );
};

export default MainLayout;
