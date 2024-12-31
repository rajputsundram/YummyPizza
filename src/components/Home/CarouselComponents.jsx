import React from 'react'
// import Image from 'next/image';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";

const CarouselComponents = () => {
  const images=['https://www.foodiesfeed.com/wp-content/uploads/2023/06/burger-with-melted-cheese.jpg','https://img.freepik.com/free-photo/top-view-table-full-delicious-food-composition_23-2149141352.jpg?size=626&ext=jpg&ga=GA1.1.2008272138.1726617600&semt=ais_hybrid','https://cdn.pixabay.com/photo/2020/05/17/04/22/pizza-5179939_640.jpg','https://images.unsplash.com/photo-1513104890138-7c749659a591?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxleHBsb3JlLWZlZWR8MXx8fGVufDB8fHx8fA%3D%3D','https://hips.hearstapps.com/hmg-prod/images/classic-cheese-pizza-recipe-2-64429a0cb408b.jpg']
  return (
   <Carousel
     autoPlay
      infiniteLoop 
      emulateTouch
      showThumbs={false}
      axis='horizontal'
      showStatus={false}>

        {
        images.map((imglink,index)=>{
          return(
            <>
<div key={index} className='flex items-center justify-center brightness-50 w-full' style={{ maxHeight: "36rem", overflow: "hidden" }}>
  <img src={imglink} alt="pizza" className="max-w-full max-h-full" />
</div>

</>
          )
        })
        }



   </Carousel>
  )
}

export default CarouselComponents
