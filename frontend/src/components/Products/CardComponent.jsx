import React, { useEffect, useState, useRef } from "react";
import gsap from "gsap";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addCartItems } from "../../redux/actions/cartAction";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination as SwiperPagination, Autoplay } from "swiper/modules";
import { addWhishList } from "../../redux/actions/wishListAction";

const CardComponent = ({ product }) => {
  if (!product) {
    return;
  }

  const mouseEnter = () => {
    gsap.to(cardContainer.current, {
      scale: 1.2,
      duration: 0.3,
      boxShadow: "0 15px 30px rgba(0,0,0,0.3)",
      ease: "Power3.easeIn",
    });

    gsap.to(imageContainer.current, {
      scale: 1,
      rotateX: 20,
      duration: 0.3,
      ease: "Power3.easeIn",
    });
  };

  const mouseLeave = () => {
    gsap.to(cardContainer.current, {
      scale: 1,
      duration: 0.3,
      ease: "Power3.easeOut",
      boxShadow: "0 0px 0px rgba(0,0,0,0)",
    });

    gsap.to(imageContainer.current, {
      scale: 1,
      rotateX: 0,
      duration: 0.3,
      ease: "Power3.easeOut",
    });
  };

  const cardContainer = useRef(null);
  const imageContainer = useRef(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = useSelector((state) => state.auth.token);
  const [productImages, setProductImages] = useState(product.productimages);
  const [price, setPrice] = useState(product.price);
  const [wishlistTab, setWishlistTab] = useState(false);
  const [stocks, setStocks] = useState(product.quantity);
  const [productName, setProductName] = useState(
    product.productname.replace(/"/g, "")
  );
  const [productId, setProductId] = useState(product._id);

  const clickHandle = () => {
    navigate("/product-detail", { state: { product } });
  };

  const orderHandler = () => {
    navigate("/product-detail", { state: { product } });
  };

  const cartHandler = (e) => {
    e.preventDefault();
    navigate("/product-detail", { state: { product } });
  };

  const wishListHandler = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setWishlistTab(true);
    };

    useEffect(()=>{
      if(wishlistTab){
        dispatch(addWhishList(productId, token));
      }
    },[wishlistTab])


  return (
    <div className="w-full my-10 p-4 font-raleway">
      <div
        ref={cardContainer}

        className="flex flex-col gap-4 bg-gray-200 font-raleway rounded-lg items-center overflow-hidden shadow-md hover:shadow-lg transition-all"
        onMouseEnter={mouseEnter}
        onMouseLeave={mouseLeave}
      >
        <div className="mt-3 w-40 h-40 flex items-center justify-center overflow-hidden">
          <Swiper
            modules={[SwiperPagination, Autoplay]}
            autoplay={{ delay: 3000 }}
            slidesPerView={1}
            spaceBetween={0}
            className="h-40 w-auto"
          >
            {productImages?.map((each, index) => {
              return (
                <SwiperSlide key={index}>
                  <img
                    onClick={clickHandle}
                    src={each}
                    alt="Product"
                    ref={imageContainer}
                    className="w-full h-full object-cover object-center rounded shadow-lg "
                  />
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>

        <div className="px-4 w-full text-center">
          <h4 className="font-semibold truncate">{productName}</h4>
        </div>

        <div className="flex justify-between font-sans w-full px-4 bg-white py-2">
          <div>₹{price}</div>
          {stocks > 0 ? <div>Stocks: {stocks}</div> : <div>Out of Stocks</div>}
        </div>

        <div className="flex gap-2 pb-3 px-4 text-sm font-semibold w-full justify-center">
          <button
            className="border border-gray-300 bg-gray-200 px-2 py-1 rounded hover:bg-gray-300"
            onClick={orderHandler}
          >
            Order
          </button>
          <button
            type="button"
            className="border border-gray-300 bg-gray-200 px-2 py-1 rounded hover:bg-gray-300"
            onClick={wishListHandler}
          >
            Wishlist
          </button>
          <button
            className="border border-gray-300 bg-gray-200 px-2 py-1 rounded hover:bg-gray-300"
            onClick={cartHandler}
          >
            Cart
          </button>
        </div>
        {/* {wishlistTab && (
          <div className="text-sm mb-1 text-gray-600">Added to wishlist</div>
        )} */}
      </div>
    </div>
  );
};

export default CardComponent;