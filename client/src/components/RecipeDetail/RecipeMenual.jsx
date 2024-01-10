import React from "react";
import styles from "./RecipeDetail.module.css";

const RecipeMenual = ({ recipe }) => {
  return (
    <div className={styles.content_area}>
      <h2 className={styles.recipe_title}>
        📌 [조리 순서]
      </h2>
      <span className={styles.recipe_menual}>
        {recipe.MANUAL01}
      </span>
      <img
        className={styles.image}
        src={recipe.MANUAL_IMG01}
        alt="1번 순서"
        width={550}
        height={300}
      />

      <span className={styles.recipe_menual}>
        {recipe.MANUAL02}
      </span>
      <img
        className={styles.image}
        src={recipe.MANUAL_IMG02}
        alt="2번 순서"
        width={550}
        height={300}
      />

      <span className={styles.recipe_menual}>
        {recipe.MANUAL03}
      </span>
      <img
        className={styles.image}
        src={recipe.MANUAL_IMG03}
        alt="3번 순서"
        width={550}
        height={300}
      />

      {recipe.MANUAL04 && (
        <>
          <span className={styles.recipe_menual}>
            {recipe.MANUAL04}
          </span>
          <img
            className={styles.image}
            src={recipe.MANUAL_IMG04}
            alt="4번 순서"
            width={550}
            height={300}
          />
        </>
      )}
      {recipe.MANUAL05 && (
        <>
          <span className={styles.recipe_menual}>
            {recipe.MANUAL05}
          </span>
          <img
            className={styles.image}
            src={recipe.MANUAL_IMG05}
            alt="5번 순서"
            width={550}
            height={300}
          />
        </>
      )}
      {recipe.MANUAL06 && (
        <>
          <span className={styles.recipe_menual}>
            {recipe.MANUAL06}
          </span>
          <img
            className={styles.image}
            src={recipe.MANUAL_IMG06}
            alt="6번 순서"
            width={550}
            height={300}
          />
        </>
      )}
    </div>
  );
};

export default RecipeMenual;
