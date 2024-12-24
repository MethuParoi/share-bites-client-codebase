import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Loader from "../components/ui/Loader/Loader";
import { IoSearch } from "react-icons/io5";
import { useAllFood, useSortedFood } from "../utils/fetchApi";
import FoodCard from "../components/home/FoodCard";
import { LuLayoutDashboard } from "react-icons/lu";
import { FaSortAmountDownAlt } from "react-icons/fa";

const AvailableFoods = () => {
  const location = useLocation();
  useEffect(() => {
    const pageTitle = "ShareBites |  Available Foods";
    document.title = pageTitle;
  }, [location]);

  //fetch all food
  const { isLoading, allFood, error } = useAllFood();
  const { sortedFood } = useSortedFood();

  const [filteredFood, setFilteredFood] = useState([]);
  const [availableFood, setAvailableFood] = useState([]);
  const [sort, setSort] = useState(false);
  const [search, setSearch] = useState("");
  const [layout, setLayout] = useState(false);

  useEffect(() => {
    const available = allFood?.filter(
      (food) => food.food_status === "available"
    );
    setAvailableFood(available);
  }, [allFood]);

  const handleSearch = () => {
    const filtered = allFood.filter((food) =>
      food.food_name.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredFood(filtered);
  };
  return (
    <div>
      <div className="z-50 fixed top-1/2 left-1/2">
        {isLoading && <Loader />}
      </div>
      <div className="xl:max-w-[1150px] mx-auto my-4 flex-col justify-center">
        <div className="flex items-center justify-center">
          <input
            className="border-2 border-gray-400 rounded-lg shadow-lg h-10 w-[250px] sm:w-[350px] px-2"
            type="text"
            onChange={(e) => {
              setSort(false);
              setSearch(e.target.value);
              handleSearch();
            }}
            placeholder="Search for food"
          />
          <button
            onClick={handleSearch}
            className="h-10 w-14 bg-secondary flex items-center justify-center ml-[-5px] rounded-r-lg hover:bg-accent"
          >
            <IoSearch className="text-2xl text-gray-200" />
          </button>
        </div>

        <div className="flex items-center justify-start gap-x-4">
          <button
            onClick={() => setSort(true)}
            className="bg-secondary hover:bg-accent text-white text-lg font-semibold px-2 py-1 rounded-lg mt-4 flex items-center gap-x-2"
          >
            Sort items
            <FaSortAmountDownAlt />
          </button>

          <button
            onClick={() => setLayout(!layout)}
            className="bg-secondary hover:bg-accent text-white text-lg font-semibold px-2 py-1 rounded-lg mt-4 flex items-center gap-x-2"
          >
            Change Layout
            <LuLayoutDashboard />
          </button>
        </div>
      </div>
      <h2 className="text-3xl font-semibold text-center  my-8 border-b-2 border-gray-400 w-[250px] mx-auto">
        {search.length !== 0
          ? "Searched Food"
          : sort
          ? "Sorted Foods"
          : "Available Foods"}
      </h2>
      <div
        className={`grid grid-cols-1 sm:grid-cols-2 ${
          layout ? "lg:grid-cols-2" : "lg:grid-cols-3"
        } gap-y-16 justify-items-center my-16 xl:max-w-[1300px] mx-auto`}
      >
        {sort &&
          search.length === 0 &&
          sortedFood &&
          sortedFood.map((food) => <FoodCard key={food._id} food={food} />)}
        {!sort &&
          search.length !== 0 &&
          filteredFood &&
          filteredFood.map((food) => <FoodCard key={food._id} food={food} />)}

        {!sort &&
          search.length === 0 &&
          availableFood &&
          availableFood.map((food) => <FoodCard key={food._id} food={food} />)}
      </div>
    </div>
  );
};

export default AvailableFoods;
