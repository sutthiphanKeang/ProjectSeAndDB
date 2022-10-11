import React, { Component, useEffect, useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import { Link } from "react-router-dom";
import LaptopChromebookIcon from "@mui/icons-material/LaptopChromebook";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import HomeIcon from "@mui/icons-material/Home";

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
  onLoginadmin: boolean;
  setonLoginadmin: (a: boolean) => void;
};

const NavbarAdmin: React.FC<props> = ({ onLoginadmin, setonLoginadmin }) => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <ThemeProvider theme={theme}>
        <AppBar position="static" color="primary">
          <Toolbar variant="dense">
              <Typography variant="h4" sx={{ color: "white" }} component="div">
                <b>เช่ารถเช่าใจ</b>
              </Typography>
            <Box sx={{ flexGrow: 1 }} />
            <Box sx={{ display: { xs: "none", md: "flex" } }}>
              {onLoginadmin && (
                <IconButton size="medium" color="inherit">
                  <LaptopChromebookIcon />
                  <Typography>&nbsp;</Typography>
                  <Link to="/Admin/Manage" style={{ textDecoration: "none" }}>
                    <Typography
                      sx={{
                        color: "white",
                        fontWeight: "bold",
                        fontSize: "100%",
                      }}
                    >
                      Manage
                    </Typography>
                  </Link>
                </IconButton>
              )}
              {onLoginadmin && (
                <IconButton
                  size="medium"
                  color="inherit"
                  onClick={() => {
                    localStorage.clear();
                    setonLoginadmin(false);
                    alert("Log Out สำเร็จ");
                  }}
                >
                  <LaptopChromebookIcon />
                  <Typography>&nbsp;</Typography>
                  <Link to="/Admin/Login" style={{ textDecoration: "none" }}>
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
            </Box>
          </Toolbar>
        </AppBar>
      </ThemeProvider>
    </Box>
  );
};
export default NavbarAdmin;
