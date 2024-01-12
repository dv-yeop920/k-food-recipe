import React from "react";
import styles from "../components/MainPage/Recipe.module.css";
import RecipeCard from "../components/MainPage/RecipeCard";
import RecipeTab from "../components/MainPage/RecipeTab";
import { tabList } from "../services/recipeData.js";
import MainSkeleton from "../components/MainPage/skeleton/MainSkeleton.jsx";
import { Skeleton } from "@mui/material";
import axios from "axios";
import {
  useQuery,
  //useMutation,
  //useQueryClient,
} from "@tanstack/react-query";

const MainPage = () => {
  //const queryClient = useQueryClient();

  const getRecipeList = async () => {
    try {
      const response = await axios.get(`/api/recipeList`);

      if (response) {
        return response.data.recipes;
      }
    } catch (error) {
      console.log(error);
    }
  };
  // Queries
  const {
    isLoading,
    //error,
    data: recipes,
  } = useQuery({
    queryKey: ["recipes"],
    queryFn: getRecipeList,
    staleTime: 1000 * 60 * 24,
  });

  // Mutations
  /*const mutation = useMutation({
    mutationFn: getRecipeList,
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({
        queryKey: ["recipes"],
      });
    },
  });*/

  return (
    <>
      <nav className={styles.recipe_nav}>
        <div className={styles.nav_box}>
          <div className={styles.nav_column}>
            <div className={styles.back_box}>
              {isLoading ? (
                <Skeleton
                  key={1}
                  style={{ borderRadius: "50%" }}
                  width={30}
                  height={50}
                />
              ) : (
                <button className={styles.back}>
                  &lt;
                </button>
              )}
            </div>
            <ul className={styles.tab_box}>
              {tabList.map(item => {
                return isLoading ? (
                  <Skeleton
                    key={item}
                    animation="wave"
                    variant="button"
                    style={{
                      borderRadius: "15px",
                      marginRight: "10px",
                    }}
                    width={300}
                    height={60}
                  />
                ) : (
                  <RecipeTab key={item} tab={item} />
                );
              })}
            </ul>

            <div className={styles.next_box}>
              {isLoading ? (
                <Skeleton
                  key={1}
                  style={{ borderRadius: "50%" }}
                  width={30}
                  height={50}
                />
              ) : (
                <button className={styles.next}>
                  &gt;
                </button>
              )}
            </div>
          </div>
        </div>
      </nav>

      <section
        className={`inner-box ${styles.recipe_section}`}
        aria-label="레시피 섹션"
      >
        <main>
          <ul className={styles.recipe_list}>
            {recipes &&
              recipes.map(recipe => {
                return (
                  <RecipeCard
                    key={recipe._id}
                    recipe={recipe}
                  />
                );
              })}
          </ul>
        </main>
      </section>
    </>
  );
};

export default MainPage;
