import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useLocation } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthContext } from "../provider/AuthProvider";
import axios from "axios";
import Loader from "../components/ui/Loader/Loader";

const AddFood = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useContext(AuthContext);
  const location = useLocation();
  const donator_email = user.email;
  const donator_name = user.displayName;
  const donator_image = user.photoURL;
  const food_status = "available";

  useEffect(() => {
    const pageTitle = "ShareBites | Add Food";
    document.title = pageTitle;
  }, [location]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    setIsLoading(true);
    const foodData = {
      ...data,
      donator_name,
      donator_email,
      donator_image,
      food_status,
    };
    // console.log(movieData);
    axios
      .post(
        "https://assignment-11-server-orpin-beta.vercel.app/add-food",
        foodData
      )
      .then((res) => {
        if (res.status === 200) {
          toast.success("Food added successfully!");
          setIsLoading(false);
        }
      })
      .catch((err) => {
        toast.error("An error occurred. Please try again.");
      });
  };

  return (
    <div className="sm:p-6 p-2  mx-auto mb-10">
      <div className="z-50 fixed top-1/2 left-1/2">
        {isLoading && <Loader />}
      </div>
      <h2 className="text-3xl font-semibold text-center  my-8 border-b-2 border-gray-400 w-[250px] mx-auto">
        Add Food
      </h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Food Img */}
        <div className="relative mb-8">
          <label className="block mb-2 font-medium">Food Image URL</label>
          <input
            type="url"
            placeholder="Enter Image URL"
            {...register("food_image", {
              required: "Food image is required",
              pattern: {
                value: /^(https?:\/\/)/,
                message: "Please provide a valid image URL",
              },
            })}
            className="input-field border-2 border-gray-400 rounded-lg shadow-lg h-10 px-2"
          />
          {errors.food_image && (
            <span className="text-red-500 absolute bottom-[-25px] left-0">
              {errors.food_image.message}
            </span>
          )}
        </div>

        {/* Food Title */}
        <div className="relative mb-8">
          <label className="block mb-2 font-medium">Food Name</label>
          <input
            type="text"
            placeholder="Enter Food Name"
            {...register("food_name", {
              required: "Food name is required",
              minLength: {
                value: 2,
                message: "Food name must be at least 2 characters",
              },
            })}
            className="input-field border-2 border-gray-400 rounded-lg shadow-lg h-10 px-2"
          />
          {errors.food_name && (
            <span className="text-red-500 absolute bottom-[-25px] left-0">
              {errors.food_name.message}
            </span>
          )}
        </div>

        {/* Food Quantity */}
        <div className="relative mb-8">
          <label className="block mb-2 font-medium">Food Quantity</label>
          <input
            type="number"
            placeholder="Enter Food Quantity "
            {...register("food_quantity", {
              required: "Food quantity is required",

              min: {
                value: 1,
                message: "Food quantity must be at least 1",
              },
            })}
            className="input-field border-2 border-gray-400 rounded-lg shadow-lg h-10 px-2"
          />
          {errors.food_quantity && (
            <span className="text-red-500 absolute bottom-[-25px] left-0">
              {errors.food_quantity.message}
            </span>
          )}
        </div>

        {/* pickup_location */}
        <div className="relative mb-8">
          <label className="block mb-2 font-medium">Pickup Location</label>
          <input
            type="text"
            placeholder="Enter Pickup Location"
            {...register("pickup_location", {
              required: "Duration is required",
              minLength: {
                value: 2,
                message: "Must be at least 2 characters",
              },
            })}
            className="input-field border-2 border-gray-400 rounded-lg shadow-lg h-10 px-2"
          />
          {errors.pickup_location && (
            <span className="text-red-500 absolute bottom-[-25px] left-0">
              {errors.pickup_location.message}
            </span>
          )}
        </div>

        {/* Expire date */}
        <div className="relative mb-8">
          <label className="block mb-2 font-medium">Expire Date</label>
          <input
            type="date"
            {...register("expired_date", {
              required: "Please select an expire date",
            })}
            className="input-field border-2 border-gray-400 rounded-lg shadow-lg h-10 px-2"
          />
          {errors.expired_date && (
            <span className="text-red-500 absolute bottom-[-25px] left-0">
              {errors.expired_date.message}
            </span>
          )}
        </div>

        {/* Additional Notes */}
        <div className="relative mb-16">
          <label className="block mb-2 font-medium">Additional Notes</label>
          <textarea
            placeholder="Enter a Additional Note"
            {...register("additional_notes", {
              required: "additional notes is required",
              minLength: {
                value: 5,
                message: "additional notes must be at least 5 characters",
              },
            })}
            className="input-field border-2 border-gray-400 rounded-lg shadow-lg h-20 px-2"
          />
          {errors.additional_notes && (
            <span className="text-red-500 absolute bottom-[-25px] left-0">
              {errors.additional_notes.message}
            </span>
          )}
        </div>

        <div className="my-8">
          <button
            type="submit"
            className="mt-6 px-4 w-[310px] py-2 bg-secondary text-white rounded hover:bg-accent"
            disabled={isLoading}
          >
            Add Food
          </button>
        </div>
      </form>
      <ToastContainer />
    </div>
  );
};

export default AddFood;
