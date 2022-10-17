import React, { Component, useEffect, useState } from "react";
import Box from "@mui/material/Box";
import { Slide } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import axios from "axios";

export default function FristHome() {
  const token = JSON.parse(
    localStorage.getItem("user") ?? ' { "token": "" }'
  ).token;
  const [data2, setData] = useState<any[]>([]);
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
  console.log(data2);
  return (
    <>
      <Box sx={{ mt: 3 }}>
        <Slide>
          {data2.map((slideImage, index) => (
            <Box key={index} sx={{textAlign:"center"}}>
              <img
                alt="complex"
                src={`${slideImage.vehicle_img}?w=50&h=50&fit=crop&auto=format`}
                srcSet={`${slideImage.vehicle_img}?w=50&h=50&fit=crop&auto=format&dpr=2 2x`}
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
