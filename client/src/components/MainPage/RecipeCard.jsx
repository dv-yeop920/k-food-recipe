import styles from "./Recipe.module.scss";
import "react-lazy-load-image-component/src/effects/black-and-white.css";
import { Link } from "react-router-dom";
import useLazyLoadImage from "hooks/useLazyLoadImage";

const RecipeCard = ({ recipe }) => {
  const { lazyLoadImage } = useLazyLoadImage();

  const lazyLoadParams = {
    key: "recipe_main",
    image: recipe.ATT_FILE_NO_MAIN,
    width: "100%",
    height: 276,
    order: "메인 음식이미지",
  };

  return (
    <Link to={`/recipe/${recipe._id}`}>
      <li className={styles.recipe_card}>
        <figure style={{ width: "100%", overflow: "hidden" }}>
          {lazyLoadImage(lazyLoadParams)}

          <figcaption style={{ padding: "0 3rem" }}>
            <h4 className={styles.recipe_title}>{recipe.RCP_NM}</h4>
          </figcaption>
          <div className={styles.tag_box}>
            <span
              className={styles.recipe_tag}
              style={{
                backgroundColor: "var(--tag-background-color)",
                color: "var(--tag-color)",
              }}
            >
              {recipe.HASH_TAG ? recipe.HASH_TAG : "음식"}
            </span>
            <span
              className={styles.recipe_tag}
              style={{
                backgroundColor: "var(--tag-background-color2)",
                color: "var(--tag-color)",
              }}
            >
              {recipe.RCP_WAY2}
            </span>
            <span
              className={styles.recipe_tag}
              style={{
                backgroundColor: "var(--tag-background-color3)",
                color: "var(--tag-color)",
              }}
            >
              {recipe.RCP_PAT2}
            </span>
          </div>
        </figure>
      </li>
    </Link>
  );
};

export default RecipeCard;
