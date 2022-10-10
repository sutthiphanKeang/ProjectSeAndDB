import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  IconButton,
  Slide,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { TransitionProps } from "@mui/material/transitions/transition";
import InsertPhotoIcon from "@mui/icons-material/InsertPhoto";

type props = {
  title?: any;
  img?: any;
  id?: any;
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
  carID: any;
  description: string;
  review: string;
  price: number;
}
const ManageCarButton: React.FC<props> = ({ title, img, id }) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
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
            <Grid
              container
              spacing={2}
              justifyContent="center"
              alignItems="center"
            >
              <Grid item xs={6} sx={{ height: "100%" }}>
                <IconButton
                  sx={{
                    width: "100%",
                    borderRadius: "0.5em",
                    border: "1px solid",
                    borderColor: "primary.main",
                  }}
                  aria-label="CarImage"
                >
                  <InsertPhotoIcon
                    sx={{ color: "primary.main", fontSize: 250 }}
                  />
                </IconButton>
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
                  <TextField id="carName" label="carName" variant="outlined" />
                  <TextField id="carId" label="carId" variant="outlined" />
                  <TextField
                    id="description"
                    label="description"
                    variant="outlined"
                  />
                  <TextField id="review" label="review" variant="outlined" />
                  <TextField id="price" label="price" variant="outlined" />
                  <TextField
                    id="outlined-basic"
                    label="Outlined"
                    variant="outlined"
                  />
                </Box>
              </Grid>
            </Grid>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button color="success" onClick={handleClose}>
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
      >
        Delete
      </Button>
    </>
  );
};
export default ManageCarButton;
