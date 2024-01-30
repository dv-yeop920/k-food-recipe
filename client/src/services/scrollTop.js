import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = ({ tabValue }) => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname, tabValue]);

  return;
};

export default ScrollToTop;
