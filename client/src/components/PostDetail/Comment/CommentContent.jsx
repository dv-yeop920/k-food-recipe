import styles from "./Comment.module.scss";

const CommentContent = ({ commentProps }) => {
  const { id, _id, content, editId, updateComment, onChangeUpdateComment } =
    commentProps;
  return (
    <>
      <h4 style={{ fontWeight: "bold" }}>{id}</h4>

      {editId ? (
        <div style={{ paddingRight: " 4.08rem" }}>
          <textarea
            style={{ marginTop: "0.5rem" }}
            className={styles.input}
            value={updateComment[_id]}
            name={updateComment[_id]}
            onChange={e => {
              onChangeUpdateComment(_id, e.target.value);
            }}
          ></textarea>
        </div>
      ) : (
        <p className={styles.content}>{content}</p>
      )}
    </>
  );
};

export default CommentContent;
