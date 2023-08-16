import React, { useEffect, useState } from "react";
import * as styled from "../../styles/styledComponents";
import { useSelector } from "react-redux";
import axios from "axios";
import getDate from "../../utils/postDate";

const Comment = ({ post }) => {
    const userId = useSelector(user => user.user.id);
    const postId = post._id;

    const [commentContent , setCommentContent] = useState("");
    const [comment , setComment] = useState([]);
    
    const getComment = async () => {
        try {
            const response = await axios.get("/api/posts/comment/getComment");

            const getComments = response.data.list;

            const commentForThisPost = getComments.filter((comment) => { 
                return comment.postsId === postId;
            }
            );

            setComment(commentForThisPost);
        }
        catch (error) {
            console.log(error);
        }
    }

    const hadleSubmitComment = async (e) => {
        e.preventDefault();

        if(commentContent === "") {
            alert("내용을 입력해 주세요!");
            return;
        }

        const commentBody = {
            postsId: postId,
            id: userId,
            content: commentContent
        }

        try {
            const response = await axios.post("/api/posts/comment/register" , commentBody);

            if(response.data.success === true) {
                setCommentContent("");
                alert(response.data.messsage);
                return;
            }

            if(response.data.success === false) {
                alert(response.data.messsage);
                return;
            }
        }
        catch (error) {
            console.log(error);
        }
    }

    const handleCommentDelete = async (commentId) => {

        const filteredId = comment.filter((comment) => {
            return commentId === comment._id;
        });

        const deleteComment = {
            _id: filteredId[0]
        }

        try {
            if(window.confirm("댓글을 정말 삭제하시겠습니까?")) {
                const response = 
                await axios.post("/api/posts/comment/deleteComment" , deleteComment);

                if(response.data.deleteSuccess === true) {
                    alert(response.data.messsage);
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
        getComment();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [comment]);

    return (
        <>
        <div className ="commnet-textarea__wrap">
            <form 
            className ="commnet-textarea__form"
            onSubmit ={ hadleSubmitComment }
            >
                <div className ="comment-textarea__container">
                    <textarea 
                    placeholder ="댓글을 달아 보세요!"
                    id ="comment-input"
                    value ={ commentContent }
                    onChange ={ (e) => setCommentContent(e.target.value) }>
                    </textarea>
                </div>
                <div className ="comment-button__container">
                    <styled.SubmitButton 
                    type ="submit"
                    className ="comment-button default-btn">
                        등록
                    </styled.SubmitButton>
                </div>
            </form>

            <ul className ="commnet-list">
                {   
                comment &&
                comment.map((comment) => {

                        return(
                        <li className ="comment" key ={ comment._id }>
                            <div>
                                <span className ="user-id">
                                    { comment.id }
                                </span>
                            </div>

                            <p className ="comment-content">
                                { comment.content } 
                            </p>

                            <div className ="user-comment__buttons">
                                <div className ="date-reply__container">
                                    <styled.Span className ="comment-date">
                                        {
                                            `
                                            ${ getDate(comment.createdAt).year }-${
                                                getDate(comment.createdAt).month + 1 }-${
                                                    getDate(comment.createdAt).date } 

                                            ${ getDate(comment.createdAt).hours }:${
                                                getDate(comment.createdAt).minutes }`
                                        }
                                    </styled.Span>

                                    <styled.Span
                                    className ="reply-button"
                                    style ={{ cursor:"pointer" }}>
                                        답글 쓰기
                                    </styled.Span>
                                </div>
                                <div className ="edit-delete__button">
                                    <styled.Span 
                                    className ="edit-button comment-edit-delete">
                                        수정
                                    </styled.Span>
                                    <styled.Span 
                                    className ="delete-button comment-edit-delete"
                                    onClick ={ () => handleCommentDelete(comment._id) }>
                                        삭제
                                    </styled.Span>
                                </div>
                            </div>
                        </li>
                        )
                    })
                }
            </ul>
        </div>
        </>
    );
}

export default Comment;