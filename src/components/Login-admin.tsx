import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import { useEffect, useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import axios from "axios";

import IconButton from "@mui/material/IconButton";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

interface State {
  email: string;
  password: string;
  showPassword: boolean;
}

const LoginAdmin: React.FC = () => {
  const [values, setValues] = React.useState<State>({
    email: "",
    password: "",
    showPassword: false,
  });

  const handleChange =
    (prop: keyof State) => (event: React.ChangeEvent<HTMLInputElement>) => {
      setValues({ ...values, [prop]: event.target.value });
    };

  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const [onLoginadmin, setonLoginadmin] = useOutletContext<any>();
  const navigate = useNavigate();
  const [part, setpart] = useState("");


  useEffect(() => {
    navigate(part);
  }, [part]);

  useEffect(() =>{
    if (onLoginadmin){
      navigate("/Admin/Manage")
    }
  },[onLoginadmin])

  const lhandleSubmit = () => {
    console.log(`lhandleSubmit`);


    axios
      .post("https://carleasing.azurewebsites.net/authen/admin/login", {
        email: values.email,
        password: values.password,
      })
      .then((response) => {
        console.log("login res", response);
        return response.data;
      })
      .then((data) => {
        localStorage.setItem("admin", JSON.stringify(data));
        console.log("token", JSON.parse(localStorage.getItem("admin")??"{token:\"\"}").token);
        console.log("b", data);
        setpart("/Admin/Manage");
        setonLoginadmin(true);
        console.log("uonLoginuser for admin login", onLoginadmin);
        console.log("a", data);
      })
      .catch((error) => {
        console.error("found error", error);
        alert("กรุณาตรวจสอบข้อมูลอีกครั้ง");
      });

  };
  console.log("admin email 👉️", values.email);
  console.log("admin password 👉️", values.password);

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
            <Typography variant="h4" component="div" align="center">
              <b>Log-in for Admin</b>
            </Typography>
            <div>
              <br />
            </div>
            <form>
              <TextField
                label="Email"
                id="outlined-start-adornment"
                sx={{ m: 1, width: "25ch" }}
                value={values.email}
                onChange={handleChange("email")}
              />
              <FormControl sx={{ m: 1, width: "25ch" }} variant="outlined">
                <InputLabel htmlFor="outlined-adornment-password">
                  Password
                </InputLabel>
                <OutlinedInput
                  id="outlined-adornment-password"
                  type={values.showPassword ? "text" : "password"}
                  value={values.password}
                  onChange={handleChange("password")}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {values.showPassword ? (
                          <VisibilityOff />
                        ) : (
                          <Visibility />
                        )}
                      </IconButton>
                    </InputAdornment>
                  }
                  label="Password"
                />
              </FormControl>
            </form>
          </CardContent>
          <CardActions>
            <Button
              variant="contained"
              type="submit"
              sx={{ ml: 2, width: "67ch" ,mb:1}}
              onClick={lhandleSubmit}
            >
              Submit
            </Button>
          </CardActions>
          <CardActions sx={{ ml: 2 }}>
            If you are not admin <div>&nbsp;</div>
            <a href="/Login">Log-in</a>
          </CardActions>
        </Card>
      </Card>
    </Stack>
  );
};
export default LoginAdmin;
