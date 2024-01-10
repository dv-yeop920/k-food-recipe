import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styles from "../components/RecipeDetail/RecipeDetail.module.css";
import axios from "axios";
import FooterNavbar from "../components/FooterNavbar/FooterNavbar";
import RecipeMenual from "../components/RecipeDetail/RecipeMenual";
import RecipeInfo from "../components/RecipeDetail/RecipeInfo";
import RecipeIngredient from "../components/RecipeDetail/RecipeIngredient";

const RecipeDetailPage = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState({});

  const getRecipeDetail = async () => {
    try {
      const response = await axios.get(
        `/api/recipeList/recipe?id=${id}`
      );

      if (response) {
        setRecipe(response.data.recipe);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getRecipeDetail();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <section
        className={`inner-box ${styles.container}`}
        aria-label="레시피상세"
      >
        <RecipeInfo recipe={recipe} />

        <RecipeIngredient recipe={recipe} />

        <RecipeMenual recipe={recipe} />

        <div className={styles.tip_area}>
          <h2 className={styles.recipe_title}>📌 [Tip]</h2>
          <span className={styles.tip}>
            {recipe.RCP_NA_TIP}
          </span>
        </div>
      </section>

      <FooterNavbar />
    </>
  );
};

export default RecipeDetailPage;
