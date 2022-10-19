import React from "react";
import Box from "@mui/material/Box";
import { Slide } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";

const data2 = [
  {
    vehicle_img:
      "https://file.chobrod.com/2020/09/03/cu1SOOcI/1579066047-61-64f7-cbc2.jpg",
  },
  {
    vehicle_img:
      "https://img.my-best.in.th/press_component/item_part_images/bd557ec16b35ef47eabff836b5e93b39.jpg?ixlib=rails-4.2.0&q=70&lossless=0&w=640&h=640&fit=clip",
  },
  {
    vehicle_img:
      "https://s.isanook.com/au/0/rp/rc/w670h402/yatxacm1w0/aHR0cHM6Ly9zLmlzYW5vb2suY29tL2F1LzAvdWQvMTIvNjIyODEvMjAwLmpwZw==.jpg",
  },
  {
    vehicle_img:
      "https://images.autofun.co.th/file1/206a62568fe84b238b39f9a2ea9b600d_800.jpg",
  },
  {
    vehicle_img:
      "https://images.contentstack.io/v3/assets/blt04fb7dc282801dd0/blt932816c665312f36/63313eb52b80434a8b691a77/x-series.png",
  },
];
export default function FristHome() {
  return (
    <>
      <Box sx={{ mt: 3 }}>
        <Slide>
          {data2 &&
            data2.map((slideImage, index) => (
              <Box key={index} sx={{ textAlign: "center" }}>
                <img
                  alt="complex"
                  src={slideImage.vehicle_img}
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
