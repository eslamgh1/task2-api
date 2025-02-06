import style from "./Navbar.module.css";
import logo from "../../assets/Images/avatar.svg";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { authContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { cartContext } from "../../context/CartContext";

export default function Navbar() {
  const { userToken } = useContext(authContext);
  const { setUserToken } = useContext(authContext);
  const { numOfCartItems } = useContext(cartContext);
  const navigate = useNavigate();

  function logOut() {
    console.log("logged Out");
    localStorage.removeItem("tkn");
    setUserToken(null);
    navigate("/login");
  }

  return (
    <>
      <nav className="bg-slate-400 fixed top-0 right-0 left-0 border-gray-200 ">
        <div className="flex flex-wrap justify-center gap-3 lg:justify-between items-center max-w-screen-xl mx-auto p-4">
          <div className="flex">
            <Link
              to=""
              className="flex items-center space-x-3 rtl:space-x-reverse "
            >
              <img src={logo} className="h-8" alt="logo" />
            </Link>
            {/* left Links in navbar  */}
            {userToken ? (
              <ul className="flex mx-8">
                <li className="flex gap-2">
                  <Link
                    to=""
                    className="text-slate-800 active:bg-red-500 active:rounded-lg"
                  >
                    Home
                  </Link>
                  <Link
                    to="cart"
                    className="text-slate-800 active:bg-red-500 active:rounded-lg"
                  >
                    Cart
                  </Link>
                  <Link
                    to="products"
                    className="text-slate-800 active:bg-red-500 active:rounded-lg"
                  >
                    Products
                  </Link>
                  <Link
                    to="categories"
                    className="text-slate-800 active:bg-red-500 active:rounded-lg"
                  >
                    Categories
                  </Link>
                  <Link
                    to="brands"
                    className="text-slate-800 active:bg-red-500 active:rounded-lg"
                  >
                    Brands
                  </Link>
                </li>
              </ul>
            ) : (
              ""
            )}
          </div>

          <div className="flex gap-3">
            <ul className="flex gap-3">
              <li>
                {userToken && (
                  <Link to="/cart">
                    <div
                      type="button"
                      className="inline-flex items-center px-2 py-2.5 text-sm font-medium text-center text-white bg-green-700 rounded-lg hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    >
                      <i className="fa-solid fa-cart-shopping"></i>
                      <span className="inline-flex items-center justify-center w-4 h-4 ms-2 text-xs font-semibold text-green-800 bg-yellow-200 rounded-full">
                        {numOfCartItems}
                      </span>
                    </div>
                  </Link>
                )}
              </li>
              <li>
                <i className="fa-solid fa-dumbbell"></i>
              </li>
              <li>
                <i className="fa-solid fa-flag-usa"></i>
              </li>
              <li>
                <i className="fa-solid fa-dumbbell"></i>
              </li>
            </ul>
            <ul className="flex gap-3">
              {!userToken ? (
                <>
                  <li>
                    <Link to="Login" className="text-slate-800">
                      Login
                    </Link>
                  </li>
                  <li>
                    <Link to="Register" className="text-slate-800">
                      Register
                    </Link>
                  </li>
                </>
              ) : (
                <>
                  <li>
                    <Link onClick={logOut} className="text-slate-800">
                      Signout
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
