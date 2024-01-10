import React from "react";
import styles from "./Recipe.module.css";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { Link } from "react-router-dom";

const MenuCard = ({ recipe }) => {
  return (
    <Link to={`/recipe/${recipe._id}`}>
      <li className={styles.recipe_card}>
        <figure style={{ overflow: "hidden" }}>
          <LazyLoadImage
            className={styles.recipe_img}
            src={recipe.ATT_FILE_NO_MAIN}
            alt="음식 이미지"
          />

          <figcaption>
            <h4 className={styles.recipe_title}>
              {recipe.RCP_NM}
            </h4>
          </figcaption>
        </figure>
      </li>
    </Link>
  );
};

export default MenuCard;
