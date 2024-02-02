import React from "react";
import styles from "./Recipe.module.css";
import { tabList } from "../../services/recipeData";

const RecipeTab = ({
  tabRecipeValue,
  onClickTabButton,
}) => {
  return (
    <nav className={styles.recipe_nav}>
      <div className={styles.nav_box}>
        <div className={styles.nav_column}>
          <div className={styles.back_box}>
            <button className={styles.back}>&lt;</button>
          </div>

          <ul className={styles.tab_box}>
            {tabList.map(tabName => {
              return (
                <li key={tabName}>
                  <button
                    className={`${styles.tab_button} ${
                      tabRecipeValue === tabName &&
                      styles.active
                    }`}
                    onClick={() =>
                      onClickTabButton(tabName)
                    }
                  >
                    {tabName}
                  </button>
                </li>
              );
            })}
          </ul>

          <div className={styles.next_box}>
            <button className={styles.next}>&gt;</button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default RecipeTab;
