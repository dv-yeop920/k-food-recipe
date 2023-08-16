import React, { useEffect, useState } from "react";
import * as styled from "../styles/styledComponents";
import { useParams , useNavigate } from "react-router-dom";
import Comment from "../components/noticeBoard/Comment";
import Navbar from "../components/navbar/Navbar";
import Parser from "html-react-parser";
import ScrollToTopButton from "../components/ScrollToTopButton";
import PostFooter from "../components/noticeBoard/PostFooter";
import axios from "axios";


const PostsDetail = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [posts, setPosts] = useState();


//모르겠는거
    const getPosts = async () => {
        const postId = id;
        const response =  await axios.get(`/api/posts/getPosts?id=${postId}`);
        setPosts(response.data.posts)
    }

    const deletePosts = async () => {

        const deletePost = {
            _id: id
        }

        try {
            if(window.confirm("게시물을 정말 삭제하시겠습니까?")) {
                const response = await axios.post("/api/posts/delete" , deletePost);

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
        getPosts()
    }, [])

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
                            { posts?.title }
                        </h2>
                    </div>

                    <div className ="post-user__wrap">
                        <div className ="user-info">
                            <span className ="user-id">
                                { posts?.id }
                            </span>
                        </div>

                        <div className ="user-info">
                            <styled.Span className ="user-date">
                                { //모름 2
                                `${getDate(posts?.createdAt).year}-${getDate(posts?.createdAt).month + 1}-${getDate(posts?.createdAt).date} ${getDate(posts?.createdAt).hours}:${getDate(posts?.createdAt).minutes}` }
                            </styled.Span>
                        </div>

                        <div className ="user-info">
                            <span 
                            className ="edit-delete"
                            onClick ={() => {
                                if(window.confirm("게시글을 수정하시겠습니까?")) {
                                    return navigate(`/postsUpdate/${id}`)}
                            } }>
                                수정
                            </span>
                            <span 
                            className ="edit-delete"
                            onClick ={ deletePosts }>
                                삭제
                            </span>
                        </div>
                        
                    </div>
                </div>

                <div className ="post-content">
                    { Parser(posts?.content || "") }
                </div>

                <div className ="comment-wrap">
                    <div className ="comment-count">
                        <h3>댓글 0</h3>
                    </div>

                    <div className ="comment-container">
                        <Comment selectPosts = { //모름 3
                            posts
                        }/>
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