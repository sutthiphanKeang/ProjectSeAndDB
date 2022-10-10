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




const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

export default function Additional() {
  return (
    <div>
      <div className='head'>
      <Box sx={{ width: '100%', maxWidth: 500,marginTop:3, }}>
        <Typography variant="h5" gutterBottom>
        ค่าใช้จ่ายเพิ่มเติม
        </Typography>
      </Box>
      </div>
      
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        <Grid item xs={7} className='image'>
          <ImageList sx={{ width: '130%', height: '140%',marginLeft:'10%'}} >
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

        <Grid item xs={5} className='card1'>
        <Card sx={{ minWidth: '50%' ,minHeight:'50%',backgroundColor:'#7DCEA0',borderRadius: '10px',marginRight:'15%',marginTop:'5%',marginLeft:'-10%' }}>
        <CardContent>
        <Typography sx={{ fontSize: 16 }} color="text.secondary" gutterBottom>
          Word of the Day
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          adjective
        </Typography>
      </CardContent>
      </Card>
        </Grid>

        <Grid item xs={5} className='card2'>
        <Card sx={{ minWidth: '0%' ,minHeight:'0%'}}> </Card>
        </Grid>

        <Grid item xs={6} className='card3'>
        <Card sx={{ minWidth: '50%' ,minHeight:'50%',backgroundColor:'#CACFD2',borderRadius: '10px',marginLeft:'28%',marginRight:'30%',marginTop:'-10%' }}>
        <CardContent>
        <Typography sx={{ fontSize: 16 }} color="text.secondary" gutterBottom>
          Word of the Day
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          adjective
        </Typography>
      </CardContent>
      </Card>
        </Grid>
      </Grid>
    </Box>

    <Stack direction="row" alignItems="center" spacing={2} marginLeft='85%' marginTop={'-7%'}>
      <Button variant="contained" component="label">
        Upload
        <input hidden accept="image/*" multiple type="file" />
      </Button>
    </Stack>
    </div>
  );
}

const itemData = [
  {
    img: 'https://images.unsplash.com/photo-1589118949245-7d38baf380d6',
    title: 'Bike',
  }]