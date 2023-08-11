import React from "react";
import * as styled from "../../styles/styledComponents";

const Comment = () => {
    return (
        <>
        <div className ="commnet-textarea__wrap">
            <div className ="comment-textarea__container">
                <textarea 
                placeholder="댓글을 달아 보세요!"
                id="comment-input">
                </textarea>
            </div>
            <div className ="comment-button__container">
                <styled.SubmitButton className ="comment-button default-btn">
                    등록
                </styled.SubmitButton>
            </div>
        </div>
        </>
    );
};

export default Comment;