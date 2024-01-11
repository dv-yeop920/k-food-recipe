import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import UpdateContent from "../components/Writing/UpdateContent";
import axios from "axios";
import UpdateImageUploader from "../components/Writing/UpdateImageUploader";
import {
  uploadPostPreviewImageToS3,
  resizeFile,
  deletePostPreviewImageToS3,
} from "../utils/awsS3Setting";
import styles from "../components/Writing/Writing.module.css";
import button from "../styles/Button.module.css";
import useAuth from "../hooks/useAuth";
import toastMessage from "../utils/toast";

const PostsUpdatePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [originalDetail, setOriginalDetail] = useState({});
  const [editTitleValue, setEditTitleValue] = useState("");
  const [editContentValue, setEditContentValue] =
    useState(null);
  const [
    editPostPreviewImageFile,
    setEditPostPreviewImageFile,
  ] = useState(null);
  const [
    editPostPrevuewImageSrc,
    setEditPostPrevuewImageSrc,
  ] = useState(null);

  const { authAndNavigate } = useAuth();

  const getPost = async () => {
    const postId = id;

    try {
      const response = await axios.get(
        `/api/posts/getPost?id=${postId}`
      );

      setOriginalDetail(response.data.list);
      setEditTitleValue(response.data.list.title);
      setEditContentValue(response.data.list.content);
    } catch (error) {
      console.log(error);
    }
  };

  const onSubmitEditPosts = async e => {
    e.preventDefault();
    authAndNavigate();

    let previewEditImageUrl;

    try {
      if (
        editTitleValue === "" ||
        editContentValue === null
      ) {
        toastMessage("내용을 입력했는지 확인해 주세요!");
        return;
      }

      if (editPostPreviewImageFile === null) {
        previewEditImageUrl = originalDetail.image;
      }

      if (editPostPreviewImageFile !== null) {
        previewEditImageUrl =
          await uploadPostPreviewImageToS3(
            editPostPreviewImageFile
          );
        await deletePostPreviewImageToS3(
          originalDetail.image
        );
      }

      if (
        window.confirm("게시물 내용을 수정하시겠습니까?")
      ) {
        const updatePosts = {
          _id: originalDetail._id,
          title: originalDetail.title,
          content: originalDetail.content,
          image: previewEditImageUrl,
        };

        const response = await axios.put(
          "/api/posts/update",
          updatePosts
        );

        if (!response.data.updateSuccess) {
          toastMessage(response.data.messsage);
          return;
        }

        if (response.data.updateSuccess) {
          navigate(-1, { replace: true });
          toastMessage(response.data.messsage);
          return;
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getPost();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div className={styles.editorContainer}>
        <form
          className="editor-form"
          onSubmit={onSubmitEditPosts}
        >
          <div className={styles.contentContainer}>
            <UpdateImageUploader
              editPostPrevuewImageSrc={
                editPostPrevuewImageSrc
              }
              setEditPostPrevuewImageSrc={
                setEditPostPrevuewImageSrc
              }
              setEditPostPreviewImageFile={
                setEditPostPreviewImageFile
              }
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
          </div>

          <div className={styles.buttonArea}>
            <button
              className={`
              ${styles.writingButton}
              ${button.cancle}`}
              type="button"
              onClick={() => {
                authAndNavigate();
                if (
                  window.confirm(
                    "게시글 수정을 취소 하시겠어요?"
                  )
                ) {
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
          </div>
        </form>
      </div>
    </>
  );
};

export default PostsUpdatePage;
