import React, { Component } from 'react'
import Box from "@mui/material/Box";
import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css'

export default class FristHome extends Component {
  
  render() {
    const slideImages = [
      {
        url: 'img/Car1.jpg',
        caption: 'Slide 1'
      },
      {
        url: 'img/dog1.jpg',
        caption: 'Slide 2'
      }];
    return (
      <div className="slide-container">
        <Slide >
         {slideImages.map((slideImage, index)=> (
            <div className="each-slide" key={index}>
              <div style={{'backgroundImage': `url(${slideImage.url})`, height: 600}}>

              </div>
            </div>
          ))} 
        </Slide>
      </div>
    )
  }
}
