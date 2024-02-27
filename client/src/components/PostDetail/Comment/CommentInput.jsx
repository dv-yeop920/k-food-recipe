import styles from "./Comment.module.scss";
import button from "styles/Button.module.scss";
import useMutations from "hooks/useMutation";

const CommentInput = ({ authAndNavigate, commentInfo }) => {
  const { createMutation } = useMutations();

  const { commentContent, userId, setCommentContent } = commentInfo;

  return (
    <form
      className="commnet-textarea__form"
      onSubmit={async e => {
        commentInfo.e = e;
        await createMutation.mutateAsync(commentInfo);
      }}
    >
      <div className="comment-textarea__container">
        <textarea
          className={styles.input}
          placeholder="댓글을 달아 보세요!"
          value={commentContent}
          name={commentContent}
          onChange={e => setCommentContent(e.target.value)}
        ></textarea>
      </div>

      <div className={styles.buttonArea}>
        <button
          type={userId === "" ? "button" : "submit"}
          className={button.submit}
          onClick={() => authAndNavigate()}
        >
          등록
        </button>
      </div>
    </form>
  );
};

export default CommentInput;
