import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import { useState } from "react";

const LoginAdmin: React.FC = () => {
  const [aemail, setaemail] = useState("");
  const [apassword, setapassword] = useState("");

  const lhandleSubmit = () => {
    console.log(`lhandleSubmit`);
    var body = new FormData();
    body.append("lemail", aemail);
    body.append("lpassword", apassword);

    fetch("http://localhost:5500/authen/login", {
      mode: "cors",
      body: body,
      method: "POST",
    })
      .then((response) => response.json())
      .then((data) => console.log(data));
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
            <Typography variant="h5" component="div">
              Log in
            </Typography>
            <div>
              <br />
            </div>
            <form encType="multipart/form-data">
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
        </Card>
      </Card>
    </Stack>
  );
};
export default LoginAdmin;
