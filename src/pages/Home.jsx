import axios from "axios";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import HeroSection from "../components/home/HeroSection";
import Loader from "../components/ui/Loader/Loader";
import { useFeaturedFood } from "../utils/fetchApi";
import FoodCard from "../components/home/FoodCard";
import Button from "../components/ui/Button";
import DonateSection from "../components/home/DonateSection";
import VolunteerSection from "../components/home/VolunteerSection";
import Testimonials from "../components/home/Testimonials";

const Home = () => {
  const { isLoading, featuredFood, error } = useFeaturedFood();
  const navigate = useNavigate();
  const location = useLocation();
  useEffect(() => {
    const pageTitle = "ShareBites | Home";
    document.title = pageTitle;
  }, [location]);
  // console.log(featuredFood);

  return (
    <div className="relative">
      <div className="z-50 fixed top-1/2 left-1/2">
        {isLoading && <Loader />}
      </div>
      <HeroSection />
      <h2 className="text-3xl font-semibold text-center mt-10 mb-8 border-b-2 border-gray-500 w-[280px] mx-auto">
        Featured Food
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-y-16 justify-items-center my-16 xl:max-w-[1300px] mx-auto">
        {featuredFood &&
          featuredFood.map((food) => <FoodCard key={food._id} food={food} />)}
      </div>
      <div className=" flex justify-center mb-16">
        <Button
          type={"standard"}
          label={"Show All"}
          onClick={() => navigate("/available-foods")}
        />
      </div>
      {/* donation section */}
      <div className=" bg-gray-200 dark:bg-base-100 w-screen">
        <DonateSection />
      </div>
      {/* volunteer section */}
      <div className="dark:bg-primary w-screen">
        <VolunteerSection />
      </div>
      {/* testimonials section */}
      <div className=" bg-gray-200 dark:bg-base-100 w-screen">
        <Testimonials />
      </div>
    </div>
  );
};

export default Home;
