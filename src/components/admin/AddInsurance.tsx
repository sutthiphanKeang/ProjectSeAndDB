import React, { useEffect, useState } from "react";
import ListItem from "@mui/material/ListItem";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import { DialogContent } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import List from "@mui/material/List";
import axios from "axios";
import { useNavigate, useOutletContext } from "react-router-dom";

export default function Insurance() {
  const [setonLoginadmin] = useOutletContext<any>();
  const navigate = useNavigate();
  const token = JSON.parse(
    localStorage.getItem("admin") ?? ' { "token": "" }'
  ).token;
  console.log("token", token);

  const [data2, setData] = useState<any[]>([]);
  const [loaded, setLoad] = useState(false);
  useEffect(() => {
    axios({
      method: "GET",
      // url: "https://carleasing.azurewebsites.net/insurance/admin",
      url:"http://localhost:3001/package/display",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        return response.data;
      })
      .then((data) => {
        setData(data);
        console.log(data);
      })
      .catch((error) => {
        if (error.response.status === "401") {
          localStorage.clear();
          setonLoginadmin(false);
          alert("กรุณาเข้าสู่ระบบใหม่อีกครั้ง");
          navigate("/Admin");
        }
      });
  }, [loaded]);

  interface State {
    packageID: any,
    packageName: any,
    packageInfo: any,
    packageExcess: any,
    packageCost: any
  }
  const dataJson = JSON.stringify(data2);
  let data: string = dataJson;
  let jsonObj = JSON.parse(data);
  console.log(jsonObj + ":)");

  const [open1, setOpen1] = React.useState(false);
  const handleClickOpen1 = () => {
    setOpen1(true);
  };
  const handleClose1 = () => {
    setOpen1(false);
  };
  const handleClose = () => {
    setOpen1(false);
    setLoad(!loaded);
  };

  const handleChange =
    (prop: keyof State) => (event: React.ChangeEvent<HTMLInputElement>) => {
      setValues({ ...values, [prop]: event.target.value });
    };

  const [values, setValues] = React.useState<State>({
    packageID: jsonObj.packageID,
    packageName: jsonObj.packageName,
    packageInfo: jsonObj.packageInfo,
    packageExcess: jsonObj.packageExcess,
    packageCost: jsonObj.packageCost
  });

  const rhandleSubmit = () => {
    console.log(`rhandleSubmit`);

    axios({
      method: "post",
      url: "http://localhost:3001/package/insert",
      data: {
        packageName: values.packageName,
        packageInfo: values.packageInfo,
        packageCost: values.packageCost,
        packageExcess: values.packageExcess
      },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        return response.data;
      })
      .then((data) => console.log(data))
      .catch((error) => {
        if (error.response.status == "401") {
          localStorage.clear();
          setonLoginadmin(false);
          alert("กรุณาเข้าสู่ระบบใหม่อีกครั้ง");
          navigate("/Login");
        }
      })
      .then(handleClose);
  };

  return (
    <Stack
      direction="column"
      justifyContent="center"
      alignItems="center"
      spacing={1}
    >
      <ListItem>
        <Button
          color="success"
          component="div"
          variant="contained"
          onClick={handleClickOpen1}
          startIcon={<AddIcon />}
        >
          Insert Package
        </Button>
        <Dialog open={open1} onClose={handleClickOpen1}>
          <DialogTitle>Insert Package กรอกที่นี่</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              id="Name"
              label="Package Name"
              fullWidth
              variant="standard"
              value={values.packageName}
              onChange={handleChange("packageName")}
            />
            <TextField
              autoFocus
              margin="dense"
              id="Deductible"
              label="Excess"
              fullWidth
              variant="standard"
              value={values.packageExcess}
              onChange={handleChange("packageExcess")}
            />
            <TextField
              autoFocus
              margin="dense"
              id="Detail"
              label="Package Detail"
              fullWidth
              variant="standard"
              value={values.packageInfo}
              onChange={handleChange("packageInfo")}
            />
            <TextField
              autoFocus
              margin="dense"
              id="Price"
              label="Price of Insurance"
              fullWidth
              variant="standard"
              value={values.packageCost}
              onChange={handleChange("packageCost")}
            />
          </DialogContent>
          <DialogActions>
            {/* กดปิด cancel ออกไป */}
            <Button color="error" variant="contained" onClick={handleClose1}>
              Cancel
            </Button>
            {/* แก้เป็น insertให้ได้ */}
            <Button color="success" variant="contained" onClick={rhandleSubmit}>
              Insert
            </Button>
          </DialogActions>
        </Dialog>
      </ListItem>

      <List
        sx={{
          width: "100%",
          maxWidth: "100%",
          bgcolor: "background.paper",
          position: "relative",
          overflow: "auto",
          maxHeight: 500,
          background: "#e0e0e0",
          "& ul": { padding: 0 },
        }}
        subheader={<li />}
      >
        {data2.map((item) => (
          <ListItem>
            <Paper
              sx={{
                p: 2,
                margin: "auto",
                maxWidth: 800,
                flexGrow: 1,
                backgroundColor: (theme) =>
                  theme.palette.mode === "dark" ? "#1A2027" : "#f5f5f5",
              }}
            >
              <Grid container spacing={2}>
                <Grid item xs={12} sm container>
                  <Grid item xs container direction="column" spacing={2}>
                    <Grid item xs>
                      <Typography
                        gutterBottom
                        variant="subtitle1"
                        component="div"
                        color="#1a237e"
                      >
                        Package name : {item.packageName}
                      </Typography>
                      <Typography
                        gutterBottom
                        variant="subtitle2"
                        component="div"
                      >
                        เงินคุ้มครองค่าเสียหายแรก {item.packageExcess} บาท
                      </Typography>
                      <Typography variant="body2" gutterBottom>
                        ข้อมูลการคุ้มครอง {item.packageInfo}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        ID : {item.packageID}
                      </Typography>
                    </Grid>
                  </Grid>
                  <Grid item>
                    <Typography variant="subtitle1" component="div">
                      {item.packageCost} บาท/วัน
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
            </Paper>
          </ListItem>
        ))}
      </List>
    </Stack>
  );
}
function then(handleClose1: () => void) {
  throw new Error("Function not implemented.");
}
