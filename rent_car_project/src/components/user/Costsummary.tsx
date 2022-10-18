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
import { useLocation, useNavigate ,useOutletContext} from "react-router-dom";
import axios from "axios";
import { useEffect } from "react";

export default function Costsummary() {
  type price = {
    amount_balance?: number;
    tax_amount?: number;
    total_amount?: number;
  };

  type dataCarform = {
    vehicle_id?: any;
    name?: any;
    brand?: any;
    year?: any;
    cost?: any;
    description?: any;
    vehicle_img?: any;
  };

  const [onLoginuser, setonLoginuser] = useOutletContext<any>();
  const { state } = useLocation();
  console.log({ bookData: state["bookData"] });
  const book = { bookData: state["bookData"] };
  const navigate = useNavigate();

  const token = JSON.parse(
    localStorage.getItem("user") ?? ' { "token": "" }'
  ).token;

  const [cost, setcost] = React.useState<price>({});
  const [dataCar, setdataCar] = React.useState<dataCarform>({});
  const [sum, setsum] = React.useState(Number);

  console.log({ in_id: state["in_id"] });
  const in_id = { in_id: state["in_id"] };
  useEffect(() => {
    axios
      .get("https://carleasing.azurewebsites.net/booking/summary", {
        params: {
          insuranceId: in_id.in_id,
          carId: book.bookData.carId,
          bookDate: book.bookData.bookDate,
          returnDate: book.bookData.returnDate,
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log(response.data);
        setcost(response.data);
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
    
    console.log("data cost from api", cost.amount_balance!);
  }, []);
  useEffect(()=>{
    if (cost){
      setsum(cost.total_amount!);
    }
   
  }, [cost])
  useEffect(() => {
    axios
      .get("https://carleasing.azurewebsites.net/vehicle/id", {
        params: {
          vehicleId: book.bookData.carId,
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setdataCar(response.data);
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
  console.log("data car from api", dataCar);

  const handleSubmit = () => {
    console.log(`handleSubmit`);
    axios({
      method: "post",
      url: "https://carleasing.azurewebsites.net/booking/book",
      data: {
        carId: book.bookData.carId,
        bookDate: book.bookData.bookDate,
        returnDate: book.bookData.returnDate,
        insuranceId: in_id.in_id,
        amount_balance: cost.amount_balance!,
        tax_amount: cost.tax_amount!,
        total_amount: cost.total_amount!,
      },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        navigate("/Payment", {state:{sum:sum}});
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
  };

  return (
    <div>
      {/* เเสดงหัวข้อ */}
      <div className="head">
        <Box
          sx={{ width: "100%", maxWidth: 500, marginTop: 3, marginLeft: "15%" }}
        >
          <Typography variant="h5" gutterBottom>
            สรุปราคาใช้จ่าย
          </Typography>
        </Box>
      </div>

      {/* เเสดงรูปภาพรถที่จอง */}
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>
          <Grid item xs={7} className="image">
            <ImageList sx={{ width: "130%", height: "90%", marginLeft: "20%" }}>
              <ImageListItem>
                <img
                  src={`${dataCar.vehicle_img}?w=248&fit=crop&auto=format`}
                  srcSet={`${dataCar.vehicle_img}?w=248&fit=crop&auto=format&dpr=2 2x`}
                  loading="lazy"
                />
              </ImageListItem>
            </ImageList>
          </Grid>

          {/* รายละเอียดรถที่จอง */}
          <Grid item xs={5} className="card1">
            <Card
              sx={{
                minWidth: "50%",
                minHeight: "50%",
                backgroundColor: "#CACFD2",
                borderRadius: "10px",
                marginRight: "30%",
                marginTop: "5%",
                marginLeft: "-20%",
              }}
            >
              <CardContent>
                <Typography
                  sx={{ fontSize: 18 }}
                  color="text.secondary"
                  gutterBottom
                >
                  Vehicle ID : {dataCar.vehicle_id!}
                </Typography>
                <Typography
                  sx={{ fontSize: 18 }}
                  color="text.secondary"
                  gutterBottom
                >
                  Name : {dataCar.name!}
                </Typography>
                <Typography
                  sx={{ fontSize: 18 }}
                  color="text.secondary"
                  gutterBottom
                >
                  Brand : {dataCar.brand!}
                </Typography>
                <Typography
                  sx={{ fontSize: 18 }}
                  color="text.secondary"
                  gutterBottom
                >
                  Year : {dataCar.year!}
                </Typography>
                <Typography
                  sx={{ fontSize: 18 }}
                  color="text.secondary"
                  gutterBottom
                >
                  Cost : {dataCar.cost!}
                </Typography>
                <Typography
                  sx={{ fontSize: 18 }}
                  color="text.secondary"
                  gutterBottom
                >
                  Description : {dataCar.description!}
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          {/* สรุปค่าใช้จ่าย */}
          <Grid item xs={5} className="card2">
            <Card
              sx={{
                minWidth: "40%",
                minHeight: "50%",
                backgroundColor: "#7DCEA0",
                borderRadius: "10px",
                marginLeft: "30%",
                marginTop: "-3%",
              }}
            >
              <CardContent>
                <Typography
                  sx={{ fontSize: 18 }}
                  color="text.secondary"
                  gutterBottom
                >
                  ราคา(ไม่รวมภาษี) : {cost.amount_balance!}
                </Typography>
                <Typography
                  sx={{ fontSize: 18 }}
                  color="text.secondary"
                  gutterBottom
                >
                  ภาษี 7% : {cost.tax_amount!}
                </Typography>
                <Typography
                  sx={{ fontSize: 18 }}
                  color="text.secondary"
                  gutterBottom
                >
                  ราคารวม : {cost.total_amount!}
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          {/* ปุ่มยืนยัน */}
          <Grid item xs={2} className="card3">
            <Stack
              spacing={2}
              direction="row"
              marginLeft={"150%"}
              marginTop={"20%"}
            >
              <Button variant="contained"
                component="label" size="large" sx={{ m: 1, width: "30ch", height: "5ch", fontWeight: "bold" }} onClick={handleSubmit}>
                Submit
              </Button>
            </Stack>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
}

const itemData = [
  {
    img: "https://images.unsplash.com/photo-1589118949245-7d38baf380d6",
    title: "Bike",
  },
];
