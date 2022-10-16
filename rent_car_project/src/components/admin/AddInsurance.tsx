import React, { Component, useEffect, useState } from "react";
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

export default function Insurance() {
  const token = JSON.parse(localStorage.getItem("admin") ?? '{token:""}').token;
  console.log("token", token);

  const [data2, setData] = useState<any[]>([]);
  const [deleted,setDelete] = useState(false);
  const [loaded, setLoad] = useState(false);
  useEffect(() => {
    
    axios({
      method: "GET",
      url: "https://carleasing.azurewebsites.net/insurance/admin",
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
      if (error.response.status == "401") {
        localStorage.clear();
      }
    });
  }, [loaded]);

  interface State {
    inName: string;
    inID: string;
    inDetail: string;
    inCost: string;
    inClass: string;
  }
  const dataJson = JSON.stringify(data2);
  let data: string = dataJson;
  let jsonObj = JSON.parse(data);
  console.log(jsonObj+":)")


  const [open1, setOpen1] = React.useState(false);
  const handleClickOpen1 = () => {
    setOpen1(true);
  };
  const handleClose1 = () => {
    setOpen1(false);
  };
  const handleClose = () =>{
    setOpen1(false);
    setLoad(!loaded)
  }


  const handleChange =
    (prop: keyof State) => (event: React.ChangeEvent<HTMLInputElement>) => {
      setValues({ ...values, [prop]: event.target.value });
    };

  const [values, setValues] = React.useState<State>({
    inName: jsonObj.inName,
    inID: jsonObj.inID,
    inDetail: jsonObj.inDetail,
    inCost: jsonObj.inCOst,
    inClass: jsonObj.inClass,
  });
  

  const rhandleSubmit = () => {
    console.log(`rhandleSubmit`);
      
    axios({
      method: "post",
      url: "https://carleasing.azurewebsites.net/insurance/admin/add",
      data: { 
        insurance_name: values.inName,
        insurance_info: values.inDetail,
        insurance_price: values.inCost,
        insurance_class: values.inClass,},
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        console.log("regis res", response);
        return response.data;
      })
      .then((data) => console.log(data))
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
          Insert Insurance
        </Button>
        <Dialog open={open1} onClose={handleClickOpen1}>
          <DialogTitle>Insert Insurance กรอกที่นี่</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              id="Name"
              label="Insurance Name"
              fullWidth
              variant="standard"
              value={values.inName}
              onChange={handleChange("inName")}
            />
            <TextField
              autoFocus
              margin="dense"
              id="InsurClasss"
              label="Class of Insurance "
              fullWidth
              variant="standard"
              value={values.inClass}
              onChange={handleChange("inClass")}
            />
            <TextField
              autoFocus
              margin="dense"
              id="Detail"
              label="Insurance Detail"
              fullWidth
              variant="standard"
              value={values.inDetail}
              onChange={handleChange("inDetail")}
            />
            <TextField
              autoFocus
              margin="dense"
              id="Price"
              label="Price of Insurance"
              fullWidth
              variant="standard"
              value={values.inCost}
              onChange={handleChange("inCost")}
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
                        Name : {item.name}
                      </Typography>
                      <Typography
                        gutterBottom
                        variant="subtitle2"
                        component="div"
                      >
                        ประกันภัยชั้นที่ {item.class}
                      </Typography>
                      <Typography variant="body2" gutterBottom>
                        - {item.info}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        ID : {item.in_id}
                      </Typography>
                    </Grid>
                  </Grid>
                  <Grid item>
                    <Typography variant="subtitle1" component="div">
                      {item.cost} บาท
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

