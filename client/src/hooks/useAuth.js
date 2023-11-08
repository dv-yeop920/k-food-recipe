import axios from "axios";
import { useNavigate } from "react-router-dom";
import { openModal } from "../store/slice/modalSlice";
import { useDispatch } from "react-redux";




const useAuth = () => {

        const navigate = useNavigate();
        const dispatch = useDispatch();

        const authAndNavigate = async (route) => {
            try {
                const response = await axios.get("/api/users/auth");

                if (response.data.isAuth === true) {
                    navigate(route);
                }

                if (response.data.isAuth === false) {
                    alert("로그인 유저만 이용할 수 있습니다");
                    dispatch(openModal('login'));
                    return;
                }
            }
            catch (error) {
                console.log(error);
            }
        } 

        return { authAndNavigate }
};

export default useAuth;

