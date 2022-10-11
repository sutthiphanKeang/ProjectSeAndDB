import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Stack from "@mui/material/Stack";

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

  const navigate = useNavigate();
  const [part, setpart] = useState("");

  // register
  const [remail, setremail] = useState("");
  const [rpassword, setrpassword] = useState("");
  const [rid, setrid] = useState("");
  const [rfname, setrfname] = useState("");
  const [rlname, setrlname] = useState("");
  const [rphone, setrphone] = useState("");

  useEffect(() => {
    navigate(part);
  }, [part]);

  // register
  const rhandleSubmit = () => {
    console.log(`rhandleSubmit`);
    var body = new FormData();
    body.append("remail", remail);
    body.append("rpassword", rpassword);
    body.append("rid", rid);
    body.append("rfname", rfname);
    body.append("rlname", rlname);
    body.append("rphone", rphone);

    fetch("http://localhost:5500/authen/sign-up", {
      mode: "cors",
      body: body,
      method: "POST",
    })
      .then((response) => response.json())
      .then((data) => console.log(data));
      setpart("/Login");
  };
  console.log("remail 👉️", remail);
  console.log("rpassword 👉️", rpassword);
  console.log("rid 👉️", rid);
  console.log("rfname 👉️", rfname);
  console.log("rlname 👉️", rlname);
  console.log("rphone 👉️", rphone);

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
              Register
            </Typography>
            <div>
              <br />
            </div>
            <form encType="multipart/form-data">
              <input
                type="text"
                placeholder="email"
                name="email"
                onChange={(event) => setremail(event.target.value)}
              ></input>
              <input
                type="text"
                placeholder="password"
                name="password"
                onChange={(event) => setrpassword(event.target.value)}
              ></input>
              <input
                type="text"
                placeholder="id"
                name="id"
                onChange={(event) => setrid(event.target.value)}
              ></input>
              <input
                type="text"
                placeholder="fname"
                name="fname"
                onChange={(event) => setrfname(event.target.value)}
              ></input>
              <input
                type="text"
                placeholder="lname"
                name="lname"
                onChange={(event) => setrlname(event.target.value)}
              ></input>
              <input
                type="text"
                placeholder="phone"
                name="phone"
                onChange={(event) => setrphone(event.target.value)}
              ></input>
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
