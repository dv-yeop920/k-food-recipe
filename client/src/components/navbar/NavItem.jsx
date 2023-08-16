import React from "react";
import { useNavigate } from "react-router";
import { useSelector ,  useDispatch } from "react-redux";
import { logoutUser } from "../../store/slice/userSlice";
import axios from "axios";




const NavItem = (
    { 
        modalRef , 
        modalOutSideClick , 
        openCloseLoginModal , 
        openCloseSignUpModal 
    }
    ) => {

    const navigate = useNavigate();
    const user = useSelector(state => state.user);
    const dispatch = useDispatch();


    const handleClickLogout = async () => {
        try {
            if(window.confirm("로그아웃 하시겠습니까?")) {
                const response = await axios.post("/api/users/logout");

                if(response.status === 200) {
                    dispatch(logoutUser());
                    console.log(response.data , response.status);
                    alert(response.data.messsage);
                    return navigate("/");
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
        className="menu-modal"
        ref={modalRef}
        onClick = {(e) => modalOutSideClick(e)}>

            <div className ="navbar-container">
                <nav className ="navbar">
                    <ul className ="navbar__column">
                        <li
                        className ="navbar-link"
                        onClick ={ () => {
                            if(user.loginSuccess === false) {
                                alert("회원만 이용할 수 있습니다");
                                openCloseSignUpModal();
                                return;
                            }
                            navigate("/noticeBoard");
                            return;
                        }}
                        >자유 게시판</li>
                        <li 
                        style={{ borderBottom:"1px solid #ddd" }}
                        className ="navbar-link"
                        onClick ={ () => {
                            if(user.loginSuccess === false) {
                                alert("회원만 이용할 수 있습니다");
                                openCloseSignUpModal();
                                return;
                            }
                            navigate("/myPage");
                            return;
                        }}>
                            마이페이지
                        </li>

                        { 
                            user.loginSuccess === true ? null :
                            <li 
                            className ="navbar-link"
                            onClick ={ openCloseSignUpModal }>
                                회원 가입
                            </li>
                        }

                        <li 
                        className ="navbar-link"
                        onClick ={ () => {
                            user.loginSuccess === false && openCloseLoginModal();
                            user.loginSuccess === true && handleClickLogout();
                            return;
                        }
                        }>
                            { user.loginSuccess === true ? "로그아웃" : "로그인" }
                        </li>
                    </ul>
                </nav>
            </div>
        </div>
        </>
    );
};

export default NavItem;




