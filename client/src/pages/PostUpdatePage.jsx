import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import UpdateContent from "../components/Writing/UpdateContent";
import UpdateImageUploader from "../components/Writing/UpdateImageUploader";
import { resizeFile } from "../utils/awsS3Setting";
import styles from "../components/Writing/Writing.module.css";
import button from "../styles/Button.module.css";
import useAuth from "../hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import { getPostDetail } from "../services/post.services";
import useMutations from "../hooks/useMutation";

const PostsUpdatePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data: post } = useQuery({
    queryKey: ["post"],
    queryFn: () => getPostDetail(id),
    staleTime: 1000 * 60 * 5,
  });

  const [originalDetail, setOriginalDetail] = useState(post);
  const [editTitleValue, setEditTitleValue] = useState(post.title);
  const [editContentValue, setEditContentValue] = useState(post.content);
  const [editPostPreviewImageFile, setEditPostPreviewImageFile] =
    useState(null);
  const [editPostPrevuewImageSrc, setEditPostPrevuewImageSrc] = useState(null);

  const { authAndNavigate } = useAuth();
  const { updateMutation } = useMutations();

  const postParams = {
    key: "post",
    editTitleValue,
    editContentValue,
    editPostPreviewImageFile,
    originalDetail,
    navigate,
  };

  return (
    <>
      <main className={styles.editorContainer}>
        <form
          className="editor-form"
          onSubmit={e => {
            authAndNavigate();
            postParams.e = e;
            updateMutation.mutate(postParams);
          }}
        >
          <section className={styles.contentContainer}>
            <UpdateImageUploader
              editPostPrevuewImageSrc={editPostPrevuewImageSrc}
              setEditPostPrevuewImageSrc={setEditPostPrevuewImageSrc}
              setEditPostPreviewImageFile={setEditPostPreviewImageFile}
              resizeFile={resizeFile}
            />

            <UpdateContent
              originalDetail={originalDetail}
              setOriginalDetail={setOriginalDetail}
              editTitleValue={editTitleValue}
              setEditTitleValue={setEditTitleValue}
              editContentValue={editContentValue}
              setEditContentValue={setEditContentValue}
              resizeFile={resizeFile}
            />
          </section>

          <section className={styles.buttonArea}>
            <button
              className={`
              ${styles.writingButton}
              ${button.cancle}`}
              type="button"
              onClick={() => {
                authAndNavigate();
                if (window.confirm("게시글 수정을 취소 하시겠어요?")) {
                  navigate(-1, { replace: true });
                  return;
                }
              }}
            >
              취소
            </button>

            <button
              className={`
              ${styles.writingButton}
              ${button.submit}`}
              type="submit"
            >
              수정
            </button>
          </section>
        </form>
      </main>
    </>
  );
};

export default PostsUpdatePage;
