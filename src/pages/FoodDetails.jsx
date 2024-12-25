import { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../provider/AuthProvider";
import axios from "axios";
import Loader from "../components/ui/Loader/Loader";
import { AiFillProduct } from "react-icons/ai";
import { CiCalendarDate } from "react-icons/ci";
import { IoLocation } from "react-icons/io5";
import Button from "../components/ui/Button";

const FoodDetails = () => {
  const location = useLocation();
  useEffect(() => {
    const pageTitle = "ShareBites | Details";
    document.title = pageTitle;
  }, [location]);

  const { user, link } = useContext(AuthContext);

  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    axios.get(`${link}/get-food-details/${id}`).then((res) => {
      setDetails(res.data);
      setIsLoading(false);
    });
  }, [id]);

  const [details, setDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div className=" min-w-screen flex md:flex-row flex-col md:gap-x-16 md:justify-center md:mt-16 md:mb-32">
      <div className="z-50 fixed top-1/2 left-1/2">
        {isLoading && <Loader />}
      </div>
      <div>
        <img
          className="w-full h-80 object-cover
            md:w-[600px] md:h-[400px] md:rounded-lg"
          src={details?.food_image}
          alt="movie-poster"
        />
      </div>

      {/* food details */}
      <div className="flex flex-col gap-y-4 md:w-[40%] px-2 mt-5 md:mt-0">
        <h1 className="text-3xl font-semibold">{details?.food_name}</h1>
        <div className="flex gap-x-4">
          <div className="badge badge-secondary bg-green-200 border-transparent text-gray-800">
            {details?.food_status === "available"
              ? "Available"
              : "Not Available"}
          </div>
        </div>

        <div className="flex items-center gap-x-4 my-2">
          <div className="flex items-center gap-x-2">
            <AiFillProduct className="text-xl" />
            <p className="text-gray-600">{details?.food_quantity} units</p>
          </div>

          <div className="flex items-center gap-x-2">
            <CiCalendarDate className="text-xl" />
            <p className="text-gray-600">{details?.expired_date}</p>
          </div>
          <div className="flex items-center gap-x-2">
            <IoLocation className="text-xl" />
            <p className="text-gray-600">{details?.pickup_location}</p>
          </div>
        </div>
        <p className="line-clamp-5 ">{details?.additional_notes}</p>

        <div className="flex items-center sm:justify-start justify-center mt-4 mb-5 md:mb-0">
          <Button label={"Request Food"} type={"standard"} onClick={() => {}} />
        </div>

        {/* donator details */}
        <div className="flex items-center gap-x-4 mb-10 md:mt-20">
          <h1 className="text-xl font-semibold">Donated By:</h1>
          <div className="flex items-center gap-x-2">
            <img
              className="w-14 h-14 rounded-full border-2 border-secondary"
              src={details?.donator_image}
              alt="user"
            />
            <p className="text-gray-600 text-lg font-medium">
              {details?.donator_name}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FoodDetails;
