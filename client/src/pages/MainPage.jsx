import React from "react";
import RecipeTab from "../components/MainPage/RecipeTab";
import RecipeList from "../components/MainPage/RecipeList";

import axios from "axios";
import {
  useQuery,
  //useMutation,
  //useQueryClient,
} from "@tanstack/react-query";

const MainPage = () => {
  const getRecipeList = async () => {
    try {
      const response = await axios.get(`/api/recipeList`);

      if (response) {
        return response.data.recipeList;
      }
    } catch (error) {
      console.log(error);
    }
  };
  // Queries
  const { data: recipeList } = useQuery({
    queryKey: ["recipeList"],
    queryFn: getRecipeList,
    staleTime: 1000 * 240,
  });

  return (
    <>
      <RecipeTab />
      <RecipeList recipeList={recipeList} />
    </>
  );
};

export default MainPage;
