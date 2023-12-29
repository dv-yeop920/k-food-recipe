import React from "react";
import styles from "../components/MainPage/Recipe.module.css";
import RecipeCard from "../components/MainPage/RecipeCard";
import RecipeTab from "../components/MainPage/RecipeTab";

const MainPage = () => {
  return (
    <>
      <RecipeTab />
      <section
        className={`inner-box ${styles.recipe_section}`}
        aria-label="레시피 섹션"
      >
        <main>
          <RecipeCard />
        </main>
      </section>
    </>
  );
};

export default MainPage;
