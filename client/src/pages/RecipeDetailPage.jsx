import React from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import styles from "../components/RecipeDetail/RecipeDetail.module.css";
import axios from "axios";
import FooterNavbar from "../components/FooterNavbar/FooterNavbar";
import RecipeMenual from "../components/RecipeDetail/RecipeMenual";
import RecipeInfo from "../components/RecipeDetail/RecipeInfo";
import RecipeIngredient from "../components/RecipeDetail/RecipeIngredient";
import RecipeTip from "../components/RecipeDetail/RecipeTip";

const RecipeDetailPage = () => {
  const { id } = useParams();

  const getRecipeDetail = async () => {
    try {
      const response = await axios.get(
        `/api/recipeList/recipe?id=${id}`
      );

      if (response) {
        return response.data.recipe;
      }
    } catch (error) {
      console.log(error);
    }
  };

  const { data: recipe } = useQuery({
    queryKey: ["recipe"],
    queryFn: getRecipeDetail,
  });

  return (
    <>
      <section
        className={`inner-box ${styles.container}`}
        aria-label="레시피상세"
      >
        <RecipeInfo recipe={recipe} />

        <RecipeIngredient
          recipeIngredient={recipe.RCP_PARTS_DTLS}
        />

        <RecipeMenual recipe={recipe} />

        <RecipeTip recipeTip={recipe.RCP_NA_TIP} />
      </section>

      <FooterNavbar />
    </>
  );
};

export default RecipeDetailPage;
