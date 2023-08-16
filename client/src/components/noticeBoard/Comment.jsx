import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import * as styled from "../../styles/styledComponents";

const Comment = ({ selectPosts }) => {
    const userId = useSelector(user => user.user.id);
    const selectPostsId = selectPosts._id;
    const [ commentContent , setCommentContent ] = useState("");
    const [comments , setComments] = useState([]);
    
    const getComments = async () => {
        try {
            const response = await axios.get("/api/posts/comment/getComment");

            const getComment = response.data.list;

            const commentsForSelectedPost = getComment.filter((comments) => { 
                return comments.postsId === selectPostsId;
            }
            );

            setComments(commentsForSelectedPost);
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
            postsId: selectPostsId,
            id: userId,
            content: commentContent
        }

        try {
            const response = await axios.post("/api/posts/comment/register" , commentBody);

            if(response.data.success === true) {
                setCommentContent("");
                getComments();
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

    const handleCommentDelete = async (commentsId) => {

        const filteredId = comments.filter((comments) => {
            return commentsId === comments._id;
        });

        const deleteComment = {
            _id: filteredId[0]
        }

        try {
            if(window.confirm("댓글을 정말 삭제하시겠습니까?")) {
                const response = 
                await axios.post("/api/posts/comment/deleteComment" , deleteComment);
                console.log(response.data)

                if(response.data.deleteSuccess === true) {
                    alert(response.data.messsage);
                    getComments();
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
        getComments();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <>
        <div className ="commnet-textarea__wrap">
            <form 
            className="commnet-textarea__form"
            onSubmit={ hadleSubmitComment }
            >
                <div className ="comment-textarea__container">
                    <textarea 
                    placeholder="댓글을 달아 보세요!"
                    id="comment-input"
                    value ={ commentContent }
                    onChange={ (e) => setCommentContent(e.target.value) }>
                    </textarea>
                </div>
                <div className ="comment-button__container">
                    <styled.SubmitButton 
                    type="submit"
                    className ="comment-button default-btn">
                        등록
                    </styled.SubmitButton>
                </div>
            </form>

            <ul className ="commnet-list">
                {   
                comments &&
                    comments.map((comments , i) => {
                        const newDate = new Date(comments.createdAt);
                        const year = newDate.getFullYear();
                        const month = newDate.getMonth();
                        const date = newDate.getDate();
                        const hours = newDate.getHours();
                        const minutes = newDate.getMinutes();

                        return(
                        <li className ="comment" key={i}>
                            <div>
                                <span className ="user-id">
                                    {comments.id}
                                </span>
                            </div>

                            <p className ="comment-content">
                                {comments.content}
                            </p>

                            <div className="user-comment__buttons">
                                <div className="date-reply__container">
                                    <styled.Span className="comment-date">
                                        { `${year}-${month + 1}-${date} ${hours}:${minutes}` }
                                    </styled.Span>

                                    <styled.Span
                                    className="reply-button"
                                    style={{cursor:"pointer"}}>
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
                                    onClick={ () => handleCommentDelete(comments._id) }>
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
};

export default Comment;