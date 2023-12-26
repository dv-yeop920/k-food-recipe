import React from "react";
import { recipeData } from "../services/recipeData.js";
import styles from "../components/MainPage/recipe.module.css";

const MainPage = () => {
  const recipes = recipeData.COOKRCP01.row;

  return (
    <>
      <section
        className={`inner-box ${styles.recipe_section}`}
      >
        <ul className={styles.recipe_list}>
          {recipes.map((item, index) => {
            return (
              <li
                key={index}
                className={styles.recipe_card}
              >
                <figure>
                  <img
                    className={styles.recipe_img}
                    src={item.ATT_FILE_NO_MAIN}
                    alt={item.title}
                  />
                  <figcaption>
                    <h4 className={styles.recipe_title}>
                      {item.RCP_NM}
                    </h4>
                  </figcaption>
                </figure>
              </li>
            );
          })}
        </ul>
      </section>
    </>
  );
};

export default MainPage;
