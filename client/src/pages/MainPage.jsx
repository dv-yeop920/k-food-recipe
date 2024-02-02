import React, { useEffect, useRef, useState } from "react";
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

const InfiniteScrollObserver = ({
  fetchNextPage,
  canFetchMore,
}) => {
  const observerRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        if (entries[0].isIntersecting && canFetchMore) {
          fetchNextPage();
        }
      },
      { threshold: 1.0 }
    );

    if (observerRef.current) {
      observer.observe(observerRef.current);
    }

    return () => {
      if (observerRef.current) {
        observer.unobserve(observerRef.current);
      }
    };
  }, [fetchNextPage, canFetchMore]);

  return (
    <div ref={observerRef} style={{ height: "20px" }} />
  );
};

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

  const getRecipeList = async pageParam => {
    try {
      const response = await axios.get(
        `/api/recipeList?cursor=${pageParam}
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
    fetchNextPage,
    hasNextPage,
    //isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["recipeList", searchParam, tabParam],
    queryFn: ({ pageParam = 1 }) =>
      getRecipeList(pageParam),
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      if (lastPage.recipeList.length === 0) {
        return;
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
      <section
        className="inner-box"
        style={{ paddingTop: "12rem" }}
        aria-label="레시피 섹션"
      >
        {!isLoading &&
          data?.pages?.map((group, i) => (
            <RecipeList
              key={i}
              recipeList={group.recipeList}
            />
          ))}
      </section>

      <InfiniteScrollObserver
        fetchNextPage={fetchNextPage}
        canFetchMore={hasNextPage}
      />
    </>
  );
};

export default MainPage;
