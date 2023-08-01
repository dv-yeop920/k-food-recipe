import React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFaceSmileBeam ,faHeart , faUser } from "@fortawesome/free-solid-svg-icons";
import { useSelector , useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logoutUser } from "../../store/slice/userSlice";
import axios from 'axios';



const MyPage = () => {
    const user = useSelector(state => state.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleClickLogout = () => {
        if(window.confirm("로그아웃 하시겠습니까?")) {
            axios.post("/api/users/logout")
            .then((response) => {
                if(response.status === 200) {
                    dispatch(logoutUser());
                    console.log(response.data , response.status);
                    return navigate("/login");
                }
            })
            .catch((error) => {
                console.log(error);
                return alert("로그아웃 하는데 실패 했습니다");
            });
        }
    }

    return (
        <>
        <main className="my-page">
        <div className="user-component">
            <div className="user-component__column">
                <div className="user-component__text">
                    <h1 className="user-component__title">
                        안녕하세요
                    </h1>
                    <h2> {`${user.name} 님!`}</h2>
                </div>
            </div>
            <form 
            className="user-component__btn-form"
            onSubmit={(e) => e.preventDefault()}>
                <button
                className="user-component__btn"
                onClick={() => navigate("/myInfo")}>
                    <FontAwesomeIcon
                    className ="user-icon"
                    icon={faUser}
                    size = "1x"/>
                    <span>내정보</span>
                </button>
                <button
                className="user-component__btn"
                onClick={handleClickLogout}>
                    로그 아웃
                </button>
            </form>
        </div>

            <div className="icon-row">
                <div className="icon-row__icon">
                    <FontAwesomeIcon
                    className ="user-icon heart"
                    icon={faHeart}
                    size = "1x"/>
                    <span>좋아요 누른 레시피</span>
                </div>
                <div className="icon-row__icon">
                    <FontAwesomeIcon
                    className ="user-icon heart"
                    icon={faHeart}
                    size = "1x"/>
                    <span>좋아요 누른 게시글</span>
                </div>
                <div className="icon-row__icon">
                    <FontAwesomeIcon
                    className ="user-icon smile"
                    icon={faFaceSmileBeam}
                    size = "1x"/>
                    <span>최근 본 레시피</span>
                </div>
                <div className="icon-row__icon">
                    <FontAwesomeIcon
                    className ="user-icon smile"
                    icon={faFaceSmileBeam}
                    size = "1x"/>
                    <span>최근 본 게시글</span>
                </div>
                <div className="icon-row__icon">
                    <FontAwesomeIcon
                    className ="user-icon smile"
                    icon={faFaceSmileBeam}
                    size = "1x"/>
                    <span>내 게시글</span>
                </div>
            </div>
            <div></div>
            
            </main>
        </>
    );
};

export default MyPage;