import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import { useEffect, useState } from "react";
import { useNavigate , useOutletContext} from "react-router-dom";
import axios from "axios";

const AuthenUser: React.FC = () => {
  const [onLogin, setonLogin] = useOutletContext<any>();
  const navigate = useNavigate();
  const [part, setpart] = useState("");

  // login
  const [uemail, setuemail] = useState("");
  const [upassword, setupassword] = useState("");

  useEffect(() => {
    navigate(part);
  }, [part]);

  useEffect(() =>{
    if (onLogin){
      navigate("/")
    }
  },[])

  // login
  const lhandleSubmit = () => {
    console.log(`uhandleSubmit`);
    // var body = new FormData();
    // body.append("lemail", lemail);
    // body.append("lpassword", lpassword);

    axios
      .post("http://localhost:5500/authen/login", {
        email: uemail,
        password: upassword,
      })
      .then((response) => {
        console.log("login res", response);
        return response.data;
      })
      .then((data) => {
        localStorage.setItem("user", JSON.stringify(data));
        console.log("token", JSON.parse(localStorage.getItem("user")??"{token:\"\"}").token);
        console.log("b", data);
        setpart("/");
        setonLogin(true);
        console.log("a", data);
      })
      .catch((error) => {
        console.error("found error", error);
        alert("กรุณาตรวจสอบข้อมูลอีกครั้ง");
      });
  };

  console.log("user email 👉️", uemail);
  console.log("user password 👉️", upassword);

  return (
    <Stack
      direction="row"
      justifyContent="center"
      alignItems="center"
      spacing={4}
    >
      <Card sx={{ mt: 6 }}>
        <Card sx={{ minWidth: 275 }}>
          <CardContent>
            <Typography variant="h5" component="div">
              Log in
            </Typography>
            <div>
              <br />
            </div>
            <form>
              <input
                type="text"
                placeholder="email"
                name="email"
                onChange={(event) => setuemail(event.target.value)}
                value={uemail}
              ></input>
              <input
                type="text"
                placeholder="password"
                name="password"
                onChange={(event) => setupassword(event.target.value)}
                value={upassword}
              ></input>
            </form>
          </CardContent>
          <CardActions>
            <Button
              variant="contained"
              type="submit"
              sx={{ m: 1 }}
              onClick={lhandleSubmit}
            >
              Submit
            </Button>
          </CardActions>
          <CardActions>
            <span>New User ? <a href="/Register">Sign Up</a></span>
          </CardActions>
        </Card>
      </Card>
    </Stack>
  );
};
export default AuthenUser;
