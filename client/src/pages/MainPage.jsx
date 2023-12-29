import React from "react";
import styles from "../components/MainPage/Recipe.module.css";
import RecipeCard from "../components/MainPage/RecipeCard";

const MainPage = () => {
  return (
    <>
      <section
        className={`inner-box ${styles.recipe_section}`}
      >
        <ul className={styles.recipe_list}>
          <RecipeCard />
        </ul>
      </section>
    </>
  );
};

export default MainPage;
