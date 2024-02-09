import {
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import {
  onSubmitRegisterComment,
  onClickDeleteComment,
  //onClickUpdateComment,
} from "../services/comment.services";

const useMutations = () => {
  const queryClient = useQueryClient();

  // 게시글 생성 뮤테이션
  const createMutation = useMutation({
    mutationFn: params => {
      return onSubmitRegisterComment(params);
    },
    onSuccess: () => {
      queryClient.invalidateQueries("commentList");
    },
  });

  // 게시글 삭제 뮤테이션
  const deleteMutation = useMutation({
    mutationFn: () => {
      return onClickDeleteComment();
    },
    onSuccess: () => {
      queryClient.invalidateQueries("commentList");
    },
  });

  // 게시글 수정 뮤테이션
  /*const updateMutation = useMutation(onClickUpdateComment, {
    onSuccess: () => {
      queryClient.invalidateQueries("posts");
    },
  });*/

  return { createMutation, deleteMutation };
};

export default useMutations;
