import React, { useState } from "react";
import Stack from "@mui/material/Stack";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import { Box, ThemeProvider, createTheme } from "@mui/system";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Autocomplete from "@mui/material/Autocomplete";
import { Typography } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import SaveIcon from "@mui/icons-material/Save";
import LoadingButton from "@mui/lab/LoadingButton";
import axios from "axios";
import { useNavigate, useOutletContext } from "react-router-dom";

//ทำทีมสีให้ส่วนแสดงผลข้อมูล
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

//set state เอาไปใช้ใน const
interface State {
  carName: string;
  carId: string;
  description: string;
  review: string;
  price: string;
}

//ฟังชั่นหลัก
const AddCar: React.FC = () => {
  const [setonLoginadmin] = useOutletContext<any>();
  const navigate = useNavigate();
  //ตัวเลือกประเภทรถ
  const options = [
    "Sedan",
    "Van",
    "Motorcycle",
    "Hatchback",
    "Coupe",
    "SUV",
    "PPV",
    "Pickup",
    "Sport",
    "Super",
  ];
  const [value, setValue] = React.useState<string | null>(); //เซ็ทค่าในตัวเลือกประเภทรถ
  const [inputValue, setInputValue] = React.useState("");

  //ตัว state ของชนิดรถ
  const [values, setValues] = React.useState<State>({
    carName: "",
    carId: "",
    description: "",
    review: "",
    price: "",
  });

  const [loading, setLoading] = React.useState(false); //state ของตัวโหลดปุ่ม save

  //ฟังชั่นส่ง state มาเซ็ทใน setValues
  const handleChange =
    (prop: keyof State) => (event: React.ChangeEvent<HTMLInputElement>) => {
      setValues({ ...values, [prop]: event.target.value });
    };

  const [file, setfile] = useState<FileList | null>(); //state เก็บรูปภาพ

  //ตัว map ชนิดรถให้เป็นเลข ส่งไปหลังบ้าน
  const typeId = new Map<string, string>([
    ["Sedan", "1"],
    ["Van", "2"],
    ["Motorcycle", "3"],
    ["Hatchback", "4"],
    ["Coupe", "5"],
    ["SUV", "6"],
    ["PPV", "7"],
    ["Pickup", "8"],
    ["Sport", "9"],
    ["Super", "10"],
  ]);

  const [typeCar, settypeCar] = React.useState(""); //ตัวเก็บ state หลังการ map ส่งไปหลังบ้าน

  //ฟังชั่นตอนกด save ส่งไปหลังบ้าน
  const handleSubmit = (e: React.MouseEvent) => {
    setLoading(true);
    e.preventDefault();
    console.log(`handleSubmit`);
    var body = new FormData(); //ทำ formdata
    body.append("carName", values.carName);
    body.append("carId", values.carId);
    body.append("description", values.description);
    body.append("review", values.review);
    body.append("price", values.price);
    body.append("typeId", typeCar);
    body.append("file", file ? file[0] : "img/Car1.jpg");

    //เก็บ token เพื่อนำมาใช้
    const token = JSON.parse(
      localStorage.getItem("admin") ?? ' { "token": "" }'
    ).token;
    console.log("token", token);

    //ส่งข้อมูลเข้าหลังบ้าน
    axios({
      method: "post",
      url: "https://carleasing.azurewebsites.net/vehicle/",
      data: body,
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        console.log("Admin Import Car >>", response);
        setLoading(false);
        alert("เพิ่มรถสำเร็จ");
        return response.data;
      })
      .then((data) => console.log(data))
      .catch((error) => {
        if (error.response.status === "401") {
          localStorage.clear();
          setonLoginadmin(false);
          alert("กรุณาเข้าสู่ระบบใหม่อีกครั้ง");
          console.log("มาละจ้า");
          navigate("/Admin");
        }
        console.error("found error", error);
        setLoading(false);
        alert("กรุณาตรวจสอบข้อมูลอีกครั้ง");
      });
  };

  return (
    <Stack
      direction="row"
      justifyContent="center"
      alignItems="center"
      spacing={12}
    >
      <Card sx={{ Width: 345, height: 500 }}>
        <CardMedia
          component="img"
          height="225"
          image={
            file ? URL.createObjectURL(file[0]) : "imageDefault/Default.jpeg"
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
                  fontSize: 22,
                  fontWeight: "bold",
                }}
              >
                Car Name : {values.carName}
              </Box>
              <Box
                sx={{
                  color: "text.secondary",
                  fontSize: 25,
                  fontWeight: "bold",
                }}
              >
                Car ID : {values.carId}
              </Box>
              <Box
                sx={{
                  color: "text.secondary",
                  fontSize: 25,
                  fontWeight: "bold",
                }}
              >
                Description : {values.description}
              </Box>
              <Box
                sx={{
                  color: "text.secondary",
                  display: "inline",
                  fontWeight: "bold",
                  fontSize: 25,
                }}
              >
                Review : {values.review}
              </Box>
              <Box
                sx={{
                  color: "success.dark",
                  fontWeight: "bold",
                  fontSize: 25,
                }}
              >
                Price : {values.price}
              </Box>
            </Box>
          </ThemeProvider>
        </CardContent>
      </Card>
      <Card sx={{ Width: 345, height: 500 }}>
        <CardContent>
          <Typography variant="h4" component="div" align="center">
            <b>Import Data</b>
          </Typography>
          <>
            <br />
          </>
          <form encType="multipart/form-data">
            <div>
              <TextField
                label="Car Name"
                id="outlined-start-adornment"
                sx={{ m: 1, width: "25ch" }}
                value={values.carName}
                onChange={handleChange("carName")}
              />
              <TextField
                label="Car ID"
                id="outlined-start-adornment"
                sx={{ m: 1, width: "25ch" }}
                value={values.carId}
                onChange={handleChange("carId")}
              />
            </div>
            <div>
              <TextField
                id="outlined-multiline-static"
                label="Description"
                sx={{ m: 1, width: "25ch" }}
                multiline
                rows={4}
                value={values.description}
                onChange={handleChange("description")}
              />
              <TextField
                id="outlined-multiline-static"
                label="Review"
                sx={{ m: 1, width: "25ch" }}
                multiline
                rows={4}
                value={values.review}
                onChange={handleChange("review")}
              />
            </div>
            <div>
              <Autocomplete
                value={value}
                onChange={(event: any, newValue: string | null) => {
                  if (newValue) {
                    settypeCar(typeId.get(newValue)!);
                  }
                  setValue(newValue);
                }}
                inputValue={inputValue}
                onInputChange={(event, newInputValue) => {
                  setInputValue(newInputValue);
                }}
                id="type-id-car"
                options={options}
                sx={{ m: 1, display: "inline-flex", width: "25ch" }}
                renderInput={(params) => (
                  <TextField {...params} label="Type Car" />
                )}
              />
              <TextField
                label="Price"
                id="outlined-start-adornment"
                sx={{ m: 1, width: "25ch" }}
                value={values.price}
                onChange={handleChange("price")}
              />
            </div>
            <div>
              <Button
                variant="contained"
                component="label"
                sx={{ m: 1, width: "24ch", height: "7ch", fontWeight: "bold" }}
              >
                Upload
                <input
                  hidden
                  accept="image/*"
                  multiple
                  type="file"
                  onChange={(event) => setfile(event.target.files)}
                />
              </Button>
              <IconButton
                color="primary"
                aria-label="upload picture"
                component="label"
              >
                <input
                  hidden
                  accept="image/*"
                  type="file"
                  onChange={(event) => setfile(event.target.files)}
                />
                <PhotoCamera />
              </IconButton>
              <LoadingButton
                color="secondary"
                onClick={handleSubmit}
                loading={loading}
                loadingPosition="start"
                startIcon={<SaveIcon />}
                variant="contained"
                sx={{ m: 1, width: "28ch", height: "7ch", fontWeight: "bold" }}
              >
                Save
              </LoadingButton>
            </div>
          </form>
        </CardContent>
      </Card>
    </Stack>
  );
};
export default AddCar;
