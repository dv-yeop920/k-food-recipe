import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  onSubmitRegisterComment,
  onClickDeleteComment,
  onClickUpdateComment,
} from "services/comment.services";
import {
  onClickDeletePost,
  onSubmitEditPost,
  onSubmitRegisterPost,
} from "services/post.services";

const useMutations = () => {
  const queryClient = useQueryClient();

  // 게시글 생성 뮤테이션
  const createMutation = useMutation({
    mutationFn: params => {
      if (params.key === "post") {
        return onSubmitRegisterPost(params);
      } else if (params.key === "comment") {
        return onSubmitRegisterComment(params);
      }
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["commentList"],
      });
      await queryClient.invalidateQueries({
        queryKey: ["postList"],
      });
    },
  });

  // 게시글 삭제 뮤테이션
  const deleteMutation = useMutation({
    mutationFn: params => {
      if (params.key === "post") {
        return onClickDeletePost(params);
      } else if (params.key === "comment") {
        return onClickDeleteComment(params);
      }
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["commentList"],
      });
      await queryClient.invalidateQueries({
        queryKey: ["postList"],
      });
    },
  });

  // 게시글 수정 뮤테이션
  const updateMutation = useMutation({
    mutationFn: params => {
      if (params.key === "post") {
        return onSubmitEditPost(params);
      } else if (params.key === "comment") {
        return onClickUpdateComment(params);
      }
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["commentList"],
      });
      await queryClient.invalidateQueries({
        queryKey: ["postList"],
      });
    },
  });

  return { createMutation, deleteMutation, updateMutation };
};

export default useMutations;
