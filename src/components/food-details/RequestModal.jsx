import { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { AuthContext } from "../../provider/AuthProvider";
import { useForm } from "react-hook-form";
import axios from "axios";
import Loader from "../ui/Loader/Loader";
// setRefetch; food_id,
const RequestModal = ({ foodDetail }) => {
  const [isLoading, setIsLoading] = useState(false);
  const { link, user } = useContext(AuthContext);

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
        food_id: foodDetail._id,
        donator_email: foodDetail.donator_email,
        donator_name: foodDetail.donator_name,
        user_email: user.email,
        pickup_location: foodDetail.pickup_location,
        expired_date: foodDetail.expired_date,
        additional_notes: foodDetail.additional_notes,
        request_date: new Date().toISOString().split("T")[0],
      });
    }
  }, [foodDetail, reset]);

  const onSubmit = async (formData) => {
    const data = {
      food_image: foodDetail.food_image,
      food_name: foodDetail.food_name,
      food_id: foodDetail._id,
      donator_email: foodDetail.donator_email,
      donator_name: foodDetail.donator_name,
      user_email: user.email,
      pickup_location: foodDetail.pickup_location,
      expired_date: foodDetail.expired_date,
      additional_notes: formData.additional_notes,
      request_date: new Date().toISOString().split("T")[0],
      food_status: "requested",
    };
    try {
      setIsLoading(true);
      // GET request to fetch user food
      const res = await axios.get(`${link}/get-requested-food/${user.email}`, {
        withCredentials: true,
      });
      const existingFoods = res.data?.foods || [];
      // console.log("existingFoods", existingFoods._id);

      if (existingFoods) {
        const updatedFoods = [...existingFoods, data];
        // console.log("id", foodDetail?._id);

        // PATCH request to update req food and available status
        await Promise.all([
          axios.patch(
            `${link}/update-requested-food/${user.email}`,
            { foods: updatedFoods },
            { withCredentials: true }
          ),

          axios.patch(
            `${link}/update-food/${foodDetail?._id}`,
            { food_status: "requested" },
            {
              withCredentials: true,
            }
          ),
        ]);
      }
      toast.success("Food requested successfully!");
      setIsLoading(false);
      document.getElementById("req_food_modal").close();
    } catch (err) {
      if (err.response && err.response.status === 404) {
        const { email } = user; // Ensure email is defined here

        // PUT request to add req food
        await Promise.all([
          axios.put(
            `${link}/add-requested-food`,
            { user_id: email, foods: [data] },
            { withCredentials: true }
          ),
          axios.patch(
            `${link}/update-food/${foodDetail?._id}`,
            { food_status: "requested" },
            {
              withCredentials: true,
            }
          ),
        ]);
        toast.success("Food requested successfully!");
        setIsLoading(false);
        document.getElementById("req_food_modal").close();
      } else {
        toast.error("An error occurred. Please try again.");
        setIsLoading(false);
        document.getElementById("req_food_modal").close();
      }
      setIsLoading(false);
      document.getElementById("req_food_modal").close();
    }
    toast.success("Food requested successfully!");
  };

  return (
    <dialog id="req_food_modal" className="modal">
      <div className="modal-box relative">
        <button
          onClick={() => document.getElementById("req_food_modal").close()}
          className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
        >
          ✕
        </button>
        {isLoading && (
          <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-30">
            <Loader />
          </div>
        )}
        <h3 className="font-bold text-lg lg:text-xl text-center mt-6 mb-5 border-b-2 border-gray-400 w-[200px] mx-auto">
          Request Food
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
                readOnly
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
                readOnly
              />
              {errors.food_name && (
                <span className="text-red-500">{errors.food_name.message}</span>
              )}
            </div>

            {/* Food Id */}
            <div className="relative mb-8">
              <label className="block mb-2 font-medium">Food Id</label>
              <input
                readOnly
                type="text"
                placeholder="Enter Food Quantity "
                {...register("food_id", {
                  required: "Food id is required",

                  min: {
                    value: 1,
                    message: "Food id must be at least 1",
                  },
                })}
                className="input-field border-2 border-gray-400 rounded-lg shadow-lg h-10 px-2"
              />
              {errors.food_id && (
                <span className="text-red-500 absolute bottom-[-25px] left-0">
                  {errors.food_id.message}
                </span>
              )}
            </div>

            {/* Donator Email */}
            <div className="relative mb-8">
              <label className="block mb-2 font-medium">Donator Email</label>
              <input
                type="text"
                placeholder="Enter Food Name"
                {...register("donator_email", {
                  required: "Food name is required",
                  minLength: {
                    value: 2,
                    message: "Food name must be at least 2 characters",
                  },
                })}
                className="input-field border-2 border-gray-400 rounded-lg shadow-lg h-10 px-2"
                readOnly
              />
              {errors.donator_email && (
                <span className="text-red-500">
                  {errors.donator_email.message}
                </span>
              )}
            </div>

            {/* Donator Name */}
            <div className="relative mb-8">
              <label className="block mb-2 font-medium">Donator Name</label>
              <input
                type="text"
                placeholder="Enter Food Name"
                {...register("donator_name", {
                  required: "Food name is required",
                  minLength: {
                    value: 2,
                    message: "Food name must be at least 2 characters",
                  },
                })}
                className="input-field border-2 border-gray-400 rounded-lg shadow-lg h-10 px-2"
                readOnly
              />
              {errors.donator_name && (
                <span className="text-red-500">
                  {errors.donator_name.message}
                </span>
              )}
            </div>

            {/* User Email */}
            <div className="relative mb-8">
              <label className="block mb-2 font-medium">User Email</label>
              <input
                type="text"
                placeholder="Enter Food Name"
                {...register("user_email", {
                  required: "Food name is required",
                  minLength: {
                    value: 2,
                    message: "Food name must be at least 2 characters",
                  },
                })}
                className="input-field border-2 border-gray-400 rounded-lg shadow-lg h-10 px-2"
                readOnly
              />
              {errors.user_email && (
                <span className="text-red-500">
                  {errors.user_email.message}
                </span>
              )}
            </div>

            {/* pickup_location */}
            <div className="relative mb-8">
              <label className="block mb-2 font-medium">Pickup Location</label>
              <input
                readOnly
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
                readOnly
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

            {/* Request date */}
            <div className="relative mb-8">
              <label className="block mb-2 font-medium">Request Date</label>
              <input
                readOnly
                type="date"
                {...register("request_date", {
                  required: "Please select an request date",
                })}
                className="input-field border-2 border-gray-400 rounded-lg shadow-lg h-10 px-2"
              />
              {errors.request_date && (
                <span className="text-red-500 absolute bottom-[-25px] left-0">
                  {errors.request_date.message}
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
                Request Food
              </button>
            </div>
          </form>
        </div>
      </div>
    </dialog>
  );
};

export default RequestModal;
