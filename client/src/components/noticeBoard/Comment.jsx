import React from "react";
import * as styled from "../../styles/styledComponents";

const Comment = () => {
    return (
        <>
        <div className ="commnet-textarea__wrap">
            <div className ="comment-textarea__container">
                <textarea id="comment-input"></textarea>
            </div>
            <div className ="comment-button__container">
                <styled.DeleteButton className ="comment-button delete-btn">
                    취소
                </styled.DeleteButton>
                <styled.SubmitButton className ="comment-button default-btn">
                    등록
                </styled.SubmitButton>
            </div>
        </div>
        </>
    );
};

export default Comment;