import React from "react";
import styles from "./Recipe.module.css";
import RecipeCard from "./RecipeCard";

const RecipeList = ({ recipeList }) => {
  //const queryClient = useQueryClient();

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
      <ul className={styles.recipe_list}>
        {recipeList &&
          recipeList.map(recipe => {
            return (
              <RecipeCard
                key={recipe._id}
                recipe={recipe}
              />
            );
          })}
      </ul>
    </>
  );
};

export default RecipeList;
