import React, { useState } from "react";
import { useNavigate } from "react-router";
import * as styled from "../styles/styledComponents";
import { useDispatch } from "react-redux";
import { loginUser } from "../store/slice/userSlice";
import axios from "axios";


const LoginPage = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [userId , setUserId] = useState("");
    const [userPassword , setUserPassword] = useState("");
    const [message , setMessage] = useState("");

    //값을 입력 하면 state에 담는 함수
    const handleChangeValue = (e) => {
        if(e.target.type === "text") 
            return setUserId(e.target.value);

        if(e.target.type === "password") 
            return setUserPassword(e.target.value);
    }

//로그인 버튼 누르면 입력한 정보를 서버로 보내고 응답 받는 함수
    const handleClickLogin = (e) => {
        e.preventDefault();
        //유효성 검사
        if(userId === "") return setMessage("아이디를 입력하세요");
        if(userPassword === "") return setMessage("비밀번호를 입력하세요");
        
        const userInfo = {
            id: userId,
            password: userPassword,
        };
        
        axios.post("/api/users/login" , userInfo)
            .then((response) => {
                if(response.data.loginSuccess === false) {
                    return setMessage(response.data.messsage);
                }
                if(response.data.loginSuccess === true) {
                    navigate("/myPage");
                    setMessage("");
                    dispatch(loginUser(response.data));
                    console.log(response.data , response.status);
                }
            })
            .catch((error) => {
                return console.log(error);
            });
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
                onChange={handleChangeValue}/>

                <input 
                className ="user-form__pw" 
                type="password"
                placeholder="비밀 번호"
                maxLength="15"
                onChange={handleChangeValue}/>

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
                <div className="question-container">
                    <span className="question">
                        계정이 없으신가요?&nbsp;
                    </span>
                    <span 
                    className="signup-login__navigate"
                    onClick={() => navigate("/signUp")}>
                            회원가입
                    </span>
                </div>
            </styled.LoginSignUpform>
        </main>
        </>
    );
};

export default LoginPage;