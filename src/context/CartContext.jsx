import axios from "axios";
import React, { createContext, useContext, useEffect, useState } from "react";
import { authContext } from "./AuthContext";

// this 1st : const cartContext= createContext();
export const cartContext = createContext();

/*  this 2nd : wrap by <cartContext.Provider> */

export default function CartContext({ children }) {
  const { userToken } = useContext(authContext);

  const [numOfCartItems, setNumOfCartItems] = useState(0);
  const [totalCartPrice, setTotalCartPrice] = useState(0);
  const [products, setProducts] = useState(null);

  async function addProductToCart(id) {
    const res = await axios
      .post(
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
      .then(function (res) {
        console.log("cart1", res.data.numOfCartItems);
        console.log("cart2", res.data.data.totalCartPrice);
        console.log("cart3", res.data.data.products);

        // setNumOfCartItems(res.data.numOfCartItems);
        // setTotalCartPrice(res.data.data.totalCartPrice);
        // setProducts(res.data.data.products);
        getUserCart();
        return true;
      })
      .catch(function (err) {
        console.log("errr", err);

        return false;
      });
    return res;
  }

  function getUserCart() {
    axios
      .get("https://ecommerce.routemisr.com/api/v1/cart", {
        headers: {
          token: userToken,
        },
      })
      .then(function (result) {
        console.log("cartsucess::::", result.data.numOfCartItems);
        console.log("cartsucess::::", result.data.data.totalCartPrice);
        console.log("cartsucess::::", result.data.data.products);

        setNumOfCartItems(result.data.numOfCartItems);
        setTotalCartPrice(result.data.data.totalCartPrice);
        setProducts(result.data.data.products);
      })
      .catch(function (err) {
        console.log("cartFail:::", err);
      });
  }

  async function getUpdateCount(id, newCount) {
    const newRes= await axios.put(
        `https://ecommerce.routemisr.com/api/v1/cart/${id}`,
        {
          count: newCount,
        },
        {
          headers: {
            token: userToken,
          },
        }
      )
      .then(function (res) {
        console.log("res+", res);

        setNumOfCartItems(res.data.numOfCartItems);
        setTotalCartPrice(res.data.data.totalCartPrice);
        setProducts(res.data.data.products);

        return true
      })

      .catch(function (err) {
        console.log("err+", err);

        return false;
      });

    return newRes  
  }

  useEffect(() => {
    if (userToken) {
      getUserCart();
    }
  }, [userToken]);

  return (
    <cartContext.Provider
      value={{
        addProductToCart,
        getUserCart,
        numOfCartItems,
        totalCartPrice,
        products,
        getUpdateCount,
      }}
    >
      <div>
        {children}

        <h1> 2nd Context -Cart Context</h1>
      </div>
    </cartContext.Provider>
  );
}
