import React, {
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import RecipeTab from "../components/MainPage/RecipeTab";
import RecipeList from "../components/MainPage/RecipeList";

import axios from "axios";
import {
  useQuery,
  useInfiniteQuery,
  //useMutation,
  //useQueryClient,
} from "@tanstack/react-query";

const MainPage = ({ SearchRecipeValue }) => {
  const [tabValue, setTabValue] = useState("");

  const getRecipeList = async pageNumber => {
    try {
      const response = await axios.get(
        `/api/recipeList?cursor=${pageNumber}
        &search=${SearchRecipeValue}
        &tabFocus=${tabValue}`
      );

      if (response) {
        return response.data;
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Queries
  /*const { data: recipeList } = useQuery({
    queryKey: ["recipeList"],
    queryFn: getRecipeList,
    staleTime: 1000 * 240,
  });*/

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["recipeList", SearchRecipeValue, tabValue],
    queryFn: ({ pageNumber = 1 }) =>
      getRecipeList(pageNumber),
    getNextPageParam: (lastPage, pages) => {
      if (lastPage.recipeList.length === 0) {
        return false;
      } else {
        return pages.length + 1;
      }
    },
  });

  return (
    <>
      <RecipeTab />
      {data?.pages?.map((group, i) => (
        <RecipeList key={i} recipeList={group.recipeList} />
      ))}
    </>
  );
};

export default MainPage;
