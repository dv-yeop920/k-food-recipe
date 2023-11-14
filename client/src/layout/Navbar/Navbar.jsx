import React, { useEffect } from "react";
import styles from "./Navbar.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser , faBars , faGlobe , faSearch } from "@fortawesome/free-solid-svg-icons";
import { NavLink } from "react-router-dom";
import { openModal } from "../../store/slice/modalSlice";
import { useDispatch, useSelector } from "react-redux";
import { toggleTheme, theme } from "../../store/slice/themeSlice";




const Navbar = () => {
    const dispatch = useDispatch();
    const isDark = useSelector(theme);
    const darkMode = () => {
        const DOM_STYLE = document.documentElement.style;

        DOM_STYLE.setProperty(
            '--text-color', isDark ? 
            '#fff' : '#333');
        DOM_STYLE.setProperty(
            '--background-color', isDark ? 
            '#1d242a' : '#fff');
        DOM_STYLE.setProperty(
            '--box-shadow', isDark ? 
            'rgb(198, 197, 197) -1px 2px 30px -25px' : 
            '#00000059 0px 1px 20px');
        DOM_STYLE.setProperty(
            '--border', isDark ? 
            '0.5px solid #fff' : 
            '0.5px solid rgba(0, 0, 0, 0.2)');
        DOM_STYLE.setProperty(
            '--submit-background-color', isDark ? 
            '#2980b9' : '#1abc9c');
        DOM_STYLE.setProperty(
            '--title-color', isDark ? 
            '#2980b9' : '#1abc9c');
        DOM_STYLE.setProperty(
            '--submit-hover-background-color', isDark ? 
            '#286791' : '#2980b9');
        DOM_STYLE.setProperty(
            '--input-background-color', isDark ? 
            '#21282f' : '#fff');
    }

    useEffect(() => {
        darkMode();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isDark]);

    return (
        <>
        <header 
        className = { styles.header } >
            <div className = { styles.headerBox } >
                <div className = { styles.titleArea } >
                    <h2>
                        <NavLink 
                        className = { styles.title }
                        to = "/">
                            k-레시피
                        </NavLink>
                    </h2>
                </div>

                <div 
                className = { styles.recipeSearchArea } >
                    <NavLink 
                    className = { styles.recipeSearchLink } 
                    to = "/recipe" >
                        <FontAwesomeIcon
                        className = { styles.title }    
                        style = {{ marginRight:"5px" }}
                        icon = { faSearch }
                        size = "1x" />
                        여기를 눌러 레시피를 검색해 보세요!
                    </NavLink>
                </div>

                <div className = { styles.headerButtonArea } >
                    <button 
                    className = { styles.iconButton } 
                    onClick = {() => {
                        dispatch(toggleTheme());
                    }}>
                        <span className = { styles.moon } >
                            { isDark ? "☀️" : "🌙" }
                        </span>
                    </button>

                    <button className = { styles.iconButton } >
                        <FontAwesomeIcon
                        className = { styles.icon }
                        icon = { faGlobe }
                        size = "lg" />
                    </button>

                    <button 
                    className = { styles.menuButton }
                    onClick = {() => {
                        dispatch(openModal("menu"));
                    }} >
                        <FontAwesomeIcon
                            className = { styles.icon }
                            icon = { faBars }
                            size = "1x" />

                        <FontAwesomeIcon
                            className = { styles.icon }
                            icon = { faUser }
                            size = "1x" />
                    </button>
                </div>
            </div>
        </header>
        </>
    );
};

export default Navbar;