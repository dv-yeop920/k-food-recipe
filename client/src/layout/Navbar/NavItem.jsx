import React from "react";
import { useNavigate } from "react-router";
import { useSelector ,  useDispatch } from "react-redux";
import { logoutUser } from "../../store/slice/userSlice";
import axios from "axios";
import useAuth from "../../hooks/useAuth";




const NavItem = (
    { 
        onClickMenuModal ,
        onClickLoginModal , 
        onClickSignUpModal ,
        modalRef , 
        onClickModalOutSide
    }
    ) => {

    const navigate = useNavigate();
    const user = useSelector(state => state.user);
    const dispatch = useDispatch();
    const { authAndNavigate } = useAuth();


    const handleClickLogout = async () => {

        try {
            if (window.confirm("로그아웃 하시겠습니까?")) {

                const response = 
                await axios.post("/api/users/logout");

                if (response.status === 200) {
                    onClickMenuModal();
                    alert(response.data.messsage);
                    dispatch(logoutUser());
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
        <div 
        className = "menu-modal"
        ref = { modalRef }
        onClick = { (e) => onClickModalOutSide(e) }>

            <div className = "navbar-container">

                <nav className = "navbar">

                    <ul className = "navbar__column">

                        <li
                        className = "navbar-link"
                        onClick = { () => {

                            onClickMenuModal();
                            navigate("/noticeBoard");
                            return;
                        }} >
                            자유 게시판
                        </li>

                        <li 
                        style = {{ borderBottom:"1px solid #ddd" }}
                        className = "navbar-link"
                        onClick = { () => {
                            authAndNavigate("/myPage");
                            onClickMenuModal();
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
                            onClick = { onClickSignUpModal } > 
                                회원 가입
                            </li>

                        }

                        <li 
                        className = "navbar-link"
                        onClick = { () => {

                            user.isLogin === false && onClickLoginModal();
                            user.isLogin === true && handleClickLogout();
                            return;

                        }} >
                            { user.isLogin === true ? "로그아웃" : "로그인" }
                        </li>

                    </ul>

                </nav>

            </div>

        </div>
        </>
    );
};

export default NavItem;




