import React from "react";
import * as styled from "../styles/styledComponents";
import { useNavigate  } from "react-router";

const Navbar = () => {
    const navigate = useNavigate();
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
                style={{"marginRight":"30px","marginLeft":"0px"}}
                    onClick={() => navigate("/recipe")}>
                        레시피
                </styled.MenuItem>
                <styled.MenuItem
                onClick={() => navigate("/noticeBoard")}>
                    자유게시판
                </styled.MenuItem>
            </styled.MenuList>

            <styled.MenuList>
                <styled.MenuItem
                onClick={() => navigate("/myPage")}>
                    마이페이지
                </styled.MenuItem>
                <styled.MenuItem
                onClick={() => navigate("/login")}>
                    로그인
                </styled.MenuItem>
                <styled.MenuItem
                onClick={() => navigate("/signUp")}>
                    회원가입
                </styled.MenuItem>
            </styled.MenuList>
        </styled.Navbar>
        </>
    );
};

export default Navbar;