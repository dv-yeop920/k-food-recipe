import React from "react";
import * as styled from "../../styles/styledComponents";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser , faBars , faGlobe , faSearch } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import NavItem from "./NavItem";
import LoginPage from "../../pages/LoginPage";
import SignUpPage from "../../pages/SignUpPage";
import useModal from "../../hooks/useModal";
import useInput from "../../hooks/useInput";



const Navbar = () => {
    const navigate = useNavigate();
    
    const [
            menuModal,
            openMenuModal,
            loginModal,
            signUpModal, 
            openCloseLoginModal, 
            openCloseSignUpModal, 
            changeModal,
            modalRef,
            modalOutSideClick
        ] = useModal(false);

    const [
            userName,
            userId,
            userPassword,
            checkPassword,
            userEmail,
            handleChangeValue
        ] = useInput("");



    return (
        <>
        <styled.Header>
            <div className ="header-container">
                <div 
                className ="header-title__column">
                    <h2
                    onClick ={ () => navigate("/") }>
                        k-레시피
                    </h2>
                </div>

                <div 
                className = "header-recipe-search__column" 
                onClick ={ () => navigate("/recipe") }>
                    <button className ="recipe-search__button">
                        <FontAwesomeIcon
                            style ={{ marginRight:"5px" , color:"#16a085" }}
                            icon ={ faSearch }
                            size ="1x"
                            />
                        여기를 눌러 레시피를 검색해 보세요!
                    </button>
                </div>

                <div className ="header-button__column">
                    <button className ="light-dark-mode__button header-icon-button">
                        <span className ="moon">
                            🌙
                        </span>
                    </button>

                    <button className ="global-language__button header-icon-button">
                        <FontAwesomeIcon
                        className ="header-icon"
                        icon ={ faGlobe }
                        size ="lg"
                        />
                    </button>

                    <button 
                    onClick ={ openMenuModal }
                    className ="user-sign__button"
                    >
                        <FontAwesomeIcon
                            className ="header-icon"
                            icon ={ faBars }
                            size ="1x"
                        />

                        <FontAwesomeIcon
                            className ="header-icon"
                            icon ={ faUser }
                            size ="1x"
                        />
                    </button>
                </div>
            </div>
        </styled.Header>

        { 
            menuModal === true &&
                <NavItem
                modalRef={modalRef} 
                modalOutSideClick={modalOutSideClick}
                openCloseLoginModal ={ openCloseLoginModal }
                openCloseSignUpModal ={ openCloseSignUpModal }
                />
        }
        
        { 
            loginModal === true && 
                <LoginPage
                modalRef={modalRef} 
                modalOutSideClick={modalOutSideClick}
                openCloseLoginModal ={ openCloseLoginModal }
                changeModal ={ changeModal }
                userId ={ userId }
                userPassword ={ userPassword }
                handleChangeValue ={ handleChangeValue }
                />
        }
        
        { 
            signUpModal === true && 
                <SignUpPage 
                modalRef={modalRef} 
                modalOutSideClick={modalOutSideClick}
                openCloseSignUpModal ={ openCloseSignUpModal }
                changeModal ={ changeModal }
                userName ={ userName }
                userId ={ userId }
                userPassword ={ userPassword }
                checkPassword ={ checkPassword }
                userEmail ={ userEmail }
                handleChangeValue ={ handleChangeValue }
                />
        }

        </>
    );
};

export default Navbar;