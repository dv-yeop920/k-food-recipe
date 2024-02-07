import React from "react";
import styles from "./RecipeDetail.module.css";

const RecipeTip = ({ recipeTip }) => {
  return (
    <footer className={styles.tip_area}>
      <h2 className={styles.recipe_title}>📌 [Tip]</h2>
      <span className={styles.tip}>{recipeTip || ""}</span>
    </footer>
  );
};

export default RecipeTip;
