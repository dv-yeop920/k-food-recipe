import { theme } from "store/slice/themeSlice";
import { ClipLoader } from "react-spinners";
import { useSelector } from "react-redux";

const ScrollLoading = () => {
  const isDark = useSelector(theme);
  return (
    <div
      style={{
        marginTop: "2rem",
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start",
      }}
    >
      <ClipLoader
        className="loadig-spinner"
        color={isDark ? "#3498db" : "#36d7b7"}
        size={40}
      />
    </div>
  );
};

export default ScrollLoading;
