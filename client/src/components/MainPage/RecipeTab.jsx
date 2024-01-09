import React from "react";
import styles from "./Recipe.module.css";

const RecipeTab = ({ tab }) => {
  return (
    <li>
      <button className={styles.tab_button}>{tab}</button>
    </li>
  );
};

export default RecipeTab;
