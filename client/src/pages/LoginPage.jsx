import React from "react";
import * as styled from "../styles/styledComponents";

const LoginPage = () => {
    return (
        <>
        <styled.formContainer>
            <h1 id="login-sign-up__title">로그인</h1>
            <form className="login-form">
                <div className="field">
                    <styled.UserInput 
                    className ="user-id" 
                    type="text"
                    placeholder="아이디"/>
                </div>

                <div className="field">
                    <styled.UserInput 
                    className ="user-pw" 
                    type="password"
                    placeholder="비밀 번호"/>
                </div>

                <div className="button-box">
                    <styled.DefaultButton
                    className="login-sign-up__button" 
                    type="submit">
                        로그인
                    </styled.DefaultButton>

                    <styled.DefaultButton
                    className="login-sign-up__button" 
                    type="submit">
                        구글 로그인
                    </styled.DefaultButton>

                    <styled.DefaultButton
                    className="login-sign-up__button" 
                    type="submit">
                        카카오 로그인
                    </styled.DefaultButton>
                </div>
            </form>
        </styled.formContainer>
        </>
    );
};

export default LoginPage;