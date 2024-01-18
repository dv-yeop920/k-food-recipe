import React, { useState } from "react";
import RecipeTab from "../components/MainPage/RecipeTab";
import RecipeList from "../components/MainPage/RecipeList";

import axios from "axios";
import {
  useQuery,
  useInfiniteQuery,
  //useMutation,
  //useQueryClient,
} from "@tanstack/react-query";

const MainPage = ({ SearchRecipeValue }) => {
  const [pageNumber, setPageNumber] = useState(1);
  const [tabValue, setTabValue] = useState("");

  const getRecipeList = async () => {
    try {
      const response = await axios.get(
        `/api/recipeList?page=${pageNumber}
        &search=${SearchRecipeValue}
        &tabFocus=${tabValue}`
      );

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
