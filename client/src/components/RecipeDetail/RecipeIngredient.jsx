import React from "react";
import styles from "./RecipeDetail.module.css";

const RecipeIngredient = ({ recipe }) => {
  const renderIngredient = () => {
    return recipe.RCP_PARTS_DTLS.split(",").map(
      (ingredient, index) => (
        <div key={ingredient + index}>
          <span className={styles.ingredient}>
            {`⭐️ ${ingredient}`}
          </span>
          <br />
        </div>
      )
    );
  };

  return (
    <div className={styles.ingredient_area}>
      <h2 className={styles.ingredient_title}>
        📌 [필요한 재료]
      </h2>
      {recipe.RCP_PARTS_DTLS && renderIngredient()}
    </div>
  );
};

export default RecipeIngredient;
