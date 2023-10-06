import axios from "axios";
import { useNavigate } from "react-router-dom";



const useAuth = () => {

        const navigate = useNavigate();


        const authAndNavigate = async (e) => {
            const target = e.target;

            try {

                const response = await axios.get("/api/users/auth");

                if (response.data.isAuth === false) {

                    alert("로그인 유저만 이용할 수 있습니다");
                    return;
                }

                if (target.id === "writing-icon") { 
                    navigate("/writing");
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

