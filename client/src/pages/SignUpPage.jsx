import React, { useState } from "react";
import * as styled from "../styles/styledComponents";

const SignUpPage = () => {
    const [name , setName] = useState("");
    const [birthDate , setBirthDate] = useState("");
    const [userId , setUserId] = useState("");
    const [password , setPassword] = useState("");
    const [checkPassword , setCheckPassword] = useState("");
    const [email , setEmail] = useState("");
    return (
        <>
        <main className="user-form__container">
            <styled.LoginSignUpform className="user-form">
                <h1 id="user-form__title">회원 가입</h1>

                <input 
                className ="user-form__name" 
                type="text"
                placeholder="이름" />

                <input 
                className ="user-form__birthday" 
                type="text"
                placeholder="생년 월일 8자리" />

                <input 
                className="user-form__id"
                type="text"
                placeholder="아이디 8~12자리 특수 문자는 제외" />

                <input 
                className ="user-form__pw" 
                type="password"
                placeholder="비밀 번호" />

                <input 
                className ="user-form__pw-check" 
                type="password"
                placeholder="비밀 번호  8자리~15자리 영어,숫자,특수 문자 포함"/>

                <input 
                className ="user-form__email" 
                type="email"
                placeholder="[선택] 비밀 번호 분실시 이메일" />

                <styled.LoginSignUpButton
                    className="default-btn" 
                    type="submit">
                        가입 하기
                </styled.LoginSignUpButton>
            </styled.LoginSignUpform>
        </main>
        </>
    );
};

export default SignUpPage;