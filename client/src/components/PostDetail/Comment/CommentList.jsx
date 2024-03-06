import { useState } from "react";
import styles from "./Comment.module.scss";
import { useSelector } from "react-redux";
import { selectUser } from "store/slice/userSlice";
import useAuth from "hooks/useAuth";
import useInfiniteScroll from "hooks/useInfiniteScroll";
import InfiniteScrollObserver from "components/InfiniteObserver/InfiniteScrollObserver";
import Comment from "./Comment";
import CommentInput from "./CommentInput";
import ScrollLoading from "components/Loading/ScrollLoading";

const CommentList = ({ post }) => {
  const { userId } = useSelector(selectUser);
  const { authAndNavigate } = useAuth();
  const { _id, commentCount } = post;
  const [commentContent, setCommentContent] = useState("");

  const commentInputInfo = {
    key: "comment",
    commentContent,
    postId: _id,
    userId,
    setCommentContent,
  };

  const { data, fetchNextPage, hasNextPage } = useInfiniteScroll(
    "commentList",
    "",
    _id
  );

  return (
    <main className={styles.commentWrap}>
      <div className="comment-count">
        <h3 style={{ color: "var(--text-color)" }}>{`댓글 ${commentCount}`}</h3>
      </div>

      <div className="comment-container">
        <div className={styles.inputWrap}>
          <CommentInput
            authAndNavigate={authAndNavigate}
            commentInfo={commentInputInfo}
          />
        </div>

        {data?.pages?.map(group =>
          group.commentList.map(comment => (
            <Comment key={comment._id} comment={comment} userId={userId} />
          ))
        )}

        <InfiniteScrollObserver
          fetchNextPage={fetchNextPage}
          canFetchMore={hasNextPage}
        />

        {hasNextPage && <ScrollLoading />}
      </div>
    </main>
  );
};

export default CommentList;
