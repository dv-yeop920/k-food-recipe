import React, { useEffect, useState } from "react";
import RecipeTab from "../components/MainPage/RecipeTab";
import RecipeList from "../components/MainPage/RecipeList";
import DeferredComponent from "../components/Loading/DeferredComponent";
import axios from "axios";
import {
  useInfiniteQuery,
  //useMutation,
} from "@tanstack/react-query";
import RecipeSkeleton from "../components/Loading/skeleton/RecipeSkeleton";
import ScrollToTop from "../services/scrollTop";
import TabLoading from "../components/Loading/skeleton/TabSkeleton";
import { useSearchParams } from "react-router-dom";

const MainPage = () => {
  const [isTabLoading, setIsTabLoading] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams();

  const searchParam = searchParams.get("search");
  const tabParam = searchParams.get("tab");

  const onClickTabButton = tabValue => {
    setSearchParams({
      tab: tabValue,
      search: searchParam,
    });
  };

  const getRecipeList = async pageNumber => {
    try {
      const response = await axios.get(
        `/api/recipeList?cursor=${pageNumber}
        &search=${searchParam}
        &tab=${tabParam}`
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
    queryKey: ["recipeList", searchParam, tabParam],
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
      <ScrollToTop tabParam={tabParam} />

      {isTabLoading ? (
        <TabLoading />
      ) : (
        <RecipeTab
          searchParams={searchParams}
          tabParam={tabParam}
          onClickTabButton={onClickTabButton}
        />
      )}

      {isLoading && (
        <DeferredComponent>
          <RecipeSkeleton />
        </DeferredComponent>
      )}

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
