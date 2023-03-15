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
  name: string;
  vehicle_id: string;
  cost: string;
  vehicle_img: any;
  gear_type: string;
  seats: string;
  doors: string;
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
  const gear = ["Auto", "Manual"];
  const [value, setValue] = React.useState<string | null>();
  const [value2, setValue2] = React.useState<string | null>(); //เซ็ทค่าในตัวเลือกประเภทรถ
  const [inputValue, setInputValue] = React.useState("");
  const [inputValue2, setInputValue2] = React.useState("");
  const [errorVehicleID, setErrorVehicleID] = useState("");
  const [errorName, setErrorName] = useState("");
  const [errorSeats, setErrorSeats] = useState("");
  const [errorDoors, setErrorDoors] = useState("");
  const [errorCost, setErrorCost] = useState("");

  //ตัว state ของชนิดรถ
  const [values, setValues] = React.useState<State>({
    name: "",
    vehicle_id: "",
    cost: "",
    vehicle_img: "",
    gear_type: "",
    seats: "",
    doors: "",
  });

  const [loading, setLoading] = React.useState(false); //state ของตัวโหลดปุ่ม save

  //ฟังชั่นส่ง state มาเซ็ทใน setValues
  const handleChange =
    (prop: keyof State) => (event: React.ChangeEvent<HTMLInputElement>) => {
      const { value } = event.target;
      console.log("input value:", (!!errorCost)||(!!errorDoors)||(!!errorName)||(!!errorSeats)||(!!errorVehicleID));
      if (prop == "vehicle_id") {
        if (value.length == 0) {
          setErrorVehicleID("Vehicle id field should not empty!");
        } else if (value.length > 6) {
          setErrorVehicleID(
            "Vehicle id length should not exceed 6 characters!"
          );
        } else if (/^[a-zA-Z\u0E00-\u0E7F]{2}\d{4}$/.test(value)) {
          setErrorVehicleID("");
        } else {
          setErrorVehicleID(
            "Invalid vehicle ID. Please enter 2 letters at the start and 4 numbers at the end!"
          );
        }
        setValues({ ...values, [prop]: value });
      } else if (prop == "name") {
        if (value.length == 0) {
          setErrorName("Car name field should not empty! ");
        } else if (value == " ") {
          setErrorName("first character shound not be space!");
        } else if (/^[a-zA-Z0-9]+\s+[a-zA-Z0-9]+\s+\d{4}$/.test(value)) {
          setErrorName("");
        } else {
          setErrorName("Invalid name field!");
        }
        setValues({ ...values, [prop]: value });
      } else if (prop == "seats") {
        if (value.length == 0) {
          setErrorSeats("Seats field should not empty!");
        } else if (event.target.value[0] == " ") {
          setErrorSeats("first character shound not space!");
        } else if (/^\d{1}$/.test(value)) {
          setErrorSeats("");
        } else {
          setErrorSeats("Invalid seats field!");
        }
        setValues({ ...values, [prop]: value });
      } else if (prop == "doors") {
        if (value.length == 0) {
          setErrorDoors("Doors field should not empty!");
        } else if (event.target.value[0] == " ") {
          setErrorDoors("first character shound not space!");
        } else if (/^\d{1}$/.test(value)) {
          setErrorDoors("");
        } else {
          setErrorDoors("Invalid doors field!");
        }
        setValues({ ...values, [prop]: value });
      } else if (prop == "cost") {
        if (value.length == 0) {
          setErrorCost("Price field should not empty!");
        } else if (event.target.value[0] == " ") {
          setErrorCost("first character shound not space!");
        } else if (/^\d+$/.test(value)) {
          setErrorCost("");
        } else {
          setErrorCost("Invalid cost field!");
        }
        setValues({ ...values, [prop]: value });
      }
    };

  const [file, setfile] = useState<FileList | null>(); //state เก็บรูปภาพ
  const handleChangeImage = (e: any) => {
    if (e.target.files.length) {
      setValues({
        name: values.name,
        cost: values.cost,
        vehicle_img: e.target.files[0],
        vehicle_id: values.vehicle_id,
        gear_type: values.gear_type,
        seats: values.seats,
        doors: values.doors,
      });
    }
  };
  
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
  const typeGearId = new Map<string, string>([
    ["Auto", "A"],
    ["Manual", "M"],
  ]);
  const [typeCar, settypeCar] = React.useState(""); //ตัวเก็บ state หลังการ map ส่งไปหลังบ้าน

  //ฟังชั่นตอนกด save ส่งไปหลังบ้าน
  const handleSubmit = (e: React.MouseEvent) => {
    setLoading(true);
    e.preventDefault();
    console.log(`handleSubmit`);
    const body = new FormData(); //ทำ formdata
    body.append("carName", values.name);
    body.append("carId", values.vehicle_id);
    // body.append("description", values.description);
    // body.append("review", values.review);
    console.log(typeCar);
    body.append("price", values.cost);
    body.append("typeId", typeCar);
    body.append("file", values.vehicle_img);
    body.append("seats", values.seats);
    body.append("doors", values.doors);
    body.append("gear_type", values.gear_type == "Auto" ? "A" : "M");
    console.log(values.vehicle_img ? values.vehicle_img : "img/Car1.jpg");
    //เก็บ token เพื่อนำมาใช้
    const token = JSON.parse(
      localStorage.getItem("admin") ?? ' { "token": "" }'
    ).token;
    console.log("token", token);
    console.log(values.vehicle_img);
    //ส่งข้อมูลเข้าหลังบ้าน
    if (!((!!errorCost)||(!!errorDoors)||(!!errorName)||(!!errorSeats)||(!!errorVehicleID))){
      axios({
      method: "post",
      url: "http://localhost:5500/vehicle/",
      data: body,
      headers: {
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
    }else{
      setLoading(false);
      alert("กรุณาตรวจสอบข้อมูล");
    }
    
  };

  return (
    <Stack
      direction="row"
      justifyContent="center"
      alignItems="center"
      spacing={12}
    >
      <Card sx={{ Width: 345 }}>
        <CardMedia
          component="img"
          height="225"
          image={
            values.vehicle_img ? URL.createObjectURL(values.vehicle_img) : "imageDefault/Default.jpeg"
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
                  fontSize: 25,
                  fontWeight: "bold",
                }}
              >
                Vehicle Name : {values.name}
              </Box>
              <Box
                sx={{
                  color: "text.secondary",
                  fontSize: 25,
                  fontWeight: "bold",
                }}
              >
                Vehicle ID : {values.vehicle_id}
              </Box>
              <Box
                sx={{
                  color: "text.secondary",
                  display: "inline",
                  fontWeight: "bold",
                  fontSize: 25,
                }}
              >
                Doors : {values.doors}
              </Box>
              <Box
                sx={{
                  color: "text.secondary",
                  fontSize: 25,
                  fontWeight: "bold",
                }}
              >
                Number of Seats : {values.seats}
              </Box>

              <Box
                sx={{
                  color: "success.dark",
                  fontWeight: "bold",
                  fontSize: 25,
                }}
              >
                Price : {values.cost}
              </Box>
            </Box>
          </ThemeProvider>
        </CardContent>
      </Card>
      <Card sx={{ Width: 345, height: 500 }}>
        <CardContent>
          <Typography variant="h4" component="div" align="center">
            <b>Add Car</b>
          </Typography>
          <>
            <br />
          </>
          <form encType="multipart/form-data">
            <div>
              <TextField
                error={!!errorName}
                helperText={errorName}
                label="Vehicle Name"
                id="outlined-start-adornment"
                sx={{ m: 1, width: "25ch" }}
                value={values.name}
                onChange={handleChange("name")}
              />
              <TextField
                error={!!errorVehicleID}
                helperText={errorVehicleID}
                label="Vehicle ID"
                id="outlined-start-adornment"
                sx={{ m: 1, width: "25ch" }}
                value={values.vehicle_id}
                onChange={handleChange("vehicle_id")}
              />
            </div>
            <div>
              <TextField
                error={!!errorSeats}
                helperText={errorSeats}
                id="outlined-multiline-static"
                label="Seats"
                sx={{ m: 1, width: "25ch" }}
                multiline
                value={values.seats}
                onChange={handleChange("seats")}
              />
              <TextField
                error={!!errorDoors}
                helperText={errorDoors}
                id="outlined-multiline-static"
                label="Doors"
                sx={{ m: 1, width: "25ch" }}
                multiline
                value={values.doors}
                onChange={handleChange("doors")}
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
              <Autocomplete
                value={value2}
                onChange={(event: any, newValue2: string | null) => {
                  if (newValue2) {
                    values.gear_type = (typeGearId.get(newValue2)!);
                  }
                  setValue2(newValue2);
                }}
                inputValue={inputValue2}
                onInputChange={(event, newInputValue2) => {
                  setInputValue2(newInputValue2);
                }}
                id="type-id-gear"
                options={gear}
                sx={{ m: 1, display: "inline-flex", width: "25ch" }}
                renderInput={(params) => (
                  <TextField {...params} label="Type Gear" />
                )}
              />
            </div>
            <div></div>
            <div>
              <TextField
                error={!!errorCost}
                helperText={errorCost}
                label="Price"
                id="outlined-start-adornment"
                sx={{ m: 1, width: "97%" }}
                value={values.cost}
                onChange={handleChange("cost")}
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
                  onChange={handleChangeImage}
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
                  onChange={handleChangeImage}
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
