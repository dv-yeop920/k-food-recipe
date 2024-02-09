import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import CommentList from "../components/PostDetail/Comment/CommentList";
import FooterNavbar from "../components/FooterNavbar/FooterNavbar";
import Parser from "html-react-parser";
import axios from "axios";
import getDate from "../utils/postDate";
import { deletePostPreviewImageToS3 } from "../utils/awsS3Setting";
import styles from "../components/PostDetail/PostDetail.module.css";
import { useSelector } from "react-redux";
import { selectUser } from "../store/slice/userSlice";
import useAuth from "../hooks/useAuth";
import toastMessage from "../utils/toast";
import {
  useMutation,
  useQuery,
} from "@tanstack/react-query";

const PostsDetail = () => {
  const navigate = useNavigate();

  const { userId } = useSelector(selectUser);
  const { authAndNavigate } = useAuth();
  const { id } = useParams();

  const getPostDetail = async () => {
    try {
      const response = await axios.get(
        `/api/posts/getPost?id=${id}`
      );

      if (response) {
        const postData = response.data.list;

        const parts = postData.id.split("_");
        const userId = parts[0];
        postData.id = userId;

        return postData;
      }
    } catch (error) {
      console.log(error);
    }
  };

  const { data: post } = useQuery({
    queryKey: ["list"],
    queryFn: getPostDetail,
  });

  const onClickDeletePost = async () => {
    const postId = {
      postId: id,
    };

    try {
      if (
        window.confirm("게시물을 정말 삭제하시겠습니까?")
      ) {
        if (post.image) {
          await deletePostPreviewImageToS3(post.image);
        }

        const response = await axios.post(
          "/api/posts/delete",
          postId
        );

        if (response.data.deleteSuccess) {
          toastMessage(response.data.messsage);
          navigate(-1, { replace: true });
          return;
        }

        if (!response.data.deleteSuccess) {
          toastMessage(response.data.messsage);
          return;
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  //const deleteMutation = useMutation({
  //  mutationFn: onClickDeletePost,
  //});

  const CREATE_AT = post.createdAt;

  /*useEffect(() => {
    if (post) {
      getPostDetail();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [post]);*/

  return (
    <>
      <div className={styles.detailContainer}>
        <div className={styles.header}>
          <div className={styles.headerTitle}>
            <span>자유 게시판</span>
          </div>

          <div className="post-title__area">
            <h2 className={styles.title}>
              {post.title || ""}
            </h2>
          </div>

          <div className="post-user__wrap">
            <div className={styles.info}>
              <span className={styles.id}>
                {post.id || ""}
              </span>
            </div>

            <div className={styles.info}>
              <span className="user-date">
                {`
                  ${getDate(CREATE_AT).year}-${
                  getDate(CREATE_AT).month + 1
                }-${getDate(CREATE_AT).date} 
                  ${getDate(CREATE_AT).hours}:${
                  getDate(CREATE_AT).minutes
                }` || ""}
              </span>
            </div>

            <div className={styles.info}>
              <span
                className={styles.button}
                onClick={() => {
                  if (
                    window.confirm(
                      "게시글을 수정하시겠습니까?"
                    )
                  ) {
                    authAndNavigate(`/postUpdate/${id}`);
                    return;
                  }
                }}
              >
                {post.id === userId ? "수정" : ""}
              </span>

              <span
                className={styles.button}
                onClick={() => {
                  authAndNavigate().then(() => {
                    //deleteMutation.mutate();
                    //onClickDeletePost();
                  });
                }}
              >
                {post.id === userId ? "삭제" : ""}
              </span>
            </div>
          </div>
        </div>

        <div className={styles.content}>
          {Parser(String(post.content)) || ""}
        </div>

        <CommentList post={post} />

        <div style={{ height: "40px" }}></div>

        <FooterNavbar />
      </div>
    </>
  );
};

export default PostsDetail;
