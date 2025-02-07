import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { orderList } from "../../redux/actions/orderAction";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination as SwiperPagination, Autoplay } from "swiper/modules";
import { useNavigate } from "react-router-dom";
import Loader from "../Loader";
import { getAddressAction } from "../../redux/actions/addressAction";

const OrderListComponent = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);
  const addresses = useSelector((state) => state.addressData.addresses) || [];
  const orders = useSelector((state) => state.orderData.orders) || [];
  const loading = useSelector((state) => state.orderData.loading);
  const [productImages, setProductImages] = useState([]);
  const totalAmount = orders?.reduce((acc, item) => acc + parseFloat(item.totalamount), 0) || 0;

  useEffect(() => {
    dispatch(orderList(token));
  }, [dispatch]);

  useEffect(() => {
    dispatch(getAddressAction(token));
  }, [dispatch]);


  useEffect(() => {
    if (orders && orders.length > 0) {
      setProductImages(
        orders.map((each) => each.productid?.productimages || [])
      );
    }
  }, [orders]);

  const buyHandler = (product) => {
    console.log(product);
    navigate("/product-detail", { state: { product } });
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className=" w-100 md:w-8/12 p-4 bg-white  rounded-lg">
          <div className="border-b pb-4 mb-4">
            <h2 className="text-xl font-semibold">
              {orders?.length} Shipments
            </h2>
            <p className="text-gray-600 text-sm">Order Directory</p>
          </div>

          <div className="space-y-6">
            {orders?.map((item, index) => (
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
                    {item.productid.productname}
                  </p>

                  <p className="text-gray-400 line-through text-sm">
                    {item.productid.Price}
                  </p>

                  <p className="text-sm font-semibold">
                    Total Quantity: {item.quantity}
                  </p>
                  <p className="text-sm font-semibold">status: {item.status}</p>

                  <p className="text-lg font-semibold">
                    Total Ammount: {item.totalamount}
                  </p>
                </div>
                <button
                  onClick={() => buyHandler(item.productid)}
                  className="border px-4 py-2 hover:bg-gray-300 text-sm"
                >
                  BUY IT AGAIN
                </button>
              </div>
            ))}
          </div>

          <div className="grid md:grid-cols-2 gap-4 mt-6 items-center">
            {Array.isArray(addresses) && addresses.length > 0 ? (
              addresses.some((each) => each.selected) ? (
                addresses
                  .filter((each) => each.selected)
                  .map((each, index) => (
                    <div key={index} className="p-4 border rounded-lg">
                      <h3 className="font-medium">Shipping Address</h3>
                      <button className="bg-black text-white text-xs p-1 px-2">
                        {each.addressType}
                      </button>
                      <p className="text-gray-600 text-sm">
                        {each.address}
                        <br />
                        {each.city}
                        <br />
                        {each.state}
                        <br />
                        {each.zip}
                      </p>
                    </div>
                  ))
              ) : (
                <p className="text-red-500">No address is selected.</p>
              )
            ) : (
              <p className="text-red-500">No addresses available.</p>
            )}

            <div className="p-4 border rounded-lg">
              <h3 className="font-medium">Summary ({orders?.length} Items)</h3>
              <p className="text-gray-600 text-sm">Order value: {totalAmount}</p>
              <p className="text-gray-600 text-sm">Delivery: FREE</p>
            </div>
          </div>

        </div>
      )}
    </>
  );
};

export default OrderListComponent;
