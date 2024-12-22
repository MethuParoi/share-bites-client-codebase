import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ManageFood = () => {
  const location = useLocation();
  useEffect(() => {
    const pageTitle = "ShareBites | Manage Food";
    document.title = pageTitle;
  }, [location]);
  return <div>ManageFood</div>;
};

export default ManageFood;
