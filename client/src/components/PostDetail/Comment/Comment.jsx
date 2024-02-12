import React, { useState } from "react";
import styles from "./Comment.module.css";
import getDate from "../../../utils/postDate";
import useAuth from "../../../hooks/useAuth";
import useMutations from "../../../hooks/useMutation";

const Comment = ({
  comment,
  userId,
  updateComment,
  setUpdateComment,
}) => {
  const { deleteMutation, updateMutation } = useMutations();
  const { authAndNavigate } = useAuth();
  const [editId, setEditId] = useState("");
  const { _id, id, content, createdAt, postId } = comment;

  const onChangeUpdateComment = (commentId, newContent) => {
    setUpdateComment(commentContent => ({
      ...commentContent,
      [commentId]: newContent,
    }));
  };

  const renderCommnet = () => {
    if (editId) {
      return (
        <textarea
          style={{ marginTop: "5px" }}
          className={styles.input}
          value={updateComment[_id]}
          name={updateComment[_id]}
          onChange={e => {
            onChangeUpdateComment(_id, e.target.value);
          }}
        ></textarea>
      );
    } else {
      return <p className={styles.content}>{content}</p>;
    }
  };

  const renderCommentButton = () => {
    if (editId) {
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
              setEditId("");
              updateMutation.mutate({
                _id,
                content: updateComment[_id],
              });
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
              setEditId(_id);
              onChangeUpdateComment(_id, content);
            }}
          >
            {userId === id ? "수정" : ""}
          </span>

          <span
            className={styles.button}
            onClick={() => {
              authAndNavigate();
              deleteMutation.mutate({
                _id,
                postId,
              });
              return;
            }}
          >
            {userId === id ? "삭제" : ""}
          </span>
        </>
      );
    }
  };

  return (
    <>
      <ul>
        <li className={styles.comment}>
          <h4>{id || ""}</h4>

          {renderCommnet()}

          <div className={styles.buttons}>
            <div>
              <span className={styles.text}>
                {`
                ${getDate(createdAt).year}-${
                  getDate(createdAt).month + 1
                }-${getDate(createdAt).date} ${
                  getDate(createdAt).hours
                }:${getDate(createdAt).minutes}` || ""}
              </span>

              <span
                className={styles.text}
                style={{ cursor: "pointer" }}
                onClick={() => {
                  setEditId(_id);
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
