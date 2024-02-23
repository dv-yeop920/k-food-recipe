import styles from "./Comment.module.scss";

const CommentContent = ({ commentProps }) => {
  const { id, _id, content, editId, updateComment, onChangeUpdateComment } =
    commentProps;
  return (
    <>
      <h4>{id}</h4>

      {editId ? (
        <textarea
          style={{ marginTop: "5px" }}
          className={styles.input}
          value={updateComment[_id]}
          name={updateComment[_id]}
          onChange={e => {
            onChangeUpdateComment(_id, e.target.value);
          }}
        ></textarea>
      ) : (
        <p className={styles.content}>{content}</p>
      )}
    </>
  );
};

export default CommentContent;
