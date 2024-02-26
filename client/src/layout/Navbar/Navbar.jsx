import { useEffect } from "react";
import styles from "./Navbar.module.scss";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { openModal } from "store/slice/modalSlice";
import { toggleTheme, theme } from "store/slice/themeSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faBars,
  faGlobe,
  faSearch,
} from "@fortawesome/free-solid-svg-icons";

const Navbar = () => {
  const dispatch = useDispatch();
  const isDark = useSelector(theme);

  const darkMode = () => {
    const DOM_EL = document.documentElement;

    isDark
      ? DOM_EL.setAttribute("data-theme", "dark")
      : DOM_EL.setAttribute("data-theme", "light");
  };

  useEffect(() => {
    darkMode();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isDark]);

  return (
    <header className={styles.header}>
      <div className={styles.headerBox}>
        <div className={styles.header_menu}>
          <Link className={styles.title_area} to={"/"}>
            <h1 className={styles.title}>k-레시피</h1>
          </Link>

          <div className={styles.recipeSearchArea}>
            <div
              className={styles.recipeSearchLink}
              onClick={() => {
                dispatch(openModal("search"));
              }}
            >
              <FontAwesomeIcon
                className={styles.search_icon}
                style={{
                  marginRight: "5px",
                }}
                icon={faSearch}
                size="1x"
              />
              <span style={{ fontSize: "0.95rem", textWrap: "noWrap" }}>
                여기를 눌러 원하는 것을 검색해 보세요!
              </span>
            </div>
          </div>

          <div className={styles.headerButtonArea}>
            <button
              className={styles.iconButton}
              onClick={() => {
                dispatch(toggleTheme());
              }}
            >
              <span className={styles.moon}>{isDark ? "☀️" : "🌙"}</span>
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
  );
};

export default Navbar;
