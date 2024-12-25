import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { AuthContext } from "../provider/AuthProvider";
import Loader from "../components/ui/Loader/Loader";
import FoodCard from "../components/home/FoodCard";
import FoodRow from "../components/manage-food/FoodRow";
import DeleteModal from "../components/manage-food/DeleteModal";
import { toast } from "react-toastify";

const ManageFood = () => {
  const location = useLocation();
  useEffect(() => {
    const pageTitle = "ShareBites | Manage Food";
    document.title = pageTitle;
  }, [location]);

  //state
  const { link, user } = useContext(AuthContext);
  const [addedFood, setAddedFood] = useState([]);
  const [loading, setLoading] = useState(true);
  //food id for delete
  const [foodId, setFoodId] = useState(null);
  const [_id, set_id] = useState(null);
  console.log("foodId", _id);

  useEffect(() => {
    // Fetch both movies and favorites in parallel
    const fetchFood = async () => {
      try {
        const [allFoodRes, addedFoodRes] = await Promise.all([
          axios.get(`${link}/get-food`),
          axios.get(`${link}/get-user-food/${user.email}`),
        ]);

        const allFood = allFoodRes.data;
        const foodIds = addedFoodRes.data.foods;

        // Filter the favorite movies
        const addedFood = allFood.filter((food) =>
          foodIds.includes(food.food_id)
        );

        setAddedFood(addedFood);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching favorite movies:", error);
        setLoading(false);
      }
    };

    if (user?.email) {
      fetchFood();
      // console.log("user food", addedFood);
    }
  }, [user?.email]);

  const handleRemoveFood = async (foodId, _id) => {
    setAddedFood((prevFood) =>
      prevFood.filter((food) => food.food_id !== foodId)
    );

    // console.log("inside", _id);

    try {
      await Promise.all([
        axios.delete(`${link}/delete-user-food/${user.email}/${foodId}`, {
          withCredentials: true,
        }),
        axios.delete(`${link}/delete-food/${_id}`, {
          withCredentials: true,
        }),
      ]);
    } catch (error) {
      toast.error("An error occurred while removing the food.");
    }
  };

  const handleEditFood = (foodId) => {
    console.log("EDIT");
  };
  return (
    <div>
      <div className="z-50 fixed top-1/2 left-1/2">{loading && <Loader />}</div>
      <h2 className="text-3xl font-semibold text-center  my-8 border-b-2 border-gray-400 w-[250px] mx-auto">
        Manage Food
      </h2>

      {!loading && addedFood.length === 0 && (
        <h2 className="text-3xl font-semibold text-center text-gray-600 mt-16 mb-32">
          No food found!
        </h2>
      )}
      {/* table */}
      {addedFood.length > 0 && (
        <div className="w-[90%] xl:max-w-[1300px] mx-auto max-h-[500px] overflow-y-auto mb-20">
          <div className="grid grid-cols-6 gap-y-16 justify-items-center w-[1000px]  xl:w-[1200px] mx-auto bg-primary p-4 rounded-xl">
            <p className="text-lg xl:text-xl  font-semibold text-gray-600">
              Food Name
            </p>
            <p className="text-lg xl:text-xl font-semibold text-gray-600">
              Food Quantity
            </p>
            <p className="text-lg xl:text-xl font-semibold text-gray-600">
              Pickup Location
            </p>
            <p className="text-lg xl:text-xl font-semibold text-gray-600">
              Expire Date
            </p>
            <p className="text-lg xl:text-xl font-semibold text-gray-600">
              Food Status
            </p>
          </div>

          <div>
            {addedFood.map((food) => (
              <FoodRow
                key={food.food_id}
                food={food}
                onEditFood={handleEditFood}
                setFoodId={setFoodId}
                set_id={set_id}
              />
            ))}
          </div>
        </div>
      )}
      <DeleteModal foodId={foodId} _id={_id} onRemoveFood={handleRemoveFood} />
    </div>
  );
};

export default ManageFood;

