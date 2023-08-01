import React from "react";
import { useNavigate } from "react-router";
import { useSelector } from "react-redux";


const NavItem = () => {
    const navigate = useNavigate();
    const user = useSelector(state => state.user);
    return (
        <>
        <div className="navbar-container">
            <nav className="navbar">
                <ul className="navbar__column">
                    <li
                    className="navbar-link"
                    onClick={() => {
                        if(user.loginSuccess === false) {
                            alert("회원만 이용할 수 있습니다");
                            return navigate("/signUp")
                        }
                        return navigate("/noticeBoard")
                    }}
                    >자유 게시판</li>
                    <li 
                    style={{borderBottom:"1px solid #ddd"}}
                    className="navbar-link"
                    onClick={() => {
                        if(user.loginSuccess === false) {
                            alert("회원만 이용할 수 있습니다");
                            return navigate("/signUp");
                        }
                        return navigate("/myPage");
                    }}>마이페이지</li>
                    <li 
                    className="navbar-link"
                    onClick={() => navigate("/signUp")}>
                        {user.loginSuccess === true ? "":"회원 가입"}
                    </li>
                    <li 
                    className="navbar-link"
                    onClick={() => navigate("/login")}>
                        {user.loginSuccess === true ? "로그아웃":"로그인"}
                    </li>
                </ul>
            </nav>
        </div>
        </>
    );
};

export default NavItem;