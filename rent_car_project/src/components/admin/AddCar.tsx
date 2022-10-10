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
import ReactDOM from "react-dom/client";

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

const AddCar: React.FC = () => {
  const [carName, setcarName] = useState("");
  const [carId, setcarId] = useState("");
  const [description, setdescription] = useState("");
  const [review, setreview] = useState("");
  const [price, setprice] = useState("");
  const [file, setfile] = useState<FileList | null>();

  const handleSubmit = (e:React.MouseEvent) => {
    e.preventDefault();
    console.log(`handleSubmit`);
    var body = new FormData()
    body.append('carName',carName)
    body.append('carId',carId)
    body.append('description',description)
    body.append('review',review)
    body.append('price',price)
    body.append('file', file ? file[0] : "./Screen Shot 2565-10-03 at 23.02.04.png")
    
    fetch("http://localhost:5500/vehicle/", {
      mode: 'cors',
      body: body,
      method: "POST",
      // headers: {
      //   "Content-type": "multipart/form-data",
      // },
      // body: JSON.stringify({
      //   carName: carName,
      //   carId: carId,
      //   description: description,
      //   review: review,
      //   price: price,
      //   file: file ? file[0] : "./Screen Shot 2565-10-03 at 23.02.04.png",
      // }),
      
    })
      .then((response) => response.json())
      .then((data) => console.log(data));

    // fetch("http://localhost:5500/vehicle/", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "image/png",
    //   },
    //   body: file ? file[0] : "./Screen Shot 2565-10-03 at 23.02.04.png",
    // })
    //   .then((response) => response.json())
    //   .then((data) => console.log(data))
    //   .then((success) => console.log(success))
    //   .catch((err) => console.log(err));
  };
  console.log("carName 👉️", carName);
  console.log("carId 👉️", carId);
  console.log("description 👉️", description);
  console.log("review 👉️", review);
  console.log("price 👉️", price);
  console.log("file 👉️", file);

  // setcarName("")
  // setcarId("")
  // setdescription("")
  // setreview("")
  // setprice("")
  // setfile(null)

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
          image={
            file
              ? URL.createObjectURL(file[0])
              : "/static/images/cards/contemplative-reptile.jpg"
          }
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
                {carName}
              </Box>
              <Box
                sx={{
                  color: "text.secondary",
                  fontSize: 25,
                  fontWeight: "medium",
                }}
              >
                {carId}
              </Box>
              <Box
                sx={{
                  color: "text.secondary",
                  fontSize: 25,
                  fontWeight: "medium",
                }}
              >
                {description}
              </Box>
              <Box
                sx={{
                  color: "success.dark",
                  display: "inline",
                  fontWeight: "bold",
                  fontSize: 29,
                }}
              >
                {review}
              </Box>
              <Box
                sx={{
                  color: "success.dark",
                  fontWeight: "bold",
                  fontSize: 29,
                }}
              >
                {price}
              </Box>
            </Box>
          </ThemeProvider>
        </CardContent>
      </Card>
      <Card sx={{ maxWidth: 345 }}>
        <CardContent>
          <h1>Import Data</h1>
          <form encType='multipart/form-data'>
            <input
              type="text"
              placeholder="carName"
              name="carName"
              onChange={(event) => setcarName(event.target.value)}
              value={carName}
            ></input>
            <input
              type="text"
              placeholder="carId"
              name="carId"
              onChange={(event) => setcarId(event.target.value)}
              value={carId}
            ></input>
            <input
              type="text"
              placeholder="description"
              name="description"
              onChange={(event) => setdescription(event.target.value)}
              value={description}
            ></input>
            <input
              type="text"
              placeholder="review"
              name="review"
              onChange={(event) => setreview(event.target.value)}
              value={review}
            ></input>
            <input
              type="text"
              placeholder="price"
              name="price"
              onChange={(event) => setprice(event.target.value)}
              value={price}
            ></input>
            {/* <form method="POST" action="http://localhost:5500/vehicle/img" encType="multipart/form-data"> */}
            <input
              placeholder="file"
              type="file"
              name="file"
              onChange={(event) => setfile(event.target.files)}
            ></input>

            <Stack direction="row" alignItems="center" spacing={2}></Stack>
            <Button
              variant="contained"
              endIcon={<SendIcon />}
              type="submit"
              sx={{ m: 1 }}
              onClick={handleSubmit}
            >
              Send
            </Button>
          </form>
        </CardContent>
      </Card>
    </Stack>
  );
};
export default AddCar;
