import React from "react";
import * as styled from "../../../styles/styledComponents";

const ReplyInput = (
    { 
        isReply , 
        setIsReply , 
        replyCommentContent ,
        setReplyCommentContent 
    }
    ) => {

    return (
        <>
            <form
            className = "commnet-textarea__form"
            >

                <div className = "comment-textarea__container">

                    <textarea 
                    style = {{ marginTop : "5px" }}
                    className = "comment-input"
                    value = { replyCommentContent }
                    placeholder = "답글을 달아 보세요!"
                    onChange = { (e) => setReplyCommentContent(e.target.value) }>
                    </textarea>

                </div>

                <div className = "comment-button__container">

                    <styled.DeleteButton 
                    className = "comment-button delete-btn"
                    type = "button" 
                    onClick = { () => setIsReply(!isReply) } >
                        취소
                    </styled.DeleteButton>

                    <styled.SubmitButton 
                    className = "comment-button default-btn"
                    style = {{marginLeft : "8px"}}
                    type = "submit" >
                        등록
                    </styled.SubmitButton>

                </div>

            </form>
        </>
    );
};

export default ReplyInput;