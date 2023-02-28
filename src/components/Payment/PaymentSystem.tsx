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

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import ButtonGroup from '@mui/material/ButtonGroup';
import Button from '@mui/material/Button';

const PaymentSystem: React.FC = () => {
  const [Qr, setQr] = React.useState(true);
  const [Credit, setCredit] = React.useState(false);

  const handleChange = (e: React.ChangeEvent<{ value: unknown }>) => {
    const value = e.target.value as string;
    if(value === "0"){
      setQr(true);
      setCredit(false);
    }
    else{
      setCredit(true);
      setQr(false);
    }
  };

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
                Paymemt Option
              </InputLabel>
              <NativeSelect
                onChange={handleChange}
                defaultValue={0}
                inputProps={{
                  name: 'Paymemt Option',
                  id: 'uncontrolled-native',
                }}
              >
                <option value={0}>QR Code</option>
                <option value={1}>Credit Card</option>
              </NativeSelect>
            </FormControl>
        

            {/* part 2 */}
            {Qr && (<Card sx={{ maxWidth: 345 }}>
                <CardMedia
                  component="img"
                  
                  image="img/qr.JPG"
                  alt="QR code"
                />
            </Card>)}
            {Credit && (<Card sx={{ maxWidth: 345, height:478 }}>
              <CardContent>
                <Typography variant="h5" component="div" align="center">
                  <b>Credit Card Information</b>
                </Typography>
              </CardContent>
              <div>
              <TextField
                label="Name of Card"
                id="outlined-start-adornment"
                sx={{ m: 2, width: "32ch" }}

              />
              <TextField
                label="Credit Card ID"
                id="outlined-start-adornment"
                sx={{ m: 2, width: "32ch" }}
              />
            </div>
            <div>
              <TextField
                id="outlined-multiline-static"
                label="Expiration Date"
                sx={{ m: 2, width: "32ch" }}
                
              />
              <TextField
                id="outlined-multiline-static"
                label="CVV/CVC"
                sx={{ m: 2, width: "32ch" }}
                
              />
              <CardContent>
                <Typography variant="caption" component="div" align="center">
                  ***The company will not disclose your credit card information. Please check its validity.***
                </Typography>
              </CardContent>
            </div>
            <div></div>
            </Card>)}
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

            {Qr && (<Box
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
                    Click 'SUMMIT' to confirm payment <br/>or 'CANCEL' to cancel.
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
            </Box>)}

            {Credit && (<Box
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

            </Box>)}  
          </Stack>
          
        </Grid>
      </Grid>
    </Box>
  );
}
export default PaymentSystem;