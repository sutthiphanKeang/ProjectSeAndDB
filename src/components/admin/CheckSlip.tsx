import React, {  useState, useEffect } from "react";
import {
  ButtonBase,
  Grid,
  List,
  ListItem,
  Paper,
  Stack,
  Typography, 
} from "@mui/material";
import { useNavigate, useOutletContext } from "react-router-dom";
import axios from "axios";
import CheckSlipButton from "./CheckSlipButton";

export default function CheckSlip() {
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
      url: "https://carleasing.azurewebsites.net/payment/admin",
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
    billID: string;
    billStatus: string;
    BillCost: string;
  }

  const dataJson = JSON.stringify(data2);
  let data: string = dataJson;
  let jsonObj = JSON.parse(data);
  console.log(jsonObj);

  const [values, setValues] = React.useState<State>({
    billID: jsonObj.billID,
    billStatus: jsonObj.billStatus,
    BillCost: jsonObj.billCost,
  });

  console.log(values.billID);

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
                <ButtonBase sx={{ width: 128, height: 128 }}>
                  <img
                    alt="complex"
                    src={`${item.slip}?w=50&h=50&fit=crop&auto=format`}
                    srcSet={`${item.slip}?w=50&h=50&fit=crop&auto=format&dpr=2 2x`}
                    height={120}
                    width={120}
                  />
                </ButtonBase>
                <Grid item xs={12} sm container>
                  <Grid item xs container direction="column" spacing={2}>
                    <Grid item xs>
                      <Typography
                        gutterBottom
                        variant="subtitle1"
                        component="div"
                        color="#1a237e"
                      >
                        Bill ID : {item.bill_id}
                      </Typography>
                      <Typography
                        gutterBottom
                        variant="subtitle2"
                        component="div"
                      >
                        Status : {item.bill_status}
                      </Typography>
                    </Grid>
                  </Grid>
                  <Grid item>
                    <Typography variant="subtitle1" component="div">
                      {item.total_amount} บาท
                    </Typography>
                  </Grid>
                  <Grid item>
                    <CheckSlipButton bill_id = {item.bill_id} slip = {item.slip} setLoad = {setLoad} loaded = {loaded}/>
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
