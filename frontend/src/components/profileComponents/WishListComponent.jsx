import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination as SwiperPagination, Autoplay } from "swiper/modules";
import Loader from "../Loader";
import { getWishlistItems, removeWishlistItems } from "../../redux/actions/wishListAction";

const WishListComponent = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);
  const wishlist = useSelector((state) => state.getWishlistData.wishlist?.productId);
  const loading = useSelector((state) => state.getWishlistData.loading);
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    dispatch(getWishlistItems(token));
  }, [dispatch, token, refresh]);

  const buyHandler = (product) => {
    navigate("/product-detail", { state: { product } });
  };

  const removeHandler = (product, e) => {
    e.preventDefault();
    dispatch(removeWishlistItems(product._id, token)).then(() => {
      setRefresh((prev) => !prev);
    });
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="w-100 md:w-8/12 p-4 bg-white rounded-lg">
          <div className="border-b pb-4 mb-5">
            <h4 className="text-gray-900 text-2xl font-semibold">WishList</h4>
          </div>

          <div className="space-y-8">
            {wishlist?.map((item, index) => (
              <div
                key={index}
                className="md:flex items-center gap-4 border-b pb-4"
              >
                <div className="h-20 w-20">
                  <Swiper
                    modules={[SwiperPagination, Autoplay]}
                    autoplay={{ delay: 3000 }}
                    slidesPerView={1}
                    className="rounded-lg shadow-lg h-20 w-20"
                  >
                    {item.productimages?.map((each, imgIndex) => (
                      <SwiperSlide key={imgIndex}>
                        <img
                          src={each}
                          alt="Product"
                          className="w-full h-full object-cover object-center"
                        />
                      </SwiperSlide>
                    ))}
                  </Swiper>
                </div>

                <div className="flex-1 md:mb-0 md:mt-0 mb-3 mt-3">
                  <p className="text-gray-800 font-medium">
                    {item.productname}
                  </p>

                  <p className="text-sm font-semibold">
                    Available Stocks: {item.quantity}
                  </p>

                  <p className="text-gray-600 text-sm">
                    Category: {item.category}
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
                  type="button"
                    onClick={(e) => removeHandler(item,e)}
                    className="border px-4 py-2 hover:bg-gray-300 text-sm"
                  >
                    REMOVE
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="grid md:grid-cols-2 gap-4 mt-6 items-center">
            <div className="p-4 border rounded-lg">
              <h3 className="font-medium">Summary ({wishlist?.length} Items)</h3>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default WishListComponent;