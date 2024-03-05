import styles from "./RecipeDetail.module.scss";
import "react-lazy-load-image-component/src/effects/black-and-white.css";
import useLazyLoadImage from "hooks/useLazyLoadImage";

const RecipeInfo = ({ recipe }) => {
  const { lazyLoadImage } = useLazyLoadImage();

  const lazyLoadParams = {
    key: "recipe_detail",
    image: recipe.ATT_FILE_NO_MAIN,
    width: 430,
    height: 320,
    order: "메인 이미지",
  };

  return (
    <div className={styles.header}>
      {lazyLoadImage(lazyLoadParams)}

      <h1 className={styles.title}>{recipe.RCP_NM || ""}</h1>

      <div className={styles.nutrition_info}>
        <span className={styles.info}>
          {`열량 ${recipe.INFO_ENG || ""} kcal`}
        </span>

        <span className={styles.info}>
          {`탄수화물 ${recipe.INFO_CAR || ""} g`}
        </span>

        <span className={styles.info}>
          {`단백질 ${recipe.INFO_PRO || ""} g`}
        </span>

        <span className={styles.info}>{`지방 ${recipe.INFO_FAT || ""} g`}</span>

        <span className={styles.info}>
          {`나트륨 ${recipe.INFO_NA || ""} mg`}
        </span>
      </div>
    </div>
  );
};

export default RecipeInfo;
