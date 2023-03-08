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
  name: string;
  cardid: string;
  exdate: string;
  cvc: string;
}
const PaymentSystem: React.FC = () => {
  function createDataOption(
    value: number,
    name: string,
    id: string,
    exdate: string,
    cvc: string,
  ) {
    return {value, name, id, exdate, cvc};
  }

  const Credit = [
    createDataOption(0, 'New Card','', '', ''),
    createDataOption(1, 'KBank','1234-1234-1234-1234', '12/23', '123'),
    createDataOption(2, 'SCB', '2234-2234-2234-2234', '02/24', '321'),
    createDataOption(3, 'TTB', '3234-3234-3234-3234', '22/25', '213'),
  ];

  function createDataInvice(
    name: string,
    cost: number,
  ) {
    return { name, cost};
  }
  
  const Invice = [
    createDataInvice('Number of Invoice', 12345678),
    createDataInvice('Car rental*', 8000),
    createDataInvice('Insurance*', 2000),
    createDataInvice('Personal Insurance', 0),
    createDataInvice('Additional', 0),
  ];

  function createDataSum(
    name: string,
    cost: number,
  ) {
    return { name, cost};
  }
  
  const Sum = [
    createDataSum('Invice price', 10000),
    createDataSum('Service fee', 500),
    createDataSum('Tatal price**', 10500),
  ];

  const [values, setValues] = React.useState<State>({
    name: '',
    cardid: '',
    exdate: '',
    cvc: '',
  });

  // console.log(values.name)
  // console.log(values.cardid)
  // console.log(values.exdate)
  // console.log(values.cvc)
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
  };

  // ของปุ่ม option
  const [Option, setOption] = React.useState(Credit[0]);
  const optionChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    const value = event.target.value;
      const x = Credit.findIndex((e) => e.value.toString() === value);
      setOption(Credit[x])
      console.log(x)
    
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
                defaultValue={0}
                inputProps={{
                  name: 'Credit Card Option',
                  id: 'uncontrolled-native',
                }}
              >
                {Credit.map((Credit) => (
                  <option value={Credit.value}>{Credit.name}</option>
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
              {Option.value == 0 &&(<div>
                <FormControl variant="standard">
                  <InputLabel  sx={{ ml:2}} htmlFor="formatted-text-mask-input">Name of Card</InputLabel>
                  <Input
                    sx={{ m: 2, width: "35ch" }}
                    value={values.name}
                    onChange={handleChange}
                    name="name"
                    id="formatted-text-mask-input"
                  />
                </FormControl>

                <FormControl variant="standard">
                  <InputLabel  sx={{ ml:2}} htmlFor="formatted-text-mask-input">Credit Card ID</InputLabel>
                  <Input
                    sx={{ m: 2, width: "35ch" }}
                    value={values.cardid}
                    onChange={handleChange}
                    name="cardid"
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
                    error
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

              {Option.value != 0  && Option &&(
                <div>
                    <div>
                    <TextField
                    sx={{ m: 2, width: "32ch" }}
                    label="Name of Card"
                    value={Option.name}
                    InputProps={{
                      readOnly: true,
                    }}
                    variant="standard"
                    />
                    
                    <TextField
                      sx={{ m: 2, width: "32ch" }}
                      label="Credit Card ID"
                      value={Option.id}
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
                    height="250"
                    image="img/car.PNG"
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
                        {Invice.map((row) => (
                          <TableRow
                            key={row.name}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                          >
                            <TableCell component="th" scope="row">
                              {row.name}
                            </TableCell>
                            <TableCell align="right">{row.cost}</TableCell>
                          </TableRow>
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
                        {Sum.map((row) => (
                          <TableRow
                            key={row.name}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                          >
                            <TableCell component="th" scope="row">
                              {row.name}
                            </TableCell>
                            <TableCell align="right">{row.cost}</TableCell>
                          </TableRow>
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
                    Click 'SUMMIT' to confirm your information <br/>or 'CANCEL' to cancel.
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
                      type="submit"
                      color="error"
                      sx={{width: "15ch" }}
                    >
                      CANCEL
                    </Button>

                    <Button
                      variant="contained"
                      type="submit"
                      color="success"
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