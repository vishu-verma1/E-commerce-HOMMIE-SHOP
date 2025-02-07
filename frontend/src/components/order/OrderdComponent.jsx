import React from "react";
import { useNavigate } from "react-router-dom";
import NavbarHeader from "../header-footer/NavbarHeader";

const OrderdComponent = () => {
    const navigate = useNavigate();
    const trackOrder = true;

    const trackOrderHandler = ()=>{
        navigate('/profile', { state: { trackOrder }})
        
    }


  return (
    <>
      <div className="font-raleway w-full h-screen ">
        <NavbarHeader/>
        <div className="flex h-full flex-col  justify-center items-center">
          <img
            className="md:h-96 h-64 object-cover object-center"
            src="./images/delivery-service-with-medical-masks-concept-b.png"
            alt=""
          />
          <div className="flex flex-col items-center mb-16">
            <h2 className="font-bold text-2xl md:text-3xl">Thank You :)</h2>
            <p className="text-center mt-2 text-sm md:text-base">
              THANK YOU! We appereciate yur time and inout.
              <br /> Your feedback will help us create a better shoe Creators
              Club experience.{" "}
            </p>
            <button className="bg-black text-white p-3 md:p-4 px-14 md:px-16 mt-2 rounded-lg font-semibold hover:bg-gray-800"
            onClick={trackOrderHandler}
            >
              Track Your Order
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default OrderdComponent;
