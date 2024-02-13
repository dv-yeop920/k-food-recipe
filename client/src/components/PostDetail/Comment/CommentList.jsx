import React, { useState } from "react";
import { useSelector } from "react-redux";
import Comment from "./Comment";
import CommentInput from "./CommentInput";
import styles from "./Comment.module.css";
import useAuth from "../../../hooks/useAuth";
import { selectUser } from "../../../store/slice/userSlice";
import useInfiniteScroll from "../../../hooks/useInfiniteScroll";
import InfiniteScrollObserver from "../../InfiniteObserver/InfiniteScrollObserver";
import ScrollLoading from "../../Loading/ScrollLoading";

const CommentList = ({ post }) => {
  const { userId } = useSelector(selectUser);
  const { authAndNavigate } = useAuth();
  const postId = post._id;

  const [commentContent, setCommentContent] = useState("");

  const commentInputInfo = {
    commentContent: commentContent,
    postId: postId,
    userId: userId,
    setCommentContent: setCommentContent,
  };

  const { data, fetchNextPage, hasNextPage } =
    useInfiniteScroll("commentList", "", postId);

  return (
    <>
      <div className={styles.commentWrap}>
        <div className="comment-count">
          <h3> {`댓글 ${post.commentCount}` || ""} </h3>
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
              <Comment
                key={comment._id}
                comment={comment}
                userId={userId}
              />
            ))
          )}

          <InfiniteScrollObserver
            fetchNextPage={fetchNextPage}
            canFetchMore={hasNextPage}
          />

          {hasNextPage && <ScrollLoading />}
        </div>
      </div>
    </>
  );
};

export default CommentList;
