import React from "react";
import * as styled from "../../../styles/styledComponents";

const CommentInput = (
    { 
        commentContent , 
        setCommentContent , 
        onSubmitRegisterComment
    }
    ) => {

    return (
        <>
            <form 
            className = "commnet-textarea__form"
            onSubmit = { onSubmitRegisterComment } >

                <div className = "comment-textarea__container">
                    <textarea 
                    className = "comment-input"
                    placeholder = "댓글을 달아 보세요!"
                    value = { commentContent }
                    onChange = { (e) => setCommentContent(e.target.value) } >
                    </textarea>
                </div>

                <div className = "comment-button__container">

                    <styled.SubmitButton 
                    type = "submit"
                    className = "comment-button default-btn">
                        등록
                    </styled.SubmitButton>

                </div>

            </form>
        </>
    );
};

export default CommentInput;