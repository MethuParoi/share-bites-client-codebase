import { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import ReqFoodRow from "../components/requested-food/ReqFoodRow";
import { AuthContext } from "../provider/AuthProvider";
import Loader from "../components/ui/Loader/Loader";
import axios from "axios";

const FoodRequest = () => {
  //state
  const { link, user } = useContext(AuthContext);
  const [addedFood, setAddedFood] = useState([]);
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  //title
  useEffect(() => {
    const pageTitle = "ShareBites | Food Request";
    document.title = pageTitle;
  }, [location]);

  useEffect(() => {
    // Fetch in parallel
    const fetchFood = async () => {
      try {
        const [addedFoodRes] = await Promise.all([
          axios.get(`${link}/get-requested-food/${user.email}`, {
            withCredentials: true,
          }),
        ]);

        const reqFood = addedFoodRes.data.foods;

        // Filter the added food
        // const addedFood = allFood.filter((food) => foodIds.includes(food._id));

        setAddedFood(reqFood);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching food:", error);
        setLoading(false);
      }
    };

    if (user?.email) {
      fetchFood();
    }
  }, [user?.email]);

  return (
    <div>
      <div className="z-50 fixed top-1/2 left-1/2">{loading && <Loader />}</div>
      <h2 className="text-3xl font-semibold text-center  my-8 border-b-2 border-gray-400 w-[250px] mx-auto">
        Requested Food
      </h2>

      {!loading && addedFood.length === 0 && (
        <h2 className="text-3xl font-semibold text-center text-gray-600 mt-16 mb-32">
          No Request found!
        </h2>
      )}
      {/* table */}
      {addedFood.length > 0 && (
        <div className="w-[90%] xl:max-w-[1300px] mx-auto  overflow-x-scroll  mb-20">
          <div className="grid grid-cols-6 gap-y-16 justify-items-center w-[1000px] xl:w-[1200px] max-h-[500px] overflow-y-auto overflow-x-scroll mx-auto bg-primary p-4 rounded-xl">
            <p className="text-lg xl:text-xl  font-semibold text-gray-600">
              Food Name
            </p>
            <p className="text-lg xl:text-xl font-semibold text-gray-600">
              Donator Name
            </p>
            <p className="text-lg xl:text-xl font-semibold text-gray-600">
              Pickup Location
            </p>
            <p className="text-lg xl:text-xl font-semibold text-gray-600">
              Expire Date
            </p>
            <p className="text-lg xl:text-xl font-semibold text-gray-600">
              Request Date
            </p>
            <p className="text-lg xl:text-xl font-semibold text-gray-600">
              Food Status
            </p>
          </div>

          <div className="">
            {addedFood.map((food) => (
              <ReqFoodRow key={food._id} food={food} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default FoodRequest;
