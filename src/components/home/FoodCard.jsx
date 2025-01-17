import { CiCalendarDate } from "react-icons/ci";
import { AiFillProduct } from "react-icons/ai";
import { IoLocation } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

function FoodCard({ food }) {
  const navigate = useNavigate();
  const handleExplore = () => {
    navigate(`/food-details/${food._id}`);
  };
  return (
    <div
      className={`card bg-base-100 dark:bg-gray-700 w-80 xl:w-72 shadow-xl `}
    >
      <figure>
        <img
          className="w-full h-60 object-cover"
          src={food.food_image}
          alt="spot"
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title line-clamp-1">{food.food_name}</h2>
        <div className="flex items-center justify-around mt-1">
          <div className="badge badge-secondary bg-green-200 border-transparent text-gray-800">
            {food.food_status === "available" ? "Available" : "Requested"}
          </div>
          <div className="flex items-center gap-x-2">
            <IoLocation className="text-xl" />
            <p className="text-gray-600 dark:text-white">
              {food.pickup_location}
            </p>
          </div>
        </div>

        <div className="flex items-center justify-around my-2">
          <div className="flex items-center gap-x-2">
            <AiFillProduct className="text-xl" />
            <p className="text-gray-600 dark:text-white">
              {food.food_quantity} unit
            </p>
          </div>

          <div className="flex items-center gap-x-2">
            <CiCalendarDate className="text-xl" />
            <p className="text-gray-600 dark:text-white">{food.expired_date}</p>
          </div>
        </div>

        <button
          onClick={() => {
            handleExplore();
            setDetails(food);
          }}
          className="w-[100%] h-12 bg-secondary hover:bg-teal-700 text-neutral dark:bg-gray-500 dark:hover:bg-gray-600 dark:text-white text-lg font-medium rounded-2xl  flex items-center justify-center mx-auto mt-4"
        >
          See Details
        </button>
      </div>
    </div>
  );
}

export default FoodCard;
