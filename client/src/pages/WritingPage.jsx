import { useRef, useState } from "react";
import styles from "components/Writing/Writing.module.scss";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectUser } from "store/slice/userSlice";
import useAuth from "hooks/useAuth";
import useMutations from "hooks/useMutation";
import ImageUploader from "components/Writing/ImageUploader";
import Content from "components/Writing/Content";
import WritingButton from "components/Writing/WritingButton";
import WritingHeader from "components/Writing/WritingHeader";

const WritingPage = () => {
  const [postPreviewImageFile, setPostPreviewImageFile] = useState(null);
  const [postPreviewImageSrc, setPostPreviewImageSrc] = useState(null);

  const { userId } = useSelector(selectUser);
  const navigate = useNavigate();

  const titleRef = useRef(null);
  const quillRef = useRef(null);

  const { authAndNavigate } = useAuth();
  const { createMutation } = useMutations();

  const uploaderProps = {
    setPostPreviewImageFile,
    postPreviewImageSrc,
    setPostPreviewImageSrc,
  };

  const writingParams = {
    key: "post",
    userId,
    titleRef,
    quillRef,
    postPreviewImageFile,
    setPostPreviewImageFile,
    setPostPreviewImageSrc,
    navigate,
  };

  return (
    <main className="back-ground">
      <section className="inner-box" aria-label="글작성 페이지 섹션">
        <WritingHeader />
        <form
          className={`${styles.editorContainer} `}
          onSubmit={async e => {
            authAndNavigate();
            if (window.confirm("게시글을 등록 하시겠습니까?")) {
              writingParams.e = e;
              await createMutation.mutateAsync(writingParams);
            } else {
              e.preventDefault();
            }
          }}
        >
          <div className={styles.contentContainer}>
            <ImageUploader uploaderProps={uploaderProps} />
            <Content titleRef={titleRef} quillRef={quillRef} />
          </div>

          <div className={styles.buttonArea}>
            <WritingButton buttonValue={"등록"} />
          </div>
        </form>
      </section>
    </main>
  );
};

export default WritingPage;
