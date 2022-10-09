import React, { Component, useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import FirstHome from "./FirstHome";
import Navbar from "./Navbar";
import Container from "@mui/material/Container";


const MainLayout:React.FC<{}> = () => {
  const [onLogin, setonLogin] = useState(localStorage.getItem("res") !== null);
  
  return (
    <div>
      <Navbar onLogin = {onLogin} setonLogin = {setonLogin}/>
      <Container fixed>
        <Outlet context={[onLogin, setonLogin]}/>
      </Container>
    </div>
  );
};

export default MainLayout;