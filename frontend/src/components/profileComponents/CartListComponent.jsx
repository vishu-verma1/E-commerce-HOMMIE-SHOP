import React, { useEffect, useState } from "react";
import { getCartItems, removeCartItems } from "../../redux/actions/cartAction";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination as SwiperPagination, Autoplay } from "swiper/modules";
import Loader from "../Loader";
import { SET_TOKEN } from "../../constants/userConstant";
import { getProfile } from "../../redux/actions/userActions";

const CartListComponent = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);
  const cart = useSelector((state) => state.cartData.cart);
  const loading = useSelector((state) => state.cartData.loading);
  const [productImages, setProductImages] = useState([]);
  const totalAmount = cart?.reduce((acc, item) => acc + parseFloat(item.price), 0) || 0;
  const [refresh, setRefresh] = useState(false);


  useEffect(() => {
    if (cart && cart.length > 0) {
      setProductImages(
        cart.map((each) => each?.productimages || [])
      );
    }
  }, [cart]);

  console.log(cart, "frontend cart")



  const buyHandler = (product) => {

    navigate("/product-detail", { state: { product } });
  };

  const removeHandler = (product, e) => {
    try {
      // e.preventDefault();
      dispatch(removeCartItems(product._id, token))
      setRefresh((prev) => !prev)
    }
    catch (err) {
      console.log("Error uis", err)
    }

  }

  useEffect(() => {
    if (refresh) {
     dispatch(getCartItems(token));
     console.log(cart, "refresh cart_______");
    }
  }, [dispatch, refresh]);

  useEffect(() => {
    dispatch(getCartItems(token));
  }, [dispatch]);


  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className=" w-100 md:w-8/12 p-4 bg-white  rounded-lg">
          <div className="border-b pb-4 mb-4">
            <p className="text-gray-600 text-lg font-semibold ">Cart List</p>
          </div>

          <div className="space-y-6">
            {cart?.map((item, index) => (
              <div
                key={index}
                className="flex items-center gap-4 border-b pb-4"
              >
                <div className="h-20 w-20 ">
                  <Swiper
                    modules={[SwiperPagination, Autoplay]}
                    autoplay={{ delay: 3000 }}
                    slidesPerView={1}
                    className="rounded-lg shadow-lg h-20 w-20"
                  >
                    {productImages[index]?.map((each, imgIndex) => {
                      return (
                        <SwiperSlide key={imgIndex}>
                          <img
                            src={each}
                            alt="Product"
                            className=" w-full h-full object-cover object-center"
                          />
                        </SwiperSlide>
                      );
                    })}
                  </Swiper>
                </div>

                <div className="flex-1">
                  <p className="text-gray-800 font-medium">
                    {item.productname}
                  </p>

                  <p className="text-sm font-semibold">
                    Available Stocks : {item.quantity}
                  </p>

                  <p className="text-lg font-semibold">
                    Price : {item.price}
                  </p>

                  <p className="text-gray-500  text-sm">
                    Category : {item.category}
                  </p>

                </div>
                <div className="flex gap-3">
                  <button
                    onClick={() => buyHandler(item)}
                    className="border px-4 py-2 hover:bg-gray-300 text-sm"
                  >
                    BUY IT NOW
                  </button>

                  <button
                    onClick={(e) => removeHandler(item, e)}
                    className="border px-4 py-2 hover:bg-gray-300 text-sm"
                  >
                    REMOVE
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="grid md:grid-cols-2 gap-4 mt-6 items-center ">

            <div className="p-4 border rounded-lg ">
              <h3 className="font-medium">Summary ({cart?.length} Items)</h3>
              <p className="text-gray-600 text-sm">
                Order value: {totalAmount}
              </p>

            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CartListComponent;
