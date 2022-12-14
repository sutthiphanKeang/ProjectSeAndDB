import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import DeleteIcon from '@mui/icons-material/Delete';
import SendIcon from '@mui/icons-material/Send';

export default function Additional() {
  return (
    <div>
      {/* เเสดงหัวข้อ */}
      <div className='head'> 
      <Box sx={{ width: '100%', maxWidth: 500,marginTop:3,marginLeft:'15%' }}>
        <Typography variant="h5" gutterBottom>
        ค่าใช้จ่ายเพิ่มเติม
        </Typography>
      </Box>
      </div>
      
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        {/* เเสดง QR code */}
        <Grid item xs={7} className='image'>
        <ImageList sx={{ width: '80%', height: '100%',marginLeft:'24%'}} >
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
        
        {/* เเสดงรายละเอียดค่าปรับ */}
        <Grid item xs={5} className='card1'>
        <Card sx={{ minWidth: '50%' ,minHeight:'50%',backgroundColor:'#7DCEA0',borderRadius: '10px',marginRight:'50%',marginTop:'3%',marginLeft:'-46%' }}>
        <CardContent>
        <Typography sx={{ fontSize: 18 }} color="text.secondary" gutterBottom>
          รายละเอียดค่าปรับ
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          
        </Typography>
      </CardContent>
      </Card>
        </Grid>
        
        {/* กล่องว่างเพื่อจัดหน้า */}
        <Grid item xs={5} className='card2'>
        <Card sx={{ minWidth: '0%' ,minHeight:'0%'}}> </Card>
        </Grid>
        
        {/* สรุปราคาค่าปรับ */}
        <Grid item xs={6} className='card3'>
        <Card sx={{ minWidth: '50%' ,minHeight:'50%',backgroundColor:'#CACFD2',borderRadius: '10px',marginLeft:'-4%',marginRight:'50%',marginTop:'-28%' }}>
        <CardContent>
        <Typography sx={{ fontSize: 16 }} color="text.secondary" gutterBottom>
          สรุปราคา
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          
        </Typography>
      </CardContent>
      </Card>
        </Grid>
      </Grid>
    </Box>

    {/* ปุ่มอัพโหลดสลิป */}
    <Stack direction="row" alignItems="center" spacing={2} marginLeft='40%' marginTop={'-3%'}>
      <Button variant="contained" component="label">
        Upload
        <input hidden accept="image/*" multiple type="file" />
      </Button>
    </Stack>
    {/* ปุ่มส่งสลิป */}
    <Stack direction="row" spacing={2}marginLeft='50%' marginTop={'-3%'}>
      <Button variant="contained" endIcon={<SendIcon />}>
        Send
      </Button>
    </Stack>
    </div>
  );
}

// รูป qr code
const itemData = [
  {
    img: 'img/qr.jpg',
    title: 'Bike',
  }]