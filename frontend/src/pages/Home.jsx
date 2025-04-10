import React, { useEffect, useState } from "react";
import HeaderComponent from "../components/header-footer/HeaderComponent";
import CardComponent from "../components/Products/CardComponent";
import { Swiper, SwiperSlide } from "swiper/react";
import {
  Navigation,
  Pagination as SwiperPagination,
  Autoplay,
} from "swiper/modules";
import Footer from "../components/header-footer/Footer";
import { useDispatch, useSelector } from "react-redux";
import { fetchProduct } from "../redux/actions/productAction";
import Pagination from "@mui/lab/Pagination";
import Slider from "@mui/material/Slider";
import Loader from "../components/Loader";

const Home = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.productdata.products);
  const currentpage = useSelector((state) => state.productdata.currentPage) || 1;
  const totalPages = useSelector((state) => state.productdata.totalPages);
  const loading = useSelector((state) => state.productdata.loading);

  const [search, setSearch] = useState("");
  const [price, setPrice] = useState([0, 25000]);
  const [category, setCategory] = useState("");
  const [sortField, setSortField] = useState("productname");
  const [sortBy, setSortBy] = useState("Ascending");

  const categories = products?.map((product) => product?.category) || [];
  const priceHandler = (event, newValue) => {
    setPrice(newValue);
  };

  const searchHandle = (e) => {
    e.preventDefault();
    dispatch(fetchProduct({ search }));
  };

  const sortFieldChangeHandler = (e) => {
    setSortField(e.target.value);
  };

  const sortByChangeHandler = (e) => {
    setSortBy(e.target.value);
  };

  const handleFilterSubmit = (e) => {
    e.preventDefault();
    dispatch(fetchProduct({ search, price, category, sortField, sortBy }));
  };

  const paginationHandler = (e, page) => {
    dispatch(
      fetchProduct({ search, price, category, sortField, sortBy, page })
    );
  };

  useEffect(() => {
    if (!search) {
      dispatch(fetchProduct({}));
    }
  }, [dispatch]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="w-full h-screen">
          <HeaderComponent />
          <div className="container font-raleway mx-auto mt-20 p-5">
            <div>
              <form className="flex justify-center items-center w-full ">
                <div className="relative">
                  <div className="absolute inset-y-2 start-0 flex items-center ps-3 pointer-events-none">
                    <svg
                      className="w-4 h-4 text-gray-500 dark:text-gray-400"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 20 20"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                      />
                    </svg>
                  </div>
                  <input
                    value={search}
                    onChange={(e) => {
                      setSearch(e.target.value);
                    }}
                    type="search"
                    id="default-search"
                    className="block lg:w-96 w-72 md:pl-8 p-3 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:zinc-500 focus:border-zinc-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 placeholder:text-xs dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Search Products..."
                    required
                  />
                  <button
                    onClick={searchHandle}
                    type="submit"
                    className="text-white absolute md:end-8 end-7 md:bottom-2 bottom-2.5 bg-zinc-900 hover:bg-zinc-500 focus:ring-4 focus:outline-none font-medium rounded-lg md:text-sm text-xs px-2 lg:px-4 py-1 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  >
                    Search
                  </button>
                </div>
              </form>
            </div>
            {/* filter */}
            <div
              className={`w-full mt-5 flex justify-center items-center gap-10 transition-all duration-500 ${search ? "opacity-100 max-h-[500px]" : "opacity-0 max-h-0"
                }`}
              style={{ transformOrigin: "top" }}
            >
              <div className="Priceslider w-52 flex flex-col">
                <label htmlFor="sortby" className="text-black font-medium mb-2">
                  Price $
                </label>
                <Slider
                  getAriaLabel={() => "Price range"}
                  className="text-black"
                  value={price}
                  onChange={priceHandler}
                  valueLabelDisplay="auto"
                  aria-labelledby="range-slider"
                  min={0}
                  max={25000}
                  sx={{
                    color: "grey.500",
                    "& .MuiSlider-thumb": {
                      backgroundColor: "black",
                    },
                    "& .MuiSlider-track": {
                      backgroundColor: "grey.500",
                    },
                    "& .MuiSlider-rail": {
                      backgroundColor: "grey.400",
                    },
                  }}
                />
              </div>
              <div className="Categories rounded flex flex-col">
                <label htmlFor="sortby" className="text-black font-medium mb-2">
                  Category
                </label>
                <select
                  className="bg-gray-200 w-32 rounded-md px-2 py-1 focus:outline-none focus:ring-2 focus:ring-black"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                >
                  {categories.map((category, index) => (
                    <option key={index} className="text-black">
                      {category}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex gap-4 items-center">
                <div className="flex flex-col">
                  <label className="text-black font-medium mb-2" htmlFor="sortfield">
                    Sort Field
                  </label>
                  <select
                    className="bg-gray-200 rounded-md px-2 py-1 focus:outline-none focus:ring-2 focus:ring-black"
                    id="sortField"
                    value={sortField}
                    onChange={sortFieldChangeHandler}
                  >
                    <option value="productname">productname</option>
                    <option value="price">price</option>
                    <option value="quantity">quantity</option>
                  </select>
                </div>
                <div className="flex flex-col">
                  <label htmlFor="sortby" className="text-black font-medium mb-2">
                    Sort By
                  </label>
                  <select
                    id="sortby"
                    className="bg-gray-200 rounded-md px-2 py-1 focus:outline-none focus:ring-2 focus:ring-black"
                    value={sortBy}
                    onChange={sortByChangeHandler}
                  >
                    <option value="ascending">Ascending</option>
                    <option value="descending">Descending</option>
                  </select>
                </div>
              </div>
              <button
                className="bg-black text-white px-2 py-1 mt-7 rounded-md hover:bg-gray-500 text-sm transition"
                onClick={handleFilterSubmit}
              >
                Apply
              </button>
            </div>
            <Swiper
              modules={[Navigation, SwiperPagination, Autoplay]}
              navigation
              autoplay={{ delay: 3000 }}
              spaceBetween={30}
              slidesPerView={1}
              breakpoints={{
                640: {
                  slidesPerView: 1,
                  spaceBetween: 10,
                },
                768: {
                  slidesPerView: 2,
                  spaceBetween: 20,
                },
                1024: {
                  slidesPerView: 4,
                  spaceBetween: 30,
                },
              }}
              className="h-full "
            >
              {products?.map((each, index) => {
                return (
                  <SwiperSlide key={index}>
                    <CardComponent product={each} />
                  </SwiperSlide>
                );
              })}
            </Swiper>
          </div>
          <div className="pagination w-full flex justify-center">
            <Pagination
              count={totalPages}
              page={currentpage}
              onChange={paginationHandler}
            />
          </div>
          <div>
            <Footer />
          </div>
        </div>
      )}
    </>
  );
};

export default Home;