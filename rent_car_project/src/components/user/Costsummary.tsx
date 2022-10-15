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
import Stack from '@mui/material/Stack';

export default function Costsummary() {
  return (
    <div>
      {/* เเสดงหัวข้อ */}
      <div className='head'>
      <Box sx={{ width: '100%', maxWidth: 500,marginTop:3, marginLeft:'15%'}}>
        <Typography variant="h5" gutterBottom>
        สรุปราคาใช้จ่าย
        </Typography>
      </Box>
      </div>
      
    {/* เเสดงรูปภาพรถที่จอง */}
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        <Grid item xs={7} className='image'>
          <ImageList sx={{ width: '130%', height: '90%',marginLeft:'20%'}} >
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
        
        {/* รายละเอียดรถที่จอง */}
        <Grid item xs={5} className='card1'>
        <Card sx={{ minWidth: '50%' ,minHeight:'50%',backgroundColor:'#CACFD2',borderRadius: '10px',marginRight:'30%',marginTop:'5%',marginLeft:'-20%' }}>
        <CardContent>
        <Typography sx={{ fontSize: 18 }} color="text.secondary" gutterBottom>
          Vehicle ID :
        </Typography>
        <Typography sx={{ fontSize: 18 }} color="text.secondary" gutterBottom>
          Name :
        </Typography>
        <Typography sx={{ fontSize: 18 }} color="text.secondary" gutterBottom>
          Brand :
        </Typography>
        <Typography sx={{ fontSize: 18 }} color="text.secondary" gutterBottom>
          Year :
        </Typography>
        <Typography sx={{ fontSize: 18 }} color="text.secondary" gutterBottom>
          Cost :
        </Typography>
        <Typography sx={{ fontSize: 18 }} color="text.secondary" gutterBottom>
          Type_ID :
        </Typography>
        <Typography sx={{ fontSize: 18 }} color="text.secondary" gutterBottom>
          Description :
        </Typography>
      </CardContent>
      </Card>
        </Grid>
        
        {/* สรุปค่าใช้จ่าย */}
        <Grid item xs={5} className='card2'>
        <Card sx={{ minWidth: '40%' ,minHeight:'50%',backgroundColor:'#7DCEA0',borderRadius: '10px',marginLeft:'30%',marginTop:'-3%' }}>
        <CardContent>
        <Typography sx={{ fontSize: 18 }} color="text.secondary" gutterBottom>
          ค่าเช่ารถ :
        </Typography>
        <Typography sx={{ fontSize: 18 }} color="text.secondary" gutterBottom>
          ค่าประกัน :
        </Typography>
        <Typography sx={{ fontSize: 18 }} color="text.secondary" gutterBottom>
          รวม :
        </Typography>
      </CardContent>
      </Card>
        </Grid>
        
        {/* ปุ่มยืนยัน */}
        <Grid item xs={2} className='card3'>
        <Stack spacing={2} direction="row" marginLeft={'150%'} marginTop={'20%'}>
        <Button variant="contained" >Submit</Button>
        </Stack>
        </Grid>
        </Grid>
        
        </Box>
    </div>
  );
}

const itemData = [
  {
    img: 'https://images.unsplash.com/photo-1589118949245-7d38baf380d6',
    title: 'Bike',
  }]