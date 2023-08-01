import React from "react";
import * as styled from "../../styles/styledComponents";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser , faBars , faGlobe , faSearch} from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router";
import { useState } from "react";
import NavItem from "./NavItem";
import LoginPage from "../../pages/LoginPage";
import SignUpPage from "../../pages/SignUpPage";



const Navbar = () => {
    const navigate = useNavigate();
    const [toggleMenu , setToggleMenu] = useState(false);
    const [showLoginModal , setShowLoginModal] = useState(false);
    const [showSignUpModal , setShowSignUpModal] = useState(false);
    
    return (
        <>
        <styled.Header>
            <div className="header-container">
                <div 
                className="header-title__column">
                    <h2
                    onClick={() => navigate("/")}>
                        k-레시피
                    </h2>
                </div>

                <div 
                className="header-recipe-search__column" 
                onClick={() => navigate("/recipe")}>
                    <button className="recipe-search__button">
                        <FontAwesomeIcon
                            style={{marginRight:"5px",color:"#16a085"}}
                            icon={faSearch}
                            size = "1x"
                            />
                        여기를 눌러 레시피를 검색해 보세요!
                    </button>
                </div>

                <div className="header-button__column">
                    <button className="light-dark-mode__button header-icon-button">
                        <span class="moon">🌙</span>
                    </button>

                    <button className="global-language__button header-icon-button">
                        <FontAwesomeIcon
                            className="header-icon"
                            icon={faGlobe}
                            size = "lg"/>
                    </button>
                    
                    <button 
                    onClick={() => setToggleMenu(!toggleMenu)}
                    className="user-sign__button">
                        <FontAwesomeIcon
                            className="header-icon"
                            icon={faBars}
                            size = "1x"/>
                        <FontAwesomeIcon
                            className="header-icon"
                            icon={faUser}
                            size = "1x"/>
                    </button>
                    { toggleMenu === true && 
                        <NavItem 
                        showModal={showLoginModal} 
                        setShowModal={setShowLoginModal}/> 
                    }
                </div>
            </div>
        </styled.Header>
        { showLoginModal === true && 
            <LoginPage 
            showLoginModal={showLoginModal} 
            setShowLoginModal={setShowLoginModal}/> 
        }
        { showSignUpModal === true && 
            <SignUpPage 
            showSignUpModal={showSignUpModal} 
            setShowSignUpModal={setShowSignUpModal}/> 
        }
        </>
    );
};

export default Navbar;