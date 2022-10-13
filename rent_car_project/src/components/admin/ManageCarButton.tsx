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
import { type } from "@testing-library/user-event/dist/type";
import axios from "axios";
import { boolean } from "yup";

type props = {
  title?: any;
  img?: any;
  id?: any;
  year?: any;
  brand?: any;
  deleted: boolean;
  setDelete: (a:boolean) => void;
};
const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});
interface State {
  carName: string;
  carID: string;
  description: string;
  review: string;
  price: string;
  preview: any;
  raw: any;
  typeID: string;
}

const ManageCarButton: React.FC<props> = ({ title, img, id, year, brand ,deleted,setDelete}) => {
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
  const [typeCar, settypeCar] = React.useState("");
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

  const [values, setValues] = React.useState<State>({
    carName: brand + " " + title + " " + year,
    carID: id,
    description: "",
    review: "",
    price: "",
    preview: "",
    raw: "",
    typeID: "",
  });
  const handleChange =
    (prop: keyof State) => (event: React.ChangeEvent<HTMLInputElement>) => {
      setValues({ ...values, [prop]: event.target.value });
    };
  const handleChangeImage = (e: any) => {
    if (e.target.files.length) {
      setValues({
        carName: values.carName,
        carID: values.carID,
        description: values.description,
        review: values.review,
        price: values.price,
        preview: URL.createObjectURL(e.target.files[0]),
        raw: e.target.files[0],
        typeID: values.typeID,
      });
    }
  };
  const handleOpen = () => {
    setOpen(true);
  };
  const handleOpen2 = () => {
    setOpen2(true);
  };
  const handleNext = (e: React.MouseEvent) => {
    e.preventDefault();
    var body = new FormData();
    body.append("carName", values.carName);
    body.append("carId", id);
    body.append("description", values.description);
    body.append("review", values.review);
    body.append("price", values.price);
    body.append("typeId", typeCar);
    body.append("file", values.raw);

    const token = JSON.parse(
      localStorage.getItem("admin") ?? '{token:""}'
    ).token;
    console.log("token", token);

    fetch("https://carleasing.azurewebsites.net/vehicle/edit", {
      mode: "cors",
      body: body,
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => console.log(data))
      .then(handleClose);
  };
  const handleDelete = (e: React.MouseEvent) => {
    e.preventDefault();
    const token = JSON.parse(
      localStorage.getItem("admin") ?? '{token:""}'
    ).token;
    console.log("token", token);
    console.log({carId:values.carID})
    axios({
      method: "delete",
      url: "https://carleasing.azurewebsites.net/vehicle/id",
      data: {carId:values.carID},
      headers: {
       
        "Authorization": `Bearer ${token}`,
      },
    })
      
      .then((response) => {
        console.log("regis res", response);
        return response.data;}
      )
      .then((data) => console.log(data))
      .then(handleClose2);


    
  };
  const handleClose = () => {
    setOpen(false);
    setValues({
      carName: "",
      carID: "",
      description: "",
      review: "",
      price: "",
      preview: "",
      raw: "",
      typeID: "",
    });
  };
  const handleClose2 = () => {
    setOpen2(false);
    setDelete(true);
  };
  return (
    <>
      <Button
        color="primary"
        fullWidth
        variant="contained"
        onClick={handleOpen}
        startIcon={<EditIcon />}
      >
        Edit
      </Button>
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
                    variant="standard"
                    value={values.carName}
                    onChange={handleChange("carName")}
                  />

                  <TextField
                    id="description"
                    label="description"
                    variant="standard"
                    value={values.description}
                    onChange={handleChange("description")}
                  />
                  <TextField
                    id="review"
                    label="review"
                    variant="standard"
                    value={values.review}
                    onChange={handleChange("review")}
                  />
                  <TextField
                    id="price"
                    label="price"
                    variant="standard"
                    value={values.price}
                    onChange={handleChange("price")}
                  />
                  <Autocomplete
                    value={values.typeID}
                    onChange={(event: any, newValue: string | null) => {
                      if (newValue) {
                        settypeCar(typeId.get(newValue)!);
                      }
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
                        variant="standard"
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
