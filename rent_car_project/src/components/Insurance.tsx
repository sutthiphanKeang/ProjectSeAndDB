import React, { Component } from 'react'
import ListItem from '@mui/material/ListItem';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import List from '@mui/material/List';

export default function Insurance(){
  
    const [open,setOpen] = React.useState(false);
    const handleClickOpen = () => {
      setOpen(true);};
    const handleClose = () => {
        setOpen(false);
      };
    const [open1,setOpen1] = React.useState(false);
      const handleClickOpen1 = () => {
        setOpen1(true);};
    const handleClose1 = () => {
          setOpen1(false);
        };

    return (

      <Stack direction="column" justifyContent="center"
      alignItems="center"
      spacing={1}>
            <ListItem><div><h1>เลือกประกันภัย</h1></div></ListItem>
            <List
      sx={{
        width: '100%',
        maxWidth: '100%',
        bgcolor: 'background.paper',
        position: 'relative',
        overflow: 'auto',
        maxHeight: 500,
        background:'#bcaaa4',
        '& ul': { padding: 0 },
      }}
      subheader={<li />}
    >
      {LISTDATA.map((item) => (
      <ListItem>  
        <Paper sx={{
        p: 2,
        margin: 'auto',
        maxWidth: 800,
        flexGrow: 1,
        backgroundColor: (theme) =>
          theme.palette.mode === 'dark' ? '#1A2027' : '#f5f5f5',
      }}
    >
      
      <Grid container spacing={2}>
        
        <Grid item xs={12} sm container>
          <Grid item xs container direction="column" spacing={2}>
            <Grid item xs>
              <Typography gutterBottom variant="subtitle1" component="div" color='#1a237e'>
                Name :  {item.Name}
              </Typography>
              <Typography gutterBottom variant="subtitle2" component="div">
                ประกันภัยชั้นที่ {item.class}
              </Typography>
              <Typography variant="body2" gutterBottom>
                - {item.Detail}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                ID : {item.id}
              </Typography>
            </Grid>
          </Grid>
          <Grid item>
            <Typography variant="subtitle1" component="div">
              {item.Price} บาท
            </Typography>
          </Grid>
          <Grid item>
            <Button color="success" component="div" variant="contained" onClick={handleClickOpen} sx={{ml:1}} >
              Book
            </Button>
            <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Confirm to book this insurance?"}
        </DialogTitle>
        
        <DialogActions>
          <Button color='primary' variant='outlined' onClick={handleClose}>Cancel</Button>
          <Button color='primary' variant='contained' onClick={handleClose} autoFocus>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
          </Grid>
        </Grid>
      </Grid>
      </Paper>
       
    </ListItem>)
    )}
     </List>
     <ListItem><h2 color='error'>ไม่เลือก กรุณากดข้าม</h2>
     <Button color="error" component="div" variant="contained" onClick={handleClickOpen1} sx={{ml:1}}>ข้าม</Button></ListItem>
     <Dialog
        open={open1}
        onClose={handleClose1}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Confirm skip to book insurance?"}
        </DialogTitle>
        
        <DialogActions>
          <Button color='primary' variant='outlined' onClick={handleClose1}>Cancel</Button>
          <Button color='primary' variant='contained' onClick={handleClose1} autoFocus>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </Stack>
    )
}

const LISTDATA = [
{
  Name: "วิริยะประกันภัย",
  class: 1,
  Detail: "ถูกและดี",
  id:147,
  Price: 19
},
{
  Name: "วิริยะประกันภัย 2",
  class: 3,
  Detail: "ถูกและดี 2",
  id:456,
  Price: 30
},
{
  Name: "วิริยะประกันภัย 3",
  class: 2,
  Detail: "ถูกและดี 3",
  id:123,
  Price: 30
},
{
  Name: "วิริยะประกันภัย 2",
  class: 3,
  Detail: "ถูกและดี 2",
  id:456,
  Price: 30
},
{
  Name: "วิริยะประกันภัย 3",
  class: 2,
  Detail: "ถูกและดี 3",
  id:123,
  Price: 30
},
{
  Name: "วิริยะประกันภัย 2",
  class: 3,
  Detail: "ถูกและดี 2",
  id:456,
  Price: 30
},
{
  Name: "วิริยะประกันภัย 3",
  class: 2,
  Detail: "ถูกและดี 3",
  id:123,
  Price: 30
}
]
