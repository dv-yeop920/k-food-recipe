import { useInfiniteQuery } from "@tanstack/react-query";
import axios from "axios";

const getRecipeList = async ({
  pageParam = 1,
  searchParam,
  tabParam,
}) => {
  const response = await axios.get(
    `/api/recipeList?cursor=${pageParam}&search=${searchParam}&tab=${tabParam}`
  );

  return response.data;
};

const queryApiFunctions = {
  recipeList: getRecipeList,
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
      return queryFunc({
        pageParam,
        searchParam,
        tabParam,
      });
    },

    getNextPageParam: (lastPage, allPages) =>
      lastPage.recipeList.length
        ? allPages.length + 1
        : undefined,
    suspense: false,
    staleTime: 1000 * 60 * 5,
  });
};

export default useInfiniteScroll;
