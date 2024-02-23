import styles from "./Recipe.module.scss";
import RecipeCard from "./RecipeCard";
import NotFound from "components/NotFound/NotFound";

const RecipeList = ({ recipeList }) => {
  return (
    <>
      <ul className={styles.recipe_list}>
        {recipeList &&
          recipeList.map(recipe => {
            return <RecipeCard key={recipe._id} recipe={recipe} />;
          })}
      </ul>
      {recipeList.length === 0 && <NotFound />}
    </>
  );
};

export default RecipeList;
