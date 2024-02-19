import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import CommentList from "../components/PostDetail/Comment/CommentList";
import FooterNavbar from "../components/FooterNavbar/FooterNavbar";
import Parser from "html-react-parser";
import getDate from "../utils/postDate";
import styles from "../components/PostDetail/PostDetail.module.css";
import { useSelector } from "react-redux";
import { selectUser } from "../store/slice/userSlice";
import useAuth from "../hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import { getPostDetail } from "../services/post.services";
import useMutations from "../hooks/useMutation";

const PostsDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { userId } = useSelector(selectUser);

  const { authAndNavigate } = useAuth();
  const { deleteMutation } = useMutations();

  const { data: post } = useQuery({
    queryKey: ["post"],
    queryFn: () => getPostDetail(id),
  });

  const { title, createdAt, content, image } = post;

  return (
    <>
      <div className={styles.detailContainer}>
        <div className={styles.header}>
          <div className={styles.headerTitle}>
            <span>자유 게시판</span>
          </div>

          <div className="post-title__area">
            <h2 className={styles.title}>{title || ""}</h2>
          </div>

          <div className="post-user__wrap">
            <div className={styles.info}>
              <span className={styles.id}>{userId}</span>
            </div>

            <div className={styles.info}>
              <span className="user-date">
                {`
                  ${getDate(createdAt).year}-
                  ${getDate(createdAt).month + 1}-
                  ${getDate(createdAt).date} 
                  ${getDate(createdAt).hours}:
                  ${getDate(createdAt).minutes}`}
              </span>
            </div>

            <div className={styles.info}>
              <span
                className={styles.button}
                onClick={() => {
                  if (window.confirm("수정하러 이동하시겠습니까?")) {
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
                  authAndNavigate();
                  deleteMutation.mutate({
                    key: "post",
                    id,
                    image,
                    navigate,
                  });
                }}
              >
                {post.id === userId ? "삭제" : ""}
              </span>
            </div>
          </div>
        </div>

        <div className={styles.content}>{Parser(String(content))}</div>

        <CommentList post={post} />

        <div style={{ height: "40px" }}></div>

        <FooterNavbar />
      </div>
    </>
  );
};

export default PostsDetail;
