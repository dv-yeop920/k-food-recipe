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
  const postId = post._id;
  const { authAndNavigate } = useAuth();

  const [commentContent, setCommentContent] = useState("");
  const [updateComment, setUpdateComment] = useState("");

  const commentInfo = {
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
              commentInfo={commentInfo}
            />

            {data?.pages?.map(group =>
              group.commentList.map(comment => (
                <Comment
                  key={comment._id}
                  comment={comment}
                  postId={postId}
                  userId={userId}
                  updateComment={updateComment}
                  setUpdateComment={setUpdateComment}
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
      </div>
    </>
  );
};

export default CommentList;
