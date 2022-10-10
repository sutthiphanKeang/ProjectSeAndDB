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
import TextField from '@mui/material/TextField';
import { DialogContent } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import List from '@mui/material/List';

export default function Insurance(){
  
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

            
            <ListItem><Button color='success'  component="div" variant="contained" onClick={handleClickOpen1} startIcon={<AddIcon />}>Insert Insurance</Button>
                <Dialog open={open1} onClose={handleClickOpen1}>
                    <DialogTitle>Insert Insurance กรอกที่นี่</DialogTitle>
                    <DialogContent>
                        <TextField autoFocus margin="dense" id="Name" label="Insurance Name" fullWidth variant="standard"/>
                        <TextField autoFocus margin="dense" id="Class" label="Class of Insurance " fullWidth variant="standard"/>
                        <TextField autoFocus margin="dense" id="Detail" label="Insurance Detail" fullWidth variant="standard"/>
                        <TextField autoFocus margin="dense" id="ID" label="Insurance ID" fullWidth variant="standard"/>
                        <TextField autoFocus margin="dense" id="Price" label="Price of Insurance" fullWidth variant="standard"/>
                    </DialogContent>
                    <DialogActions>
          <Button color='error' variant="contained" onClick={handleClose1}>Cancel</Button>
          <Button color='success' variant="contained" onClick={handleClose1}>Insert</Button>
        </DialogActions>


                </Dialog></ListItem>

            <List
      sx={{
        width: '100%',
        maxWidth: '100%',
        bgcolor: 'background.paper',
        position: 'relative',
        overflow: 'auto',
        maxHeight: 500,
        background:'#e0e0e0',
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
          
        </Grid>
      </Grid>
      </Paper>
        
    </ListItem>)
    )}
    </List>
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
}
,
{
  Name: "วิริยะประกันภัย 3",
  class: 2,
  Detail: "ถูกและดี 3",
  id:123,
  Price: 30
},
{
  Name: "วิริยะประกันภัย 3",
  class: 2,
  Detail: "ถูกและดี 3",
  id:123,
  Price: 30
}
,
{
  Name: "วิริยะประกันภัย 3",
  class: 2,
  Detail: "ถูกและดี 3",
  id:123,
  Price: 30
}
]


