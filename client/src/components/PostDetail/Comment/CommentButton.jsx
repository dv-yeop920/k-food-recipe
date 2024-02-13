import React from "react";
import styles from "./Comment.module.css";
import useAuth from "../../../hooks/useAuth";
import useMutations from "../../../hooks/useMutation";

const CommentButton = ({ commentProps }) => {
  const { deleteMutation, updateMutation } = useMutations();
  const { authAndNavigate } = useAuth();
  const {
    key,
    id,
    _id,
    content,
    userId,
    postId,
    editId,
    setEditId,
    updateComment,
    onChangeUpdateComment,
  } = commentProps;
  return (
    <div>
      {!editId && (
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
                key,
                _id,
                postId,
              });
            }}
          >
            {userId === id ? "삭제" : ""}
          </span>
        </>
      )}

      {editId && (
        <>
          <span
            className={styles.button}
            onClick={() => {
              setEditId("");
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
                key,
                _id,
                content: updateComment[_id],
              });
            }}
          >
            완료
          </span>
        </>
      )}
    </div>
  );
};

export default CommentButton;
