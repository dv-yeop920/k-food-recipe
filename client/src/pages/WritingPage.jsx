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
    <main>
      <form
        className={styles.editorContainer}
        onSubmit={e => {
          authAndNavigate();
          if (window.confirm("게시글을 등록 하시겠습니까?")) {
            writingParams.e = e;
            createMutation.mutate(writingParams);
          } else {
            e.preventDefault();
          }
        }}
      >
        <section
          className={styles.contentContainer}
          aria-label="게시글 에디터 섹션"
        >
          <ImageUploader uploaderProps={uploaderProps} />
          <Content titleRef={titleRef} quillRef={quillRef} />
        </section>

        <section className={styles.buttonArea} aria-label="버튼 섹션">
          <WritingButton buttonValue={"등록"} />
        </section>
      </form>
    </main>
  );
};

export default WritingPage;
