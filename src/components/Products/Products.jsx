import React, { useState } from 'react'
import style from './Products.module.css'
import { useContext } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

import LoaderScreen from "../LoaderScreen/LoaderScreen";

import SearchBar from "../../components/SearchBar/SearchBar";

import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { cartContext } from "../../context/CartContext";



export default function Products() {
  const { addProductToCart } = useContext(cartContext);

  async function handleAddProductToCart(id) {
    const res = await addProductToCart(id);

    if (res) {
      toast.success("Product is Added to cart ", {
        duration: 3000,
        position: "top-center",
      });
    } else {
      toast.error("Error during adding to cart", {
        duration: 3000,
        position: "top-center",
      });
    }
  }

  function getAllProducts() {
    return axios.get("https://ecommerce.routemisr.com/api/v1/products");
  }

  const { data, isLoading, isError, error, isFetching } = useQuery({
    queryKey: ["allProducts"],
    queryFn: getAllProducts,
    // enabled:false,
  });

  const allProducts = data?.data.data;

  if (isLoading) {
    return <LoaderScreen />;
  }

  if (isError) {
    return <h2> Error From Home page</h2>;
  }
  

  return (
    <>
      {/* 1st container mx-auto = container of bootstrap */}
      <div className="container mx-auto p-5">
        <div className="flex flex-col gap-5">
          {/* <button onClick={refetch} className="bg-blue-600 border width w-3/4"> Get Products</button> */}

          <SearchBar />

          

          <div className="grid gap-2 md:grid-cols-2 md:gap-5 lg:grid-cols-5">
            {/* 3rd Div Card for IMG */}

            {allProducts?.map((product) => (
              <Link
                to={`/productdetails/${product._id}`}
                key={product._id}
                className="rounded-sm border border-red-100 relative  overflow-hidden group shadow-xl hover:shadow-green-500"
              >
                <img
                  src={product.imageCover}
                  alt={product.title}
                  className="w-full"
                />
                <h2 className="text-green-500 px-3">{product.category.name}</h2>
                <h3 className="px-3">
                  {product.title.split(" ").slice(0, 2).join(" ")}
                </h3>

                <div className="flex justify-between items-center px-3">
                  <div className="">
                    {product.priceAfterDiscount ? (
                      <>
                        <p>{product.priceAfterDiscount} EGP</p>
                        <p className="line-through text-red-600">
                          {product.price} EGP
                        </p>
                      </>
                    ) : (
                      <p>{product.price} EGP</p>
                    )}
                  </div>
                  <div className="flex justify-center items-center">
                    <i className="text-amber-500 fa-solid fa-star"></i>
                    <p>{product.ratingsAverage}</p>
                  </div>
                </div>
                <div className="grid place-items-end pb-10 md:pb-20 xl:pb-10">
                  <i className="fa-solid fa-heart px-3"></i>
                </div>
                <div className="absolute bottom-0 left-[30%] translate-y-[100%]">
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      handleAddProductToCart(product._id);
                    }}
                    type="button"
                    className="group-hover:translate-y-[-130%] transition-all duration-500 text-gray-900 bg-gradient-to-r from-lime-200 via-lime-400 to-lime-500 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-lime-300 dark:focus:ring-lime-800 font-medium rounded-lg text-md px-5 py-2.5 text-center me-2 mb-2"
                  >
                    +Add
                  </button>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  );


}


