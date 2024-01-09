import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styles from "../components/PostDetail/PostDetail.module.css";
import axios from "axios";

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
  }, []);
  return (
    <div className={styles.detailContainer}>
      <div className={styles.header}>
        <div className={styles.headerTitle}>
          <span>자유 게시판</span>
        </div>

        <div>
          <h2 className={styles.title}>{recipe.RCP_NM}</h2>
        </div>

        <div>
          <div className={styles.info}>
            <span className={styles.id}></span>
          </div>
        </div>
      </div>

      <div className={styles.content}></div>
    </div>
  );
};

export default RecipeDetailPage;
