import {
  Box,
  ButtonBase,
  Grid,
  List,
  ListItem,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

import React, { useEffect, useState } from "react";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";
import ReturnCarButton from "./ReturnCarButton";
import axios from "axios";

export default function ReturnCar() {
  const token = JSON.parse(localStorage.getItem("user") ?? '{token:""}').token;
  // สร้างstateสำหรับเซ็ตข้อมูล
  const [data2, setData] = useState<any[]>([]);
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
      }
    });
  }, []);

  return (
    <>
      <Box sx={{ display: "flex", flexDirection: "row-reverse", height: "50%" }}>
        {/* ช่องสำหรับค้นหา */}
        <TextField
          className="search-bar"
          sx={{ mt: 5, mb: 5 }}
          size="small"
          id="Search-basic"
          label="Search"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
          variant="outlined"
        />
      </Box>

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
          {/* mapข้อมูลสำหรับใส่ลง List */}
          {data2.map((item, index) => (
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
                    <Grid item alignItems="center" justifyContent="center">
                      {/* สร้างcomponentย่อย โดยส่งค่า propsไป */}
                      <ReturnCarButton
                        title={item.name}
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
      </Stack>
    </>
  );
}

