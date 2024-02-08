import { useInfiniteQuery } from "@tanstack/react-query";
import axios from "axios";

const getRecipeList = async (
  pageParam = 1,
  searchParam,
  tabParam
) => {
  const response = await axios.get(
    `/api/recipeList?cursor=${pageParam}&search=${searchParam}&tab=${tabParam}`
  );

  return response.data;
};

const getCommentList = async (
  pageParam = 1,
  searchParam,
  postId
) => {
  try {
    const response = await axios.get(
      `/api/posts/comment/getCommentList?cursor=${pageParam}&postId=${postId}`
    );

    return response.data;
  } catch (error) {
    console.log(error);
  }
};

const queryApiFunctions = {
  recipeList: getRecipeList,
  commentList: getCommentList,
};

const nextPageFunc = (keyName, lastPage, allPages) => {
  switch (keyName) {
    case "recipeList":
      if (lastPage.recipeList.length) {
        return allPages.length + 1;
      }
      break;
    case "commentList":
      if (lastPage.commentList.length) {
        return allPages.length + 1;
      }
      break;
    default:
      return undefined;
  }
};

const useInfiniteScroll = (
  keyName,
  searchParam,
  tabParam
) => {
  return useInfiniteQuery({
    queryKey: [keyName, searchParam, tabParam],
    queryFn: ({ pageParam }) => {
      const queryFunc = queryApiFunctions[keyName];

      return queryFunc(pageParam, searchParam, tabParam);
    },
    getNextPageParam: (lastPage, allPages) =>
      nextPageFunc(keyName, lastPage, allPages),
    suspense: false,
    staleTime: 1000 * 60 * 5,
  });
};

export default useInfiniteScroll;
