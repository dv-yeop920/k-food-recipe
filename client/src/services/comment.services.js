import axios from "axios";
import toastMessage from "../utils/toast";

export const onSubmitRegisterComment = async params => {
  const {
    e,
    commentContent,
    postId,
    userId,
    setCommentContent,
  } = params;

  e.preventDefault();

  if (commentContent === "") {
    toastMessage("내용을 입력해 주세요!");
    return;
  }

  const commentBody = {
    postId: postId,
    id: userId,
    content: commentContent,
  };

  try {
    const response = await axios.post(
      "/api/posts/comment/register",
      commentBody
    );

    toastMessage(response.data.messsage);
    setCommentContent("");
  } catch (error) {
    console.log(error);
  }
};

export const onClickDeleteComment = async params => {
  const question = window.confirm(
    "댓글을 정말 삭제 하시겠습니까?"
  );

  try {
    if (question) {
      const response = await axios.post(
        "/api/posts/comment/delete",
        params
      );

      toastMessage(response.data.messsage);
    }
  } catch (error) {
    console.log(error);
  }
};

export const onClickUpdateComment = async params => {
  const question = window.confirm(
    "댓글을 정말 수정 하시겠습니까?"
  );

  try {
    if (question) {
      const response = await axios.put(
        "/api/posts/comment/update",
        params
      );

      toastMessage(response.data.messsage);
    }
  } catch (error) {
    console.log(error);
  }
};
