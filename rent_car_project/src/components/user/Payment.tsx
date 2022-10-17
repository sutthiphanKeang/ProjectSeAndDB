import * as React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import SendIcon from "@mui/icons-material/Send";
import {useNavigate, useOutletContext } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Payment() {
  const [setonLoginuser] = useOutletContext<any>();
  const navigate = useNavigate();
  const token = JSON.parse(
    localStorage.getItem("user") ?? ' { "token": "" }'
  ).token;
  const [file, setfile] = useState<FileList | null>();
  const [dataPay, setDataPay] = useState<any[]>([]);
  useEffect(() => {
    axios
      .get("https://carleasing.azurewebsites.net/user/payment", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        return response.data;
      })
      .then((data) => {
        setDataPay(data);
        console.log(data);
      })
    .catch((error) => {
      if (error.response.status == "401") {
        localStorage.clear();
        setonLoginuser(false);
        alert("กรุณาเข้าสู่ระบบใหม่อีกครั้ง");
        console.log("มาละจ้า");
        navigate("/Login");
      }
    });
  }, []);

  const handleSubmit = () => {
    axios({
      method: "put",
      url: "https://carleasing.azurewebsites.net/payment/",
      data: {
        file: file ? file[0] : "img/Car1.jpg",
      },
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        navigate("/UserPage");
        return response.data;
      })
    .catch((error) => {
      if (error.response.status == "401") {
        localStorage.clear();
        setonLoginuser(false);
        alert("กรุณาเข้าสู่ระบบใหม่อีกครั้ง");
        console.log("มาละจ้า");
        navigate("/Login");
      }
    });
    }

  return (
    <div>
      {/* เเสดงหัวข้อ */}
      <div className="head">
        <Box
          sx={{ width: "100%", maxWidth: 500, marginTop: 3, marginLeft: "15%" }}
        >
          <Typography variant="h5" gutterBottom>
            Payment
          </Typography>
        </Box>
      </div>

      {/*เเสดงรูป QR code  */}
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>
          <Grid item xs={7} className="image">
            <ImageList sx={{ width: "80%", height: "100%", marginLeft: "24%" }}>
              {itemData.map((item) => (
                <ImageListItem key={item.img}>
                  <img
                    src={`${item.img}?w=248&fit=crop&auto=format`}
                    srcSet={`${item.img}?w=248&fit=crop&auto=format&dpr=2 2x`}
                    alt={item.title}
                    loading="lazy"
                  />
                </ImageListItem>
              ))}
            </ImageList>
          </Grid>

          {/* เเสดงเลขบัญชีธนาคาร */}
          <Grid item xs={5} className="card1">
            <Card
              sx={{
                minWidth: "50%",
                minHeight: "25%",
                backgroundColor: "#7DCEA0",
                borderRadius: "10px",
                marginRight: "50%",
                marginTop: "3%",
                marginLeft: "-46%",
              }}
            >
              <CardContent>
                <Typography
                  sx={{ fontSize: 20 }}
                  color="text.secondary"
                  gutterBottom
                >
                  เลขที่บัญชี ธนาคารไทยพาณิชย์ : 892-235763-8
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          {/* กล่องว่างเพื่อจัดหน้า */}
          <Grid item xs={5} className="card2">
            <Card sx={{ minWidth: "0%", minHeight: "0%" }}> </Card>
          </Grid>

          {/* สรุปค่าใช้จ่าย */}

          <Grid item xs={6} className="card3">
            <Card
              sx={{
                minWidth: "50%",
                minHeight: "50%",
                backgroundColor: "#CACFD2",
                borderRadius: "10px",
                marginLeft: "-4%",
                marginRight: "50%",
                marginTop: "-38%",
              }}
            >
              <CardContent>
                {dataPay.map((item) => (
                  <>
                    <Typography
                      sx={{ fontSize: 18 }}
                      color="text.secondary"
                      gutterBottom
                    >
                      สรุปราคา : {item.total_amount}
                    </Typography>
                  </>
                ))}
                <Typography
                  sx={{ mb: 1.5 }}
                  color="text.secondary"
                ></Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>

      {/* ปุ่มอัพโหลดสลิป */}
      <Stack
        direction="row"
        alignItems="center"
        spacing={2}
        marginLeft="40%"
        marginTop={"-3%"}
      >
        <Button variant="contained" component="label">
          Upload
          <input
            hidden
            accept="image/*"
            multiple
            type="file"
            onChange={(event) => setfile(event.target.files)}
          />
        </Button>
      </Stack>
      {/* ปุ่มส่งสลิป */}
      <Stack direction="row" spacing={2} marginLeft="50%" marginTop={"-3%"}>
        <Button variant="contained" endIcon={<SendIcon />} onClick={handleSubmit}>
          Send
        </Button>
      </Stack>
    </div>
  );
}

const itemData = [
  {
    img: "img/qr.jpg",
    title: "Bike",
  },
];
