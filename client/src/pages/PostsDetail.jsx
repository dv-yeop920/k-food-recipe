import React  from "react";
import * as styled from "../styles/styledComponents";
import { useSelector } from "react-redux";
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
    const postsDetail = useSelector(post => post.posts);
    const selectPosts = postsDetail.find((posts) => posts._id === id.toString());
    
    const newDate = new Date(selectPosts.createdAt);
    const year = newDate.getFullYear();
    const month = newDate.getMonth();
    const date = newDate.getDate();
    const hours = newDate.getHours();
    const minutes = newDate.getMinutes();




    const deletePosts = async () => {
        if(window.confirm("게시물을 정말 삭제하시겠습니까?")) {
            const deletePost = {
                _id: id
            }
            await axios.post("/api/posts/delete" , deletePost)
            .then((response) => {
                if(response.data.deleteSuccess === true) {
                    alert(response.data.messsage);
                    return navigate(-1, { replace: true });
                }
                if(response.data.deleteSuccess === false) {
                    return alert(response.data.messsage);
                }
            })
            .catch((error) => console.log(error));
        }
    }

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
                            { selectPosts.title }
                        </h2>
                    </div>

                    <div className ="post-user__wrap">
                        <div className ="user-info">
                            <span className ="user-id">
                                { selectPosts.id }
                            </span>
                        </div>

                        <div className ="user-info">
                            <styled.Span className ="user-date">
                                { `${year}-${month}-${date}. ${hours}:${minutes}` }
                            </styled.Span>
                        </div>

                        <div className ="user-info">
                            <span 
                            className ="edit-delete"
                            onClick ={() => {
                                if(window.confirm("게시글을 수정하시겠습니까?")) {
                                    return navigate(`/postsUpdate/${id}`)
                                }
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
                    { Parser(selectPosts.content) }
                </div>

                <div className ="comment-wrap">
                    <div className ="comment-count">
                        <h3>댓글 0</h3>
                    </div>
                    <div className ="comment-container">
                        <Comment/>
                        <ul className ="commnet-list">
                            <li className ="comment">
                                <div>
                                    <span className ="user-id">
                                        아이디
                                    </span>
                                </div>

                                <p className ="comment-content">
                                    대애애애애앳글 
                                </p>
                                <div>
                                    <styled.Span>
                                        좋아요
                                    </styled.Span>

                                    <styled.Span>
                                        2023-8-9 14:00
                                    </styled.Span>

                                    <styled.Span
                                    style={{cursor:"pointer"}}>
                                        답글 쓰기
                                    </styled.Span>
                                </div>
                            </li>
                        </ul>
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