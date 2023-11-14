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

    useEffect(() => {
        document.documentElement.style.setProperty(
            '--text-color', isDark ? '#fff' : '#333');
        document.documentElement.style.setProperty(
            '--background-color', isDark ? '#1d242a' : '#fff');
        document.documentElement.style.setProperty(
            '--box-shadow', isDark ? '#1d242a' : '#fff');
        document.documentElement.style.setProperty(
            '--border', isDark ? '0.5px solid #fff' : '0.5px solid rgba(0, 0, 0, 0.2)'
        )
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
                            style = {{ marginRight:"5px" , color:"#16a085" }}
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