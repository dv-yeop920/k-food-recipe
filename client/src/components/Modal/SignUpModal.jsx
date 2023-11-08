import React, { useState } from "react";
import * as styled from "../../styles/styledComponents";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";



const SignUpModal = (
    { 
        openModal,
        closeModal,
        userName,
        userId,
        userPassword,
        checkPassword,
        userEmail,
        onChangeValue,
    }) => {

    const [message , setMessage] = useState("");

    //서버에 입력한 데이터 보내고 응답 받고 유효성 검사 하는 함수
    const handleSignUpRequest = async () => {

        const userInfo = {
            name: userName,
            id: userId,
            password: userPassword,
            email: userEmail
        }

        try {
            const response = 
            await axios.post(
                "/api/users/register" , 
                userInfo , 
                { timeout: 10000 }
            );

            if (response.data.success === false) {
                setMessage(response.data.messsage);
                return;
            }

            if (response.data.success === true) {
                alert(response.data.messsage);
                setMessage("");
                closeModal();
                return;
            }
        }
        catch (error) {
            console.log(error);
        }
    }

//회원가입 서버 요청
    const handleClickSignUp = (e) => {

        e.preventDefault();
        //정규표현식
        const nameRegex = /[ㄱ-ㅎ가-힣ㅏ-ㅣ]/;
        const idRegex = /^[A-Za-z0-9]+$/;
        //이메일 유효성 검사 수정 해야함
        const emailRegex = /^[a-zA-Z0-9]+@[a-z0-9-]+\.[a-z]+$/

        //유효성 검사
        if(!nameRegex.test(userName)) 
            return setMessage("이름은 한글로 작성해 주세요");

        if(userName.length < 2) 
            return setMessage("이름은 2글자 이상부터 입니다");
        
        if(!idRegex.test(userId)) 
            return setMessage("아이디는 영어,숫자로만 작성해 주세요");
        
        if(userPassword.length < 8) 
            return setMessage("비밀번호 길이는 최소 8자 이상입니다");

        if(userPassword !== checkPassword)
            return setMessage("비밀번호와 비밀번호 확인 값이 일치하지 않습니다");
        
        if(!emailRegex.test(userEmail)) 
            return setMessage("올바른 이메일 형식이 아닙니다");
            
        return handleSignUpRequest();
    }

    return (
        <>
        <main className = "user-form__container">
            <styled.LoginSignUpform 
            className = "user-form"
            onSubmit = { handleClickSignUp }>
                <div className = "sign-header">
                    <FontAwesomeIcon
                    className = "user-form__cancel"
                    icon = { faX }
                    size = "lg"
                    onClick = { closeModal }/>

                    <h2 className ="user-form__title">
                        회원 가입
                    </h2>

                    <div></div>
                </div>

                <input 
                className = "user-form__name" 
                type = "text"
                placeholder = "이름" 
                onChange = { onChangeValue } />

                <input 
                className = "user-form__id"
                type = "text"
                placeholder = "아이디 5~15자리 특수 문자는 제외"
                maxLength = "15"
                onChange = { onChangeValue } />

                <input 
                className = "user-form__pw" 
                type = "password"
                maxLength = "15"
                placeholder = "비밀 번호  8자리~15자리 영어,숫자,특수 문자 포함" 
                onChange = { onChangeValue } />

                <input 
                className = "user-form__pw-check" 
                type = "password"
                placeholder = "비밀 번호 확인"
                onChange = { onChangeValue } />

                <input 
                className = "user-form__email" 
                type = "email"
                placeholder = "이메일" 
                onChange = { onChangeValue } />

                <span className = "error-message">
                    { message }
                </span>

                <styled.LoginSignUpButton
                className = "default-btn" 
                type = "submit" >
                    가입 하기
                </styled.LoginSignUpButton>

                <div className = "question-container">
                    <span className = "question">
                        이미 계정이 있으신가요?&nbsp;
                    </span>

                    <span 
                    className = "signup-login__navigate"
                    onClick = { () => openModal("login") }>
                        로그인
                    </span>
                </div>
            </styled.LoginSignUpform>
        </main>
        </>
    );
};

export default SignUpModal;