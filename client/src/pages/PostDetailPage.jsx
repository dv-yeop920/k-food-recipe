import React, { useEffect, useState } from "react";
import { useParams , useNavigate } from "react-router-dom";
import CommentList from "../components/PostDetail/Comment/CommentList";
import FooterNavbar from "../components/FooterNavbar/FooterNavbar";
import Parser from "html-react-parser";
import axios from "axios";
import getDate from "../utils/postDate";
import Loading from "../components//Loading/Loading";
import { deletePostPreviewImageToS3 } from "../utils/awsS3Setting";
import styles from "../components/PostDetail/PostDetail.module.css";
import { useSelector } from "react-redux";





const PostsDetail = () => {
    const user = useSelector(state => state.user);
    const navigate = useNavigate();
    //postList 에서 넘겨준 게시물의 고유 _id값
    const { id } = useParams();
    const [post, setPost] = useState({});
    const [isLoading , setIsLoading] = useState(true);


    const getPostDetail = async () => {
        const postId = id;

        try {
            const response =  
            await axios.get(
                `/api/posts/getPost?id=${ postId }` , 
                { timeout: 100000 }
            );

            if (response) {
                const postData = response.data.list;

                if (postData) {
                    const parts = postData.id.split("_");
                    const userId = parts[0];
                    postData.id = userId;
                    setPost(postData);
                }
            }

            setIsLoading(false);
        }
        catch (error) {
            console.log(error);
        }
    }


    const onClickDeletePost = async () => {
        const postId = {
            postId: id
        }

        try {
            if (window.confirm("게시물을 정말 삭제하시겠습니까?")) {
                if (post.image) {
                    await deletePostPreviewImageToS3(post.image);
                }

                const response = 
                await axios.post(
                    "/api/posts/delete" , 
                    postId , 
                    { timeout: 10000 }
                );

                if (response.data.deleteSuccess === true) {
                    alert(response.data.messsage);
                    navigate(-1, { replace: true });
                    return;
                }

                if (response.data.deleteSuccess === false) {
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
        if (post) {
            getPostDetail();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [post]);

    return (
        <>
        {
            isLoading ?
            <Loading />
            :
            <div className = { styles.detailContainer } >
                <div className = { styles.header } >
                    <div className = { styles.headerTitle} >
                        <span>
                            자유 게시판
                        </span>
                    </div>

                    <div className = "post-title__area">
                        <h2 className = { styles.title } >
                            { post.title }
                        </h2>
                    </div>

                    <div className = "post-user__wrap">
                        <div className = { styles.info} >
                            <span className = { styles.id } >
                                { post.id }
                            </span>
                        </div>

                        <div className = { styles.info} >
                            <span className = "user-date">
                                {
                                    `
                                    ${ getDate(post.createdAt).year }-${
                                        getDate(post.createdAt).month + 1 }-${
                                            getDate(post.createdAt).date } 

                                    ${ getDate(post.createdAt).hours }:${
                                        getDate(post.createdAt).minutes }`
                                }
                            </span>
                        </div>

                        <div className = { styles.info} >
                            <span 
                            className = { styles.button }
                            onClick = { () => {
                                if (window.confirm("게시글을 수정하시겠습니까?")) {
                                    navigate(`/postUpdate/${ id }`);
                                    return;
                                }
                            }} >
                                { post.id === user.id ? "수정" : ""}
                            </span>

                            <span 
                            className = { styles.button }
                            onClick = { onClickDeletePost } >
                                { post.id === user.id ? "삭제" : ""}
                            </span>
                        </div>
                    </div>
                </div>

                <div className = { styles.content } >
                    { Parser(String(post.content)) }
                </div>

                <CommentList post = { post } />

                <div style = {{ height:"40px" }}></div>

                <FooterNavbar/>
            </div>
        }
        </>
    );
};

export default PostsDetail;