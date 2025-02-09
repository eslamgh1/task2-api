import style from "./Navbar.module.css";
import logo from "../../assets/Images/freshcart-logo.svg";
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
      <nav className="bg-green-300 border-gray-200 dark:bg-gray-900 fixed top-0 right-0 left-0">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <Link
            to=""
            className="flex items-center space-x-3 rtl:space-x-reverse"
          >
            <img src={logo} classname="h-8" alt="logo" />
          </Link>
          <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse items-center">
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
            </ul>
            <ul className="flex gap-3">
              {!userToken ? (
                <>
                  <li>
                    <Link to="Login" className="text-slate-800 border rounded-2xl p-2 border-green-500">
                      Login
                    </Link>
                  </li>
                  <li>
                    <Link to="Register" className="text-slate-800 border rounded-2xl p-2 border-green-500">
                      Register
                    </Link>
                  </li>
                </>
              ) : (
                <>
                  <li className="ml-5">
                    <Link onClick={logOut} className="text-slate-800 border rounded-2xl p-2 border-green-500">
                      Log out
                    </Link>
                  </li>
                </>
              )}
            </ul>

            <button
              data-collapse-toggle="navbar-cta"
              type="button"
              className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
              aria-controls="navbar-cta"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className="w-5 h-5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 17 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M1 1h15M1 7h15M1 13h15"
                />
              </svg>
            </button>
          </div>

          <div
            className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1"
            id="navbar-cta"
          >
            {userToken ? (
              <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0">
                <li>
                  <Link
                    to="/home"
                    className="block py-2 px-3 md:p-0 text-white bg-blue-700 rounded-sm md:bg-transparent md:text-blue-700 md:dark:text-blue-500"
                    aria-current="page"
                  >
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    to="cart"
                    className="block py-2 px-3 md:p-0 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                  >
                    Cart
                  </Link>
                </li>
                <li>
                  <Link
                    to="wishlist"
                    className="block py-2 px-3 md:p-0 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                  >
                    wish list
                  </Link>
                </li>
                <li>
                  <Link
                    to="products"
                    className="block py-2 px-3 md:p-0 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                  >
                    Products
                  </Link>
                </li>
                <li>
                  <Link
                    to="categories"
                    className="block py-2 px-3 md:p-0 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                  >
                    Categories
                  </Link>
                </li>
                <li>
                  <Link
                    to="brands"
                    className="block py-2 px-3 md:p-0 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                  >
                    Brands
                  </Link>
                </li>
              </ul>
            ) : (
              ""
            )}
          </div>
        </div>
      </nav>
    </>
  );
}
