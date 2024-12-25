import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "react-toastify";
import { AuthContext } from "../provider/AuthProvider";
import { useContext } from "react";

export function useAllFood() {
  const {
    isLoading,
    data: allFood,
    error,
  } = useQuery({
    queryKey: ["allFood"],
    queryFn: async () => {
      const response = await axios.get(
        "https://assignment-11-server-orpin-beta.vercel.app/get-food"
      );
      if (response.status !== 200) {
        throw new Error("Network response was not ok");
      }
      return response.data;
    },
  });

  return { isLoading, allFood, error };
}

export function useFeaturedFood() {
  const {
    isLoading,
    data: featuredFood,
    error,
  } = useQuery({
    queryKey: ["featuredFood"],
    queryFn: async () => {
      const response = await axios.get(
        "https://assignment-11-server-orpin-beta.vercel.app/get-featured-food"
      );
      if (response.status !== 200) {
        throw new Error("Network response was not ok");
      }
      return response.data;
    },
  });

  return { isLoading, featuredFood, error };
}

export function useSortedFood() {
  const {
    isLoading,
    data: sortedFood,
    error,
  } = useQuery({
    queryKey: ["sortedFood"],
    queryFn: async () => {
      const response = await axios.get(
        "https://assignment-11-server-orpin-beta.vercel.app/get-sorted-food"
      );
      if (response.status !== 200) {
        throw new Error("Network response was not ok");
      }
      return response.data;
    },
  });

  return { isLoading, sortedFood, error };
}

// Add new food




// export function useAddFood() {
//   const { user } = useContext(AuthContext);
//   const queryClient = useQueryClient();

//   return useMutation(
//     async (foodData) => {
//       const response = await axios
//         .post(
//           "https://assignment-11-server-orpin-beta.vercel.app/add-food",
//           foodData,
//           { withCredentials: true }
//         )
//         .then(() => {
//           axios
//             .get(
//               `https://assignment-11-server-orpin-beta.vercel.app/get-user-food/${user.email}`,
//               { withCredentials: true }
//             )
//             .then((res) => {
//               const existingFoods = res.data?.foods || [];

//               if (!existingFoods.includes(id)) {
//                 const updatedFoods = [...existingFoods, id];

//                 // Update if the user already exists
//                 axios
//                   .patch(
//                     `https://assignment-11-server-orpin-beta.vercel.app/update-user-food/${user.email}`,
//                     {
//                       foods: updatedFoods,
//                     },
//                     { withCredentials: true }
//                   )
//                   .then((res) => {
//                     if (res.status === 200) {
//                       toast.success("Food added successfully!");
//                     }
//                   });
//               }
//             })
//             .catch((err) => {
//               // If the user does not exist, create a new record
//               if (err.response && err.response.status === 404) {
//                 axios
//                   .put(
//                     `https://assignment-10-server-three-theta.vercel.app/add-user-food`,
//                     {
//                       user_id: user.email,
//                       foods: [id],
//                     },
//                     { withCredentials: true }
//                   )
//                   .then((res) => {
//                     if (res.status === 200) {
//                       toast.success("Food added successfully!");
//                     }
//                   });
//               }
//             });
//         })
//         .catch((err) => {
//           toast.error("An error occurred. Please try again.");
//         });
//       return response.data;
//     },
//     {
//       onSuccess: () => {
//         // Invalidate and refetch
//         queryClient.invalidateQueries(["featuredFood", "allFood"]);
//       },
//     }
//   );
// }
