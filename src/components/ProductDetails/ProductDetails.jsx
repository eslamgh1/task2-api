import { useQuery } from "@tanstack/react-query";
import style from "./ProductDetails.module.css";
import { useParams } from "react-router-dom";
import LoaderScreen from "../LoaderScreen/LoaderScreen";
import axios from "axios";
import { useContext } from "react";
import { cartContext } from "../../context/CartContext";
import toast, { Toaster } from "react-hot-toast";




export default function ProductDetails() {
  const { id } = useParams();
  const { addProductToCart } = useContext(cartContext);

  async function handleAddProductToCart() {
    const res = await addProductToCart(id);
    if (res) {
      console.log("sucess");
      toast.success("sucess",{duration:3000 , position:"top-center"})
  
    } else {
      console.log("Try again");
      toast.error("error",{duration:3000 , position:"top-center"})
    
    }
  }

  //call API of products-details
  function getProductDetails() {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`);
  }

  const { data, isError, isLoading } = useQuery({
    queryKey: ["productDetails", id],
    queryFn: getProductDetails,
  });

  // console.log('Data test1:',data )

  const productDetailsObj = data?.data.data;
  // console.log('Data test2:',productDetailsObj )

  if (isError) {
    return <h1> Product is not found</h1>;
  }

  if (isLoading) {
    return (
      <span>
        {" "}
        <LoaderScreen />{" "}
      </span>
    );
  }

  return (
    <>
      <div className="container mx-auto">
        <h1>Product Details </h1>
        <div className="grid sm:grid-cols-4 gap-3">
          <div className="col-span-1">
            <img
              className="w-full"
              src={productDetailsObj.imageCover}
              alt="title"
            />
          </div>
          <div className="col-span-3">
            <h1>title {productDetailsObj.title}</h1>
            <p>description {productDetailsObj.description}</p>
            <h3>price: {productDetailsObj.price}</h3>
            <h3>quantity: {productDetailsObj.quantity}</h3>
            <button
              onClick={handleAddProductToCart}
              className="bg-green-500 w-full rounded my-3 font-bold"
            >
              {" "}
              Add to cart +
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
