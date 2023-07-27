import React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFaceSmileBeam ,faHeart , faUser } from "@fortawesome/free-solid-svg-icons";
import { useSelector } from "react-redux";



const MyPage = () => {
    const user = useSelector(state => state.user);
    
    return (
        <>
        <main className="my-page">
        <div className="user-component">
            <div className="user-component__column">
                <div className="user-component__text">
                    <h1 className="user-component__title">
                        안녕하세요
                    </h1>
                    <h2>userName님!</h2>
                    <button
                    className="user-component__btn">
                        <FontAwesomeIcon
                        className ="user-icon"
                        icon={faUser}
                        size = "1x"/>
                        <span>내정보</span>
                    </button>
                </div>
            </div>
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