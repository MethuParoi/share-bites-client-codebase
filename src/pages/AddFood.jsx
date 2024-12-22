import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const AddFood = () => {
  const location = useLocation();
  useEffect(() => {
    const pageTitle = "ShareBites | Add Food";
    document.title = pageTitle;
  }, [location]);
  return <div>AddFood</div>;
};

export default AddFood;
