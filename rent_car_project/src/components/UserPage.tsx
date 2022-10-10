import React, { Component } from 'react'
import Stack from '@mui/material/Stack';
import ListItem from '@mui/material/ListItem';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import EditIcon from '@mui/icons-material/Edit';
import { experimentalStyled as styled } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import { Button, DialogContent } from '@mui/material';
import Box from '@mui/material/Box';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#eeeeee',
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

export default function UserPage(){
  const [open,setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);};
  const handleClose = () => {
      setOpen(false);
    };
    



    return (
      <Stack direction="column" 
      justifyContent="center"
        alignItems="center"
        spacing={2}>
            
      <ListItem>
            <Paper sx={{
        p: 2,
        margin: 'auto',
        maxWidth: 800,
        flexGrow: 1,
        backgroundColor: (theme) =>
          theme.palette.mode === 'dark' ? '#1A2027' : '#eeeeee',
      }}
    >
      
      <Grid container spacing={2}>
        
        <Grid item xs={12} sm container>
          <Grid item xs container direction="column" spacing={2}>
            <Grid item xs>
              <Typography gutterBottom variant="subtitle1" component="div" color='#1a237e'>
                <h1> User Information </h1>
              </Typography>
              <Typography gutterBottom variant="subtitle2" component="div">
                <h2>Firstname : </h2>
              </Typography>
              <Typography variant="subtitle2" gutterBottom>
                <h2>Lastname : </h2>
              </Typography>
              <Typography variant="subtitle2" color="text.secondary">
                <h2>User ID : </h2>
              </Typography>
              <Typography variant="subtitle2" color="text.secondary">
                <h2>Phone number : </h2>
              </Typography>
            </Grid>
            <Grid item>
            <Button component="div" color='primary' variant="contained" onClick={handleClickOpen} startIcon={<EditIcon />} sx={{ml:1}}>Edit</Button>
            <Dialog open={open} onClose={handleClickOpen}>
                    <DialogTitle> แก้ไขข้อมูลส่วนตัว กรอกที่นี่</DialogTitle>
                    <DialogContent>
                        <TextField autoFocus margin="dense" id="Firstname" label="Firstname" fullWidth variant="standard"/>
                        <TextField autoFocus margin="dense" id="Lastname" label="Lastname" fullWidth variant="standard"/>
                        <TextField autoFocus margin="dense" id="Phone" label="Phone number" fullWidth variant="standard"/>
                        
                        
                    </DialogContent>
                    <DialogActions>
          <Button color='primary' variant='outlined'  onClick={handleClose}>Cancel</Button>
          <Button color='primary' variant='contained' onClick={handleClose}>Edit</Button>
        </DialogActions>
                </Dialog>
          </Grid>
          
          <Grid item>
          </Grid>
        </Grid>
      </Grid></Grid>
      </Paper>
      </ListItem>



            <ListItem>
              
              <Grid sx={{ flexGrow: 1 }} spacing={3} container direction="row" justifyContent="center" alignItems= "center"  >
                <Grid item md={4.5} columnSpacing={2}>
                  <Item > <Typography variant="subtitle2" color='#bf360c'>
                <h1>Notify</h1></Typography>
                <Typography variant="subtitle2" color='#212121'>
                <h2>เหลือเวลาในการคืนรถในอีก   วัน</h2></Typography>
                  
                  <p></p></Item>
                  
                  
                </Grid>
                <Grid item md={4.5} columnSpacing={2}>
                  <Item><Typography variant="subtitle2" color='#212121'>
                <h2>ติดต่อ-สอบถาม</h2>
                <p>เบอร์โทร : 080-000-0000</p>
                <p>FB : CMU car reservation</p></Typography></Item>
                  
                </Grid>
            
            
          </Grid>
            </ListItem>
        </Stack>  
  )
  
}