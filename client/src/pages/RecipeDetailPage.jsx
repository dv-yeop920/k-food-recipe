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
        return response.data;
      }
    } catch (error) {
      console.log(error);
    }
  };

  const { data } = useQuery({
    queryKey: ["recipe"],
    queryFn: getRecipeDetail,
  });

  const RECIPE_INFO = data.recipe;

  return (
    <>
      <section
        className={`inner-box ${styles.container}`}
        aria-label="레시피상세"
      >
        <RecipeInfo recipe={RECIPE_INFO} />

        <RecipeIngredient
          recipeIngredient={RECIPE_INFO.RCP_PARTS_DTLS}
        />

        <RecipeMenual recipe={RECIPE_INFO} />

        <RecipeTip recipeTip={RECIPE_INFO.RCP_NA_TIP} />
      </section>

      <FooterNavbar />
    </>
  );
};

export default RecipeDetailPage;
