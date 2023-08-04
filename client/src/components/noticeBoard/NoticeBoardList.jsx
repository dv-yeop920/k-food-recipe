import React from "react";
import * as styled from "../../styles/styledComponents";
import ScrollToTopButton from "../ScrollToTopButton";


const NoticeBoardList = () => {
    return (
        <>
        <styled.BoardContainer>
            <ul className="board">
                <styled.Li 
                className="board-list"
                style={{
                    color:"rgb(200, 50, 100)"
                }}>
                    <div>
                        <styled.Title>
                            [공지]
                        </styled.Title>
                        <styled.Title 
                        style={{
                            fontSize:"16px",
                            color:"black"
                        }}>
                            게시판 이용 수칙
                        </styled.Title>
                    </div>
                </styled.Li>
                <styled.Li>
                    <div>
                        <styled.Title>
                            테스트 게시물
                        </styled.Title>
                        <styled.Span>
                            아이디
                        </styled.Span>
                        <styled.Span>
                            ❤️ 좋아요 0
                        </styled.Span>
                        <styled.Span>
                            댓글 0
                        </styled.Span>
                        <styled.Span>
                            날짜 2023-8-5
                        </styled.Span>
                    </div>
                    <img 
                    style={{height:"60px" , width: "80px"}}
                    alt =""
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d9/Node.js_logo.svg/1200px-Node.js_logo.svg.png" />
                </styled.Li>
            </ul>
        </styled.BoardContainer>
        <ScrollToTopButton/>
        </>
    );
};

export default NoticeBoardList;