import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getPostDetail } from "services/post.services";
import useMutations from "hooks/useMutation";
import useAuth from "hooks/useAuth";
import UpdateContent from "components/Writing/UpdateContent";
import UpdateImageUploader from "components/Writing/UpdateImageUploader";
import styles from "components/Writing/Writing.module.scss";
import WritingButton from "components/Writing/WritingButton";

const PostsUpdatePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data: post } = useQuery({
    queryKey: ["postList"],
    queryFn: () => getPostDetail(id),
  });

  const [originalDetail, setOriginalDetail] = useState(post);
  const [editTitleValue, setEditTitleValue] = useState(post.title);
  const [editContentValue, setEditContentValue] = useState(post.content);
  const [postPreviewImageFile, setPostPreviewImageFile] = useState(null);
  const [postPreviewImageSrc, setPostPreviewImageSrc] = useState(post.image);

  const { authAndNavigate } = useAuth();
  const { updateMutation } = useMutations();

  const uploaderProps = {
    postPreviewImageSrc,
    setPostPreviewImageSrc,
    setPostPreviewImageFile,
  };

  const contentProps = {
    originalDetail,
    setOriginalDetail,
    editTitleValue,
    setEditTitleValue,
    editContentValue,
    setEditContentValue,
  };

  const postParams = {
    key: "post",
    editTitleValue,
    editContentValue,
    postPreviewImageFile,
    originalDetail,
    navigate,
  };

  return (
    <main className="back-ground">
      <form
        className={styles.editorContainer}
        onSubmit={async e => {
          authAndNavigate();
          postParams.e = e;
          await updateMutation.mutateAsync(postParams);
        }}
      >
        <section
          className={styles.contentContainer}
          aria-label="게시글 에디터 섹션"
        >
          <UpdateImageUploader uploaderProps={uploaderProps} />
          <UpdateContent contentProps={contentProps} />
        </section>

        <section className={styles.buttonArea} aria-label="버튼 섹션">
          <WritingButton buttonValue={"수정"} />
        </section>
      </form>
    </main>
  );
};

export default PostsUpdatePage;
