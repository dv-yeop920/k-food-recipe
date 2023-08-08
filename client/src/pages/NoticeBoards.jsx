import React from 'react';
import * as styled from "../styles/styledComponents";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import Navbar from "../components/navbar/Navbar";
import { useNavigate } from "react-router-dom";
import PostsList from '../components/noticeBoard/PostsList';


const NoticeBoard = () => {
    const navigate = useNavigate();
    
    return (
        <>
        <Navbar/>
        <styled.SearchContainer>
            <form
            className="user-search__form"
            onSubmit={(e) => {
                e.preventDefault();
            }}>
                <styled.Input
                className="user-search__input"
                type="text"
                placeholder="검색어 입력..."/>
                <styled.SubmitButton
                className="default-btn"
                type="submit">
                    검색
                </styled.SubmitButton>
                <FontAwesomeIcon
                    className ="writing-icon"
                    icon={faPenToSquare}
                    size = "2x"
                    onClick={() => { navigate("/writing") }}/>
        </form>
        </styled.SearchContainer>
        
        <PostsList/>
        </>
    );
};

export default NoticeBoard;