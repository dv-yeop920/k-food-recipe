import React, { useEffect } from 'react';
import axios from "axios";
import ScrollToTopButton from "../components/ScrollToTopButton";




const RecipePage = () => {
    const URL = "/api/99086c49e0dd4e7e8f6b/조리식품의 레시피 DB/json/1/5";

    return (
        <>
        <ScrollToTopButton/>
        </>
    );
};

export default RecipePage;