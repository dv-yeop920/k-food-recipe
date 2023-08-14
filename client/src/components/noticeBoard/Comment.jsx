import axios from "axios";
import React from "react";
import { useSelector } from "react-redux";
import * as styled from "../../styles/styledComponents";

const Comment = ({ comment , setComment }) => {
    const userId = useSelector(user => user.user.id)

    const handleChangeComment = async (e) => {
        await setComment(e.target.value);
        return console.log(comment);
    }
    
    const hadleSubmitComment = async (e) => {
        e.preventDefault();
        const commentBody = {
            id: userId,
            content: comment
        }
        await axios.post("/api/posts/comment/register" , commentBody)
        .then((response) => {
            if(response.data.success === true) {
                return alert(response.data.messsage);
            }
            if(response.data.success === false) {
                return alert(response.data.messsage);
            }
        })
        .catch((error) => console.log(error));
    }

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
                    onChange={ handleChangeComment }>
                    </textarea>
                </div>
                <div className ="comment-button__container">
                    <styled.SubmitButton className ="comment-button default-btn">
                        등록
                    </styled.SubmitButton>
                </div>
            </form>
        </div>
        </>
    );
};

export default Comment;