import React, {useState } from "react";
import { Outlet} from "react-router-dom";
import NavbarUser from "./Navbar-user";
import Container from "@mui/material/Container";

const MainLayoutUser: React.FC<{}> = () => {
  const [onLoginuser, setonLoginuser] = useState(
    !!localStorage.getItem("user")
  );

  return (
    <div>
      <NavbarUser onLoginuser={onLoginuser} setonLoginuser={setonLoginuser} />
      <Container fixed>
        <Outlet context={[onLoginuser, setonLoginuser]} />
      </Container>
    </div>
  );
};

export default MainLayoutUser;
