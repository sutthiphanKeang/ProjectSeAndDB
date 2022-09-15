import React, { Component, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import FristHome from "./FristHome";
import Navbar from "./Navbar";


const MainLayout:React.FC<{}> = () => {
  const navigate = useNavigate();
  useEffect(() => {
    navigate("/FristHome");
  }, []);

  return (
    <div>
      <Navbar />
      <Outlet />
    </div>
  );
};

export default MainLayout;