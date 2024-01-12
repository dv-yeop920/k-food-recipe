import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faShareFromSquare,
} from "@fortawesome/free-solid-svg-icons";
import {
  faHeart,
  faCommentDots,
} from "@fortawesome/free-regular-svg-icons";
import { useNavigate } from "react-router-dom";
import styles from "./FooterNavbar.module.css";

const FooterNavbar = () => {
  const navigate = useNavigate();
  return (
    <>
      <nav className={styles.container}>
        <ul className={styles.listArea}>
          <li
            className={styles.bar_list}
            onClick={() => navigate(-1)}
          >
            <FontAwesomeIcon
              style={{ marginRight: "5px" }}
              className={styles.icon}
              icon={faBars}
              size="lg"
            />

            <span className={styles.icon}>
              목록으로 가기
            </span>
          </li>

          <li className={styles.bar_list}>
            <FontAwesomeIcon
              style={{ color: "red" }}
              className={styles.icon}
              icon={faHeart}
              size="lg"
            />
          </li>

          <li className={styles.bar_list}>
            <FontAwesomeIcon
              className={styles.icon}
              icon={faCommentDots}
              size="lg"
            />
          </li>

          <li className={styles.bar_list}>
            <FontAwesomeIcon
              className={styles.icon}
              icon={faShareFromSquare}
              size="lg"
            />
          </li>
        </ul>
      </nav>
    </>
  );
};

export default FooterNavbar;
