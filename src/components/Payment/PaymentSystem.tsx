import * as React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Unstable_Grid2';
import Stack from '@mui/material/Stack';

// for input payment
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import NativeSelect from '@mui/material/NativeSelect';

// QR Code
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';


import TextField from '@mui/material/TextField';
import { IMaskInput } from 'react-imask';
import Input from '@mui/material/Input';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import Button from '@mui/material/Button';
import axios from 'axios';
import { useEffect } from 'react';
import { Navigate, useLocation, useNavigate ,useOutletContext} from "react-router-dom";
import { stat } from 'fs';



interface CustomProps {
  onChange: (event: { target: { name: string; value: string } }) => void;
  name: string;
}

const TextMaskCustomID = React.forwardRef<HTMLElement, CustomProps>(
  function TextMaskCustom(props) {
    const { onChange, ...other } = props;
    return (
      <IMaskInput
        {...other}
        mask="0000-0000-0000-0000"
        definitions={{
          '#': /[0-9]/,
        }}
        onAccept={(value: any) => onChange({ target: { name: props.name, value } })}
        overwrite
      />
    );
  },
);

const TextMaskCustomEX = React.forwardRef<HTMLElement, CustomProps>(
  function TextMaskCustom(props) {
    const { onChange, ...other } = props;
    return (
      <IMaskInput
        {...other}
        mask="00/00"
        definitions={{
          '#': /[0-9]/,
        }}
        onAccept={(value: any) => onChange({ target: { name: props.name, value } })}
        overwrite
      />
    );
  },
);

const TextMaskCustomCVC = React.forwardRef<HTMLElement, CustomProps>(
  function TextMaskCustom(props) {
    const { onChange, ...other } = props;
    return (
      <IMaskInput
        {...other}
        mask="000"
        definitions={{
          '#': /[0-9]/,
        }}
        onAccept={(value: any) => onChange({ target: { name: props.name, value } })}
        overwrite
      />
    );
  },
);

interface State {
  name_holder: string;
  card_num: string;
  exdate: string;
  cvc: string;
}

