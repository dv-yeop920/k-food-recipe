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

const useInfiniteScroll = (searchParam, tabParam) => {
  return useInfiniteQuery({
    queryKey: ["recipeList", searchParam, tabParam],
    queryFn: ({ pageParam }) =>
      getRecipeList({ pageParam, searchParam, tabParam }),
    getNextPageParam: (lastPage, allPages) =>
      lastPage.recipeList.length
        ? allPages.length + 1
        : undefined,
    suspense: false,
  });
};

export default useInfiniteScroll;
