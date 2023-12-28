/*import React, { useEffect, useState } from "react";
import axios from "axios";

const RecipePage = () => {
const URL =
    "http://openapi.foodsafetykorea.go.kr/api/99086c49e0dd4e7e8f6b/COOKRCP01/json/1/5";
  const [recipe, setRecipe] = useState([]);
  const render = async () => {
    const cook = await axios.get(URL);
    if (cook) {
      setRecipe(cook);
    }
  };

  useEffect(() => {
    render();
  }, []);

  return (
    <>
      {recipe.map(item => {
        return <h1>{item.RCP_PARTS_DTLS}</h1>;
      })}
    </>
  );
};

export default RecipePage;*/
