import React, { Component, useEffect, useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import { Link } from "react-router-dom";
import ConstructionIcon from "@mui/icons-material/Construction";
import LaptopChromebookIcon from "@mui/icons-material/LaptopChromebook";
import SchoolIcon from "@mui/icons-material/School";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import HomeIcon from "@mui/icons-material/Home";
import NewspaperIcon from "@mui/icons-material/Newspaper";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

const theme = createTheme({
  palette: {
    primary: {
      light: "#6746c3",
      main: "#2c466a",
      dark: "#000063",
      contrastText: "#fff",
    },
    secondary: {
      light: "#ff5f52",
      main: "#c62828",
      dark: "#8e0000",
      contrastText: "#fff",
    },
  },
});

type props = {
  onLogin : boolean;
  setonLogin : (a:boolean) => void;
}

const Navbar: React.FC<props> = ({onLogin,setonLogin}) => {
  
  return (
    <Box sx={{ flexGrow: 1 }}>
      <ThemeProvider theme={theme}>
        <AppBar position="static" color="primary">
          <Toolbar variant="dense">
            <Link to="/" style={{ textDecoration: "none" }}>
              <Typography variant="h4" sx={{ color: "white" }} component="div">
                <b>เช่ารถเช่าใจ</b>
              </Typography>
            </Link>

            <Box sx={{ flexGrow: 1 }} />
            <Box sx={{ display: { xs: "none", md: "flex" } }}>
              <IconButton size="medium" color="inherit">
                <HomeIcon />
                <Typography>&nbsp;</Typography>
                <Link to="/" style={{ textDecoration: "none" }}>
                  <Typography
                    sx={{
                      color: "white",
                      fontWeight: "bold",
                      fontSize: "100%",
                    }}
                  >
                    Home
                  </Typography>
                </Link>
              </IconButton>
              {onLogin && (
                <IconButton size="medium" color="inherit">
                  <LaptopChromebookIcon />
                  <Typography>&nbsp;</Typography>
                  <Link to="/rentCar" style={{ textDecoration: "none" }}>
                    <Typography
                      sx={{
                        color: "white",
                        fontWeight: "bold",
                        fontSize: "100%",
                      }}
                    >
                      Booking
                    </Typography>
                  </Link>
                </IconButton>
              )}
              {onLogin && (
                <IconButton size="medium" color="inherit">
                  <LaptopChromebookIcon />
                  <Typography>&nbsp;</Typography>
                  <Link to="" style={{ textDecoration: "none" }}>
                    <Typography
                      sx={{
                        color: "white",
                        fontWeight: "bold",
                        fontSize: "100%",
                      }}
                    >
                      My Account
                    </Typography>
                  </Link>
                </IconButton>
              )}
              {onLogin && (
                <IconButton
                  size="medium"
                  color="inherit"
                  onClick={() => {
                    localStorage.clear();
                    setonLogin(false);
                    alert("Log Out สำเร็จ")
                  }}
                >
                  <LaptopChromebookIcon />
                  <Typography>&nbsp;</Typography>
                  <Link to="/" style={{ textDecoration: "none" }}>
                    <Typography
                      sx={{
                        color: "white",
                        fontWeight: "bold",
                        fontSize: "100%",
                      }}
                    >
                      Log Out
                    </Typography>
                  </Link>
                </IconButton>
              )}
              {!onLogin && (
                <IconButton size="medium" color="inherit">
                  <HomeIcon />
                  <Typography>&nbsp;</Typography>
                  <Link to="/Login" style={{ textDecoration: "none" }}>
                    <Typography
                      sx={{
                        color: "white",
                        fontWeight: "bold",
                        fontSize: "100%",
                      }}
                    >
                      Log In And Register
                    </Typography>
                  </Link>
                </IconButton>
              )}
            </Box>
          </Toolbar>
        </AppBar>
      </ThemeProvider>
    </Box>
  );
};
export default Navbar;
