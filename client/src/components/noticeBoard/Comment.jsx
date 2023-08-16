import React, { useEffect, useState } from "react";
import * as styled from "../../styles/styledComponents";
import { useSelector } from "react-redux";
import axios from "axios";
import CommentList from "./CommentList";

const Comment = ({ post }) => {
    const userId = useSelector(user => user.user.id);
    const postId = post._id;

    const [commentContent , setCommentContent] = useState("");
    const [comment , setComment] = useState([]);
    const [updateComment , setUpdateComment] = useState("");
    const [isEdit , setIsEdit] = useState(false);

    
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
                alert(response.data.messsage);
                setCommentContent("");
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

    const handleClickCommentDelete = async (commentId) => {

        const filteredId = comment.filter((comment) => {
            return commentId === comment._id;
        });

        const deleteCommentBody = {
            _id: filteredId[0]
        }

        try {
            if(window.confirm("댓글을 정말 삭제 하시겠습니까?")) {
                const response = 
                await axios.post("/api/posts/comment/deleteComment" , deleteCommentBody);

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

    const handleClickCommentEdit  = async (commentId) => {
        const filteredId = comment.filter((comment) => {
            return commentId === comment._id;
        });

        const updateCommentBody = {
            _id: filteredId[0],
            content: updateComment
        }

        try {
            if(window.confirm("댓글을 정말 수정 하시겠습니까?")) {
                const response = 
                await axios.put("/api/posts/comment/updateComment" , updateCommentBody);

                if(response.data.deleteSuccess === true) {
                    alert(response.data.messsage);
                    return;
                }

                if(response.data.deleteSuccess === false) {
                    alert(response.data.messsage);
                    return;
                }
                setIsEdit(!isEdit);
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
                    className ="comment-input"
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

            <CommentList
            comment ={ comment }
            isEdit = { isEdit }
            setIsEdit ={ setIsEdit }
            updateComment ={ updateComment }
            setUpdateComment ={ setUpdateComment }
            handleClickCommentDelete ={ handleClickCommentDelete }
            handleClickCommentEdit ={ handleClickCommentEdit }
            />
        </div>
        </>
    );
}

export default Comment;