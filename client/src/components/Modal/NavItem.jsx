import React from "react";
import { useNavigate } from "react-router";
import { useSelector ,  useDispatch } from "react-redux";
import { logoutUser } from "../../store/slice/userSlice";
import axios from "axios";
import useAuth from "../../hooks/useAuth";
import { closeModal, openModal } from "../../store/slice/modalSlice";




const NavItem = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const user = useSelector(state => state.user);
    const { authAndNavigate } = useAuth();


    const handleClickLogout = async () => {
        try {
            if (window.confirm("로그아웃 하시겠습니까?")) {
                const response = 
                await axios.post("/api/users/logout");

                if (response.status === 200) {
                    //onClickMenuModal();
                    alert(response.data.messsage);
                    dispatch(logoutUser());
                    dispatch(closeModal());
                    navigate("/");
                    return;
                }
            }
        }
        catch (error) {
            console.log(error);
        }
    }

    return (
        <>
        <div className = "navbar-container">
            <nav className = "navbar">
                <ul className = "navbar__column">
                    <li
                    className = "navbar-link"
                    onClick = { () => {
                        navigate("/noticeBoard");
                        dispatch(closeModal());
                        return;
                    }} >
                        자유 게시판
                    </li>

                    <li 
                    style = {{ borderBottom:"1px solid #ddd" }}
                    className = "navbar-link"
                    onClick = { () => {
                        authAndNavigate("/myPage");
                        dispatch(closeModal());
                        return;
                    }}>
                        마이페이지
                    </li>

                    { 
                        user.isLogin === true ? 
                        null 
                        :
                        <li 
                        className = "navbar-link"
                        onClick = {() => {
                            dispatch(openModal("signup"));
                        }}> 
                            회원 가입
                        </li>
                    }

                    <li 
                    className = "navbar-link"
                    onClick = { () => {
                        user.isLogin === false && dispatch(openModal("login"));
                        user.isLogin === true && handleClickLogout();
                        return;
                    }}>
                        { user.isLogin === true ? "로그아웃" : "로그인" }
                    </li>
                </ul>
            </nav>
        </div>
        </>
    );
};

export default NavItem;




