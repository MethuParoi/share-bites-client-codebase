import axios from "axios";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import HeroSection from "../components/home/HeroSection";

const Home = () => {
  const location = useLocation();
  useEffect(() => {
    const pageTitle = "ShareBites | Home";
    document.title = pageTitle;
  }, [location]);
  // const getMovies = async () => {
  //   try {
  //     const response = await axios.get("http://localhost:3000/all-movies", {
  //       withCredentials: true,
  //     });
  //     console.log(response);
  //   } catch (error) {
  //     console.error("Error getting movies:", error.message);
  //   }
  // };
  return (
    <div>
      <HeroSection />
    </div>
  );
};

export default Home;
