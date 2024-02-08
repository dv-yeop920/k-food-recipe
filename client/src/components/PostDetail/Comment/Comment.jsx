import React, { useState } from "react";
import styles from "./Comment.module.css";
import getDate from "../../../utils/postDate";
import useAuth from "../../../hooks/useAuth";

const Comment = ({
  userId,
  commentUserId,
  commentId,
  comment,
  updateComment,
  setUpdateComment,
  onClickDeleteComment,
  onClickUpdateComment,
}) => {
  const { authAndNavigate } = useAuth();
  const [editId, setEditId] = useState("");
  const CREATED_AT = comment.createdAt;

  const onChangeUpdateComment = (commentId, newContent) => {
    setUpdateComment(commentContent => ({
      ...commentContent,
      [commentId]: newContent,
    }));
  };

  const renderCommnet = () => {
    if (editId === commentId) {
      return (
        <textarea
          style={{ marginTop: "5px" }}
          className={styles.input}
          value={updateComment[commentId]}
          name={updateComment[commentId]}
          onChange={e => {
            onChangeUpdateComment(
              commentId,
              e.target.value
            );
          }}
        ></textarea>
      );
    } else {
      return (
        <p className={styles.content}>{comment.content}</p>
      );
    }
  };

  const renderCommentButton = () => {
    if (editId === commentId) {
      return (
        <>
          <span
            className={styles.button}
            onClick={() => {
              setEditId("");
              return;
            }}
          >
            취소
          </span>

          <span
            className={styles.button}
            onClick={() => {
              authAndNavigate();
              onClickUpdateComment(commentId);
              setEditId("");
              return;
            }}
          >
            완료
          </span>
        </>
      );
    } else {
      return (
        <>
          <span
            className={styles.button}
            onClick={() => {
              authAndNavigate();
              setEditId(commentId);
              onChangeUpdateComment(
                commentId,
                comment.content
              );
            }}
          >
            {userId === commentUserId ? "수정" : ""}
          </span>

          <span
            className={styles.button}
            onClick={() => {
              authAndNavigate();
              onClickDeleteComment(commentId);
              return;
            }}
          >
            {userId === commentUserId ? "삭제" : ""}
          </span>
        </>
      );
    }
  };

  return (
    <>
      <ul>
        <li className={styles.comment}>
          <h4>{comment.id || ""}</h4>

          {renderCommnet()}

          <div className={styles.buttons}>
            <div>
              <span className={styles.text}>
                {`
                ${getDate(CREATED_AT).year}-${
                  getDate(CREATED_AT).month + 1
                }-${getDate(CREATED_AT).date} ${
                  getDate(CREATED_AT).hours
                }:${getDate(CREATED_AT).minutes}` || ""}
              </span>

              <span
                className={styles.text}
                style={{ cursor: "pointer" }}
                onClick={() => {
                  setEditId(commentId);
                }}
              >
                답글 쓰기
              </span>
            </div>

            <div>{renderCommentButton() || ""}</div>
          </div>
        </li>
      </ul>
    </>
  );
};

export default Comment;
