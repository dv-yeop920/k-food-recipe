import axios from "axios";

export const getRecipeList = async (pageParam = 1, searchParam, tabParam) => {
  const response = await axios.get(
    `/api/recipeList?cursor=${pageParam}&search=${searchParam}&tab=${tabParam}`
  );

  return response.data;
};

export const getRecipeDetail = async id => {
  try {
    const response = await axios.get(`/api/recipeList/recipe?id=${id}`);

    if (response) {
      return response.data.recipe;
    }
  } catch (error) {
    console.log(error);
  }
};
