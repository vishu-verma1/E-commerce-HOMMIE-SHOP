import React, { useEffect, useState } from "react";
import UserProfileComponent from "../profileComponents/UserProfileComponent";
import { useDispatch, useSelector } from "react-redux";
import { getProfile, logout } from "../../redux/actions/userActions";
import { useLocation, useNavigate } from "react-router-dom";
import OrderListComponent from "../profileComponents/OrderListComponent";
import NavbarHeader from "../header-footer/NavbarHeader";
import CartListComponent from "../profileComponents/CartListComponent";
import AccountSettingComponent from "../profileComponents/AccountSettingComponent";

const UserProfileCard = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const token = useSelector((state) => state.auth.token);
  const user = useSelector((state) => state.profile.user);
  const { navCart, trackOrder } = location.state || {};
 
  const [profile, setProfile] = useState(true);
  const [order, setOrder] = useState(false);
  const [cart, setCart] = useState(false);
  const [AccountSettings, setAccountSettings] = useState(false);
  const formattedDate = user
    ? new Date(user.createdAt).toLocaleDateString("en-CA")
    : "";
  const fullname =
    user && user.fullname ? user.fullname : { firstname: "", lastname: "" };
  const imagePath = user?.image
    ? `${import.meta.env.VITE_API_URL}/public${user.image.replace(
        "C:\\Users\\surface\\Desktop\\task1\\Backend\\public",
        ""
      )}`
    : "";

   

  const profileHandler = () => {
    setProfile(true);
    setOrder(false);
    setCart(false);
    setAccountSettings(false);
  };
 

  const accountSettingHandler = ()=>{
    setProfile(false);
    setOrder(false);
    setCart(false);
    setAccountSettings(true)
  }

  const logoutHandler = () => {
    dispatch(logout(token));
    navigate("/login");
  };


  useEffect(() => {
    dispatch(getProfile(token));
  }, [dispatch, token,]);
  
  useEffect(() => {
    if (navCart) {
      cartHandler();
    }
    if (trackOrder) {
      orderHandler();
    }
  },[navCart, trackOrder]);

  const cartHandler = () => {
    setProfile(false);
    setOrder(false);
    setCart(true);
    setAccountSettings(false);
  };

  const orderHandler = () => {
    setOrder(true);
    setProfile(false);
    setCart(false);
    setAccountSettings(false);
  };

  return (
    <>
      <NavbarHeader />
      <div className="md:flex justify-evenly py-20">
        <div className="max-w-xs bg-white shadow-lg md:m-0 mb-4 p-4 m-auto border">
          <div className="flex flex-col my-5 items-center text-center">
            <div className="flex">
              <div className="mr-4">
                <h2 className="mt-3 text-lg font-semibold">
                  {fullname.firstname} {fullname.lastname}
                </h2>
                <p className="text-gray-500 text-sm">{user?.email}</p>
                <p className="text-gray-400 text-sm">
                  Joined on {formattedDate}
                </p>
              </div>

              <img
                src={imagePath}
                alt="Profile"
                className="w-24 h-24 rounded-full object-cover border-4 border-gray-200"
              />
            </div>
            <button className="mt-8 bg-black text-white px-16 py-2  hover:bg-gray-800">
              EDIT PROFILE
            </button>
          </div>
          <div className="mt-6 border-t p-5 pt-3">
            <ul className="space-y-2 text-gray-600 px-1 py-5">
              <li
                className="hover:text-black cursor-pointer"
                onClick={profileHandler}
              >
                Profile
              </li>
              <li
                className="hover:text-black cursor-pointer"
                onClick={orderHandler}
              >
                Orders
              </li>
              <li
                className="hover:text-black cursor-pointer"
                onClick={cartHandler}
              >
                Cart List
              </li>
              <li className="hover:text-black cursor-pointer">Whishlist</li>
              <li className="hover:text-black cursor-pointer"
               onClick={accountSettingHandler}
               >
                Account Settings
              </li>
              <li
                className="hover:text-red-500 cursor-pointer"
                onClick={logoutHandler}
              >
                Logout
              </li>
            </ul>
          </div>
        </div>
        {profile && <UserProfileComponent />}
        {order && <OrderListComponent />}
        {cart  && <CartListComponent />}
        {AccountSettings && <AccountSettingComponent/>}
      </div>
    </>
  );
};

export default UserProfileCard;
