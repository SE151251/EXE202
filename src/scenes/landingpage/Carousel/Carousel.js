import React from 'react'
import Carousel from 'react-material-ui-carousel'
import Item from "./Item"
import slider from "../Carousel/helper/slider.json"
function Carousels() {
  return (
    <Carousel sx={{ margin: "auto", border: "none"}}>
       {
        slider.map( item => <Item key={item.id} item={item}/>)
       }
    </Carousel>
  )
}

export default Carousels;

