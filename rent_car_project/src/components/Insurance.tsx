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
import List from "@mui/material/List";
import axios from "axios";
import InsuranceButton from "./InsuranceButton";
import { useNavigate ,useOutletContext } from "react-router-dom";
type props = {
  bookData?: any;
};
const Insurance: React.FC<props> = ({ bookData }) => {
  const [onLoginuser, setonLoginuser] = useOutletContext<any>();
  const token = JSON.parse(
    localStorage.getItem("user") ?? ' { "token": "" }'
  ).token;
  console.log("token", token);
  
  const navigate = useNavigate();
  const [data2, setData] = useState<any[]>([]);
  const [loaded, setLoad] = useState(false);
  useEffect(() => {
    axios({
      method: "GET",
      url: "https://carleasing.azurewebsites.net/insurance",
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
          setonLoginuser(false);
          alert("กรุณาเข้าสู่ระบบใหม่อีกครั้ง");
          console.log("มาละจ้า");
          navigate("/Login");
        }
      });
  }, [loaded]);

  const [open, setOpen] = React.useState(false);
  

  const handleClose = () => {
    setOpen(false);
  };
  const [open1, setOpen1] = React.useState(false);
  const handleClickOpen1 = () => {
    setOpen1(true);
  };

  const handleClose1 = () => {
    setOpen1(false);
  };
  const [insurancee_id,setState] = React.useState("");

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

  // console.log(jsonObj)
  const [values, setValues] = React.useState<State>({
    inName: jsonObj.inName,
    inID: jsonObj.inID,
    inDetail: jsonObj.inDetail,
    inCost: jsonObj.inCost,
    inClass: jsonObj.inClass,
  });
  console.log(values.inName);
  
  const [loading, setLoading] = React.useState(false);

  const rhandleSubmit = () => {
    console.log(`rhandleSubmit`);
    axios({
      method: "get",
      url: "https://carleasing.azurewebsites.net/insurance",
      data: {
        
        insurance_id: insurancee_id,
        
      },

      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        console.log("regis res", response);
        return response.data;
      })
      .then((data) => console.log(data))
      .catch((error) => {
        if (error.response.status == "401") {
          localStorage.clear();
          setonLoginuser(false);
          alert("กรุณาเข้าสู่ระบบใหม่อีกครั้ง");
          console.log("มาละจ้า");
          navigate("/Login");
        }
      })
      .then(handleClose);
  };

  const rhandleSkip = () => {
    console.log(`rhandleSkip`);
    navigate("/Costsummary", {state:{bookData:bookData ,in_id:""}})
  };

  return (
    <Stack
      direction="column"
      justifyContent="center"
      alignItems="center"
      spacing={1}
    >
      <ListItem>
        <div>
          <h1>เลือกประกันภัย</h1>
        </div>
      </ListItem>
      <List
        sx={{
          width: "100%",
          maxWidth: "100%",
          bgcolor: "background.paper",
          position: "relative",
          overflow: "auto",
          maxHeight: 500,
          background: "#bcaaa4",
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
                  <Grid item>
                    <InsuranceButton in_id = {item.in_id} bookData = {bookData}/>
                  </Grid>
                </Grid>
              </Grid>
            </Paper>
          </ListItem>
        ))}
      </List>
      <ListItem>
        <h2 color="error">ไม่เลือก กรุณากดข้าม</h2>
        <Button
          color="error"
          component="div"
          variant="contained"
          onClick={rhandleSkip}
          sx={{ ml: 1 }}
        >
          ข้าม
        </Button>
      </ListItem>
      <Dialog
        open={open1}
        onClose={handleClose1}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Confirm skip to book insurance?"}
        </DialogTitle>

        <DialogActions>
          <Button color="primary" variant="outlined" onClick={handleClose1}>
            Cancel
          </Button>
          <Button
            color="primary"
            variant="contained"
            onClick={handleClose}
            autoFocus
          >
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </Stack>
  );
};
export default Insurance;
