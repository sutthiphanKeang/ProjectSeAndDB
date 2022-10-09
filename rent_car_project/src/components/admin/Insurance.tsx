import React, { Component } from 'react'
import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import { Avatar, ListItemAvatar } from '@mui/material';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import './cssNine/style1.css'
import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';


export default class Insurance extends Component {
  render() {
    return (
      
      <Stack direction="column" justifyContent="center"
      alignItems="center"
      spacing={1}>

            <div className='top1'>
              <h1>ประกันรถยนต์</h1>
            </div>
        

        <ListItem>
          <Box
          sx={{
            display: 'inline',
            p:12,m:2,
            width: 300,
            height: 250,
            backgroundColor: '#cddc39',
            '&:hover': {
          backgroundColor: '#d4e157',
            opacity: [0.9, 0.8, 0.7],
              },
          }}
          > <Button>
            <ListItemText primary="ประกันภัย #1" secondary="ประกันอุบัติเหตุ" >
            </ListItemText>

            </Button>
          </Box>

          <Box
          sx={{
            display: 'inline',
            p:12,m:2,
            width: 300,
            height: 250,
            backgroundColor: '#8bc34a',
              '&:hover': {
            backgroundColor: '#9ccc65',
            opacity: [0.9, 0.8, 0.7],
              },
          }}
          > <Button>
            <ListItemText primary="ประกันภัย #2" secondary="ประกันอุบัติเหตุ" >
            </ListItemText>

            </Button>
          </Box>
          <Box
          sx={{
            display: 'inline',
            p:12,m:2,
            width: 300,
            height: 250,
            backgroundColor: "#4caf50",
              '&:hover': {
            backgroundColor: '#66bb6a',
            opacity: [0.9, 0.8, 0.7],
              },
          }}
          > <Button>
            <ListItemText primary="ประกันภัย #3" secondary="ประกันอุบัติเหตุ" >
            </ListItemText>

            </Button>
          </Box>
        </ListItem>
        
        
        
        

        
          
          <div><ButtonGroup variant="contained" aria-label="outlined primary button group">
            <Button>ประกันภัย #1</Button>
            <Button>ประกันภัย #2</Button>
            <Button>ประกันภัย #3</Button>
          </ButtonGroup></div>
          
      </Stack>
    )
  }
}