import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
<<<<<<< HEAD
import { useState } from "react";
import Grid from "@mui/material/Grid";
=======
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useOutletContext } from "react-router-dom";
>>>>>>> a102bc94850c9cd413bbe325d78db5bd150af3ae

const LoginAdmin: React.FC = () => {
  const [onLogin, setonLogin] = useOutletContext<any>();
  const [aemail, setaemail] = useState("");
  const navigate = useNavigate();
  const [apassword, setapassword] = useState("");
  const [part, setpart] = useState("");

  useEffect(() => {
    navigate(part);
  }, [part]);

  useEffect(() =>{
    if (onLogin){
      navigate("/")
    }
  },[])

  const lhandleSubmit = () => {
    console.log(`lhandleSubmit`);
    var body = new FormData();
    body.append("lemail", aemail);
    body.append("lpassword", apassword);

<<<<<<< HEAD
    fetch("http://localhost:5500/authen/admin/login", {
      mode: "cors",
      body: body,
      method: "POST",
    })
      .then((response) => response.json())
      .then((data) => console.log(data));
=======
    axios
      .post("http://localhost:5500/authen/admin/login", {
        email: aemail,
        password: apassword,
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
>>>>>>> a102bc94850c9cd413bbe325d78db5bd150af3ae
  };
  console.log("admin email 👉️", aemail);
  console.log("admin password 👉️", apassword);

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
            <Typography variant="h5" component="div" align="center">
              <h3>Log in</h3>
            </Typography>
            <div>
              <br />
            </div>
            <Grid container spacing={2}>
              <Grid
                item
                xs
                container
                direction="column"
                spacing={2}
                justifyContent="center"
                alignItems="center"
                marginLeft="20%"
                
              >
                <Grid item>
                  <form 
                  encType="multipart/form-data">
                    <input 
                      type="text"
                      placeholder="email"
                      name="email"
                      onChange={(event) => setaemail(event.target.value)}
                    ></input>
                    <input 
                      type="text"
                      placeholder="password"
                      name="password"
                      onChange={(event) => setapassword(event.target.value)}
                    ></input>
                  </form>
                </Grid>
              </Grid>
            </Grid>
          </CardContent>
          <CardActions>
            <Button
              fullWidth
              variant="contained"
              type="submit"
              sx={{ m: 1 }}
              onClick={lhandleSubmit}
            >
              Login
            </Button>
          </CardActions>
        </Card>
      </Card>
    </Stack>
  );
};
export default LoginAdmin;
