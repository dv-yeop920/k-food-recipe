import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import Comment from "./Comment";
import CommentInput from "./CommentInput";
import styles from "./Comment.module.css";
import useAuth from "../../../hooks/useAuth";
import { selectUser } from "../../../store/slice/userSlice";
import toastMessage from "../../../utils/toast";

const CommentList = ({ post }) => {
  const { userId } = useSelector(selectUser);
  const postId = post._id;
  const { authAndNavigate } = useAuth();

  const [comment, setComment] = useState([]);
  const [commentContent, setCommentContent] = useState("");
  const [updateComment, setUpdateComment] = useState("");

  const getComment = async () => {
    try {
      const response = await axios.get(
        "/api/posts/comment/getComment"
      );

      const getComments = response.data.list;

      const commentForThisPost = getComments.filter(
        comment => {
          return comment.postId === postId;
        }
      );

      setComment(commentForThisPost);
    } catch (error) {
      console.log(error);
    }
  };

  const onSubmitRegisterComment = async e => {
    e.preventDefault();

    if (commentContent === "") {
      alert("내용을 입력해 주세요!");
      return;
    }

    const commentBody = {
      postId: postId,
      id: userId,
      content: commentContent,
    };

    try {
      const response = await axios.post(
        "/api/posts/comment/register",
        commentBody
      );

      if (response.data.success) {
        toastMessage(response.data.messsage);
        setCommentContent("");
        return;
      }

      if (!response.data.success) {
        toastMessage(response.data.messsage);
        return;
      }
    } catch (error) {
      console.log(error);
    }
  };

  const onClickDeleteComment = async commentId => {
    const filteredId = comment.filter(comment => {
      return commentId === comment._id;
    });

    const deleteCommentBody = {
      postId: postId,
      _id: filteredId[0],
    };

    try {
      if (
        window.confirm("댓글을 정말 삭제 하시겠습니까?")
      ) {
        const response = await axios.post(
          "/api/posts/comment/deleteComment",
          deleteCommentBody
        );

        if (response.data.deleteSuccess) {
          toastMessage(response.data.messsage);
          return;
        }

        if (!response.data.deleteSuccess) {
          toastMessage(response.data.messsage);
          return;
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const onClickUpdateComment = async commentId => {
    const filteredId = comment.filter(comment => {
      return commentId === comment._id;
    });

    const updateCommentBody = {
      _id: filteredId[0],
      content: updateComment[commentId],
    };

    try {
      if (
        window.confirm("댓글을 정말 수정 하시겠습니까?")
      ) {
        const response = await axios.put(
          "/api/posts/comment/updateComment",
          updateCommentBody
        );

        if (response.data.deleteSuccess) {
          toastMessage(response.data.messsage);
          return;
        }

        if (!response.data.deleteSuccess) {
          toastMessage(response.data.messsage);
          return;
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getComment();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [comment]);

  return (
    <>
      <div className={styles.commentWrap}>
        <div className="comment-count">
          <h3> {`댓글 ${post.commentCount}`} </h3>
        </div>

        <div className="comment-container">
          <div className={styles.inputWrap}>
            <CommentInput
              userId={userId}
              authAndNavigate={authAndNavigate}
              commentContent={commentContent}
              setCommentContent={setCommentContent}
              onSubmitRegisterComment={
                onSubmitRegisterComment
              }
            />

            {comment &&
              comment.map(comment => (
                <Comment
                  key={comment._id}
                  userId={userId}
                  commentUserId={comment.id}
                  commentId={comment._id}
                  comment={comment}
                  updateComment={updateComment}
                  setUpdateComment={setUpdateComment}
                  onClickDeleteComment={
                    onClickDeleteComment
                  }
                  onClickUpdateComment={
                    onClickUpdateComment
                  }
                />
              ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default CommentList;
