import React, { useState } from "react";
import * as styled from "../../styles/styledComponents";
import getDate from "../../utils/postDate";

const CommentList = (
    { 
        comment , 
        isEdit , 
        setIsEdit , 
        updateComment , 
        setUpdateComment , 
        handleClickCommentDelete , 
        handleClickCommentEdit
    }
    ) => {
        const [editId , setEditId] = useState("");
    return (
        <>
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

                            {
                                isEdit === true && editId === comment._id ?

                                <textarea
                                className ="comment-input"
                                value ={ updateComment }
                                onChange ={ (e) => setUpdateComment(e.target.value) }>
                                </textarea>

                                :

                                <p className ="comment-content">
                                    { comment.content } 
                                </p>
                            }

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

                                    {
                                        isEdit === true && editId === comment._id ?
                                        (
                                        <>

                                        <styled.Span 
                                        className ="edit-button comment-edit-delete"
                                        onClick ={ () => {
                                            setIsEdit(!isEdit);
                                            return;
                                        }}>
                                            취소
                                        </styled.Span>

                                        <styled.Span 
                                        className ="delete-button comment-edit-delete"
                                        onClick={ () => handleClickCommentEdit(comment._id) }>
                                            완료
                                        </styled.Span>

                                        </>
                                        )

                                        :

                                        (
                                        <>
                                        <styled.Span 
                                        className ="edit-button comment-edit-delete"
                                        onClick ={ () => {
                                            setIsEdit(!isEdit);
                                            setEditId(comment._id);
                                            setUpdateComment(comment.content);
                                            return;
                                        }}>
                                            수정
                                        </styled.Span>

                                        <styled.Span 
                                        className ="delete-button comment-edit-delete"
                                        onClick ={ () => handleClickCommentDelete(comment._id) }>
                                            삭제
                                        </styled.Span>
                                        </>
                                        )
                                    }
                                </div>
                            </div>
                        </li>
                        )
                    })
                }
            </ul>
        </>
    );
};

export default CommentList;