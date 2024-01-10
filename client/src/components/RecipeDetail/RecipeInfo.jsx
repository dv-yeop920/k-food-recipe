import React from "react";
import styles from "./RecipeDetail.module.css";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

const RecipeInfo = ({ recipe }) => {
  return (
    <div className={styles.header}>
      <LazyLoadImage
        className={styles.image}
        src={recipe.ATT_FILE_NO_MK}
        alt="음식 이미지"
        height={350}
        effect="blur"
      />
      <h1 className={styles.title}>{recipe.RCP_NM}</h1>
      <div className={styles.nutrition_info}>
        <span
          className={styles.info}
        >{`열량 ${recipe.INFO_ENG} kcal`}</span>
        <span
          className={styles.info}
        >{`탄수화물 ${recipe.INFO_CAR} g`}</span>
        <span
          className={styles.info}
        >{`단백질 ${recipe.INFO_PRO} g`}</span>
        <span
          className={styles.info}
        >{`지방 ${recipe.INFO_FAT} g`}</span>
        <span
          className={styles.info}
        >{`나트륨 ${recipe.INFO_NA} mg`}</span>
      </div>
    </div>
  );
};

export default RecipeInfo;
