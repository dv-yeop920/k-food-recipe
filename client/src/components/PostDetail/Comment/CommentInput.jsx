import React from "react";
import button from "../../../styles/Button.module.css";
import styles from "./Comment.module.css";
const CommentInput = (
    { 
        userId,
        authAndNavigate,
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
                className = { styles.input }
                placeholder = "댓글을 달아 보세요!"
                value = { commentContent }
                name = { commentContent }
                onChange = { (e) => setCommentContent(e.target.value) } >
                </textarea>
            </div>

            <div className = { styles.buttonArea } >
                <button
                type = { userId === "" ? "button" : "submit" }
                className = { button.submit } 
                onClick = { () => authAndNavigate() }>
                    등록
                </button>
            </div>
        </form>
        </>
    );
};

export default CommentInput;