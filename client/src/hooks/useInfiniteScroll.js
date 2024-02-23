import { useInfiniteQuery } from "@tanstack/react-query";
import { getCommentList } from "services/comment.services";
import { getRecipeList } from "services/recipe.services";

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

const useInfiniteScroll = (keyName = "", searchParam = "", tabParam = "") => {
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
