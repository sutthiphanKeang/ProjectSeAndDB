import React, { Component, useEffect ,useState  } from "react";
import Stack from '@mui/material/Stack';
import ListItem from '@mui/material/ListItem';
import { Button, DialogContent } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import EditIcon from '@mui/icons-material/Edit';
import List from '@mui/material/List';

export default function ManageIN(){
  const [data2, setData] = useState<any[]>([]);
  useEffect(() => {
    fetch("https://carleasing.azurewebsites.net/insurance/admin")
      .then((response) => response.json())
      .then((data) => {
        setData(data);
        
      });
  }, []);  
  
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

    const [open2,setOpen2] = React.useState(false);
    const handleClickOpen2 = () => {
        setOpen2(true);};
        const handleClose2 = () => {
          setOpen2(false);
        };
    
    return (

        
          <Stack direction="column" justifyContent="center"
        alignItems="center"
        spacing={1}>
            
            
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
            {data2.map((item) => (
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
                Name :  
              </Typography>
              <Typography gutterBottom variant="subtitle2" component="div">
                ประกันภัยชั้นที่ 
              </Typography>
              <Typography variant="body2" gutterBottom>
                - 
              </Typography>
              <Typography variant="body2" color="text.secondary">
                ID : 
              </Typography>
            </Grid>
          </Grid>
          <Grid item>
            <Typography variant="subtitle1" component="div">
               บาท
            </Typography>
          </Grid>
          <Grid item>
          
          <Button component="div" color='primary' variant="contained" onClick={handleClickOpen2} startIcon={<EditIcon />} sx={{ml:1}}>Edit</Button>
            <Dialog open={open2} onClose={handleClickOpen2}>
                    <DialogTitle> Edit Insurance กรอกที่นี่</DialogTitle>
                    <DialogContent>
                        <TextField autoFocus margin="dense" id="Name" label="Insurance Name" fullWidth variant="standard"/>
                        <TextField autoFocus margin="dense" id="Class" label="Class of Insurance " fullWidth variant="standard"/>
                        <TextField autoFocus margin="dense" id="Detail" label="Insurance Detail" fullWidth variant="standard"/>
                        <TextField autoFocus margin="dense" id="ID" label="Insurance ID" fullWidth variant="standard"/>
                        <TextField autoFocus margin="dense" id="Price" label="Price of Insurance" fullWidth variant="standard"/>
                    </DialogContent>
                    <DialogActions>
          <Button color='primary' variant='outlined'  onClick={handleClose2}>Cancel</Button>
          <Button color='primary' variant='contained' onClick={handleClose2}>Edit</Button>
        </DialogActions>
                </Dialog>
    
            <Button component="div" color='error' variant="contained" onClick={handleClickOpen} startIcon={<DeleteIcon />}
            sx={{ml:1}}>
              Delete
            </Button>
            <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Confirm to delete this insurance?"}
        </DialogTitle>
        
        <DialogActions>
          <Button color='primary' variant='outlined' onClick={handleClose}>Cancel</Button>
          <Button color='primary' variant='contained'onClick={handleClose} autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
          </Grid>
        </Grid>
      </Grid>
      </Paper>
            </ListItem>))}
            </List>
        </Stack>  
        
        
        
    )
  
}

