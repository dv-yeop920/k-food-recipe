import React, { useState , useEffect } from "react";
import { useNavigate } from "react-router-dom";
import * as styled from "../../styles/styledComponents";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import getDate from "../../utils/postDate";
import axios from "axios";



const PostsList = () => {
    const navigate = useNavigate();
    const [postList , setPostList] = useState([]);


    const getPostList = async () => {
        try {
            const response = await axios.get("/api/posts/getPostList");
            const getPosts = response.data.list;
            setPostList(getPosts);
        }
        catch (error) {
            console.log(error);
        }
    }

    const handleClickPostDetailNavigate = (postId) => {
        navigate(`/postDetail/${postId}`);
    }

    useEffect(() => {
        getPostList();
    } , []);

    return (
        <>
        <styled.SearchContainer>
            <form
            className ="user-search__form">

                <styled.Input
                className ="user-search__input"
                type ="text"
                placeholder ="단어 단위로 입력..."/>

                <styled.SubmitButton
                className ="default-btn"
                type ="submit">
                    검색
                </styled.SubmitButton>

                <FontAwesomeIcon
                    className ="writing-icon"
                    icon ={ faPenToSquare }
                    size ="2x"
                    onClick ={ () => navigate("/writing") }/>
        </form>
        </styled.SearchContainer>


        <styled.BoardContainer>
            <ul className ="board">
                <styled.Li 
                className ="post-list"
                style ={{
                    color:"rgb(200, 50, 100)"
                }}>
                    <div>
                        <styled.Title>
                            [공지]
                        </styled.Title>
                        <styled.Title 
                        style ={{
                            fontSize:"16px",
                            color:"black"
                        }}>
                            게시판 이용 수칙
                        </styled.Title>
                    </div>
                </styled.Li>

                {
                    postList.map((post) => {
                        return(
                        <styled.Li 
                        className ="post-list" 
                        key={ post._id }
                        onClick ={ () => handleClickPostDetailNavigate(post._id) }>

                            <div>
                                <styled.Title>
                                    { post.title }
                                </styled.Title>

                                <styled.Span>
                                    { post.id }
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
                                    {`
                                        ${ getDate(post.createdAt).year }-${
                                            getDate(post.createdAt).month + 1 }-${
                                                getDate(post.createdAt).date } 

                                        ${ getDate(post.createdAt).hours }:${
                                            getDate(post.createdAt).minutes }`
                                    }
                                </styled.Span>

                            </div>
                                <img 
                                style ={{ height:"60px" , width: "80px" }}
                                alt =""
                                src ="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d9/Node.js_logo.svg/1200px-Node.js_logo.svg.png" />
                        </styled.Li>
                        )
                    })
                }
            </ul>
        </styled.BoardContainer>
        </>
    );
};

export default PostsList;