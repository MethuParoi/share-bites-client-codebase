import axios from "axios";
import { useContext } from "react";
import { AuthContext } from "../../provider/AuthProvider";

const ReqFoodRow = ({ food }) => {
  const { link } = useContext(AuthContext);

  return (
    <div className="grid grid-cols-6 gap-y-4 justify-items-center w-[1000px] xl:w-[1200px] mx-auto bg-primary p-4 my-4 rounded-xl">
      <p className="text-lg xl:text-xl font-medium text-gray-600 line-clamp-1">
        {food.food_name}
      </p>
      <p className="text-lg xl:text-xl font-medium text-gray-600 line-clamp-1">
        {food.donator_name}
      </p>
      <p className="text-lg xl:text-xl font-medium text-gray-600 line-clamp-1">
        {food.pickup_location}
      </p>
      <p className="text-lg xl:text-xl font-medium text-gray-600 line-clamp-1">
        {food.expired_date}
      </p>
      <p className="text-lg xl:text-xl font-medium text-gray-600 line-clamp-1">
        {food.request_date}
      </p>
      <p className="text-lg xl:text-xl font-medium text-gray-600 line-clamp-1">
        {food.food_status}
      </p>
      {/* second row */}

      <p className="text-lg xl:text-xl font-medium text-gray-600 col-span-2">
        id: {food.food_id}
      </p>
      <p className="text-lg xl:text-xl font-medium text-gray-600 line-clamp-1 col-span-2">
        donator email: {food.donator_email}
      </p>
      <p className="text-lg xl:text-xl font-medium text-gray-600 line-clamp-1 col-span-2">
        additional note: {food.additional_notes}
      </p>
    </div>
  );
};

export default ReqFoodRow;
