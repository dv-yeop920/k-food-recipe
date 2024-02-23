import styles from "../components/RecipeDetail/RecipeDetail.module.scss";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getRecipeDetail } from "services/recipe.services";
import FooterNavbar from "components/FooterNavbar/FooterNavbar";
import RecipeMenual from "components/RecipeDetail/RecipeMenual";
import RecipeInfo from "components/RecipeDetail/RecipeInfo";
import RecipeIngredient from "components/RecipeDetail/RecipeIngredient";
import RecipeTip from "components/RecipeDetail/RecipeTip";

const RecipeDetailPage = () => {
  const { id } = useParams();

  const { data: recipe } = useQuery({
    queryKey: ["recipe"],
    queryFn: () => getRecipeDetail(id),
  });

  return (
    <main className="back-ground">
      <section
        className={`inner-box ${styles.container}`}
        aria-label="레시피상세"
      >
        <RecipeInfo recipe={recipe} />

        <RecipeIngredient recipeIngredient={recipe.RCP_PARTS_DTLS} />

        <RecipeMenual recipe={recipe} />

        <RecipeTip recipeTip={recipe.RCP_NA_TIP} />
      </section>

      <FooterNavbar />
    </main>
  );
};

export default RecipeDetailPage;
