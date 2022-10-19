import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  Box,
  Typography,
  DialogActions,
} from "@mui/material";
import axios from "axios";
import { useNavigate , useOutletContext } from "react-router-dom";
import React from "react";

type props = {
  bill_id?: any;
  slip?: any;
  setLoad?: any;
  loaded?: boolean;
  
};
const CheckSlipButton: React.FC<props> = ({ bill_id, slip ,setLoad,loaded}) => {
    const [setonLoginadmin] = useOutletContext<any>();
    const navigate = useNavigate();
    const [open, setOpen] = React.useState(false);
    const handleClickOpen = () => {
        setOpen(true);
      };
      const handleClose = () => {
        setOpen(false);
        setLoad(!loaded)
      };
      const handleSuccess = () => {
        console.log(`handleSuccess`);
        const token = JSON.parse(
          localStorage.getItem("admin") ?? '{token:""}'
        ).token;
        console.log("token", token);
        axios({
          method: "put",
          url: "https://carleasing.azurewebsites.net/payment/admin/approve",
          data: {
            bill_id: bill_id,
          },
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
          .then(handleClose);
      };
  return (
    <>
      <Button
        variant="contained"
        component="div"
        color="success"
        sx={{ ml: 1 }}
        onClick={handleClickOpen}
      >
        ตรวจสอบ
      </Button>
      <Dialog open={open} keepMounted onClose={handleClose}>
        <DialogTitle>{"Payment status"}</DialogTitle>
        <DialogContent>
          <Box>
            <img
              alt="complex"
              src={`${slip}?w=50&h=50&fit=crop&auto=format`}
              srcSet={`${slip}?w=50&h=50&fit=crop&auto=format&dpr=2 2x`}
              height={440}
              width={400}
            />
          </Box>
          <Typography
            gutterBottom
            variant="subtitle1"
            component="div"
            color="#1a237e"
          >
            Bill ID ID : {bill_id}
          </Typography>
          <DialogActions>
            <Button onClick={handleClose} variant="contained" color="error">
              Cancel
            </Button>
            <Button onClick={handleSuccess} variant="contained" color="success">
              Payment Success
            </Button>
          </DialogActions>
        </DialogContent>
      </Dialog>
    </>
  );
};
export default CheckSlipButton;
