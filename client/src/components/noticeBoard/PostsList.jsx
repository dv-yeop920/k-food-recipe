import React, { useEffect, useState } from "react";
import * as styled from "../../styles/styledComponents";
import ScrollToTopButton from "../ScrollToTopButton";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addPosts } from "../../store/slice/postsSlice";


const PostsList = () => {
    const [posts , setPosts] = useState([]);
    const navigate = useNavigate();
    const dispatch = useDispatch();

        useEffect(() => {
            axios.get("/api/posts/getPostsList")
            .then((response) => {
                console.log(response.data.list);
                const getPost = response.data.list;
                setPosts(getPost);
                dispatch(addPosts(getPost));
            })
            .catch((error) => console.log(error));
        } , []);

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

                {
                    posts.map((item , i) => {
                        return(
                        <styled.Li 
                        className="board-list" 
                        key={i}
                        onClick ={() => navigate(`/postsDetail/${item._id}`)}>
                            <div>
                                <styled.Title>
                                    {item.title}
                                </styled.Title>

                                <styled.Span>
                                    {item.id}
                                </styled.Span>

                                <styled.Span>
                                    ❤️ 좋아요 0
                                </styled.Span>

                                <styled.Span>
                                    댓글 0
                                </styled.Span>

                                <styled.Span>
                                    {item.createdAt}
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