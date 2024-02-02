import React from "react";
import { ClipLoader } from "react-spinners";
import { useSelector } from "react-redux";
import { theme } from "../../store/slice/themeSlice";

const ScrollLoading = () => {
  const isDark = useSelector(theme);
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start",
      }}
    >
      <ClipLoader
        className="loadig-spinner"
        color={isDark ? "#3498db" : "#36d7b7"}
        size={50}
      />
    </div>
  );
};

export default ScrollLoading;
