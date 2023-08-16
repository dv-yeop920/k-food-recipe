import React, { useEffect, useState } from "react";
import * as styled from "../styles/styledComponents";
import { useParams , useNavigate } from "react-router-dom";
import Comment from "../components/noticeBoard/Comment";
import Navbar from "../components/navbar/Navbar";
import Parser from "html-react-parser";
import ScrollToTopButton from "../components/ScrollToTopButton";
import PostFooter from "../components/noticeBoard/PostFooter";
import axios from "axios";
import getDate from "../utils/postDate";

const PostsDetail = () => {
    const navigate = useNavigate();
    //postList 에서 넘겨준 게시물의 고유 _id값
    const { id } = useParams();
    const [post, setPost] = useState({});


    const getPost = async () => {
        const postId = id;

        try {
            const response =  await axios.get(`/api/posts/getPost?id=${postId}`);
            setPost(response.data.list);
        }
        catch (error) {
            console.log(error);
        }
    }


    const handleClickdeletePost = async () => {
        const postId = {
            _id: id
        }

        try {
            if(window.confirm("게시물을 정말 삭제하시겠습니까?")) {
                const response = await axios.post("/api/posts/delete" , postId);

                if(response.data.deleteSuccess === true) {
                    alert(response.data.messsage);
                    navigate(-1, { replace: true });
                    return;
                }
                
                if(response.data.deleteSuccess === false) {
                    alert(response.data.messsage);
                    return;
                }
            }
        }
        catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getPost();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <>
        <Navbar/>
            <div className ="post-detail__container">

                <div className ="post-header">

                    <div className ="post-go-to-list">
                        <li className ="go-to-list">
                            <span>
                                자유 게시판
                            </span>
                        </li>
                    </div>

                    <div className ="post-title__area">
                        <h2 className ="post-title">
                            { post.title }
                        </h2>
                    </div>

                    <div className ="post-user__wrap">
                        <div className ="user-info">
                            <span className ="user-id">
                                { post.id }
                            </span>
                        </div>

                        <div className ="user-info">
                            <styled.Span className ="user-date">
                                {
                                    `
                                    ${ getDate(post.createdAt).year }-${
                                        getDate(post.createdAt).month + 1}-${
                                            getDate(post.createdAt).date } 

                                    ${getDate(post.createdAt).hours}:${
                                        getDate(post.createdAt).minutes }`
                                }
                            </styled.Span>
                        </div>

                        <div className ="user-info">
                            <span 
                            className ="edit-delete"
                            onClick ={() => {
                                if(window.confirm("게시글을 수정하시겠습니까?")) {
                                    navigate(`/postUpdate/${id}`);
                                }
                            } }>
                                수정
                            </span>
                            <span 
                            className ="edit-delete"
                            onClick ={ handleClickdeletePost }>
                                삭제
                            </span>
                        </div>
                        
                    </div>
                </div>

                <div className ="post-content">
                    { Parser(String(post.content)) }
                </div>

                <div className ="comment-wrap">
                    <div className ="comment-count">
                        <h3>댓글 0</h3>
                    </div>

                    <div className ="comment-container">
                        <Comment post ={post}/>
                    </div>

                </div>
                    <div style={{height:"40px"}}></div>
                <ScrollToTopButton/>
                <PostFooter/>
            </div>
        </>
    );
};

export default PostsDetail;