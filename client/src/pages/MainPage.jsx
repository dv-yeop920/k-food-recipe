import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import DeferrendComponent from "components/Loading/DeferredComponent";
import TabLoading from "components/Loading/skeleton/TabSkeleton";
import ScrollLoading from "components/Loading/ScrollLoading";
import RecipeSkeleton from "components/Loading/skeleton/RecipeSkeleton";
import RecipeTab from "components/MainPage/RecipeTab";
import RecipeList from "components/MainPage/RecipeList";
import InfiniteScrollObserver from "components/InfiniteObserver/InfiniteScrollObserver";
import useInfiniteScroll from "hooks/useInfiniteScroll";
import ScrollToTop from "utils/scrollTop";

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

  const { data, isLoading, fetchNextPage, hasNextPage } = useInfiniteScroll(
    "recipeList",
    searchParam,
    tabParam
  );

  useEffect(() => {
    if (!isLoading) {
      setIsTabLoading(false);
    }
  }, [isLoading]);

  return (
    <main className="back-ground">
      <ScrollToTop tabParam={tabParam} />

      {isTabLoading ? (
        <DeferrendComponent>
          <TabLoading />
        </DeferrendComponent>
      ) : (
        <RecipeTab
          searchParams={searchParams}
          tabParam={tabParam}
          onClickTabButton={onClickTabButton}
        />
      )}

      {isLoading && (
        <DeferrendComponent>
          <RecipeSkeleton />
        </DeferrendComponent>
      )}

      <section
        className="inner-box"
        style={{ paddingTop: "12rem" }}
        aria-label="레시피 섹션"
      >
        {!isLoading &&
          data?.pages?.map((group, i) => (
            <RecipeList key={i} recipeList={group.recipeList} />
          ))}
      </section>

      <InfiniteScrollObserver
        fetchNextPage={fetchNextPage}
        canFetchMore={hasNextPage}
      />

      {hasNextPage && <ScrollLoading />}
    </main>
  );
};

export default MainPage;
