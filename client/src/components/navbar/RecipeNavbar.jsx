import React from "react";
import * as styled from "../../styles/styledComponents";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faGlobe} from "@fortawesome/free-solid-svg-icons";
import { useNavigate  } from "react-router";

const RecipeNavbar = () => {
    const navigate = useNavigate();

    return (
        <>
        <styled.Header>
            <div className="header-container">
                <div 
                className="header-title__column">
                    <h2
                    onClick ={() => navigate("/")}>
                        k-레시피
                    </h2>
                </div>

                <div className="header-recipe-search__column"></div>

                <div className="header-button__column">
                    <button className="light-dark-mode__button header-icon-button">
                        <span className="moon">🌙</span>
                    </button>

                    <button className="global-language__button header-icon-button">
                        <FontAwesomeIcon
                            className="header-icon"
                            icon={faGlobe}
                            size = "lg"/>
                    </button>
                </div>
            </div>
        </styled.Header>
        </>
    );
};

export default RecipeNavbar;