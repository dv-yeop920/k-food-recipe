import styles from "./Comment.module.scss";
import useAuth from "hooks/useAuth";
import useMutations from "hooks/useMutation";

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
            onClick={async () => {
              authAndNavigate();
              await deleteMutation.mutateAsync({
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
            onClick={async () => {
              authAndNavigate();
              setEditId("");
              await updateMutation.mutateAsync({
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
