import React from "react";
import * as styled from "../styles/styledComponents";
import { useNavigate  } from "react-router";
import { useSelector } from "react-redux";


const Navbar = () => {
    const navigate = useNavigate();
    const user = useSelector(state => state.user);

    
    return (
        <>
        <styled.Navbar>
            <styled.MenuList>
                <styled.NavTitle
                style={{"marginRight":"30px"}} 
                    onClick={() => navigate("/")}>
                        K레시피
                </styled.NavTitle>
                <styled.MenuItem
                style={{"marginRight":"30px","marginLeft":"50px"}}
                    onClick={() => navigate("/recipe")}>
                        레시피
                </styled.MenuItem>
                <styled.MenuItem
                onClick={() => {
                    if(user.loginSuccess === false) {
                        alert("회원만 이용할 수 있습니다");
                        return navigate("/signUp")
                    }
                    return navigate("/noticeBoard")
                }}>
                    자유게시판
                </styled.MenuItem>
            </styled.MenuList>

            <styled.MenuList>
                <styled.MenuItem
                onClick={() => {
                    if(user.loginSuccess === false) {
                        alert("회원만 이용할 수 있습니다");
                        return navigate("/signUp")
                    }
                    return navigate("/myPage");
                }}>
                    마이페이지
                </styled.MenuItem>
                <styled.MenuItem
                onClick={() => navigate("/login")}>
                    {user.loginSuccess === true ? "":"로그인"}
                </styled.MenuItem>
                <styled.MenuItem
                onClick={() => navigate("/signUp")}>
                    {user.loginSuccess === true ? "":"회원 가입"}
                </styled.MenuItem>
            </styled.MenuList>
        </styled.Navbar>
        </>
    );
};

export default Navbar;