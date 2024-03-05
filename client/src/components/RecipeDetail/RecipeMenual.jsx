import styles from "./RecipeDetail.module.scss";
import "react-lazy-load-image-component/src/effects/black-and-white.css";
import useLazyLoadImage from "hooks/useLazyLoadImage";

const RecipeMenual = ({ recipe }) => {
  const { lazyLoadImage } = useLazyLoadImage();

  return (
    <div className={styles.content_area}>
      <h2 className={styles.recipe_title}>📌 [조리 순서]</h2>

      {recipe.MANUAL01 && (
        <>
          <span className={styles.recipe_menual}>{recipe.MANUAL01}</span>
          {lazyLoadImage("", recipe.MANUAL_IMG01, "1번 순서")}
        </>
      )}

      {recipe.MANUAL02 && (
        <>
          <span className={styles.recipe_menual}>{recipe.MANUAL02}</span>
          {lazyLoadImage("", recipe.MANUAL_IMG02, "2번 순서")}
        </>
      )}

      {recipe.MANUAL03 && (
        <>
          <span className={styles.recipe_menual}>{recipe.MANUAL03}</span>
          {lazyLoadImage("", recipe.MANUAL_IMG03, "3번 순서")}
        </>
      )}

      {recipe.MANUAL04 && (
        <>
          <span className={styles.recipe_menual}>{recipe.MANUAL04}</span>
          {lazyLoadImage("", recipe.MANUAL_IMG04, "4번 순서")}
        </>
      )}

      {recipe.MANUAL05 && (
        <>
          <span className={styles.recipe_menual}>{recipe.MANUAL05}</span>
          {lazyLoadImage("", recipe.MANUAL_IMG05, "5번 순서")}
        </>
      )}

      {recipe.MANUAL06 && (
        <>
          <span className={styles.recipe_menual}>{recipe.MANUAL06}</span>
          {lazyLoadImage("", recipe.MANUAL_IMG06, "6번 순서")}
        </>
      )}
    </div>
  );
};

export default RecipeMenual;
