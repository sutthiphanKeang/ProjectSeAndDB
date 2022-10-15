import React, { Component, useState, useEffect } from "react";
import Stack from "@mui/material/Stack";
import ListItem from "@mui/material/ListItem";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import EditIcon from "@mui/icons-material/Edit";
import { experimentalStyled as styled } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import { Button, ButtonBase, DialogContent, List } from "@mui/material";
import axios from "axios";
import { useNavigate, useOutletContext } from "react-router-dom";

import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";

import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";
import ReturnCarButton from "./ReturnCarButton";
import PaymentButton from "./PaymentUserButton";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#eeeeee",
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

interface User {
  fname: string;
  lname: string;

  phone: string;
}

const UserPage: React.FC = () => {
  const [onLoginuser, setonLoginuser] = useOutletContext<any>();
  const navigate = useNavigate();

  const [edited, setEdit] = useState(false);
  const [data2, setData] = useState("");

  const token = JSON.parse(localStorage.getItem("user") ?? '{token:""}').token;
  console.log("token", token);

  useEffect(() => {
    if (!onLoginuser) {
      navigate("/Login");
    }
  }, [onLoginuser]);

  useEffect(() => {
    axios
      .get("https://carleasing.azurewebsites.net/user/profile", {
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
  }, [edited]);

  const dataJson = JSON.stringify(data2);
  let data: string = dataJson;
  let jsonObj = JSON.parse(data);

  const [open, setOpen] = React.useState(false);
  const [values, setValues] = React.useState<User>({
    fname: jsonObj.fname,
    lname: jsonObj.lname,
    phone: jsonObj.phone,
  });
  const handleClickOpen = () => {
    setOpen(true);
    setValues({
      fname: jsonObj.fname,
      lname: jsonObj.lname,
      phone: jsonObj.phone,
    });
  };

  const [dataPay, setDataPay] = useState<any[]>([]);
  useEffect(() => {
    axios
      .get("https://carleasing.azurewebsites.net/user/payment", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        return response.data;
      })
      .then((data) => {
        setDataPay(data);
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
  }, [edited]);

  const [dataBook, setDataBook] = useState<any[]>([]);
  useEffect(() => {
    axios
      .get("https://carleasing.azurewebsites.net/user/booking", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        return response.data;
      })
      .then((data) => {
        setDataBook(data);
      });
  }, [edited]);

  const handleChange =
    (prop: keyof User) => (event: React.ChangeEvent<HTMLInputElement>) => {
      setValues({ ...values, [prop]: event.target.value });
    };
  const handleClose = () => {
    setOpen(false);
    setValues({
      fname: jsonObj.fname,
      lname: jsonObj.lname,
      phone: jsonObj.phone,
    });
    setEdit(!edited);
  };
  const handleEdit = (e: React.MouseEvent) => {
    e.preventDefault();
    const token = JSON.parse(
      localStorage.getItem("user") ?? '{token:""}'
    ).token;
    console.log("token", token);
    axios({
      method: "put",
      url: "https://carleasing.azurewebsites.net/user/edit",
      data: {
        id: jsonObj.id,
        customerFname: values.fname,
        customerLname: values.lname,
        phone: values.phone,
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
      .then(handleClose);
  };
  return (
    <Stack
      direction="column"
      justifyContent="center"
      alignItems="center"
      spacing={2}
    >
      <ListItem>
        <Paper
          sx={{
            p: 2,
            margin: "auto",
            maxWidth: 800,
            flexGrow: 1,
            backgroundColor: (theme) =>
              theme.palette.mode === "dark" ? "#1A2027" : "#eeeeee",
          }}
        >
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="stretch"
            spacing={2}
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
                      <h1> User Information </h1>
                    </Typography>
                    <Typography
                      gutterBottom
                      variant="subtitle2"
                      component="div"
                    >
                      <h2>Firstname : {jsonObj.fname} </h2>
                    </Typography>
                    <Typography variant="subtitle2" gutterBottom>
                      <h2>Lastname : {jsonObj.lname}</h2>
                    </Typography>
                    <Typography variant="subtitle2" color="text.secondary">
                      <h2>User ID : {jsonObj.id_no}</h2>
                    </Typography>
                    <Typography variant="subtitle2" color="text.secondary">
                      <h2>Phone number : {jsonObj.phone}</h2>
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Button
                      component="div"
                      fullWidth
                      color="primary"
                      variant="contained"
                      onClick={handleClickOpen}
                      startIcon={<EditIcon />}
                      
                    >
                      Edit
                    </Button>
                    <Dialog open={open} onClose={handleClose}>
                      <DialogTitle> แก้ไขข้อมูลส่วนตัว กรอกที่นี่</DialogTitle>
                      <DialogContent>
                        <TextField
                          defaultValue={values.fname}
                          margin="dense"
                          id="Firstname"
                          label="Firstname"
                          value={values.fname}
                          fullWidth
                          variant="standard"
                          onChange={handleChange("fname")}
                        />
                        <TextField
                          defaultValue={values.lname}
                          margin="dense"
                          id="Lastname"
                          label="Lastname"
                          value={values.lname}
                          fullWidth
                          variant="standard"
                          onChange={handleChange("lname")}
                        />
                        <TextField
                          defaultValue={values.phone}
                          margin="dense"
                          id="Phone"
                          label="Phone number"
                          value={values.phone}
                          fullWidth
                          variant="standard"
                          onChange={handleChange("phone")}
                        />
                      </DialogContent>
                      <DialogActions>
                        <Button
                          color="primary"
                          variant="contained"
                          onClick={handleEdit}
                        >
                          Save
                        </Button>
                        <Button
                          color="primary"
                          variant="outlined"
                          onClick={handleClose}
                        >
                          Cancel
                        </Button>
                      </DialogActions>
                    </Dialog>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>

            <Grid container spacing={2}>
              <Grid item xs={12} sm container>
                <Grid item xs container direction="column" spacing={2}>
                  <Grid>
                    {dataPay.map((item, index) => (
                      <>
                        <Typography
                          gutterBottom
                          variant="subtitle1"
                          component="div"
                          color="#ff0000"
                        >
                          <h1> Payment Check </h1>
                        </Typography>

                        <Typography
                          gutterBottom
                          variant="subtitle2"
                          component="div"
                        >
                          {/* [{"bill_id":"6149d594-0ff0-4bf3-be22-1336a14ea03b","bill_status":"complete","book_id":"8f015de7-7500-44cf-8260-508159cf10a1","amount_balance":2000,"total_amount":2140,"tax_amount":140,"slip":"https://carleasing.blob.core.windows.net/payment/file-1665693865092.jpg"}] */}
                          <h2>Vehicle ID : {item.vehicle_id}</h2>
                        </Typography>
                        <Typography
                          gutterBottom
                          variant="subtitle2"
                          component="div"
                        >
                          <h2>Bill Status : {item.bill_status} </h2>
                        </Typography>
                        <Typography variant="subtitle2" color="text.secondary">
                          <h2>Total amount : {item.total_amount}</h2>
                        </Typography>
                        <Grid item>
                          <Grid
                            item
                            alignItems="center"
                            justifyContent="center"
                          >
                            <PaymentButton
                              img={item.slip}
                              bill_id={item.bill_id}
                              book_id={item.book_id}
                              total_amount={item.total_amount}
                              bill_status={item.bill_status}
                            />
                          </Grid>
                        </Grid>
                      </>
                    ))}
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Stack>
        </Paper>
      </ListItem>

      <ListItem>
        <Grid
          sx={{ flexGrow: 1 }}
          spacing={3}
          container
          direction="row"
          justifyContent="center"
          alignItems="center"
        >
          <Grid item md={4.5} columnSpacing={2}>
            <Item>
              <Typography variant="subtitle2" color="#bf360c">
                <h1>Notify</h1>
              </Typography>
              <Typography variant="subtitle2" color="#212121">
                {!jsonObj.daylefts && <h2>ไม่มีรายการเช่ารถ</h2>}
                {jsonObj.daylefts >= 0 && jsonObj.daylefts != null && (
                  <h2>เหลือเวลาอีก {jsonObj.daylefts} วัน</h2>
                )}
                {jsonObj.daylefts < 0 && jsonObj.daylefts != null && (
                  <h2>เกินกำหนดคืนรถมา {Math.abs(jsonObj.daylefts)} วัน</h2>
                )}
              </Typography>
            </Item>
          </Grid>
          <Grid item md={4.5} columnSpacing={2}>
            <Item>
              <Typography variant="subtitle2" color="#212121">
                <h2>ติดต่อ-สอบถาม</h2>
                <p>เบอร์โทร : 080-000-0000</p>
                <p>FB : CMU car reservation</p>
              </Typography>
            </Item>
          </Grid>
        </Grid>
      </ListItem>

      <ListItem>
        <Paper
          sx={{
            p: 2,
            margin: "auto",
            maxWidth: 800,
            flexGrow: 1,
            backgroundColor: (theme) =>
              theme.palette.mode === "dark" ? "#1A2027" : "#eeeeee",
          }}
        >
          <Grid container spacing={2}>
            <Grid item xs={12} sm container>
              <Grid item xs container direction="column" spacing={2}>
                <Grid item xs>
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
                    {dataBook.map((item, index) => (
                      <ListItem>
                        <Paper
                          sx={{
                            p: 2,
                            margin: "auto",
                            maxWidth: 800,
                            flexGrow: 1,
                            backgroundColor: (theme) =>
                              theme.palette.mode === "dark"
                                ? "#1A2027"
                                : "#f5f5f5",
                          }}
                        >
                          <Grid container spacing={2}>
                            <Grid item xs>
                              <ButtonBase>
                                <img
                                  alt="complex"
                                  src={`${item.vehicle_img}?w=50&h=50&fit=crop&auto=format`}
                                  srcSet={`${item.vehicle_img}?w=50&h=50&fit=crop&auto=format&dpr=2 2x`}
                                  width="200"
                                  height="160"
                                />
                              </ButtonBase>
                            </Grid>
                            <Grid item xs={12} sm container>
                              <Grid
                                item
                                xs
                                container
                                direction="column"
                                spacing={2}
                              >
                                <Grid
                                  item
                                  xs
                                  sx={{
                                    alignItems: "center",
                                    justifyContent: "center",
                                  }}
                                >
                                  <Typography
                                    gutterBottom
                                    variant="subtitle1"
                                    component="div"
                                  >
                                    brand : {item.brand}
                                  </Typography>
                                  <Typography variant="body2" gutterBottom>
                                    Model name : {item.model_name}
                                  </Typography>
                                  <Typography variant="body2" gutterBottom>
                                    Vehicle ID : {item.vehicle_id}
                                  </Typography>
                                  <Typography variant="subtitle1" gutterBottom>
                                    Status : {item.status}
                                  </Typography>
                                </Grid>
                              </Grid>
                              <Grid
                                item
                                alignItems="center"
                                justifyContent="center"
                              >
                                <ReturnCarButton
                                  title={item.vehicle_id}
                                  img={item.vehicle_img}
                                  id={item.vehicle_id}
                                  brand={item.brand}
                                  year={item.year}
                                />
                              </Grid>
                            </Grid>
                          </Grid>
                        </Paper>
                      </ListItem>
                    ))}
                  </List>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Paper>
      </ListItem>
    </Stack>
  );
};
export default UserPage;
