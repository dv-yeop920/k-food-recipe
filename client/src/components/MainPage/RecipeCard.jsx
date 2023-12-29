import React, { useEffect, useState } from "react";
import { recipeData } from "../../services/recipeData.js";
import styles from "./Recipe.module.css";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { Link } from "react-router-dom";
import MainSkeleton from "./MainSkeleton.jsx";

const MenuCard = () => {
  const [isLoading, setIsLoading] = useState(true);
  const recipes = recipeData.COOKRCP01.row;

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1500);
  }, []);
  return (
    <>
      {recipes.map((item, index) => {
        return (
          <Link
            key={item.RCP_SEQ + index}
            to={`/recipe/${item.RCP_SEQ}`}
          >
            {isLoading ? (
              <MainSkeleton />
            ) : (
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
            )}
          </Link>
        );
      })}
    </>
  );
};

export default MenuCard;
