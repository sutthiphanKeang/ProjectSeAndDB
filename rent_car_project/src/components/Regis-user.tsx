import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Stack from "@mui/material/Stack";

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
  fname: string;
  lname: string;
  id: string;
  phone: string;
  email: string;
  password: string;
  showPassword: boolean;
}

const RegisUser: React.FC = () => {
  const [values, setValues] = React.useState<State>({
    fname: "",
    lname: "",
    id: "",
    phone: "",
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

  const navigate = useNavigate();
  const [part, setpart] = useState("");

  useEffect(() => {
    navigate(part);
  }, [part]);

  // register
  const rhandleSubmit = () => {
    console.log(`rhandleSubmit`);
    // var body = new FormData();
    // body.append("email", values.email);
    // body.append("password", values.password);
    // body.append("id", values.id);
    // body.append("firstName", values.fname);
    // body.append("lastName", values.lname);
    // body.append("phone", values.phone);

    axios
      .post("http://localhost:5500/authen/sign-up", {
        email: values.email,
        password: values.password,
        id: values.id,
        firstName: values.fname,
        lastName: values.lname,
        phone: values.phone,
      })
      .then((response) => {
        console.log("regis res", response);
        return response.data;
      })
      .then((data) => {
        alert("ลงทะเบียนสำเร็จ");
        setpart("/Login");
      })
      .catch((error) => {
        console.error("found error", error);
        alert("กรุณาตรวจสอบข้อมูลอีกครั้ง" + Response);
      });

    // fetch("http://localhost:5500/authen/sign-up", {
    //   mode: "cors",
    //   body: body,
    //   method: "POST",
    // })
    //   .then((response) => response.json())
    //   .then((data) => console.log(data));
    //   setpart("/Login");
  };
  console.log("regis email 👉️", values.email);
  console.log("regis password 👉️", values.password);
  console.log("regis id 👉️", values.id);
  console.log("regis fname 👉️", values.fname);
  console.log("regis lname 👉️", values.lname);
  console.log("regis phone 👉️", values.phone);

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
              <b>Register</b>
            </Typography>
            <div>
              <br />
            </div>
            <form encType="multipart/form-data">
              <div>
                <TextField
                  label="First Name"
                  id="outlined-start-adornment"
                  sx={{ m: 1, width: "25ch" }}
                  value={values.fname}
                  onChange={handleChange("fname")}
                />
                <TextField
                  label="Last Name"
                  id="outlined-start-adornment"
                  sx={{ m: 1, width: "25ch" }}
                  value={values.lname}
                  onChange={handleChange("lname")}
                />
              </div>
              <div>
                <TextField
                  label="Identification Number"
                  id="outlined-start-adornment"
                  sx={{ m: 1, width: "25ch" }}
                  value={values.id}
                  onChange={handleChange("id")}
                />
                <TextField
                  label="Phone Number"
                  id="outlined-start-adornment"
                  sx={{ m: 1, width: "25ch" }}
                  value={values.phone}
                  onChange={handleChange("phone")}
                />
              </div>
              <div>
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
              </div>
            </form>
          </CardContent>
          <CardActions>
            <Button
              variant="contained"
              type="submit"
              sx={{ ml: 2, width: "67ch" }}
              onClick={rhandleSubmit}
            >
              Submit
            </Button>
          </CardActions>
          <CardActions sx={{ ml: 2 }}>
            Have account ? <div>&nbsp;</div>
            <a href="/Login">Log-in</a>
          </CardActions>
        </Card>
      </Card>
    </Stack>
  );
};
export default RegisUser;
