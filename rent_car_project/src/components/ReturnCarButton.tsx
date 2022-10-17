import {
  ButtonBase,
  Button,
  Typography,
  Grid,
  Slide,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import * as React from "react";
import axios from "axios";
import { TransitionProps } from "@mui/material/transitions";
import { useNavigate, useOutletContext } from "react-router-dom";

// ฟังก์ชันเอฟเฟกเมื่อเปิดหน้าต่าง
const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

type props = {
  title?: any;
  img?: any;
  id?: any;
  brand?: any;
  year?: any;
};

// ฟังก์ชันหลัก
const ReturnCarButton: React.FC<props> = ({ title, img, id, brand, year }) => {
  const [onLoginuser, setonLoginuser] = useOutletContext<any>();
  const navigate = useNavigate();
  const token = JSON.parse(
    localStorage.getItem("user") ?? ' { "token": "" }'
  ).token;
  console.log("token", token);
  const [step, setStep] = React.useState(1);
  // stateสำหรับเปิดหน้าต่าง
  const [open2, setOpen2] = React.useState(false);
  // ฟังก์ชันเมื่อกดเปิด
  const handleOpen2 = () => setOpen2(true);
  // ฟังก์ชันเมื่อกดปิด
  const handleClose2 = () => {
    setOpen2(false);
  };

  const handleRuturn = (e: React.MouseEvent) => {
    e.preventDefault();
    axios({
      method: "put",
      url: "https://carleasing.azurewebsites.net/booking/return",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        return response.data;
      })
      .then((data) => {
        alert("คืนรถสำเร็จ");
      })
      .then(handleClose2)
      
      .catch((error) => {
        if (error.response.status == "401") {
          localStorage.clear();
          setonLoginuser(false);
          alert("กรุณาเข้าสู่ระบบใหม่อีกครั้ง");
          console.log("มาละจ้า");
          navigate("/Login");
        }else{
          alert("โปรดรอการตรวจสอบการชำระเงินจาก Admin")
        }
      });
  };
  return (
    <>
      {/* ปุ่มreturn */}
      <Button
        color="warning"
        fullWidth
        variant="contained"
        onClick={handleOpen2}
      >
        Return
      </Button>
      {/* หน้าต่างหลังจากกดreturn */}
      <Dialog
        open={open2}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose2}
        aria-describedby="alert-dialog-slide-description"
        fullWidth
      >
        <DialogTitle>{"Return Car"}</DialogTitle>
        <DialogContent>
          {/* แสดงรูปภาพ */}
          <ButtonBase>
            <img
              alt="complex"
              src={`${img}?w=50&h=50&fit=crop&auto=format`}
              srcSet={`${img}?w=50&h=50&fit=crop&auto=format&dpr=2 2x`}
              width="200"
              height="160"
            />
          </ButtonBase>
          {/* แสดงข้อมูลต่างๆ */}
          <Grid item xs container direction="column" spacing={2}>
            <Grid
              item
              xs
              sx={{ alignItems: "center", justifyContent: "center" }}
            >
              <Typography gutterBottom variant="subtitle1" component="div">
                Brand: {brand}
              </Typography>
              <Typography variant="body2" gutterBottom>
                Model Name: {title}
              </Typography>
              <Typography variant="body2" gutterBottom>
                Vehicle ID: {id}
              </Typography>
              <Typography variant="body2" gutterBottom>
                Model Year: {year}
              </Typography>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions
          style={{ justifyContent: "flex-end", marginRight: "2%" }}
        >
          <Typography variant="h6">Are you sure to return this car?</Typography>
        </DialogActions>
        <DialogActions>
          {/* ปุ่มยืนยัน */}
          <Button
            variant="contained"
            color="success"
            sx={{ ml: 1 }}
            onClick={handleRuturn}
          >
            Confirm
          </Button>
          {/* ปุ่มยกเลิก */}
          <Button
            variant="contained"
            color="error"
            sx={{ ml: 2, mr: 2 }}
            onClick={handleClose2}
          >
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
export default ReturnCarButton;
