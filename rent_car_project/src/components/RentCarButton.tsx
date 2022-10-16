import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Slide,
  Typography,
} from "@mui/material";

import * as React from "react";
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-date-picker";
import { useState } from "react";
import { TransitionProps } from "@mui/material/transitions/transition";
import Insurance from "./Insurance";
import axios from "axios";

interface rentDate {
  startDate: string;
  endDate: string;
}

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
  bookData?: any;
  setBookData?: any;
};

const RentCarButton: React.FC<props> = ({
  title,
  img,
  id,
  bookData,
  setBookData,
}) => {
  const [startDate, setStartDate] = useState(new Date());
  const [dialogStep, setdialogStep] = React.useState(true);
  const [endDate, setEndDate] = useState(new Date());
  const [open2, setOpen2] = React.useState(false);
  const objDate: rentDate = {
    startDate: "",
    endDate: "",
  };
  // เปิดหน้าต่าง
  const handleOpen2 = () => {
    setOpen2(true);
    setdialogStep(true);
  };
  // ปิดหน้าต่าง
  const handleClose2 = () => {
    setOpen2(false);
    setStartDate(new Date());
    setEndDate(new Date());
  };
  // เซตค่าวันแรก
  const handleOnStartDate = (a: any) => {
    setStartDate(a);
  };
  // เซตค่าวันสุดท้าย
  const handleOnEndDate = (a: any) => {
    setEndDate(a);
  };
  // ทดลอง ยังไม่ได้ใช้
  const handleOnSend = (e: React.MouseEvent) => {
    e.preventDefault();
    const startText = startDate.toISOString().slice(0, 10);
    const endText = endDate.toISOString().slice(0, 10);
    objDate.startDate = startText;
    objDate.endDate = endText;
    setBookData?.({
      carId: id,
      bookDate: startText,
      returnDate: endText,
      insuranceId: "",
    });
    setdialogStep(false);
    console.log(bookData);
  };

  return (
    <>
      {/* ปุ่มจอง */}
      <Button
        color="success"
        fullWidth
        variant="contained"
        onClick={handleOpen2}
      >
        Rent
      </Button>
      {/* หน้าต่างหลังกดปุ่มจอง */}
      <Dialog
        open={open2}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose2}
        aria-describedby="alert-dialog-slide-description"
      >
        {dialogStep ? (
          <>
            <DialogTitle>{"Rent Detail"}</DialogTitle>
            <DialogContent>
              <Box>
                <img
                  alt="complex"
                  src={`${img}?w=50&h=50&fit=crop&auto=format`}
                  srcSet={`${img}?w=50&h=50&fit=crop&auto=format&dpr=2 2x`}
                  width="200"
                  height="160"
                />
              </Box>
              <Typography>Start rent from</Typography>
              {/* ปฏิทันเลือกวันเริ่มจอง */}
              <DatePicker
                onChange={handleOnStartDate}
                value={startDate}
                format={"y-MM-dd"}
                minDate={new Date()}
              />

              <Typography>To</Typography>
              {/* ปฏิทินเลือกจองถึงวันไหน */}
              <DatePicker
                onChange={handleOnEndDate}
                value={endDate}
                format={"y-MM-dd"}
                minDate={startDate}
              />
            </DialogContent>
            <DialogActions>
              {/* ปุ่มไปหน้าต่อไป */}
              <Button
                variant="contained"
                color="success"
                sx={{ ml: 2 }}
                onClick={handleOnSend}
              >
                Next
              </Button>
              {/* ปุ่มยกเลิก */}
              <Button
                variant="contained"
                color="error"
                sx={{ ml: 2 }}
                onClick={handleClose2}
              >
                Cancel
              </Button>
            </DialogActions>
          </>
        ) : (
          <DialogContent>
            <Insurance bookData={bookData} />
          </DialogContent>
        )}
      </Dialog>
    </>
  );
};
export default RentCarButton;
