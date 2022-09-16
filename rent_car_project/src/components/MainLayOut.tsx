import React, { Component, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import FirstHome from "./FirstHome";
import Navbar from "./Navbar";


const MainLayout:React.FC<{}> = () => {
  const navigate = useNavigate();
  useEffect(() => {
    navigate("/FirstHome");
  }, []);

  return (
    <div>
      <Navbar />
      <Outlet />
    </div>
  );
};

export default MainLayout;