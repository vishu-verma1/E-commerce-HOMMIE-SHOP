import React from 'react';
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import slider1 from "../../assets/slider-1.jpg";
import slider2 from "../../assets/slider-2.jpg";
import slider3 from "../../assets/slider-3.jpg";
import slider4 from "../../assets/slider-4.jpg";
import "swiper/css/bundle";
import NavbarHeader from './NavbarHeader';

const HeaderComponent = () => {
  return (
    <div className="h-screen relative w-full">
      {/* Navbar */}
      <NavbarHeader />

      {/* Swiper */}
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 3000 }}
        spaceBetween={30}
        slidesPerView={1}
        breakpoints={{
          640: {
            slidesPerView: 1,
            spaceBetween: 10,
          },
          768: {
            slidesPerView: 1,
            spaceBetween: 20,
          },
          1024: {
            slidesPerView: 1,
            spaceBetween: 30,
          },
        }}
        className="h-full"
      >
        {/* Slide 1 */}
        <SwiperSlide>
          <div className="h-full w-full relative">
            <img
              className="h-full w-full object-cover"
              src={slider1}
              alt="slider1"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black opacity-50"></div>
            <div className="absolute inset-0 flex flex-col justify-center items-center sm:items-start text-white p-8 md:p-16">
              <div className="h-16 w-16 md:h-32 md:w-32 bg-white rounded-full flex items-center justify-center">
                <img
                  className="h-10 w-10 md:h-20 md:w-20"
                  src="https://iamosahan.com/wrapbootstrap-pillarix/luxuay/img/brand-logo/brand-1.png"
                  alt="Brand Logo"
                />
              </div>
              <h3 className="mt-4 text-center sm:text-left text-2xl md:text-6xl font-bold">NEW IN</h3>
              <p className="mt-2 text-center sm:text-left text-sm md:text-lg leading-relaxed w-full md:w-2/3">
                Explore this week's latest menswear pieces of the season curated
                for you. Autumn Winter Man Collection.
              </p>
            </div>
          </div>
        </SwiperSlide>

        {/* Slide 2 */}
        <SwiperSlide>
          <div className="h-full w-full relative">
            <img
              className="h-full w-full object-cover"
              src={slider2}
              alt="slider2"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black opacity-50"></div>
            <div className="absolute inset-0 flex flex-col justify-center items-center sm:items-end text-white p-8 md:p-16">
              <div className="h-16 w-16 md:h-32 md:w-32 bg-white rounded-full flex items-center justify-center">
                <img
                  className="h-10 w-10 md:h-20 md:w-20"
                  src="https://iamosahan.com/wrapbootstrap-pillarix/luxuay/img/brand-logo/brand-3.png"
                  alt="Brand Logo"
                />
              </div>
              <h3 className="mt-4 text-center sm:text-right text-2xl md:text-6xl font-bold">NEW IN</h3>
              <p className="mt-2 text-center sm:text-right text-sm md:text-lg leading-relaxed w-full md:w-2/3">
                Explore this week's latest menswear pieces of the season curated
                for you. Autumn Winter Man Collection.
              </p>
            </div>
          </div>
        </SwiperSlide>

        {/* Slide 3 */}
        <SwiperSlide>
          <div className="h-full w-full relative">
            <img
              className="h-full w-full object-cover"
              src={slider3}
              alt="slider3"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black opacity-50"></div>
            <div className="absolute inset-0 flex flex-col justify-center items-center sm:items-start text-white p-8 md:p-16">
              <div className="h-16 w-16 md:h-32 md:w-32 bg-white rounded-full flex items-center justify-center">
                <img
                  className="h-10 w-10 md:h-20 md:w-20"
                  src="https://iamosahan.com/wrapbootstrap-pillarix/luxuay/img/brand-logo/brand-5.png"
                  alt="Brand Logo"
                />
              </div>
              <h3 className="mt-4 text-center sm:text-left text-2xl md:text-6xl font-bold">LATEST TRENDS</h3>
              <p className="mt-2 text-center sm:text-left text-sm md:text-lg leading-relaxed w-full md:w-2/3">
                Discover the most sought-after pieces and redefine your style this
                season.
              </p>
            </div>
          </div>
        </SwiperSlide>

        {/* Slide 4 */}
        <SwiperSlide>
          <div className="h-full w-full relative">
            <img
              className="h-full w-full object-cover"
              src={slider4}
              alt="slider4"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black opacity-50"></div>
            <div className="absolute inset-0 flex flex-col justify-center items-center sm:items-end text-white p-8 md:p-16">
              <div className="h-16 w-16 md:h-32 md:w-32 bg-white rounded-full flex items-center justify-center">
                <img
                  className="h-10 w-10 md:h-20 md:w-20"
                  src="https://iamosahan.com/wrapbootstrap-pillarix/luxuay/img/brand-logo/brand-8.png"
                  alt="Brand Logo"
                />
              </div>
              <h3 className="mt-4 text-center sm:text-right text-2xl md:text-6xl font-bold">SEASON PICKS</h3>
              <p className="mt-2 text-center sm:text-right text-sm md:text-lg leading-relaxed w-full md:w-2/3">
                Handpicked styles perfect for the season. Find your signature look
                today.
              </p>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default HeaderComponent;
