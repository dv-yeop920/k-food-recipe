import React, { useState , useEffect} from "react";
import { useNavigate  } from "react-router";
import * as styled from "../styles/styledComponents";
import { useDispatch } from "react-redux";
import { loginUser } from "../store/userSlice";
import axios from "axios";
import { useSelector } from "react-redux";


const LoginPage = () => {
    const user = useSelector(state => state);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [userId , setUserId] = useState("");
    const [userPassword , setUserPassword] = useState("");
    const [message , setMessage] = useState("");
    const [isLogin , setIsLogin] = useState(false);

    const handleChangeValue = (e) => {
        if(e.target.type === "text") 
            return setUserId(e.target.value);

        if(e.target.type === "password") 
            return setUserPassword(e.target.value);
    }


    const handleClickLogin = (e) => {
        e.preventDefault();
        //유효성 검사
        if(userId === "") return setMessage("아이디를 입력하세요");
        if(userPassword === "") return setMessage("비밀번호를 입력하세요");

        const userInfo = {
            userId: userId,
            password: userPassword
        };

        axios.post("/api/users/login" , userInfo)
            .then((response) => {
                if(response.data.loginSuccess === isLogin) {
                    return setMessage(response.data.messsage);
                }
                if(response.data.loginSuccess === true) {
                    navigate("/myPage");
                    dispatch(loginUser(userInfo));
                    setMessage("");
                    setIsLogin(true);
                    console.log(response);
                }
            })
            .catch((error) => {
                console.log(error);
            });

        console.log(user);
    }

    return (
        <>
        <main className="user-form__container">
            <styled.LoginSignUpform 
            className="user-form"
            onSubmit={handleClickLogin}>
                <h1 id="user-form__title">로그인</h1>

                <input 
                className="user-form__id"
                type="text"
                placeholder="아이디"
                maxLength="12"
                onChange={
                    (e) => {
                    handleChangeValue(e);
                    console.log(userId);
                    console.log(userPassword);
                    }
                }/>

                <input 
                className ="user-form__pw" 
                type="password"
                placeholder="비밀 번호"
                maxLength="15"
                onChange={
                    (e) => {
                        handleChangeValue(e);
                        console.log(userId);
                        console.log(userPassword);
                    }
                }/>

                <span className="error-message">
                    {message}
                </span>

                <div className="user-form__button-box">
                    <styled.LoginSignUpButton
                    className="default-btn" 
                    type="submit">
                        로그인
                    </styled.LoginSignUpButton>

                    <styled.LoginSignUpButton
                    className="default-btn" 
                    type="submit">
                        카카오 로그인
                    </styled.LoginSignUpButton>
                </div>
            </styled.LoginSignUpform>
        </main>
        </>
    );
};

export default LoginPage;