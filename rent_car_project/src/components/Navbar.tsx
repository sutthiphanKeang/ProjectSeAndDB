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

const Navbar = () => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <ThemeProvider theme={theme}>
        <AppBar position="static" color="primary">
          <Toolbar variant="dense">
            <Link to="/FirstHome" style={{ textDecoration: "none" }}>
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
              <IconButton size="medium" color="inherit">
                <NewspaperIcon />
                <Typography>&nbsp;</Typography>
                <Link to="/" style={{ textDecoration: "none" }}>
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
                <Link to="/" style={{ textDecoration: "none" }}>
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
              <Button
                id="basic-button"
                aria-controls={open ? "basic-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
                onClick={handleClick}
                color="inherit"
              >
                <AccountCircleIcon />
              </Button>
              <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                  "aria-labelledby": "basic-button",
                }}
              >
                <MenuItem onClick={handleClose}>
                  <Link to="/" style={{ textDecoration: "none" }}>
                    My account
                  </Link>
                </MenuItem>
                <MenuItem onClick={handleClose}>
                <Link to="/Manage" style={{ textDecoration: "none" }}>
                    Manage For Admin
                  </Link>
                </MenuItem>
                <MenuItem onClick={handleClose}>
                <Link to="/" style={{ textDecoration: "none" }}>
                Logout
                  </Link>
                  </MenuItem>
              </Menu>
            </Box>
          </Toolbar>
        </AppBar>
      </ThemeProvider>
    </Box>
  );
};
export default Navbar;
