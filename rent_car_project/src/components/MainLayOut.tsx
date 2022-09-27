import React, { Component, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import FirstHome from "./FirstHome";
import Navbar from "./Navbar";
import Container from "@mui/material/Container";


const MainLayout:React.FC<{}> = () => {
  // const navigate = useNavigate();
  // useEffect(() => {
  //   navigate("/FirstHome");
  // }, []);

  return (
    <div>
      <Navbar />
      <Container fixed>
        <Outlet />
      </Container>
    </div>
  );
};

export default MainLayout;