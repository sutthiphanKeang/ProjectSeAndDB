import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import { Slide } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import axios from "axios";
import { useNavigate, useOutletContext } from "react-router-dom";

export default function FirstHome() {
  const [onLoginuser, setonLoginuser] = useOutletContext<any>();
  const token = JSON.parse(
    localStorage.getItem("user") ?? ' { "token": "" }'
  ).token;
  const navigate = useNavigate();
  const [data2, setData] = useState<any[]>([]);
  useEffect(() => {
    axios({
      method: "GET",
      url: "https://carleasing.azurewebsites.net/vehicle/home",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        return response.data;
      })
      .then((data) => {
        setData(data);
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
  }, []);
  console.log(data2);
  return (
    <>
      <Box sx={{ mt: 3 }}>
        <Slide>
          {data2.map((slideImage, index) => (
            <Box key={index} sx={{ textAlign: "center" }}>
              <img
                alt="complex"
                src={`${slideImage.vehicle_img}`}
                width="50%"
                height="50%"
              />
            </Box>
          ))}
        </Slide>
      </Box>
      <Stack
        direction="row-reverse"
        justifyContent="center"
        alignItems="center"
        spacing={2}
      >
        <Box sx={{ mt: "5%" }}>
          <Button
            variant="contained"
            size="large"
            sx={{ fontWeight: "bold", fontSize: 28 }}
            href="/RentCar"
          >
            Let's start
          </Button>
        </Box>
      </Stack>
    </>
  );
}
