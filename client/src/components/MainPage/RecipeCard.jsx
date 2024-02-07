import React from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import styles from "./Recipe.module.css";
import { Link } from "react-router-dom";

const MenuCard = ({ recipe }) => {
  return (
    <Link to={`/recipe/${recipe._id}`}>
      <li className={styles.recipe_card}>
        <figure
          style={{ width: "100%", overflow: "hidden" }}
        >
          <LazyLoadImage
            className={styles.recipe_img}
            style={{
              transition: "all 0.3s ease-in-out",
            }}
            src={recipe.ATT_FILE_NO_MAIN}
            width={"100%"}
            height={276}
            alt="음식 이미지"
            effect="blur"
          />

          <figcaption style={{ padding: "0 3rem" }}>
            <h4 className={styles.recipe_title}>
              {recipe.RCP_NM}
            </h4>
          </figcaption>
          <div className={styles.tag_box}>
            <span className={styles.recipe_tag}>
              {recipe.HASH_TAG ? recipe.HASH_TAG : "음식"}
            </span>
            <span className={styles.recipe_tag}>
              {recipe.RCP_WAY2}
            </span>
            <span className={styles.recipe_tag}>
              {recipe.RCP_PAT2}
            </span>
          </div>
        </figure>
      </li>
    </Link>
  );
};

export default MenuCard;
