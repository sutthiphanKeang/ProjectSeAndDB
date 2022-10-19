import React, { Component, useEffect, useState } from "react";
import Stack from "@mui/material/Stack";
import ListItem from "@mui/material/ListItem";
import { Button, DialogContent } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import EditIcon from "@mui/icons-material/Edit";
import Slide from "@mui/material/Slide";
import List from "@mui/material/List";
import axios from "axios";
import { TransitionProps } from "@mui/material/transitions/transition";
import ManageInButton from "./ManageInButton";
import { useNavigate, useOutletContext } from "react-router-dom";

export default function ManageIN() {
  const [setonLoginadmin] = useOutletContext<any>();
  const navigate = useNavigate();
  const token = JSON.parse(
    localStorage.getItem("admin") ?? ' { "token": "" }'
  ).token;
  const [data2, setData] = useState<any[]>([])
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
        setonLoginadmin(false);
        alert("กรุณาเข้าสู่ระบบใหม่อีกครั้ง");
        navigate("/Admin");
      }
    });
  }, [loaded]);

  interface State {
    inName: string;
    inID: string;
    inDetail: string;
    inCost: number;
    inClass: string;
  }

  const dataJson = JSON.stringify(data2);
  let data: string = dataJson;
  let jsonObj = JSON.parse(data);
  console.log(jsonObj);
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
    // inID:jsonObj.inID
  });
  const getItem = (props: any) => {
    setValues({
      inName: props.name,
      inID: props.in_id,
      inDetail: props.info,
      inCost: props.cost,
      inClass: props.class,
    });
  };
  const handleEdit = () => {
    console.log(`handleEdit`);

    axios({
      method: "put",
      url: "https://carleasing.azurewebsites.net/insurance/admin/edit",
      data: {
        insurance_id: values.inID,
        insurance_name: values.inName,
        insurance_info: values.inDetail,
        insurance_price: values.inCost,
        insurance_class: values.inClass,
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
          setonLoginadmin(false);
          alert("กรุณาเข้าสู่ระบบใหม่อีกครั้ง");
          navigate("/Admin");
        }
    })
      .then(handleClose2);
  };

  // ปุ่ม cancel
  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
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

  const [open2, setOpen2] = React.useState(false);
  const handleClickOpen2 = () => {
    setOpen2(true);
  };
  const handleClose2 = () => {
    setOpen2(false);
  };

  return (
    <Stack
      direction="column"
      justifyContent="center"
      alignItems="center"
      spacing={1}
    >
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
                        {item.info}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        ID : {item.in_id}
                      </Typography>
                    </Grid>
                  </Grid>
                  <Grid item>
                    <Typography variant="subtitle1" component="div">
                      {item.cost} บาท / วัน
                    </Typography>
                  </Grid>
                  <Grid item>
                    <ManageInButton 
                    in_id={item.in_id}
                    name = {item.name}
                    info = {item.info}
                    class_ = {item.class}
                    cost = {item.cost}
                    loaded = {loaded}
                    setLoad = {setLoad}/>

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
