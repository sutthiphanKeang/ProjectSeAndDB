import React, { Component } from "react";
import Box from "@mui/material/Box";
import { Slide } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";

export default class FristHome extends Component {
  render() {
    const slideImages = [
      {
        url: "img/DOG.jpg",
      },
      {
        url: "img/dog1.jpg",
      },
      {
        url: "imageDefault/Default.jpeg",
      }
    ];
    return (
      <div className="slide-container">
        <Box sx={{ mt: 3 }}>
          <Slide>
            {slideImages.map((slideImage, index) => (
              <div className="each-slide" key={index}>
                <div
                  style={{
                    backgroundImage: `url(${slideImage.url})`,
                    height: 400,
                  }}
                ></div>
              </div>
            ))}
          </Slide>
        </Box>
        <Stack
          direction="row-reverse"
          justifyContent="center"
          alignItems="center"
          spacing={2}
        >
          <Box sx={{ mt: 28 }}>
            <Button
              variant="contained"
              size="large"
              sx={{ fontWeight: "bold", fontSize: 28}}
              href="/RentCar"
            >
              Let's start
            </Button>
          </Box>
        </Stack>
      </div>
    );
  }
}
