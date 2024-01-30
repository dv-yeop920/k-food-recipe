import React from "react";
import styles from "./Recipe.module.css";
import { tabList } from "../../services/recipeData";

const RecipeTab = ({ tabValue, setTabValue }) => {
  const onClickTab = value => {
    console.log("value", value);
    setTabValue(value);
  };

  return (
    <nav className={styles.recipe_nav}>
      <div className={styles.nav_box}>
        <div className={styles.nav_column}>
          <div className={styles.back_box}>
            <button className={styles.back}>&lt;</button>
          </div>

          <ul className={styles.tab_box}>
            {tabList.map(item => {
              return (
                <li key={item}>
                  <button
                    className={`${
                      item === tabValue
                        ? styles.tab_button_active
                        : styles.tab_button
                    }`}
                    onClick={() => onClickTab(item)}
                  >
                    {item}
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
