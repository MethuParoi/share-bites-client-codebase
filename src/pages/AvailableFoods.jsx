import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const AvailableFoods = () => {
  const location = useLocation();
  useEffect(() => {
    const pageTitle = "ShareBites | Available Foods";
    document.title = pageTitle;
  }, [location]);
  return <div>AvailableFoods</div>;
};

export default AvailableFoods;
