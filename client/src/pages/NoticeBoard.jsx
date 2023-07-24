import React from 'react';
import * as styled from "../styles/styledComponents";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import NoticeBoardList from "../components/noticeBoard/NoticeBoardList";


const NoticeBoard = () => {
    
    return (
        <>
        <form
        className='input-form'
        onSubmit={(e) => {
            e.preventDefault();
        }}>
            <styled.InputBox>
                <styled.Input 
                type="text"
                onChange={(e) => {
                }} />
                <styled.DefaultButton
                type='submit'
                className='default-btn'>
                    검색
                </styled.DefaultButton>
                <FontAwesomeIcon
                    className ='writing'
                    icon={faPenToSquare}
                    size = '2x'/>
            </styled.InputBox>
        </form>
        <NoticeBoardList/>
        </>
    );
};

export default NoticeBoard;