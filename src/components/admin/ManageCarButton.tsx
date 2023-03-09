import {
  Autocomplete,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  Slide,
  TextField,
} from "@mui/material";
import React, { useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { TransitionProps } from "@mui/material/transitions/transition";
import InsertPhotoIcon from "@mui/icons-material/InsertPhoto";
import { useNavigate, useOutletContext } from "react-router-dom";

import axios from "axios";

type props = {
  title?: any;
  img?: any;
  id?: any;
  year?: any;
  brand?: any;
  deleted: boolean;
  setDelete: (a: boolean) => void;
  // des: string;
  // review: string;
  price: any;
  type: any;
  gear: any;
  seats: any;
  doors: any;
};
// ฟังก์ชันการเลื่อนเมื่อเปิดdialog
const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});
// ค่าตัวแปร
interface State {
  carName: string;
  carID: string;
  price: string;
  preview: any;
  raw: any;
  typeID: string;
  gear_type: string;
  seats: any;
  doors: any;
}

const ManageCarButton: React.FC<props> = ({
  title,
  img,
  id,
  year,
  brand,
  deleted,
  setDelete,
  price,
  type,
  gear,
  seats,
  doors,
}) => {
  const [setonLoginadmin] = useOutletContext<any>();
  const navigate = useNavigate();
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
  const [open, setOpen] = useState(false);
  const [open2, setOpen2] = useState(false);

  const [inputValue, setInputValue] = React.useState("");
  const [inputGear, setInputGear] = React.useState("");
  const [typeCar, settypeCar] = React.useState("");
  const [typeGear, setTypeGear] = React.useState("");
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
  const gearType = new Map<string, string>([
    ["Auto", "A"],
    ["Manual", "M"],
  ]);
  // เซ็ตค่าเริ่มต้น
  const [values, setValues] = React.useState<State>({
    carName: brand + " " + title + " " + year,
    carID: id,
    price: price,
    preview: "",
    raw: "",
    typeID: options[type - 1],
    gear_type: gear,
    seats: seats,
    doors: doors,
  });
  // เปลี่ยนแปลงค่า
  const handleChange =
    (prop: keyof State) => (event: React.ChangeEvent<HTMLInputElement>) => {
      setValues({ ...values, [prop]: event.target.value });
    };
  //เปลี่ยนรูป
  const handleChangeImage = (e: any) => {
    if (e.target.files.length) {
      setValues({
        carName: values.carName,
        carID: values.carID,
        price: values.price,
        preview: URL.createObjectURL(e.target.files[0]),
        raw: e.target.files[0],
        typeID: values.typeID,
        gear_type: values.gear_type,
        seats: values.seats,
        doors: values.doors,
      });
    }
  };
  const handleOpen = () => {
    setOpen(true);
  };
  const handleOpen2 = () => {
    setOpen2(true);
  };
  // เมื่อกดปุ่มยืนยัน
  const handleNext = (e: React.MouseEvent) => {
    e.preventDefault();
    var body = new FormData();
    body.append("carName", values.carName);
    body.append("carId", id);
    // body.append("description", values.description);
    // body.append("review", values.review);
    body.append("price", values.price);
    body.append("typeId", typeId.get(values.typeID)!);
    body.append("file", values.raw);

    const token = JSON.parse(
      localStorage.getItem("admin") ?? ' { "token": "" }'
    ).token;
    console.log("token", token);
    axios({
      method: "PUT",
      url: "https://carleasing.azurewebsites.net/vehicle/edit",
      data: body,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        return response.data;
      })
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        if (error.response.status == "401") {
          localStorage.clear();
          setonLoginadmin(false);
          alert("กรุณาเข้าสู่ระบบใหม่อีกครั้ง");
          navigate("/Admin");
        }
      })
      .then(handleClose2);
  };
  // เมื่อกดปุ่มลบ
  const handleDelete = (e: React.MouseEvent) => {
    e.preventDefault();
    const token = JSON.parse(
      localStorage.getItem("admin") ?? '{token:""}'
    ).token;
    console.log("token", token);
    console.log({ carId: values.carID });
    axios({
      method: "delete",
      url: "https://carleasing.azurewebsites.net/vehicle/delete",
      data: { carId: values.carID },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        console.log("regis res", response);
        return response.data;
      })
      .then((data) => console.log(data))
      .catch((error) => {
        if (error.response.status == "401") {
          localStorage.clear();
          setonLoginadmin(false);
          alert("กรุณาเข้าสู่ระบบใหม่อีกครั้ง");
          navigate("/Admin");
        }
      })
      .then(handleClose2);
  };
  // เมื่อปิดหน้าต่าง จะเซ็ตค่าเริ่มต้นใหม่
  const handleClose = () => {
    setOpen(false);
    setValues({
      carName: brand + " " + title + " " + year,
      carID: id,
      // description: des,
      // review: review,
      price: price,
      preview: "",
      raw: "",
      typeID: options[type - 1],
      gear_type: gear,
      seats: seats,
      doors: doors,
    });
    setDelete(!deleted);
  };
  // เมื่อปิดหน้าต่างลบ
  const handleClose2 = () => {
    setOpen(false);
    setOpen2(false);
    setDelete(!deleted);
  };
  return (
    <>
      {/* ปุ่มedit */}
      <Button
        color="primary"
        fullWidth
        variant="contained"
        onClick={handleOpen}
        startIcon={<EditIcon />}
      >
        Edit
      </Button>
      {/* หน้าต่างหลังกดปุ่ม */}
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"Edit Car Detail"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            <Grid container alignItems="center">
              {/* Gridสำหรับแสดงรูปภาพ */}
              <Grid
                item
                style={{ flexGrow: "1" }}
                xs={6}
                justifyContent="center"
                alignItems="center"
              >
                {values.preview ? (
                  <>
                    <Grid>
                      <img
                        src={values.preview}
                        alt="dummy"
                        width="100%"
                        height="100%"
                      />
                    </Grid>
                    <Grid
                      item
                      style={{ flexGrow: "1" }}
                      justifyContent="center"
                      alignItems="center"
                    >
                      <Button
                        variant="outlined"
                        startIcon={
                          <InsertPhotoIcon
                            sx={{
                              color: "primary.main",
                              alignItems: "center",
                              display: "flex",
                            }}
                          />
                        }
                        component="label"
                      >
                        UPLOAD
                        <input
                          accept="image/*"
                          id="icon-button-file"
                          type="file"
                          style={{ display: "none" }}
                          onChange={handleChangeImage}
                        />
                      </Button>
                    </Grid>
                  </>
                ) : (
                  <>
                    <img src={img} alt="dummy" width="100%" height="100%" />
                    <Button
                      variant="outlined"
                      startIcon={
                        <InsertPhotoIcon
                          sx={{
                            color: "primary.main",
                            alignItems: "center",
                            display: "flex",
                          }}
                        />
                      }
                      component="label"
                    >
                      UPLOAD
                      <input
                        accept="image/*"
                        id="icon-button-file"
                        type="file"
                        style={{ display: "none" }}
                        onChange={handleChangeImage}
                      />
                    </Button>
                  </>
                )}
              </Grid>
              {/* Gridสำหรับกรอกฟอร์ม */}
              <Grid item xs={6} justifyContent="center" alignItems="center">
                <Box
                  component="form"
                  sx={{
                    "& > :not(style)": { m: 1, width: "25ch" },
                  }}
                  noValidate
                  autoComplete="off"
                >
                  <TextField
                    id="carName"
                    label="carName"
                    variant="outlined"
                    value={values.carName}
                    onChange={handleChange("carName")}
                  />
                  <TextField
                    id="doors"
                    label="doors"
                    variant="outlined"
                    value={values.doors}
                    onChange={handleChange("doors")}
                  />
                  <TextField
                    id="seats"
                    label="seats"
                    variant="outlined"
                    value={values.seats}
                    onChange={handleChange("seats")}
                  />

                  <TextField
                    id="price"
                    label="price"
                    variant="outlined"
                    value={values.price}
                    onChange={handleChange("price")}
                  />
                  <Autocomplete
                    value={values.typeID}
                    onChange={(event: any, newValue: string | null) => {
                      if (newValue) {
                        settypeCar(typeId.get(newValue)!);
                      }
                      setValues({
                        carName: values.carName,
                        carID: values.carID,
                        // description: values.description,
                        // review: values.review,
                        price: values.price,
                        preview: values.preview,
                        raw: values.raw,
                        typeID: newValue!,
                        gear_type: values.gear_type,
                        seats: values.seats,
                        doors: values.doors,
                      });
                    }}
                    inputValue={inputValue}
                    onInputChange={(event, newInputValue) => {
                      setInputValue(newInputValue);
                    }}
                    id="type-id-car"
                    options={options}
                    sx={{ width: 300 }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Type Car"
                        variant="outlined"
                      />
                    )}
                  />
                  <Autocomplete
                    value={values.gear_type == "A" ? "Auto" : "Manual"}
                    onChange={(event: any, newValue: string | null) => {
                      if (newValue) {
                        setTypeGear(gearType.get(newValue)!);
                      }
                      setValues({
                        carName: values.carName,
                        carID: values.carID,
                        // description: values.description,
                        // review: values.review,
                        price: values.price,
                        preview: values.preview,
                        raw: values.raw,
                        typeID: values.typeID,
                        gear_type: newValue!,
                        seats: values.seats,
                        doors: values.doors,
                      });
                    }}
                    inputValue={inputGear}
                    onInputChange={(event, newInputValue) => {
                      setInputGear(newInputValue);
                    }}
                    id="type-id-gear"
                    options={["Auto", "Manual"]}
                    sx={{ width: 300 }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Type Gear"
                        variant="outlined"
                      />
                    )}
                  />
                </Box>
              </Grid>
            </Grid>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button color="success" onClick={handleNext}>
            Confirm
          </Button>
          <Button color="error" onClick={handleClose}>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
      {/* ปุ่มลบ */}
      <Button
        color="error"
        fullWidth
        variant="contained"
        startIcon={<DeleteIcon />}
        sx={{ mt: 1 }}
        onClick={handleOpen2}
      >
        Delete
      </Button>
      {/* หน้าต่างหลังกดDelete */}
      <Dialog
        open={open2}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose2}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"Are you sure you want to delete this car?"}</DialogTitle>
        <DialogActions>
          <Button color="success" onClick={handleDelete}>
            Confirm
          </Button>
          <Button color="error" onClick={handleClose2}>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
export default ManageCarButton;
