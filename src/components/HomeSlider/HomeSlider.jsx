import style from "./HomeSlider.module.css";
import React from "react";
import Slider from "react-slick";


import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import img1 from "../../assets/Images/grocery-banner.png";
import img2 from "../../assets/Images/grocery-banner-2.jpeg";
import img3 from "../../assets/Images/banner-4.jpeg";
import img4 from "../../assets/Images/slider-image-1.jpeg";
import img5 from "../../assets/Images/slider-image-1.jpeg";
import img6 from "../../assets/Images/slider-image-2.jpeg";



export default function HomeSlider() {
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
<div className="flex px-5 pb-20">

  <div className="w-3/4">
  <Slider {...settings}>
      <div>
        <img src={img1} alt={"pic1"} className="w-full h-72" />
      </div>

      <div>
        <img src={img2} alt={"pic2"} className="w-full h-72" />
      </div>

      <div>
        <img src={img3} alt={"pic2"} className="w-full h-72" />
      </div>

      <div>
        <img src={img4} alt={"pic2"} className="w-full h-72" />
      </div>

      <div>
        <img src={img1} alt={"pic5"} className="w-full h-72" />
      </div>

      <div>
        <img src={img1} alt={"pic6"} className="w-full h-72" />
      </div>
    </Slider>
  </div>

  <div className="w-1/4">
    <img src={img5} className="w-full h-32 block" alt="img5" />
    <img src={img6} className="w-full h-32 block" alt="img6" />
  </div>





</div>
  );
}
