import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import ImageUploader from "../components/Writing/ImageUploader";
import Content from "../components/Writing/Content";
import axios from "axios";
import {
  uploadPostPreviewImageToS3,
  resizeFile,
} from "../utils/awsS3Setting";
import styles from "../components/Writing/Writing.module.css";
import button from "../styles/Button.module.css";
import { selectUser } from "../store/slice/userSlice";
import useAuth from "../hooks/useAuth";
import toastMessage from "../utils/toast";

const WritingPage = () => {
  const { userId } = useSelector(selectUser);
  const navigate = useNavigate();
  const { authAndNavigate } = useAuth();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [PostPreviewImageFile, setPostPreviewImageFile] =
    useState(null);
  const [PostPreviewImageSrc, setPostPreviewImageSrc] =
    useState(null);
  const quillRef = useRef(null);

  const onSubmitRegisterPost = async e => {
    e.preventDefault();
    authAndNavigate();

    let previewImageUrl;

    try {
      if (title === "" || content === null) {
        toastMessage("내용을 입력했는지 확인해 주세요!");
        return;
      }

      if (PostPreviewImageFile === null) {
        previewImageUrl = null;
      }

      if (PostPreviewImageFile !== null) {
        previewImageUrl = await uploadPostPreviewImageToS3(
          PostPreviewImageFile
        );
      }

      const post = {
        id: userId,
        title: title,
        content: content,
        image: previewImageUrl,
      };

      const response = await axios.post(
        "/api/posts/register",
        post
      );

      if (!response.data.success) {
        toastMessage(response.data.messsage);
      }

      if (response.data.success) {
        navigate(-1, { replace: true });
        toastMessage(response.data.messsage);
        return;
      }

      setPostPreviewImageFile(null);
      setPostPreviewImageSrc(null);
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  return (
    <>
      <div className={styles.editorContainer}>
        <form
          className="editor-form"
          onSubmit={onSubmitRegisterPost}
        >
          <div className={styles.contentContainer}>
            <ImageUploader
              setPostPreviewImageFile={
                setPostPreviewImageFile
              }
              resizeFile={resizeFile}
              PostPreviewImageSrc={PostPreviewImageSrc}
              setPostPreviewImageSrc={
                setPostPreviewImageSrc
              }
            />

            <Content
              quillRef={quillRef}
              content={content}
              setTitle={setTitle}
              setContent={setContent}
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
                    "게시글 작성을 취소 하시겠어요?"
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
              등록
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default WritingPage;
