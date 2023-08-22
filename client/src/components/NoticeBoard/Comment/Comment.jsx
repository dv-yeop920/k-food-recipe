import React, { useState } from "react";
import * as styled from "../../../styles/styledComponents";
import getDate from "../../../utils/postDate";
import ReplyInput from "./ReplyInput";




const Comment = (
    { 
        comment , 
        isEdit , 
        setIsEdit , 
        updateComment , 
        setUpdateComment , 
        onClickCommentDelete , 
        onClickCommentEdit ,
        replyCommentContent ,
        setReplyCommentContent
    }
    ) => {
        
            const [editId , setEditId] = useState("");
            const [isReply , setIsReply] = useState(false);

    return (
        <>
        <ul className = "commnet-list">
            {   
                comment &&

                comment.map( (comment) => {

                    return (
                        <>
                        <li className = "comment" key = { comment._id }>

                            <div>
                                <span className = "user-id">
                                    { comment.id }
                                </span>
                            </div>

                            {
                                isEdit === true && editId === comment._id ?

                                <textarea
                                style = {{ marginTop : "5px" }}
                                className = "comment-input"
                                value = { updateComment }
                                onChange = { (e) => {

                                    setUpdateComment(e.target.value);
                                    return;

                                }} >
                                </textarea>

                                :

                                <p
                                className = "comment-content">
                                    { comment.content } 
                                </p>
                            }

                            <div className = "user-comment__buttons">

                                <div className = "date-reply__container">

                                    <styled.Span className = "comment-date">

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
                                    className = "reply-button"
                                    style = {{ cursor:"pointer" }}
                                    onClick = {() => {

                                        setIsReply(!isReply);
                                        setEditId(comment._id);
                                        return;

                                    }} >
                                        답글 쓰기
                                    </styled.Span>
                                </div>

                                <div className = "edit-delete__button">

                                {
                                    isEdit === true && editId === comment._id ?
                                    (
                                    <>

                                    <styled.Span 
                                    className = "edit-button comment-edit-delete"
                                    onClick = { () => {

                                        setIsEdit(!isEdit);
                                        return; 

                                    }} >
                                        취소
                                    </styled.Span>

                                    <styled.Span 
                                    className = "delete-button comment-edit-delete"
                                    onClick = { () => {

                                        onClickCommentEdit(comment._id);
                                        return;

                                    }} >
                                        완료
                                    </styled.Span>

                                    </>
                                    )

                                    :

                                    (
                                    <>

                                    <styled.Span 
                                    className = "edit-button comment-edit-delete"
                                    onClick = { () => {

                                        setIsEdit(!isEdit);
                                        setEditId(comment._id);
                                        setUpdateComment(comment.content);
                                        return;

                                    }} >
                                        수정
                                    </styled.Span>

                                    <styled.Span 
                                    className = "delete-button comment-edit-delete"
                                    onClick = { () => {

                                    onClickCommentDelete(comment._id); 
                                    return;

                                    }} >
                                        삭제
                                    </styled.Span>

                                    </>
                                    )
                                }

                                </div>
                            </div>

                            {
                                isReply === true && editId === comment._id &&

                                <ReplyInput
                                isReply = { isReply }
                                setIsReply = { setIsReply } 
                                replyCommentContent = { replyCommentContent }
                                setReplyCommentContent = { setReplyCommentContent }
                                />

                            }
                        </li>
                        </>
                        );
                    })
                }
            </ul>
        </>
    );
};

export default Comment;