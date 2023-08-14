import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import * as styled from "../../styles/styledComponents";

const Comment = ({ selectPosts }) => {
    const userId = useSelector(user => user.user.id);
    const [ commentContent , setCommentContent ] = useState("");
    const [comments , setComments] = useState([]);


    const hadleSubmitComment = async (e) => {
        e.preventDefault();

        if(commentContent === "") return alert("내용을 입력해 주세요!");

        const commentBody = {
            postsId: selectPosts._id,
            id: userId,
            content: commentContent
        }

        try {
            const response = await axios.post("/api/posts/comment/register" , commentBody);

            if(response.data.success === true) {
                setCommentContent("");
                return alert(response.data.messsage);
            }
            if(response.data.success === false) {
                return alert(response.data.messsage);
            }
        }
        catch (error) {
            return console.log(error);
        }
    }

    const getComments = async () => {
        try {
            const response = await axios.get("/api/posts/comment/getComment");
            const getComment = response.data.list;
            const commentsForSelectedPost = getComment.filter((comments) => { 
                return comments.postsId === selectPosts._id;
            }
            );
            return setComments(commentsForSelectedPost);
        }
        catch (error) {
            return console.log(error);
        }
    }

    useEffect(() => {
        getComments();
    });

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
                    value ={ commentContent }
                    onChange={ (e) => setCommentContent(e.target.value) }>
                    </textarea>
                </div>
                <div className ="comment-button__container">
                    <styled.SubmitButton 
                    type="submit"
                    className ="comment-button default-btn">
                        등록
                    </styled.SubmitButton>
                </div>
            </form>

            <ul className ="commnet-list">
                {   
                comments &&
                    comments.map((comments , i) => {
                        const newDate = new Date(comments.createdAt);
                        const year = newDate.getFullYear();
                        const month = newDate.getMonth();
                        const date = newDate.getDate();
                        const hours = newDate.getHours();
                        const minutes = newDate.getMinutes();

                        return(
                        <li className ="comment" key={i}>
                            <div>
                                <span className ="user-id">
                                    {comments.id}
                                </span>
                            </div>

                            <p className ="comment-content">
                                {comments.content}
                            </p>

                            <div>
                                <styled.Span>
                                    { `${year}-${month + 1}-${date} ${hours}:${minutes}` }
                                </styled.Span>

                                <styled.Span
                                style={{cursor:"pointer"}}>
                                    답글 쓰기
                                </styled.Span>
                            </div>
                        </li>
                        )
                    })
                }
            </ul>
        </div>
        </>
    );
};

export default Comment;