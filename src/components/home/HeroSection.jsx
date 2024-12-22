// import Swiper core and required modules
import {
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
  Autoplay,
} from "swiper/modules";
import banner13 from "../../assets/hero/slider-1.jpg";
import banner14 from "../../assets/hero/slider-2.jpg";
import banner11 from "../../assets/hero/slider-3.webp";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import "swiper/css/scrollbar";
import "swiper/css/autoplay";

import { useContext, useRef, useState } from "react";
// import LoadingContext from "../ContextApi/LoadingContext";

import { FaArrowCircleLeft, FaArrowCircleRight } from "react-icons/fa";
import HeroBanner from "./HeroBanner";
import HeroDesc from "./HeroDesc";

export default function HeroSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  // Custom navigation buttons
  const navigationPrevRef = useRef(null);
  const navigationNextRef = useRef(null);

  return (
    <div className="relative">
      <Swiper
        // install Swiper modules
        modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
        spaceBetween={50}
        slidesPerView={1}
        autoplay={{ delay: 5000 }}
        // navigation={{
        //   prevEl: navigationPrevRef.current,
        //   nextEl: navigationNextRef.current,
        // }}
        pagination={{ clickable: true }}
        // onSwiper={(swiper) => {
        //   // Necessary to update refs for custom buttons
        //   setTimeout(() => {
        //     swiper.params.navigation.prevEl = navigationPrevRef.current;
        //     swiper.params.navigation.nextEl = navigationNextRef.current;
        //     swiper.navigation.init();
        //     swiper.navigation.update();
        //   });
        // }}
        onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
      >
        <SwiperSlide>
          <div className="flex justify-center items-center h-full w-full">
            <HeroBanner source={banner13} />
            <div
              className={`absolute flex flex-col justify-center items-center  ${
                activeIndex === 0 ? "" : ""
              }`}
            >
              <HeroDesc
                tag={"WE ARE CREATING A BRIGHTER TOMORROW"}
                title={"Make Someone's Life by Giving of Yours"}
              />
            </div>
          </div>
        </SwiperSlide>

        <SwiperSlide>
          <div className="flex justify-center items-center h-full w-full">
            <HeroBanner source={banner11} />
            <div
              className={`absolute flex flex-col justify-center items-center   ${
                activeIndex === 1 ? "" : ""
              }`}
            >
              <HeroDesc
                tag={"WE ARE CREATING A BRIGHTER TOMORROW"}
                title={"Make Someone's Life by Giving of Yours"}
              />
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="flex justify-center items-center h-full w-full">
            <HeroBanner source={banner14} />
            <div
              className={`absolute flex flex-col justify-center items-center  ${
                activeIndex === 2 ? "" : ""
              }`}
            >
              <HeroDesc
                tag={"WE ARE CREATING A BRIGHTER TOMORROW"}
                title={"Make Someone's Life by Giving of Yours"}
              />
            </div>
          </div>
        </SwiperSlide>
      </Swiper>

      <button
        ref={navigationPrevRef}
        className="text-primary hover:text-primaryHover hover:cursor-pointer lg:text-[3rem] text-[1.8rem] absolute left-2 top-1/2 z-10"
      >
        <FaArrowCircleLeft />
      </button>
      <button
        ref={navigationNextRef}
        className="text-primary hover:text-primaryHover hover:cursor-pointer lg:text-[3rem] text-[1.8rem] absolute right-2 top-1/2 z-10"
      >
        <FaArrowCircleRight />
      </button>
    </div>
  );
}
