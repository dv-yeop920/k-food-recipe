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

    if (response.data.success) {
      toastMessage(response.data.messsage);
      setCommentContent("");
      return;
    }

    if (!response.data.success) {
      toastMessage(response.data.messsage);
      setCommentContent("");
      return;
    }
  } catch (error) {
    console.log(error);
  }
};

export const onClickDeleteComment = async (
  comment,
  commentId,
  postId
) => {
  const filteredId = comment.filter(comment => {
    return commentId === comment._id;
  });

  const deleteCommentBody = {
    postId: postId,
    _id: filteredId[0],
  };

  const question = window.confirm(
    "댓글을 정말 삭제 하시겠습니까?"
  );

  try {
    if (question) {
      const response = await axios.post(
        "/api/posts/comment/delete",
        deleteCommentBody
      );

      if (response.data.deleteSuccess) {
        toastMessage(response.data.messsage);
        return;
      }

      if (!response.data.deleteSuccess) {
        toastMessage(response.data.messsage);
        return;
      }
    }
  } catch (error) {
    console.log(error);
  }
};

/*export const onClickUpdateComment = async commentId => {
  const filteredId = comment.filter(comment => {
    return commentId === comment._id;
  });

  const updateCommentBody = {
    _id: filteredId[0],
    content: updateComment[commentId],
  };

  try {
    if (window.confirm("댓글을 정말 수정 하시겠습니까?")) {
      const response = await axios.put(
        "/api/posts/comment/update",
        updateCommentBody
      );

      if (response.data.deleteSuccess) {
        toastMessage(response.data.messsage);
        return;
      }

      if (!response.data.deleteSuccess) {
        toastMessage(response.data.messsage);
        return;
      }
    }
  } catch (error) {
    console.log(error);
  }
};*/
