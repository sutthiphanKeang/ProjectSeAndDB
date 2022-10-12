import React, { Component } from 'react'
import Box from "@mui/material/Box";
import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css'

export default class FristHome extends Component {
  
  render() {
    const slideImages = [
      {
        url: 'img/DOG.jpg',
      },
      {
        url: 'img/dog1.jpg',
      }];
    return (
      <div className="slide-container">
        <Box sx={{mt:3}}>
          <Slide >
         {slideImages.map((slideImage, index)=> (
            <div className="each-slide" key={index}>
              <div style={{'backgroundImage': `url(${slideImage.url})`, height: 400}}>
              </div>
            </div>
          ))} 
        </Slide>
        </Box>
        
      </div>
    )
  }
}