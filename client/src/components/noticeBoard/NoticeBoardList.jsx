import React from 'react';
import * as styled from "../../styles/styledComponents";
import ScrollToTopButton from '../ScrollToTopButton';


const NoticeBoardList = () => {
    return (
        <>
        <styled.Board>
            <styled.Li 
            style={{
                color:'rgb(200, 50, 100)'
            }}>
                <div>
                    <styled.Title>
                        [공지]
                    </styled.Title>
                    <styled.Title 
                    style={{
                        fontSize:'16px',
                        color:'black'
                    }}>
                        게시판 이용 수칙
                    </styled.Title>
                </div>
            </styled.Li>
        </styled.Board>
        <ScrollToTopButton/>
        </>
    );
};

export default NoticeBoardList;