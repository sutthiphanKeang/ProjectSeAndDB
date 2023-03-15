import { Button, Dialog, DialogTitle, DialogActions } from "@mui/material";
import axios from "axios";
import React, { Component, useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";

type props = {
  bookData?: any;
  // in_id?: any;
  packageID?:any;
};
const InsuranceButton: React.FC<props> = ({ bookData, packageID }) => {
  const token = JSON.parse(
    localStorage.getItem("user") ?? ' { "token": "" }'
  ).token;
  const [open, setOpen] = React.useState(false);
  const navigate = useNavigate();
  const handleClose = () => {
    setOpen(false);
  };
  const handleClickOpen = () => {
    setOpen(true);
    console.log(bookData)
    console.log(packageID)
  };
  const rhandleSubmit = () => {
    console.log(`rhandleSubmit`);
    // navigate("/Costsummary", {state:{bookData:bookData,in_id:in_id}})
    navigate("/Costsummary", {state:{bookData:bookData,packageID:packageID}})
    // axios({
    //   method: "get",
    //   url: "https://carleasing.azurewebsites.net/insurance",
    //   data: {
    //     insurance_id: in_id,
    //   },

    //   headers: {
    //     Authorization: `Bearer ${token}`,
    //   },
    // })
    //   .then((response) => {
    //     console.log("regis res", response);
    //     return response.data;
    //   })
    //   .then((data) => console.log(data))
    //   .then(handleClose);
  };

  return (
    <>
      <Button
        color="success"
        component="div"
        variant="contained"
        onClick={handleClickOpen}
        sx={{ ml: 1 }}
      >
        Book
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Confirm to book this insurance?"}
        </DialogTitle>

        <DialogActions>
          <Button color="primary" variant="outlined" onClick={handleClose}>
            Cancel
          </Button>
          <Button color="primary" variant="contained" onClick={rhandleSubmit}>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
export default InsuranceButton;
