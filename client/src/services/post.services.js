import axios from "axios";
import toastMessage from "../utils/toast";
import {
  deletePostPreviewImageToS3,
  uploadPostPreviewImageToS3,
} from "../utils/awsS3Setting";

export const getPostList = async pageNumber => {
  try {
    const response = await axios.get(
      `/api/posts/getPostList?pageNumber=${pageNumber}
      `
    );

    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const getPostDetail = async id => {
  try {
    const response = await axios.get(`/api/posts/getPost?id=${id}`);

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

  const question = window.confirm("게시물을 정말 삭제하시겠습니까?");

  try {
    if (question) {
      if (image) {
        await deletePostPreviewImageToS3(image);
      }

      const response = await axios.post("/api/posts/delete", postId);

      toastMessage(response.data.messsage);
      navigate(-1, { replace: true });
    }
  } catch (error) {
    console.log(error);
  }
};

export const onSubmitEditPost = async params => {
  const {
    e,
    editTitleValue,
    editContentValue,
    editPostPreviewImageFile,
    originalDetail,
    navigate,
  } = params;
  e.preventDefault();

  const question = window.confirm("게시물 내용을 수정하시겠습니까?");

  let previewEditImageUrl;

  try {
    if (editTitleValue === "" || editContentValue === null) {
      toastMessage("내용을 입력했는지 확인해 주세요!");
      return;
    }

    if (editPostPreviewImageFile === null) {
      previewEditImageUrl = originalDetail.image;
    }

    if (editPostPreviewImageFile !== null) {
      previewEditImageUrl = await uploadPostPreviewImageToS3(
        editPostPreviewImageFile
      );
      //TODO - 삭제 되도록 수정 해야함
      //await deletePostPreviewImageToS3(originalDetail.image);
    }

    if (question) {
      const updatePosts = {
        _id: originalDetail._id,
        title: originalDetail.title,
        content: originalDetail.content,
        image: previewEditImageUrl,
      };

      const response = await axios.put("/api/posts/update", updatePosts);

      toastMessage(response.data.messsage);
      navigate(-1, { replace: true });
    }
  } catch (error) {
    console.log(error);
  }
};