const PaymentSystem: React.FC = () => {
  const { state } = useLocation();
  console.log({ bill_id: state["bill_id"] });
  //ทดสอบnavigateเข้าหน้า payment
  const navigate = useNavigate();
  //  useEffect(() => {
  //   navigate("/PaymentSystem", {state:{bill_id: '62388656-4b78-4c7a-a0ca-26febdebce66'}})
  // },[])

  
    
  //เข้ามาในหน้า payment
  // const {state} = useLocation();
  // const bill = state.bill_id;
  // console.log(state.bill_id);
  
  //รับข้อมูลของการชำระเงิน
  const bill_id = { bill_id: state["bill_id"] };
  const [BillData, setBillData] = React.useState<any[]>([]);
  useEffect(() => {
    axios({
      method: "GET",
      url: `http://localhost:3001/bill/get/${bill_id}`,
    })
      .then((response) => {
        return response.data;
      })
      .then((data) => {
        setBillData(data);
        console.log(data);
      })
      .catch((error) => {
        console.error("found error", error);
        alert("Error for Get Bill");
      });
  },[])
  console.log(BillData)
  function createDataOption(
    name_holder: string,
    card_num: string,
    exdate: string,
    cvc: string,
  ) {
    return {name_holder, card_num, exdate, cvc};
  }

  const Credit = [
    createDataOption('','', '', ''),
  ];

  function createDataInvice(
    name: string,
    cost: string,
  ) {
    return { name, cost};
  }
  
  const Invice = [
    createDataInvice('Number of Invoice', '123456789'),
    createDataInvice('Car rental*', '8000'),
    createDataInvice('Personal Package', '0'),
    createDataInvice('Additional', '0'),
  ];

  function createDataSum(
    name: string,
    cost: string,
  ) {
    return { name, cost};
  }
  
  const Sum = [
    createDataSum('Invice price', '10000'),
    createDataSum('Service fee', '500'),
    createDataSum('Tatal price**', '10500'),
  ];

  const [values, setValues] = React.useState<State>({
    name_holder: '',
    card_num: '',
    exdate: '',
    cvc: '',
  });

  // console.log(values.name)
  // console.log(values.cardid)
  // console.log(values.exdate)
  // console.log(values.cvc)
  //post credit card
  const cardhandleSubmit = () => {
    axios
      .post("http://localhost:3001/credit/post", {
        name_holder: values.name_holder,
        card_num: values.card_num,
        exdate: values.exdate,
        cvc: values.cvc,
      })
      
      .then((response) => {
        console.log("Credit Card information: ", response);
        return response.data;
      })
      .then((data) => {
        getCredit();
        console.log("data>>",data.card_num)
        alert("Success for Add Credit Card");
        setValues({
          name_holder: '',
          card_num: '',
          exdate: '',
          cvc: '',
        })
      })
      .catch((error) => {
        console.error("found error", error);
        alert("Error for Post Credit Card \n" + error);
      });
    
  };
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
  };
  //ที่เลือก card
  const [Default, setDefault] = React.useState('0');

  // ของปุ่ม option
  const [DataOption, setDataOption] = React.useState<any[]>([]);
  const [Option, setOption] = React.useState(Credit[0]);
  const [newCard, setCard] = React.useState(true);
 
  const optionChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    const value = event.target.value;
    console.log(value)
    if(value != '0'){
      const x = DataOption.findIndex((e) => e.name_holder.toString() === value);
      setOption(DataOption[x])
      setDelete(DataOption[x].card_num)
      console.log(Option)
      setCard(false);
    }
    else{
      setCard(true);
    }
  };

  useEffect(() => {
    getCredit();
  },[])

  const PaymentSummit = () => {
    if(newCard){
      alert("Please select your credit card before SUMMIT your payment")
    }else{
      axios.put("http://localhost:3001/paymentgateway", {
        bill_id: bill_id,
        card_num: Option.card_num
      })
      .then((response) => {
        console.log(response);
        alert("Payment successfully");
        navigate("/UserPage");
        return response.data;
      })
      .catch((error) => {
        console.error("found error", error);
        alert("Error for payment \n" + error);
      });
    }
  }

  const PaymentCancle = () => {
      axios.delete(`http://localhost:3001/bill/cancle/${bill_id}`)
      .then((response) => {
        console.log(response);
        alert("Bill cencle successfully");
        navigate("/UserPage"); 
        return response.data;
      })
      .catch((error) => {
        console.error("found error", error);
        alert("Error for cancle \n" + error);
      });

  }

  //get credit card
  const getCredit = () => {
    axios({
      method: "GET",
      url: "http://localhost:3001/credit/get",
    })
      .then((response) => {
        return response.data;
      })
      .then((data) => {
        setDataOption(data);
        console.log(data);
      })
      .catch((error) => {
        console.error("found error", error);
        alert("Error for Get Credit Card");
      });
    };

  // ของปุ่ม delete
  const [Delete, setDelete] = React.useState("");
  console.log(Delete)
  const deleteChange = () => {
    axios({
      method: "DELETE",
      url: `http://localhost:3001/credit/delete/${Delete}`,
    })
      .then((response) => {
        setCard(true);
        getCredit();
        return response.data;
      })
      .then((data) => {
        setDefault('0');
        alert("Success for Delete Credit Card");
      })
      .catch((error) => {
        console.error("found error", error);
        alert("Error for Delete Credit Card");
      });
  };


  return (
    <Box sx={{ mt:6 }}>
      <Grid container spacing={2}>
        
        <Grid xs={6} md={4}>
          
          <Stack
            direction="column"
            justifyContent="center"
            alignItems="center"
            spacing={2}
          >
            {/* part 1 */}
            <FormControl fullWidth>
              
              <InputLabel variant="standard" htmlFor="uncontrolled-native">
                Credit Card Option
              </InputLabel>
              <NativeSelect
                onChange={optionChange}
                defaultValue={Default}
                inputProps={{
                  name: 'Credit Card Option',
                  id: 'uncontrolled-native',
                }}
              >
                <option value={Default}>New Credit Card</option>
                {DataOption.map((Credit) => (
                  <option value={Credit.name_holder}>{Credit.card_num}</option>
                ))}
                
              </NativeSelect>
            </FormControl>
        

            {/* part 2 */}
            <Card sx={{ maxWidth: 345, height:478 }}>
              <CardContent>
                <Typography variant="h5" component="div" align="center">
                  <b>Credit Card Information</b>
                </Typography>
              </CardContent>
              {newCard &&(<div>
                <FormControl variant="standard">
                  <InputLabel  sx={{ ml:2}} htmlFor="formatted-text-mask-input">Name of Card</InputLabel>
                  <Input
                    sx={{ m: 2, width: "35ch" }}
                    value={values.name_holder}
                    onChange={handleChange}
                    name="name_holder"
                    id="formatted-text-mask-input"
                  />
                </FormControl>

                <FormControl variant="standard">
                  <InputLabel  sx={{ ml:2}} htmlFor="formatted-text-mask-input">Credit Card ID</InputLabel>
                  <Input
                    sx={{ m: 2, width: "35ch" }}
                    value={values.card_num}
                    onChange={handleChange}
                    name="card_num"
                    id="formatted-text-mask-input"
                    inputComponent={TextMaskCustomID as any}
                  />
                </FormControl>

                <FormControl variant="standard">
                  <InputLabel  sx={{ ml:2}} htmlFor="formatted-text-mask-input">Expiration Date</InputLabel>
                  <Input
                    sx={{ m: 2, width: "35ch" }}
                    value={values.exdate}
                    onChange={handleChange}
                    name="exdate"
                    id="formatted-text-mask-input"
                    inputComponent={TextMaskCustomEX as any}
                  />
                </FormControl>

                <FormControl variant="standard">
                  <InputLabel  sx={{ ml:2}} htmlFor="formatted-text-mask-input">CVV/CVC</InputLabel>
                  <Input
                    sx={{ m: 2, width: "35ch" }}
                    value={values.cvc}
                    onChange={handleChange}
                    name="cvc"
                    id="formatted-text-mask-input"
                    inputComponent={TextMaskCustomCVC as any}
                  />
                </FormControl>
                
                <Button
                  variant="contained"
                  type="submit"
                  color="success"
                  onClick={cardhandleSubmit}
                  sx={{ m: 2, width: "40ch" }}
                >
                  SAVE YOUR CARD
                </Button>
                <CardContent>
                <Typography variant="caption" component="div" align="center">
                  ***The company will not disclose your credit card information. Please check its validity.***
                </Typography>
              </CardContent>
              </div>)}

              {!newCard &&(
                <div>
                    <div>
                    <TextField
                    sx={{ m: 2, width: "32ch" }}
                    label="Name of Card"
                    value={Option.name_holder}
                    InputProps={{
                      readOnly: true,
                    }}
                    variant="standard"
                    />
                    
                    <TextField
                      sx={{ m: 2, width: "32ch" }}
                      label="Credit Card ID"
                      value={Option.card_num}
                      InputProps={{
                        readOnly: true,
                      }}
                      variant="standard"
                    />

                    <TextField
                      sx={{ m: 2, width: "32ch" }}
                      label="Expiration Date"
                      value={Option.exdate}
                      InputProps={{
                        readOnly: true,
                      }}
                      variant="standard"
                    />

                    <TextField
                      sx={{ m: 2, width: "32ch" }}
                      label="CVV/CVC"
                      value={Option.cvc}
                      InputProps={{
                        readOnly: true,
                      }}
                      variant="standard"
                    />  
                  </div> 
                    <Button
                    variant="contained"
                    color="error"
                    sx={{ m: 2, width: "40ch" }}
                    onClick={deleteChange}
                  >
                    DELETE YOUR CARD
                  </Button>
                </div>
                
              )}
            <div>
              
              
            </div>
            <div></div>
            </Card>
          </Stack>

        </Grid>
        <Grid xs={6} md={8}>
          <Stack
            direction="column"
            justifyContent="center"
            alignItems="center"
            spacing={2}
          >
            <Box
              sx={{
                width: 700,
                height: 300,
                borderRadius: 2,
                bgcolor: 'background.paper',
                boxShadow: 1,
                m:2,
                p:1,
              }}
            >
              <Stack
                direction="row"
                justifyContent="space-evenly"
                alignItems="stretch"
                spacing={2}
              >
                <Card sx={{ width: 350, height: 300 }}>
                  <CardMedia
                    component="img"
                    height="300"
                    image="img/promo.png"
                    alt="QR code"
                  />
                </Card>

                <Card sx={{ width: 350, height: 300 }}>
                  <CardContent>
                    <Typography variant="h6" component="div" align="center">
                      <b>Invoice</b>
                    </Typography>
                  </CardContent>

                  <TableContainer component={Paper}>
                    <Table sx={{ Width: 300, height: 240 }} size="small" aria-label="a dense table">
                      <TableBody>
                        {BillData.map((row) => (
                          <>
                            <TableRow
                            key={row.bill_id}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                          >
                            <TableCell component="th" scope="row">
                              Number of Invoice
                            </TableCell>
                            <TableCell align="right">{row.bill_id}</TableCell>
                          </TableRow>

                          <TableRow
                            key={row.car_rent}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                          >
                            <TableCell component="th" scope="row">
                            Car rental*
                            </TableCell>
                            <TableCell align="right">{row.car_rent}</TableCell>
                          </TableRow>
                          
                          <TableRow
                            key={row.package_cost}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                          >
                            <TableCell component="th" scope="row">
                            Personal Package
                            </TableCell>
                            <TableCell align="right">{row.package_cost}</TableCell>
                          </TableRow>

                          <TableRow
                            key={0}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                          >
                            <TableCell component="th" scope="row">
                            Additional
                            </TableCell>
                            <TableCell align="right">0</TableCell>
                          </TableRow>
                          </>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>

                </Card>
              </Stack>
            </Box>


            <Box
              sx={{
                width: 700,
                height: 161,
                borderRadius: 2,
                bgcolor: 'background.paper',
                boxShadow: 1,
                m:2,
                p:1,
              }}
            >
              <Stack
                direction="row"
                justifyContent="space-evenly"
                alignItems="stretch"
                spacing={2}
              >
                <Card sx={{ width: 340, height: 161 }}>
                  <CardContent>
                    <Typography variant="h6" component="div" align="center">
                      <b>Summary</b>
                    </Typography>
                  </CardContent>

                  <TableContainer component={Paper}>
                    <Table sx={{ Width: 300, height: 100 }} size="small" aria-label="a dense table">
                      <TableBody>
                        {BillData.map((row) => (
                          <>
                          <TableRow
                            key={row.amount_balance}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                          >
                            <TableCell component="th" scope="row">
                            Invice price
                            </TableCell>
                            <TableCell align="right">{row.amount_balance}</TableCell>
                          </TableRow>

                          <TableRow
                            key={row.tax_amount}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                          >
                            <TableCell component="th" scope="row">
                            Service fee
                            </TableCell>
                            <TableCell align="right">{row.tax_amount}</TableCell>
                          </TableRow>

                          <TableRow
                            key={row.total_amount}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                          >
                              <TableCell component="th" scope="row">
                            Tatal price**
                            </TableCell>
                            <TableCell align="right">{row.total_amount}</TableCell>
                            
                          </TableRow>
                          </>
                          
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>

                </Card>

                <Card sx={{ width: 340, height: 161 }}>
                  <CardContent>
                    <Typography variant="h6" component="div" align="center">
                      <b>Pay off debt</b>
                    </Typography>
                    <Typography variant="caption" component="div" align="center">
                    Please select the credit card you want before <br/> Click 'SUMMIT' .
                    </Typography>
                  </CardContent>
                  <Stack
                    direction="row"
                    justifyContent="center"
                    alignItems="center"
                    spacing={2}
                  >
                    <Button
                      variant="contained"
                      color="error"
                      onClick={PaymentCancle}
                      sx={{width: "15ch" }}
                    >
                      CANCEL
                    </Button>

                    <Button
                      variant="contained"
                      type="submit"
                      color="success"
                      onClick={PaymentSummit}
                      sx={{width: "15ch" }}
                    >
                      Submit
                    </Button>
                  </Stack>
                  
                </Card>
              </Stack>              

            </Box>
          </Stack>
          
        </Grid>
      </Grid>
    </Box>
  );
}

export default PaymentSystem;