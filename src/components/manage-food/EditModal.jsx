import { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { AuthContext } from "../../provider/AuthProvider";
import { useForm } from "react-hook-form";
import axios from "axios";
import Loader from "../ui/Loader/Loader";

const EditModal = ({ food_id, foodDetail, setRefetch }) => {
  const [isLoading, setIsLoading] = useState(false);
  const { link } = useContext(AuthContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  useEffect(() => {
    if (foodDetail) {
      reset({
        food_image: foodDetail.food_image,
        food_name: foodDetail.food_name,
        food_quantity: foodDetail.food_quantity,
        pickup_location: foodDetail.pickup_location,
        expired_date: foodDetail.expired_date,
        additional_notes: foodDetail.additional_notes,
      });
    }
  }, [foodDetail, reset]);

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      const response = await axios.patch(
        `${link}/update-food/${food_id}`,
        data,
        {
          withCredentials: true,
        }
      );
      if (response.status === 200) {
        toast.success("Food updated successfully!");
        setRefetch((prev) => !prev);
        document.getElementById("my_modal_4").close();
      }
    } catch (error) {
      toast.error("An error occurred while updating food. Please try again.");
      document.getElementById("my_modal_4").close();
    } finally {
      setIsLoading(false);
      document.getElementById("my_modal_4").close();
      toast.success("Food updated successfully!");
    }
    toast.success("Food updated successfully!");
  };

  return (
    <dialog id="my_modal_4" className="modal">
      <div className="modal-box relative">
        <button
          onClick={() => document.getElementById("my_modal_4").close()}
          className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
        >
          ✕
        </button>
        {isLoading && (
          <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-30">
            <Loader />
          </div>
        )}
        <h3 className="font-bold text-lg lg:text-xl text-center mt-6 mb-5 border-b-2 border-gray-400 w-[250px] mx-auto">
          Update Food Details
        </h3>
        <div className="flex justify-center items-center">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Food Image */}
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
                <span className="text-red-500">
                  {errors.food_image.message}
                </span>
              )}
            </div>

            {/* Food Name */}
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
                <span className="text-red-500">{errors.food_name.message}</span>
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

            <div className="mt-8">
              <button
                type="submit"
                className="w-full py-2 bg-secondary text-white rounded hover:bg-accent"
                disabled={isLoading}
              >
                Update Food
              </button>
            </div>
          </form>
        </div>
      </div>
    </dialog>
  );
};

export default EditModal;
