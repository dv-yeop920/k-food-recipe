import React from "react";
import styles from "./Recipe.module.scss";
import RecipeCard from "./RecipeCard";

const RecipeList = ({ recipeList }) => {
  return (
    <>
      <ul className={styles.recipe_list}>
        {recipeList &&
          recipeList.map(recipe => {
            return <RecipeCard key={recipe._id} recipe={recipe} />;
          })}
      </ul>
    </>
  );
};

export default RecipeList;
