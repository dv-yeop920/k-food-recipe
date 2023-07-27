import React from "react";
import * as styled from "../styles/styledComponents";
import { useNavigate  } from "react-router";
import { useSelector } from "react-redux";
//import { useDispatch } from "react-redux";
//import logoutUser from "../store/userSlice";
//import axios from "axios";

const Navbar = () => {
    const navigate = useNavigate();
    //const dispatch = useDispatch();
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
                onClick={() => {
                    return navigate("/login");
                    /*if(user.loginSuccess === true) {
                        axios.get("/api/users/logout")
                        .then((res) => {
                            if(res.data) {
                                navigate("/login");
                                dispatch(logoutUser());
                            }
                        })
                        .catch(error => console.log(error))
                    }
                    else {
                        navigate("/login");
                    }*/
                    }}>
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