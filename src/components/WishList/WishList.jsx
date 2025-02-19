import style from './WishList.module.css'
import React, { useContext, useEffect, useState } from "react";
import LoaderScreen from "../LoaderScreen/LoaderScreen";
import axios from "axios";
import toast from "react-hot-toast";
import { cartContext } from "../../context/CartContext";
import { authContext } from "../../context/AuthContext";


export default function WishList() {

  const { userToken } = useContext(authContext);
  const {getWishList,productsWishList,removeItemWishList} = useContext(cartContext);

  console.log("productsWishList:",productsWishList);


  
  async function handleRemoveItemWishList(id) {
    const isSuccess = await removeItemWishList(id);

    // isSuccess ? toast.success("Product is removed") : toast.error("Error during remove operation, Try again")

    if (isSuccess) {
      toast.success("Product-Wish is removed");
    } else {
      toast.error("Error during remove Product-Wish, Try again");
    }
    getWishList();
  }




    useEffect(() => {
      if (userToken) {
        getWishList();
      }
    }, [userToken]);
  

    


  return <>
      
      <>
      <h1 className="text-4xl font-bold pb-5 text-green-400">My wish List </h1>
      <h2 className="text-xl font-semibold pb-3"> <span className="text-green-400"></span></h2>

      <div className="container mx-auto p-5">
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
  
            </thead>
            <tbody>
              {productsWishList.map((product) => (
                <tr
                  key={product.id}
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600"
                >
                  <td className="p-4">
                    <img
                      src={product.imageCover}
                      className="w-16 md:w-32 max-w-full max-h-full"
                      alt={""}
                    />
                  </td>
                  <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                    {product.title}
                  </td>

                  <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                    {product.price} EGP
                  </td>
                  <td className="px-6 py-4">
                    <a
                      onClick={() =>
                        handleRemoveItemWishList(product.id)
                      }
                      className="no-underline  cursor-pointer font-medium text-red-600 dark:text-red-500 hover:text-red-800 "
                    >
                      Remove <i className="fa-solid fa-trash px-1"></i>
                      
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
  
      <div className="flex justify-center items-center">


      </div>
        </div>
      </div>
    </>

  </>
}

