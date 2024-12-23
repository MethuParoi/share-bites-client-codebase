import { useQuery } from "@tanstack/react-query";
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
      if (!response.status !== 200) {
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


