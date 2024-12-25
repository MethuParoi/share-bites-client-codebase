import React from "react";

const FoodRow = ({ food, setFoodId, set_id, onEditFood }) => {
  return (
    <div className="grid grid-cols-6 gap-y-16 justify-items-center w-[1000px]  xl:w-[1200px] mx-auto bg-primary p-4 my-4 rounded-xl">
      <p className="text-lg xl:text-xl  font-medium text-gray-600">
        {food.food_name}
      </p>
      <p className="text-lg xl:text-xl font-medium text-gray-600">
        {food.food_quantity}
      </p>
      <p className="text-lg xl:text-xl font-medium text-gray-600">
        {food.pickup_location}
      </p>
      <p className="text-lg xl:text-xl font-medium text-gray-600">
        {food.expired_date}
      </p>
      <p className="text-lg xl:text-xl font-medium text-gray-600">
        {food.food_status}
      </p>
      {/* buttons */}
      <div className="flex space-x-4">
        <button
          onClick={() => onEditFood(food)}
          className="bg-secondary hover:bg-teal-600 text-white px-4 py-2 rounded-lg"
        >
          Edit
        </button>
        <button
          onClick={() => {
            document.getElementById("my_modal_3").showModal();

            setFoodId(food.food_id);
            set_id(food._id);
          }}
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg"
        >
          Remove
        </button>
      </div>
    </div>
  );
};

export default FoodRow;
