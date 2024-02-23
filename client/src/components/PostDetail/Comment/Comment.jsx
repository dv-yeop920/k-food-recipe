import { useState } from "react";
import styles from "./Comment.module.scss";
import CommentContent from "./CommentContent";
import CommentButton from "./CommentButton";
import CommentDate from "./CommentDate";

const Comment = ({ comment, userId }) => {
  const [editId, setEditId] = useState("");
  const [updateComment, setUpdateComment] = useState("");
  const { _id, id, content, createdAt, postId } = comment;

  const onChangeUpdateComment = (commentId, newContent) => {
    setUpdateComment(commentContent => ({
      ...commentContent,
      [commentId]: newContent,
    }));
  };

  const commentProps = {
    key: "comment",
    id: id,
    _id: _id,
    content: content,
    userId: userId,
    postId: postId,
    editId: editId,
    setEditId: setEditId,
    updateComment: updateComment,
    onChangeUpdateComment: onChangeUpdateComment,
  };

  return (
    <ul>
      <li className={styles.comment}>
        <CommentContent commentProps={commentProps} />

        <div className={styles.buttons}>
          <CommentDate createdAt={createdAt} />
          <CommentButton commentProps={commentProps} />
        </div>
      </li>
    </ul>
  );
};

export default Comment;
