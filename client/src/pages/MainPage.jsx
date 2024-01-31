import React, { useEffect, useState } from "react";
import RecipeTab from "../components/MainPage/RecipeTab";
import RecipeList from "../components/MainPage/RecipeList";

import axios from "axios";
import {
  useInfiniteQuery,
  //useMutation,
} from "@tanstack/react-query";
import RecipeSkeleton from "../components/Loading/skeleton/RecipeSkeleton";
import ScrollToTop from "../services/scrollTop";
import TabLoading from "../components/Loading/skeleton/TabSkeleton";

const MainPage = ({ SearchRecipeValue }) => {
  const [isTabLoading, setIsTabLoading] = useState(true);
  const [tabValue, setTabValue] = useState("전체");

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

  const {
    data,
    isLoading,
    //fetchNextPage,
    //hasNextPage,
    //isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["recipeList", SearchRecipeValue, tabValue],
    queryFn: ({ pageNumber = 1 }) =>
      getRecipeList(pageNumber),
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      if (lastPage.recipeList.length === 0) {
        return false;
      } else {
        return allPages.length + 1;
      }
    },
    suspense: false,
  });

  useEffect(() => {
    if (isLoading) {
      return;
    }
    setIsTabLoading(false);
  }, [isLoading]);

  return (
    <>
      <ScrollToTop tabValue={tabValue} />

      {isTabLoading ? (
        <TabLoading />
      ) : (
        <RecipeTab setTabValue={setTabValue} />
      )}

      {isLoading && <RecipeSkeleton />}

      {!isLoading &&
        data?.pages?.map((group, i) => (
          <RecipeList
            key={i}
            recipeList={group.recipeList}
          />
        ))}
    </>
  );
};

export default MainPage;
