import React from 'react';
import * as styled from "../styles/styledComponents";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import NoticeBoardList from "../components/noticeBoard/NoticeBoardList";


const NoticeBoard = () => {
    
    return (
        <>
        <styled.SearchContainer>
        <form
        className="user-search__form"
        onSubmit={(e) => {
            e.preventDefault();
        }}>
                <styled.Input
                className="user-search__input"
                type="text"
                placeholder="검색어 입력..."
                onChange={(e) => {
                }} />
                <styled.SubmitButton
                className="default-btn"
                type="submit">
                    검색
                </styled.SubmitButton>
                <FontAwesomeIcon
                    className ="writing-icon"
                    icon={faPenToSquare}
                    size = "2x"/>
        </form>
        </styled.SearchContainer>
        
        <NoticeBoardList/>
        </>
    );
};

export default NoticeBoard;