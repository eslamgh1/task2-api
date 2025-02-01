import style from "./CategoriesSlider.module.css";
import React, { useEffect, useState } from "react";
import Slider from "react-slick";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";

import useCategories from '../../assets/customHooks/useCategories'
export default function CategoriesSlider() {
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 2,
  };

  // const [allCategories, setAllCategories] = useState(null)


  // function getAllCategories(){

  //   axios.get("https://ecommerce.routemisr.com/api/v1/categories")
  //   .then(function(response){
  //     console.log(response.data.data ,"categories res:")
  //     setAllCategories(response.data.data)
  //   })
  //   .catch(function(error){
  //     console.log(error)
  //   })

  // }

  // useEffect(() => {
  //   getAllCategories()
  // }, []);

  // function getAllCategories() {
  //   return axios.get("https://ecommerce.routemisr.com/api/v1/categories");
  // }

  // const { data, isLoading } = useQuery({
  //   queryKey: ["getAllCategories"],
  //   queryFn: getAllCategories,
  // });

  // const allCategories = data?.data.data;
  // console.log("getAllCategories data", allCategories);

const { data , isLoading} = useCategories();
const allCategories = data?.data.data;

  return (
<div className="flex px-5 pb-20">



  <div className="w-3/4">
  <Slider {...settings}>

    { allCategories?.map( category => <div key={category._id }>
        <img src={category.image} alt={category.name} className="w-full h-72" />
          <h2> {category.name} </h2>
      </div> )}

      {/* <div>
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
      </div> */}
    </Slider>
  </div>


</div>
  );
}
