import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import Comment from "./Comment";
import CommentInput from "./CommentInput";




const CommentList = ({ post }) => {

    const userId = useSelector(user => user.user.id);
    const postId = post._id;

    const [comment , setComment] = useState([]);
    const [commentContent , setCommentContent] = useState("");
    const [updateComment , setUpdateComment] = useState("");
    const [replyCommentContent , setReplyCommentContent] = useState("");
    const [isEdit , setIsEdit] = useState(false);
    


    const getComment = async () => {

        try {

                const response = 
                await axios.get(
                    "/api/posts/comment/getComment" , 
                    { timeout: 10000 }
                );

                const getComments = response.data.list;

                const commentForThisPost = 
                getComments.filter( (comment) => { 
                    return comment.postId === postId;
                });

                setComment(commentForThisPost);

        }
        catch (error) {
            console.log(error);
        }
    }


    const onSubmitRegisterComment = async (e) => {

        e.preventDefault();

        if (commentContent === "") {
            alert("내용을 입력해 주세요!");
            return;
        }

        const commentBody = {
            postId: postId,
            id: userId,
            content: commentContent
        }

        try {
                const response = 
                await axios.post("/api/posts/comment/register" , 
                commentBody , 
                { timeout: 10000 });

                if (response.data.success === true) {

                    alert(response.data.messsage);
                    setCommentContent("");
                    return;

                }

                if (response.data.success === false) {

                    alert(response.data.messsage);
                    return;

                }
        }
        catch (error) {
            console.log(error);
        }
    }


    const onClickCommentDelete = async (commentId) => {

        const filteredId = 
        comment.filter((comment) => {
            return commentId === comment._id;
        });

        const deleteCommentBody = {
            postId: postId,
            _id: filteredId[0]
        }

        try {

                if (window.confirm("댓글을 정말 삭제 하시겠습니까?")) {

                    const response = 
                    await axios.post(
                        "/api/posts/comment/deleteComment" , 
                        deleteCommentBody , 
                        { timeout: 10000 }
                    );

                    if (response.data.deleteSuccess === true) {

                        alert(response.data.messsage);
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


    const onClickCommentEdit  = async (commentId) => {

        const filteredId = 
        comment.filter( (comment) => {
            return commentId === comment._id;
        });

        const updateCommentBody = {
            _id: filteredId[0],
            content: updateComment
        }

        try {

            if (window.confirm("댓글을 정말 수정 하시겠습니까?")) {

                const response = 
                await axios.put(
                    "/api/posts/comment/updateComment" , 
                    updateCommentBody , 
                    { timeout: 10000 }
                );

                if (response.data.deleteSuccess === true) {
                    alert(response.data.messsage);
                    return;
                }

                if (response.data.deleteSuccess === false) {
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
        <div className = "comment-wrap">

            <div className = "comment-count">

                <h3> { `댓글 ${ post.commentCount }` } </h3>

            </div>

            <div className = "comment-container">

                <div className = "commnet-textarea__wrap">

                    <CommentInput
                    commentContent = { commentContent }
                    setCommentContent = { setCommentContent }
                    onSubmitRegisterComment = { onSubmitRegisterComment } />

                    {
                        comment &&
                        comment.map((comment) => (

                            <Comment key = { comment._id }
                            commentId = { comment._id }
                            comment = { comment }
                            isEdit = { isEdit }
                            setIsEdit = { setIsEdit }
                            updateComment = { updateComment }
                            setUpdateComment = { setUpdateComment }
                            onClickCommentDelete = { onClickCommentDelete }
                            onClickCommentEdit = { onClickCommentEdit } 
                            replyCommentContent = { replyCommentContent }
                            setReplyCommentContent = { setReplyCommentContent } />

                        ))
                    }
                    

                </div>

            </div>

        </div>
        </>
    );
}

export default CommentList;