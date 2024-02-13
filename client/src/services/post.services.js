import axios from "axios";
import toastMessage from "../utils/toast";
import { deletePostPreviewImageToS3 } from "../utils/awsS3Setting";

export const getPostDetail = async id => {
  try {
    const response = await axios.get(
      `/api/posts/getPost?id=${id}`
    );

    if (response) {
      const postData = response.data.post;

      const parts = postData.id.split("_");
      const userId = parts[0];
      postData.id = userId;

      return postData;
    }
  } catch (error) {
    console.log(error);
  }
};

export const onClickDeletePost = async params => {
  const { id, image, navigate } = params;
  const postId = {
    postId: id,
  };
  const question = window.confirm(
    "게시물을 정말 삭제하시겠습니까?"
  );

  try {
    if (question) {
      if (image) {
        await deletePostPreviewImageToS3(image);
      }

      const response = await axios.post(
        "/api/posts/delete",
        postId
      );

      toastMessage(response.data.messsage);
      navigate(-1, { replace: true });
    }
  } catch (error) {
    console.log(error);
  }
};
