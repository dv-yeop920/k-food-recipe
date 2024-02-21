import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = ({ tabParam }) => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname, tabParam]);

  return;
};

export default ScrollToTop;
