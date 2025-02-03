import axios from "axios";
import React, { createContext, useContext } from "react";

import {authContext} from "./AuthContext";

// this 1st : const cartContext= createContext();
export const cartContext = createContext();

/*  this 2nd : wrap by <cartContext.Provider> */

export default function CartContext({ children }) {
  const { userToken } = useContext(authContext);

  function addProductToCart(id) {
    axios.post(
      "https://ecommerce.routemisr.com/api/v1/cart",
      {
        productId: id,
      },
      {
        headers: {
          token: userToken,
        },
      }
    )
    .then(function(res){
console.log("ress",res.data.data)
console.log("ress",res.data)
console.log("ress",res.data)
    })
    .catch(function(err){
      console.log("errr",err)
    })
  }

  return (
    <cartContext.Provider value={{
      addProductToCart,
    }}>
      <div>
        {children}

        <h1> 2nd Context -Cart Context</h1>
      </div>
    </cartContext.Provider>
  );
}
