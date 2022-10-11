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

const AuthenUser: React.FC = () => {
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

  const [onLoginuser, setonLoginuser] = useOutletContext<any>();
  const navigate = useNavigate();
  const [part, setpart] = useState("");

  useEffect(() => {
    navigate(part);
  }, [part]);

  // useEffect(() => {
  //   if (onLoginuser) {
  //     navigate("/");
  //   }
  // }, []);

  // login
  const lhandleSubmit = () => {
    console.log(`User handleSubmit`);

    axios
      .post("http://localhost:5500/authen/login", {
        email: values.email,
        password: values.password,
      })
      .then((response) => {
        console.log("login res", response);
        return response.data;
      })
      .then((data) => {
        localStorage.setItem("user", JSON.stringify(data));
        console.log(
          "token",
          JSON.parse(localStorage.getItem("user") ?? '{token:""}').token
        );
        console.log("b", data);
        setpart("/");
        setonLoginuser(true);
        console.log("uonLoginuser for user login", onLoginuser);
        console.log("a", data);
      })
    .catch((error) => {
      console.error("found error", error);
      alert("กรุณาตรวจสอบข้อมูลอีกครั้ง");
    });
  };

  console.log("user email 👉️", values.email);
  console.log("user password 👉️", values.password);

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
              <b>Log-in</b>
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
              sx={{ ml: 2, width: "67ch" }}
              onClick={lhandleSubmit}
            >
              Submit
            </Button>
          </CardActions>
          <CardActions sx={{ ml: 2 }}>
            New User ? <div>&nbsp;</div>
            <a href="/Register">Sign Up</a>
          </CardActions>
        </Card>
      </Card>
    </Stack>
  );
};
export default AuthenUser;
