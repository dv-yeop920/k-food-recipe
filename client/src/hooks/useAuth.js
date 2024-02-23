import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { openModal } from "store/slice/modalSlice";
import { loginUser } from "store/slice/userSlice";
import toastMessage from "utils/toast";

const useAuth = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const authAndNavigate = async route => {
    try {
      const response = await axios.get("/api/users/auth");

      if (response.data.isAuth) {
        dispatch(loginUser(response.data));
        if (route) {
          navigate(route);
        } else {
          return;
        }
      }
    } catch (error) {
      toastMessage(error.response.data.error);
      dispatch(openModal("login"));
    }
  };

  return { authAndNavigate };
};

export default useAuth;
