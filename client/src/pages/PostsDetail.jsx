import React from 'react';
import * as styled from "../styles/styledComponents";
import { useSelector } from 'react-redux';
import { useParams , Outlet, useNavigate } from 'react-router-dom';
import Navbar from "../components/navbar/Navbar";
import Parser from "html-react-parser";
import ScrollToTopButton from "../components/ScrollToTopButton";
import PostFooter from '../components/noticeBoard/PostFooter';

const PostsDetail = () => {
    const navigate = useNavigate();
    const {id} = useParams();
    const postsDetail = useSelector(posts => posts.posts);
    const selectPosts = postsDetail.find((posts) => posts._id === id.toString());
    return (
        <>
        <Navbar/>
            <div className ="post-detail__container">

                <div className ="post-header">

                    <div className ="post-go-to-list">
                        <li className ="go-to-list">
                            <span>
                                게시판으로 돌아가기
                            </span>
                        </li>
                    </div>

                    <div className ="post-title__area">
                        <h2 className ="post-title">
                            { Parser(selectPosts.title) }
                        </h2>
                    </div>

                    <div className ="post-user__wrap">
                        <div className ="user-info">
                            <span className ="user-id">
                                { Parser(selectPosts.id) }
                            </span>
                        </div>

                        <div className ="user-info">
                            <styled.Span className ="user-date">
                                { Parser( selectPosts.createdAt) }
                            </styled.Span>
                            <styled.Span className ="view-count">
                                댓글 0
                            </styled.Span>
                            
                            <button type ="button" className ="like-button">좋아요❤️</button>
                        </div>
                        
                    </div>
                </div>

                <div className ="post-content">
                    {Parser(selectPosts.content)}
                </div>

                <div className ="comment-wrap">
                    <div className ="comment-count">
                        <h3>댓글 0</h3>
                    </div>
                    <div className ="comment-container">
                        <ul className ="commnet-list">
                            <li className ="comment">
                            <p className ="comment-content">
                                대애애애애앳글 
                            </p>
                            <div>
                                <styled.Span>
                                    아이디
                                </styled.Span>

                                <styled.Span>
                                    좋아요
                                </styled.Span>

                                <styled.Span>
                                    2023-8-9 14:00
                                </styled.Span>

                                <styled.Span>
                                    답글 쓰기
                                </styled.Span>
                            </div>
                            </li>
                        </ul>
                    </div>
                    <Outlet></Outlet>
                    <div className ="show-comment">
                        <span
                        onClick={() => navigate("comment")}>여기를 눌러 댓글을 남겨 보세요!</span>
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