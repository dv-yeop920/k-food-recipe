import axios from "axios";
import toastMessage from "utils/toast";
import {
  deletePostPreviewImageToS3,
  uploadPostPreviewImageToS3,
} from "utils/awsS3Setting";

export const getPostList = async (searchParam, pageParam) => {
  try {
    const response = await axios.get(
      `/api/posts/getPostList?search=${searchParam}&page=${pageParam}`
    );

    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const getPostDetail = async id => {
  try {
    const response = await axios.get(`/api/posts/getPost?id=${id}`);

    const postData = response?.data?.post;

    const parts = postData?.id.split("_");
    const userId = parts[0];
    postData.id = userId;

    return postData;
  } catch (error) {
    console.log(error);
  }
};

export const onSubmitRegisterPost = async params => {
  const {
    e,
    userId,
    titleRef,
    quillRef,
    postPreviewImageFile,
    setPostPreviewImageFile,
    setPostPreviewImageSrc,
    navigate,
  } = params;
  e.preventDefault();

  let previewImageUrl;

  try {
    if (titleRef.current.value === "" || quillRef.current.value === "") {
      toastMessage("내용을 입력했는지 확인해 주세요!");
      return;
    }

    if (postPreviewImageFile === null) {
      previewImageUrl = null;
    } else {
      previewImageUrl = await uploadPostPreviewImageToS3(postPreviewImageFile);
    }

    const post = {
      id: userId,
      title: titleRef.current.value,
      content: quillRef.current.value,
      image: previewImageUrl,
    };

    const response = await axios.post("/api/posts/register", post);

    toastMessage(response.data.messsage);
    navigate("/postList");

    setPostPreviewImageFile(null);
    setPostPreviewImageSrc(null);
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const onClickDeletePost = async params => {
  const { id, image, navigate } = params;

  const question = window.confirm("게시물을 정말 삭제하시겠습니까?");
  const postId = {
    postId: id,
  };
  try {
    if (question) {
      if (image) {
        await deletePostPreviewImageToS3(image);
      }
      const response = await axios.post("/api/posts/delete", postId);

      toastMessage(response.data.messsage);
      navigate("/postList");
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
    postPreviewImageFile,
    originalDetail,
    navigate,
  } = params;
  e.preventDefault();

  const question = window.confirm("게시물 내용을 수정하시겠습니까?");

  let previewEditImageUrl;

  try {
    if (editTitleValue === "" || editContentValue === "") {
      toastMessage("내용을 입력했는지 확인해 주세요!");
      return;
    }

    if (postPreviewImageFile === null) {
      previewEditImageUrl = originalDetail.image;
    } else {
      await deletePostPreviewImageToS3(originalDetail.image);
      previewEditImageUrl = await uploadPostPreviewImageToS3(
        postPreviewImageFile
      );
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
