import React, { Component, useState } from "react";
import Stack from "@mui/material/Stack";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import { Box, ThemeProvider, createTheme } from "@mui/system";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import SendIcon from "@mui/icons-material/Send";

const theme = createTheme({
  palette: {
    background: {
      paper: "#fff",
    },
    text: {
      primary: "#173A5E",
      secondary: "#46505A",
    },
    action: {
      active: "#001E3C",
    },
    success: {
      dark: "#009688",
    },
  },
});

export default class AddCar extends Component {
  render() {
    return (
      <Stack
        direction="row"
        justifyContent="center"
        alignItems="center"
        spacing={12}
      >
        <Card sx={{ maxWidth: 345 }}>
          <CardMedia
            component="img"
            height="225"
            image="/static/images/cards/contemplative-reptile.jpg"
          />
          <CardContent>
            <ThemeProvider theme={theme}>
              <Box
                sx={{
                  bgcolor: "background.paper",
                  boxShadow: 1,
                  borderRadius: 2,
                  p: 2,
                  minWidth: 435,
                }}
              >
                <Box
                  sx={{
                    color: "text.primary",
                    fontSize: 34,
                    fontWeight: "medium",
                  }}
                >
                  ชื่อรถ
                </Box>
                <Box
                  sx={{
                    color: "text.secondary",
                    fontSize: 25,
                    fontWeight: "medium",
                  }}
                >
                  รายละเอียด
                </Box>
                <Box
                  sx={{
                    color: "text.secondary",
                    fontSize: 25,
                    fontWeight: "medium",
                  }}
                >
                  รีวิว
                </Box>

                <Box
                  sx={{
                    color: "success.dark",
                    display: "inline",
                    fontWeight: "bold",
                    fontSize: 29,
                  }}
                >
                  ราคา
                </Box>
              </Box>
            </ThemeProvider>
          </CardContent>
        </Card>
        <Card sx={{ maxWidth: 345 }}>
          <CardContent>
            <h1>Import Data</h1>
            <form method="POST" action="/">
              <TextField
                id="outlined-basic"
                label="Car Name"
                variant="outlined"
                sx={{ m: 1 }}
              >
                <input type="text" placeholder="carName" name="carName"></input>
              </TextField>
              <TextField
                id="outlined-basic"
                label="Car ID"
                variant="outlined"
                sx={{ m: 1 }}
              >
                <input type="text" placeholder="carId" name="carId"></input>
              </TextField>
              <TextField
                id="outlined-multiline-static"
                label="Description"
                multiline
                rows={4}
                sx={{ m: 1 }}
              >
                <input
                  type="text"
                  placeholder="description"
                  name="description"
                ></input>
              </TextField>
              <TextField
                id="outlined-multiline-static"
                label="Review"
                multiline
                rows={4}
                sx={{ m: 1 }}
              >
                <input type="text" placeholder="review" name="review"></input>
              </TextField>
              <TextField
                id="outlined-basic"
                label="Price"
                variant="outlined"
                sx={{ m: 1 }}
              >
                <input type="text" placeholder="price" name="price"></input>
              </TextField>

              <Stack direction="row" alignItems="center" spacing={2}>
                <Button variant="contained" component="label" sx={{ m: 1 }}>
                  Upload
                  <input hidden multiple type="file" name="image" />
                </Button>
                <IconButton
                  color="primary"
                  aria-label="upload picture"
                  component="label"
                >
                  <input hidden type="file" name="image" />
                  <PhotoCamera />
                </IconButton>
              </Stack>
              <Button
                variant="contained"
                endIcon={<SendIcon />}
                type="submit"
                sx={{ m: 1 }}
              >
                Send
              </Button>
            </form>
          </CardContent>
        </Card>
      </Stack>
    );
  }
}
