/*import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { openModal } from "../store/slice/modalSlice";


const Auth = (SpecificComponent) => {

    return function AuthenticationCheck(props) {
        const dispatch = useDispatch();
        const [isAuth, setIsAuth] = useState(null);

        const fetchData = async () => {
          try {
              const response = await axios.get("/api/users/auth");

              if (!response.data.isAuth) {
                alert('로그인 유저만 이용할 수 있습니다');
                dispatch(openModal('login'));
                setIsAuth(false);
                return;
              }
              setIsAuth(true);
          } 
          catch (error) {
              console.log(error);
          }
        }

        useEffect(() => {
          fetchData();
        },[]);

        if (isAuth === null) {
          return null;  // 인증 상태가 확인되지 않은 경우에는 아무것도 렌더링하지 않습니다.
        }
        else {
          return (
            <SpecificComponent {...props} />
        );
        }
    }
}

export default Auth;*/