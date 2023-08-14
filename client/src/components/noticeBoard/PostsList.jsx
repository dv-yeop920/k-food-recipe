import React, { useState , useEffect } from "react";
import * as styled from "../../styles/styledComponents";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import ScrollToTopButton from "../ScrollToTopButton";
import { useNavigate } from "react-router-dom";
import axios from "axios";



const PostsList = () => {
    const navigate = useNavigate();
    const [postsList , setPostsList] = useState([]);

    const getPostsList = async () => {
        try {
            const response = await axios.get("/api/posts/getPostsList");
            const getPosts = response.data.list;
            setPostsList(getPosts);
        }
        catch (error) {
            return console.log(error);
        }
    }


        useEffect(() => {
            getPostsList();
        } , []);



    return (
        <>
        <styled.SearchContainer>
            <form
            className="user-search__form">

                <styled.Input
                className="user-search__input"
                type="text"
                placeholder="단어 단위로 입력..."/>

                <styled.SubmitButton
                className="default-btn"
                type="submit">
                    검색
                </styled.SubmitButton>

                <FontAwesomeIcon
                    className ="writing-icon"
                    icon={faPenToSquare}
                    size = "2x"
                    onClick={ () => navigate("/writing") }/>
        </form>
        </styled.SearchContainer>


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

                {
                    postsList.map((posts , i) => {
                        const newDate = new Date(posts.createdAt);
                        const year = newDate.getFullYear();
                        const month = newDate.getMonth();
                        const date = newDate.getDate();
                        const hours = newDate.getHours();
                        const minutes = newDate.getMinutes();
                        return(
                        <styled.Li 
                        className="board-list" 
                        key={i}
                        onClick ={() => 
                        navigate(`/postsDetail/${posts._id}`,
                        { state: { postsList } })}>

                            <div>
                                <styled.Title>
                                    {posts.title}
                                </styled.Title>

                                <styled.Span>
                                    {posts.id}
                                </styled.Span>

                                <styled.Span>
                                    ❤️0
                                </styled.Span>

                                <styled.Span>
                                    댓글 0
                                </styled.Span>
                                
                                <styled.Span>
                                    조회 0
                                </styled.Span>

                                <styled.Span>
                                    {`${year}-${month + 1}-${date} ${hours}:${minutes}`}
                                </styled.Span>

                            </div>
                                <img 
                                style={{height:"60px" , width: "80px"}}
                                alt =""
                                src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d9/Node.js_logo.svg/1200px-Node.js_logo.svg.png" />
                        </styled.Li>
                        )
                    })
                }
            </ul>
        </styled.BoardContainer>

        <ScrollToTopButton/>
        </>
    );
};

export default PostsList;