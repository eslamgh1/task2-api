import React, { useEffect, useState } from "react";
import style from "./Home.module.css";
import axios from "axios";

import LoaderScreen from "../LoaderScreen/LoaderScreen";
import HomeSlider from "../HomeSlider/HomeSlider";

import CategoriesSlider from "../../components/CategoriesSlider/CategoriesSlider";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";



export default function Home() {
  // const [allProducts, setAllProducts] = useState(null);

  // async function getAllProducts() {
  //   // axios return promise " as response" as like fetch so i will use then&catch to handle errors
  //   axios
  //     .get("https://ecommerce.routemisr.com/api/v1/products", {
  //       params: {
  //         sort: "price",
  //       },
  //     })

  //     .then(function (response) {
  //       console.log("Home getAllProducts :", response.data.data);

  //       setAllProducts(response.data.data);
  //       console.log("there my state :", response.data.data);
  //     })

  //     // catch is handling all errors but catch of fetch is working onky with network erro.
  //     .catch(function (error) {
  //       console.log("Not right : ", error);
  //     });
  // }

  // // why use effect [[[UX & API journy=> 1st UI --> 2nd API---]]]
  // useEffect(() => {
  //   getAllProducts();
  // }, []);

  function getAllProducts(){
    return axios.get('https://ecommerce.routemisr.com/api/v1/products');
  }

const {data, isLoading , isError , error , isFetching ,refetch} =  useQuery({
    queryKey:['productDetails'],
    queryFn:getAllProducts,
    // enabled:false,
    
  })


  console.log('useQuery data',data )
  console.log('useQuery error', error)
  console.log('useQuery isFetching',isFetching  )
  console.log('useQuery isLoading',isLoading  )

  const allProducts = data?.data.data

if ( isLoading ){
  return <LoaderScreen />;
}

if (isError){
  return <h2> Error From Home page</h2>
}

  return (
    <>
      {/* 1st container mx-auto = container of bootstrap */}
      <div className="container mx-auto p-5">

        <div className="flex flex-col gap-5">
      {/* <button onClick={refetch} className="bg-blue-600 border width w-3/4"> Get Products</button> */}  
          <HomeSlider />
          <CategoriesSlider />

          <div className="grid gap-2 md:grid-cols-3 md:gap-5 lg:grid-cols-6 ">
            {/* 3rd Div Card for IMG */}

            {allProducts?.map((product) => (
              <Link
                key={product._id}
                className="bg-blue-300 rounded-sm border border-red-100"
              >
                <img
                  src={product.imageCover}
                  alt={product.title}
                  className="w-full"
                />
                <h3>{product.title.split(" ").slice(0, 2).join(" ")}</h3>
                <h2>{product.category.name}</h2>

                <div className="flex justify-between items-center">
                  <p>{product.ratingsAverage}</p>

                  <div className="">
                    {product.priceAfterDiscount ? (
                      <>
                        <p>{product.priceAfterDiscount}</p>
                        <p className="line-through text-red-600">
                          {product.price}
                        </p>
                      </>
                    ) : (
                      <p>{product.price}</p>
                    )}
                  </div>
                </div>
              </Link>
            ))}
          </div>

        </div>

      </div>
    </>
  );
}
