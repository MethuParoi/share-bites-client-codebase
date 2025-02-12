import axios from "axios";
import { useContext } from "react";
import { AuthContext } from "../../provider/AuthProvider";

const FoodRow = ({ food, setFoodId, set_id, setFood_id, setFoodDetail }) => {
  const { link } = useContext(AuthContext);

  const fetchFoodDetails = async () => {
    try {
      const response = await axios.get(`${link}/get-food-details/${food._id}`, {
        withCredentials: true,
      });
      setFoodDetail(response.data);
    } catch (error) {
      console.error("Error fetching food details:", error);
    }
  };

  const handleEditClick = () => {
    fetchFoodDetails();
    setFood_id(food._id);
    document.getElementById("my_modal_4").showModal();
  };

  const handleRemoveClick = () => {
    setFoodId(food.food_id);
    set_id(food._id);
    document.getElementById("my_modal_3").showModal();
  };

  return (
    <div className="grid grid-cols-6 gap-y-4 justify-items-center w-[1000px] xl:w-[1200px] mx-auto bg-primary p-4 my-4 rounded-xl">
      <p className="text-lg xl:text-xl font-medium text-gray-600 line-clamp-1">
        {food.food_name}
      </p>
      <p className="text-lg xl:text-xl font-medium text-gray-600 line-clamp-1">
        {food.food_quantity}
      </p>
      <p className="text-lg xl:text-xl font-medium text-gray-600 line-clamp-1">
        {food.pickup_location}
      </p>
      <p className="text-lg xl:text-xl font-medium text-gray-600 line-clamp-1">
        {food.expired_date}
      </p>
      <p className="text-lg xl:text-xl font-medium text-gray-600 line-clamp-1">
        {food.food_status}
      </p>
      <div className="flex space-x-4">
        <button
          onClick={handleEditClick}
          className="bg-secondary hover:bg-teal-600 text-white px-4 py-1 rounded-lg"
        >
          Edit
        </button>
        <button
          onClick={handleRemoveClick}
          className="bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded-lg"
        >
          Remove
        </button>
      </div>

      {/* second row */}

      <p className="text-lg xl:text-xl font-medium text-gray-600 line-clamp-1">
        donator: {food.donator_name}
      </p>
      <p className="text-lg xl:text-xl font-medium text-gray-600 line-clamp-1 col-span-2">
        donator email: {food.donator_email}
      </p>
      <p className="text-lg xl:text-xl font-medium text-gray-600 line-clamp-1 col-span-3">
        additional note: {food.additional_notes}
      </p>
    </div>
  );
};

export default FoodRow;
