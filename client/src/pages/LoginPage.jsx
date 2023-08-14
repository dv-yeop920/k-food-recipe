import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faX} from "@fortawesome/free-solid-svg-icons";
import * as styled from "../styles/styledComponents";
import { useDispatch } from "react-redux";
import { loginUser } from "../store/slice/userSlice";
import axios from "axios";


const LoginPage = (
    { 
        openCloseLoginModal,
        changeModal,
        userId,
        userPassword,
        handleChangeValue
    }
    ) => {

    const dispatch = useDispatch();
    const [message , setMessage] = useState("");

//로그인 버튼 누르면 입력한 정보를 서버로 보내고 응답 받는 함수
    const handleClickLogin = async (e) => {
        e.preventDefault();
        //유효성 검사
        if(userId === "") return setMessage("아이디를 입력하세요");
        if(userPassword === "") return setMessage("비밀번호를 입력하세요");

        try {
            const userInfo = {
                id: userId,
                password: userPassword,
            };
            
            const response = await axios.post("/api/users/login" , userInfo);

            if(response.data.loginSuccess === false) {
                return setMessage(response.data.messsage);
            }
            if(response.data.loginSuccess === true) {
                openCloseLoginModal();
                setMessage("");
                alert(response.data.messsage);
                return dispatch(loginUser(response.data));
            }
        }
        catch (error) {
            return console.log(error);
        }
    }

    return (
        <>
        <div className = "sign-modal">
            <main className = "user-form__container">
                <styled.LoginSignUpform 
                className = "user-form"
                onSubmit ={ handleClickLogin }
                >

                    <div className = "sign-header">
                        <FontAwesomeIcon
                        className = "user-form__cancel"
                        icon ={ faX }
                        size = "lg"
                        onClick ={ openCloseLoginModal }
                        />
                        <h2 className = "user-form__title">
                        로그인
                        </h2>
                        <div></div>
                    </div>

                    <input 
                    className = "user-form__id"
                    type = "text"
                    placeholder = "아이디"
                    maxLength = "12"
                    onChange ={ handleChangeValue }
                    />

                    <input 
                    className ="user-form__pw" 
                    type="password"
                    placeholder="비밀 번호"
                    maxLength="15"
                    onChange={ handleChangeValue }
                    />

                    <span className = "error-message">
                        { message }
                    </span>

                    <div className = "user-form__button-box">
                        <styled.LoginSignUpButton
                        className = "default-btn" 
                        type = "submit">
                            로그인
                        </styled.LoginSignUpButton>

                        <styled.LoginSignUpButton
                        className = "default-btn" 
                        type = "submit">
                            카카오 로그인
                        </styled.LoginSignUpButton>
                    </div>

                    <div className = "question-container">
                        <span className = "question">
                            계정이 없으신가요?&nbsp;
                        </span>
                        <span 
                        className = "signup-login__navigate"
                        onClick ={ changeModal }>
                                회원가입
                        </span>
                    </div>
                </styled.LoginSignUpform>
            </main>
        </div>
        </>
    );
};

export default LoginPage;