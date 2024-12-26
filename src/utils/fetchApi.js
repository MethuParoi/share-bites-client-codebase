import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";


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

// Mutation to delete food
export function useDeleteFood() {
  const queryClient = useQueryClient();

  return useMutation(
    async (food_id) => {
      const response = await axios.delete(
        `https://assignment-11-server-orpin-beta.vercel.app/delete-food/${food_id}`,
        { withCredentials: true }
      );
      return response.data;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["allFood"]);
        queryClient.invalidateQueries(["featuredFood"]);
      },
    }
  );
}