import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { HomeIcon, BarsArrowUpIcon, QueueListIcon, ShoppingBagIcon, UserCircleIcon, ArrowRightStartOnRectangleIcon } from "@heroicons/react/20/solid";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/actions/userActions";

const NavbarHeader = () => {
  const token = useSelector((state) => state.auth.token);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [click, setClick] = useState(false);
  const [query, setQuery] = useState("");
 

  const clickHandle = () => {
    setClick((prevClick) => !prevClick);
  };

  const homeHandler = ()=>{
    navigate("/home")
  }
  
  const logoutHandle = () => {
      dispatch(logout(token));
      navigate("/login");
    };

    const cartHandler = ()=>{
      
      navigate('/profile', { state: { navCart: true } });
    }

    const wishHandler = () => {
      navigate('/profile', { state: { navWishList: true } });
    };

  const accountHandler = ()=>{
    navigate('/profile')
  }

  return (
    <div>
      <nav className="navbar navbar-expand-lg font-raleway border border-gray-200 bg-white osahan-nav p-0">
        <div className="flex items-center px-3">
          <div>
            <img
              className="w-auto py-3 pe-3 h-16"
              src="https://iamosahan.com/wrapbootstrap-pillarix/luxuay/img/logo.svg"
              alt="Logo"
            />
          </div>

          <div className="font-racing text-xl ml-1"> <h2>HOMMIE</h2></div>

          

          <button onClick={clickHandle} className="ml-auto hidden max-md:block">
            <div
              className={`h-8 transition-transform duration-300 ${
                click ? "-rotate-180" : "rotate-0"
              }`}
            >
              <BarsArrowUpIcon className="h-8" />
            </div>
          </button>

          <div className="ml-10 hidden   md:block">
            <ul className="flex gap-5 lg:gap-10 text-sm lg:text-lg">
              <span className="flex items-center gap-2"> <HomeIcon className="h-4"/> <li className="hover:text-zinc-600 cursor-pointer" onClick={homeHandler} >HOME</li></span>
              <span className="flex items-center gap-2"> <QueueListIcon className="h-4" /> <li className="hover:text-zinc-600 cursor-pointer" onClick={wishHandler}>WISHLIST</li></span>
              <span className="flex items-center gap-2"> <ShoppingBagIcon className="h-4"/> <li className="hover:text-zinc-600 cursor-pointer" onClick={cartHandler}>CART</li></span>
             <span className="flex items-center gap-2"> <UserCircleIcon className="h-4"/> <li className="hover:text-zinc-600 cursor-pointer" onClick={accountHandler} >MY ACCOUNT</li></span>
              <span className="flex items-center gap-2"> <ArrowRightStartOnRectangleIcon className="h-4"/> <li className="hover:text-zinc-600 cursor-pointer" onClick={logoutHandle} >LOGOUT</li></span>
            </ul>
          </div>
        </div>

        { (
          <div
            className={`w-full flex flex-col border transition-all duration-500 border-gray-200 items-center ${
              click ? " opacity-100 max-h-[500px] " : "opacity-0 max-h-0"
            }`}
            style={{ transformOrigin: "top" }} 
          >
            <ul className="text-black py-2 font-semibold">
            <span className="flex items-center gap-2 py-2 "> <HomeIcon className="h-4"/> <li className="hover:text-zinc-600 cursor-pointer" onClick={homeHandler} >HOME</li></span>
              <span className="flex items-center gap-2 py-2 "> <QueueListIcon className="h-4" /> <li className="hover:text-zinc-600 cursor-pointer" onClick={wishHandler}>WISHLIST</li></span>
              <span className="flex items-center gap-2 py-2 "> <ShoppingBagIcon className="h-4"/> <li className="hover:text-zinc-600 cursor-pointer" onClick={cartHandler} >CART</li></span>
             <span className="flex items-center gap-2 py-2 "> <UserCircleIcon className="h-4"/> <li className="hover:text-zinc-600 cursor-pointer" onClick={accountHandler}>MY ACCOUNT</li></span>
              <span className="flex items-center gap-2 py-2 "> <ArrowRightStartOnRectangleIcon className="h-4"/> <li className="hover:text-zinc-600 cursor-pointer" onClick={logoutHandle} >LOGOUT</li></span>
            </ul>
          </div>
        )}
      </nav>
    </div>
  );
};

export default NavbarHeader;
