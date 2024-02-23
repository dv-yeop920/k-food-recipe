import styles from "./RecipeDetail.module.scss";

const RecipeTip = ({ recipeTip }) => {
  return (
    <footer className={styles.tip_area}>
      {recipeTip && (
        <>
          <h2 className={styles.recipe_title}>📌 [Tip]</h2>
          <span className={styles.tip}>{recipeTip || ""}</span>
        </>
      )}
    </footer>
  );
};

export default RecipeTip;
