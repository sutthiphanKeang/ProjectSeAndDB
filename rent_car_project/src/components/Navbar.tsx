import React, { Component } from "react";
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
import HomeIcon from '@mui/icons-material/Home';
import NewspaperIcon from '@mui/icons-material/Newspaper';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const theme = createTheme({
  palette: {
    primary: {
      light: "#6746c3",
      main: "#311b92",
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

export default class Navbar extends Component {
  render() {
    return (
      <Box sx={{ flexGrow: 1 }}>
          <ThemeProvider theme={theme}>
            <AppBar position="static" color="primary">
              <Toolbar variant="dense">
                <Link to="/Home">
                  <Typography
                    variant="h4"
                    sx={{ color: "white" }}
                    component="div"
                  >
                    <b>เช่ารถเช่าใจ</b>
                  </Typography>
                </Link>

                <Box sx={{ flexGrow: 1 }} />
                <Box sx={{ display: { xs: "none", md: "flex" } }}>
                  <IconButton size="medium" color="inherit">
                    <HomeIcon />
                    <Typography>&nbsp;</Typography>
                    <Link to="/Home" color="inherit">
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
                  <IconButton size="medium" color="inherit">
                    <NewspaperIcon />
                    <Typography>&nbsp;</Typography>
                    <Link to="/About">
                      <Typography
                        sx={{
                          color: "white",
                          fontWeight: "bold",
                          fontSize: "100%",
                        }}
                      >
                        News
                      </Typography>
                    </Link>
                  </IconButton>
                  <IconButton size="medium" color="inherit">
                    <LaptopChromebookIcon />
                    <Typography>&nbsp;</Typography>
                    <Link to="/Skills" color="inherit">
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
                  <IconButton size="medium" color="inherit">
                    <AccountCircleIcon />
                    <Typography>&nbsp;</Typography>
                    <Link to="/Education" color="inherit">
                      <Typography
                        sx={{
                          color: "white",
                          fontWeight: "bold",
                          fontSize: "100%",
                        }}
                      >
                        Log in/Register
                      </Typography>
                    </Link>
                  </IconButton>
                </Box>
              </Toolbar>
            </AppBar>
          </ThemeProvider>
      </Box>
      
    )
  }
}
