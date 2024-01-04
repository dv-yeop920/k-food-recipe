import React, { useEffect, useState } from "react";
import { recipeData } from "../../services/recipeData.js";
import styles from "./Recipe.module.css";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { Link } from "react-router-dom";
import MainSkeleton from "./skeleton/MainSkeleton.jsx";

const MenuCard = () => {
  const [isLoading, setIsLoading] = useState(true);
  const recipes = recipeData.COOKRCP01.row;

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);

  return (
    <ul className={styles.recipe_list}>
      {recipes.map((item, index) => {
        return isLoading ? (
          <MainSkeleton />
        ) : (
          <Link
            key={item.RCP_SEQ + index}
            to={`/recipe/${item.RCP_SEQ}`}
          >
            <li className={styles.recipe_card}>
              <figure style={{ overflow: "hidden" }}>
                <LazyLoadImage
                  className={styles.recipe_img}
                  src={item.ATT_FILE_NO_MAIN}
                  alt={item.title}
                />

                <figcaption>
                  <h4 className={styles.recipe_title}>
                    {item.RCP_NM}
                  </h4>
                </figcaption>
              </figure>
            </li>
          </Link>
        );
      })}
    </ul>
  );
};

export default MenuCard;
