import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export function useAllFood() {
  const {
    isLoading,
    data: allFood,
    error,
  } = useQuery({
    queryKey: ["cabins"],
    queryFn: async () => {
      const response = await axios.get(
        "https://assignment-11-server-orpin-beta.vercel.app/get-food"
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    },
  });

  return { isLoading, allFood, error };
}
