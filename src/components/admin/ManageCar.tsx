import { List, ListItem, Paper, Grid, ButtonBase, Typography } from "@mui/material";
import { Container, Stack } from "@mui/system";
import axios from "axios";
import React, { useEffect, useState } from "react";
import ManageCarButton from "./ManageCarButton";
import { useNavigate, useOutletContext } from "react-router-dom";

export default function ManageCar() {
  const [setonLoginadmin] = useOutletContext<any>();
  const navigate = useNavigate();
  const token = JSON.parse(
    localStorage.getItem("admin") ?? ' { "token": "" }'
  ).token;
  // stateสำหรับเซ็ตข้อมูล
  const [data2, setData] = useState<any[]>([])
  // stateสำหรับรีเฟรชเมื่อเปลี่ยนแปลงค่า
  const [deleted,setDelete] = useState(false);
  // ดึงข้อมูล
  useEffect(() => {
    axios({
      method: "GET",
      url: "https://carleasing.azurewebsites.net/vehicle",
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
  }, [deleted]);
  return(
    <Container fixed>
      <Stack
        direction="column"
        justifyContent="center"
        alignItems="stretch"
        spacing={2}
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
          {/* mapข้อมูลสำหรับใส่ลงlist */}
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
                  <Grid item xs>
                    {/* แสดงรูปภาพ */}
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
                    <Grid item xs container direction="column" spacing={2}>
                      {/* แสดงข้อมูลต่างๆ */}
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
                          
                          Brand: {item.brand}
                        </Typography>
                        <Typography variant="body2" gutterBottom>
                          Model Name: {item.name}
                        </Typography>
                        <Typography variant="body2" gutterBottom>
                          Vehicle ID: {item.vehicle_id}
                        </Typography>
                        <Typography variant="body2" gutterBottom>
                          Model Year: {item.year}
                        </Typography>
                      </Grid>
                    </Grid>
                    <Grid item alignItems="right" justifyContent="center">
                      {/* สร้างcomponentแยกโดยส่งค่าpropsไป */}
                      <ManageCarButton
                        title={item.name}
                        img={item.vehicle_img}
                        id={item.vehicle_id}
                        year = {item.year}
                        brand = {item.brand}
                        deleted = {deleted}
                        setDelete = {setDelete}
                        des = {item.description}
                        review = {item.review}
                        price = {item.cost}
                        type = {item.type_id}
                        
                      />
                    </Grid>
                  </Grid>
                </Grid>
              </Paper>
            </ListItem>
          ))}
        </List>
      </Stack>
    </Container>
  )
}

