import React, { useEffect, useState } from "react";
import styles from "./Navbar.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faBars,
  faGlobe,
  faSearch,
  faX,
} from "@fortawesome/free-solid-svg-icons";
import { NavLink } from "react-router-dom";
import { openModal } from "../../store/slice/modalSlice";
import { useDispatch, useSelector } from "react-redux";
import {
  toggleTheme,
  theme,
} from "../../store/slice/themeSlice";

const Navbar = () => {
  const dispatch = useDispatch();
  const isDark = useSelector(theme);
  const [isSearchBar, setIsSearchBar] = useState(false);

  const darkMode = () => {
    const DOM_STYLE = document.documentElement.style;

    DOM_STYLE.setProperty(
      "--text-color",
      isDark ? "#fff" : "#333"
    );
    DOM_STYLE.setProperty(
      "--background-color",
      isDark ? "#1d242a" : "#fff"
    );
    DOM_STYLE.setProperty(
      "--box-shadow",
      isDark
        ? "rgb(198, 197, 197) -1px 2px 30px -25px"
        : "#00000059 0px 1px 20px"
    );
    DOM_STYLE.setProperty(
      "--border",
      isDark
        ? "0.5px solid #fff"
        : "0.5px solid rgba(0, 0, 0, 0.2)"
    );
    DOM_STYLE.setProperty(
      "--submit-background-color",
      isDark ? "#3498db" : "#1abc9c"
    );
    DOM_STYLE.setProperty(
      "--title-color",
      isDark ? "#3498db" : "#1abc9c"
    );
    DOM_STYLE.setProperty(
      "--submit-hover-background-color",
      isDark ? "#286791" : "#2980b9"
    );
    DOM_STYLE.setProperty(
      "--input-background-color",
      isDark ? "#21282f" : "#fff"
    );
  };

  useEffect(() => {
    darkMode();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isDark]);

  return (
    <>
      <header className={styles.header}>
        <div className={styles.headerBox}>
          <div className={styles.header_menu}>
            <NavLink className={styles.title} to="/">
              <h1>k-레시피</h1>
            </NavLink>

            <div className={styles.recipeSearchArea}>
              {isSearchBar && (
                <>
                  <label htmlFor="recipeSearchInput">
                    <input
                      type="search"
                      maxLength={13}
                      className={`${styles.recipeSearchLink} ${styles.recipeSearchInput}`}
                      id="recipeSearchInput"
                      autoFocus
                    />
                  </label>
                  <FontAwesomeIcon
                    className={styles.search_cancel}
                    onClick={() => setIsSearchBar(false)}
                    icon={faX}
                    size="1x"
                  />
                </>
              )}
              {!isSearchBar && (
                <div
                  className={styles.recipeSearchLink}
                  onClick={() => setIsSearchBar(true)}
                >
                  <FontAwesomeIcon
                    className={styles.search_icon}
                    style={{
                      marginRight: "5px",
                    }}
                    icon={faSearch}
                    size="1x"
                  />
                  <span style={{ fontSize: "1rem" }}>
                    여기를 눌러 레시피를 검색해 보세요!
                  </span>
                </div>
              )}
            </div>

            <div className={styles.headerButtonArea}>
              <button
                className={styles.iconButton}
                onClick={() => {
                  dispatch(toggleTheme());
                }}
              >
                <span className={styles.moon}>
                  {isDark ? "☀️" : "🌙"}
                </span>
              </button>

              <button className={styles.iconButton}>
                <FontAwesomeIcon
                  className={styles.icon}
                  icon={faGlobe}
                  size="lg"
                />
              </button>

              <button
                className={styles.menuButton}
                onClick={() => {
                  dispatch(openModal("menu"));
                }}
              >
                <FontAwesomeIcon
                  className={styles.icon}
                  icon={faBars}
                  size="1x"
                />

                <FontAwesomeIcon
                  className={styles.icon}
                  icon={faUser}
                  size="1x"
                />
              </button>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Navbar;
