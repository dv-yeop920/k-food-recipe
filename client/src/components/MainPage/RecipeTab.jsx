import React, { useEffect, useState } from "react";
import styles from "./Recipe.module.scss";
import { tabList } from "../../services/recipeData";
import { useNavigate } from "react-router-dom";

const RecipeTab = ({ searchParams, tabParam, onClickTabButton }) => {
  const navigate = useNavigate();
  const [tabRecipeValue, setTabRecipeValue] = useState("");

  useEffect(() => {
    if (tabParam && tabList.includes(tabParam)) {
      setTabRecipeValue(tabParam);
      searchParams.set("search", "null");
      navigate(`?${searchParams.toString()}`, {
        replace: true,
      });
    } else {
      setTabRecipeValue(tabList[0]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tabParam]);

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
                    className={`
                    ${styles.tab_button} ${
                      tabRecipeValue === tabName && styles.active
                    }`}
                    onClick={() => onClickTabButton(tabName)}
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
