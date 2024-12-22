import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const FoodRequest = () => {
  const location = useLocation();
  useEffect(() => {
    const pageTitle = "ShareBites | Food Request";
    document.title = pageTitle;
  }, [location]);
  return <div>FoodRequest</div>;
};

export default FoodRequest;
