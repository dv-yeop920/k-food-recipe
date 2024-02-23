import React from "react";
import styles from "./RecipeDetail.module.scss";

const RecipeIngredient = ({ recipeIngredient }) => {
  const renderIngredient = () => {
    return recipeIngredient.split(",").map((ingredient, index) => (
      <div key={ingredient + index}>
        <span className={styles.ingredient}>{`⭐️ ${ingredient}` || ""}</span>
        <br />
      </div>
    ));
  };

  return (
    <div className={styles.ingredient_area}>
      <h2 className={styles.ingredient_title}>📌 [필요한 재료]</h2>
      {recipeIngredient && renderIngredient()}
    </div>
  );
};

export default RecipeIngredient;
