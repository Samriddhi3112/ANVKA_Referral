import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const RouteTracker = () => {
  const location = useLocation();

  useEffect(() => {
    if (location.pathname !== "/") {
      sessionStorage.setItem("lastRoute", location.pathname);
    }
  }, [location.pathname]);

  return null;
};

export default RouteTracker;
