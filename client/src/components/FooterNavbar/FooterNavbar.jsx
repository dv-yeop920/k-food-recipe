import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars , faShareFromSquare } from "@fortawesome/free-solid-svg-icons";
import { faHeart , faCommentDots } from "@fortawesome/free-regular-svg-icons";
import { NavLink } from "react-router-dom";
import styles from "./FooterNavbar.module.css";




const FooterNavbar = () => {

    return (
        <>
        <nav className = { styles.container } >
            <ul className = { styles.listArea } >
                <li className = "bar-list">
                    <NavLink to = "/noticeBoard" >
                        <FontAwesomeIcon
                        style = {{ marginRight: "5px" }}
                        className = { styles.icon }
                        icon = { faBars }
                        size = "lg" />

                        <span 
                        className = { styles.icon } >
                            목록으로 가기
                        </span>
                    </NavLink>
                </li>

                <li className = "bar-list">
                    <FontAwesomeIcon
                    style = {{ color: "red" }}
                    className = { styles.icon }
                    icon = { faHeart }
                    size = "lg" />
                </li>

                <li className = "bar-list">
                    <FontAwesomeIcon
                    className = { styles.icon }
                    icon = { faCommentDots }
                    size = "lg" />
                </li>

                <li className = "bar-list">
                    <FontAwesomeIcon
                    className = { styles.icon }
                    icon = { faShareFromSquare }
                    size = "lg" />
                </li>
            </ul>
        </nav>
        </>
    );
};

export default FooterNavbar;