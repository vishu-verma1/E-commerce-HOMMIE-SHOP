import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Buffer } from "buffer";
import { Swiper, SwiperSlide } from "swiper/react";
import {
  Pagination as SwiperPagination,
  Autoplay,
} from "swiper/modules";
import { useDispatch, useSelector } from "react-redux";
import { addCartItems } from "../../redux/actions/cartAction";
import Loader from "../Loader";
import { orderItems } from "../../redux/actions/orderAction";

const ProductDetailComponent = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const location = useLocation();
  const token = useSelector((state) => state.auth.token);
  const loading = useSelector((state) => state.cart.loading);
  const { product } = location.state || {};
  const [quantity, setQuantity] = useState(1);
  const [limit, setLimit] = useState(false);
  const [stocks, setStocks] = useState(product?.quantity);
  const [productId, setProductId] = useState(product?._id);
  const [title, setTitle] = useState(product?.productname);
  const [productImages, setProductImages] = useState(product?.productimages);
  const [productDescription, setProductDescription] = useState(product?.description);
  const [productPrice, setProductPrice] = useState(product?.price);
  const increaseQuantity = () => {
    if(quantity < stocks){
      setQuantity(quantity + 1);
    }
    else{
      setLimit(true);
    }
  };
  const decreaseQuantity = () => {
    if (quantity > 1) {setQuantity(quantity - 1); setLimit(false);};
  };
  


  const order = {productid: productId, quantity: quantity,}

  const cartHandler = () =>{
    dispatch(addCartItems(productId, token))
  }

  const orderHandler = () =>{
  dispatch(orderItems( order, token));
  navigate("/order-complete")
  }


 


  return <>
   { loading ? <Loader/> :
   ( <div className="container mx-auto p-4 grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* Product Image */}

      <div className="flex justify-center">
        <Swiper
          modules={[SwiperPagination, Autoplay]}
          autoplay={{ delay: 3000 }}
          slidesPerView={1}
          className="rounded-lg shadow-lg"
        >
          {productImages?.map((each, index) => {
            return (
              <SwiperSlide key={index}>
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

      {/* Product Details */}
      <div className="flex flex-col">

        {/* Product Name */}
        <h1 className="text-2xl font-bold text-gray-800">{title}</h1>

        {/* Product Description */}
        <p className="mt-4 text-gray-600 leading-relaxed">
          {productDescription}
        </p>

        {/* Price */}
        <div className="mt-4 text-2xl font-bold text-gray-900">
          ₹{productPrice}
          <span className="text-sm font-normal"> (MRP incl. of all taxes)</span>
        </div>

        {/* Size Selector */}
        <div className="mt-6">
          <span className="block text-gray-700 font-medium mb-2">
            Select Size
          </span>
          <div className="flex gap-2">
            {["S", "M", "XL", "XXL"].map((size) => (
              <button
                key={size}
                className="border border-gray-300 rounded px-4 py-2 text-gray-700 hover:bg-gray-200"
              >
                {size}
              </button>
            ))}
          </div>
        </div>

        {/* Quantity Selector */}
        <div className="mt-6">
          <span className="block text-gray-700 font-medium mb-2">
            Select Quantity
          </span>
          <div className="flex items-center gap-2">
            <button
              onClick={decreaseQuantity}
              className="border border-gray-300 rounded px-4 py-2 text-gray-700 hover:bg-gray-200"
            >
              -
            </button>
            <span className="text-gray-800">{quantity}</span>
            <button
              onClick={increaseQuantity}
              className="border border-gray-300 rounded px-4 py-2 text-gray-700 hover:bg-gray-200"
            >
              +
            </button>
            {limit && <div className="text-red-500"> Reached Limit ! </div>}
          </div>
        </div>

        {/* Buttons */}
        <div className="mt-8 flex gap-4">
          <button className="flex-1 bg-gray-900 text-white py-3 rounded-lg font-semibold hover:bg-gray-700"
          onClick={cartHandler}
          >
            Add to Cart
          </button>
          <button className="flex-1 border border-gray-800 text-gray-800 py-3 rounded-lg font-semibold hover:bg-gray-200"
          onClick={orderHandler}
          >
            Buy It Now
          </button>
        </div>

      
      </div>
    </div>)}
  </>
  
  
};

export default ProductDetailComponent;
