import React, { useState } from "react";
import styles from "./Comment.module.css";
import getDate from "../../../utils/postDate";

const Comment = ({
  userId,
  commentUserId,
  commentId,
  comment,
  isEdit,
  setIsEdit,
  updateComment,
  setUpdateComment,
  onClickCommentDelete,
  onClickCommentEdit,
}) => {
  const [editId, setEditId] = useState("");
  //const [isReply, setIsReply] = useState(false);

  return (
    <>
      <ul className="commnet-list">
        <li className={styles.comment}>
          <div>
            <span className="user-id">{comment.id}</span>
          </div>

          {isEdit === true && editId === commentId ? (
            <textarea
              style={{ marginTop: "5px" }}
              className={styles.input}
              value={updateComment}
              name={updateComment}
              onChange={e => {
                setUpdateComment(e.target.value);
                return;
              }}
            ></textarea>
          ) : (
            <p className={styles.content}>
              {comment.content}
            </p>
          )}

          <div className={styles.buttons}>
            <div className="date-reply__container">
              <span className={styles.text}>
                {`
                ${getDate(comment.createdAt).year}-${
                  getDate(comment.createdAt).month + 1
                }-${getDate(comment.createdAt).date} ${
                  getDate(comment.createdAt).hours
                }:${getDate(comment.createdAt).minutes}`}
              </span>

              <span
                className={styles.text}
                style={{ cursor: "pointer" }}
                onClick={() => {
                  //setIsReply(!isReply);
                  setEditId(commentId);
                  return;
                }}
              >
                답글 쓰기
              </span>
            </div>

            <div className="edit-delete__button">
              {isEdit === true && editId === commentId ? (
                <>
                  <span
                    className={styles.button}
                    onClick={() => {
                      setIsEdit(!isEdit);
                      setEditId("");
                      return;
                    }}
                  >
                    취소
                  </span>

                  <span
                    className={styles.button}
                    onClick={() => {
                      onClickCommentEdit(commentId);
                      setEditId("");
                      return;
                    }}
                  >
                    완료
                  </span>
                </>
              ) : (
                <>
                  <span
                    className={styles.button}
                    onClick={() => {
                      setIsEdit(!isEdit);
                      setEditId(commentId);
                      setUpdateComment(comment.content);
                      return;
                    }}
                  >
                    {userId === commentUserId ? "수정" : ""}
                  </span>

                  <span
                    className={styles.button}
                    onClick={() => {
                      onClickCommentDelete(commentId);
                      return;
                    }}
                  >
                    {userId === commentUserId ? "삭제" : ""}
                  </span>
                </>
              )}
            </div>
          </div>
        </li>
      </ul>
    </>
  );
};

export default Comment;
