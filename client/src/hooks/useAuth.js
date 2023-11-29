import axios from "axios";
import { useNavigate } from "react-router-dom";
import { openModal } from "../store/slice/modalSlice";
import { useDispatch } from "react-redux";
import { loginUser } from "../store/slice/userSlice";

const useAuth = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const authAndNavigate = async route => {
    try {
      const response = await axios.get("/api/users/auth");

      if (response.data.isAuth === true) {
        dispatch(loginUser(response.data));
        if (route) {
          navigate(route);
        }
        return;
      }

      if (response.data.isAuth === false) {
        alert(response.data.message);
        dispatch(openModal("login"));
        return;
      }
    } catch (error) {
      console.log(error);
    }
  };

  return { authAndNavigate };
};

export default useAuth;
