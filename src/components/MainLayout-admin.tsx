import React, {useState } from "react";
import { Outlet} from "react-router-dom";
import NavbarAdmin from "./Navbar-admin";
import Container from "@mui/material/Container";

const MainLayoutAdmin: React.FC<{}> = () => {
  const [onLoginadmin, setonLoginadmin] = useState(
    !!localStorage.getItem("admin")
  );

  return (
    <div>
      <NavbarAdmin
        onLoginadmin={onLoginadmin}
        setonLoginadmin={setonLoginadmin}
      />
      <Container fixed>
        <Outlet context={[onLoginadmin, setonLoginadmin]} />
      </Container>
    </div>
  );
};

export default MainLayoutAdmin;
