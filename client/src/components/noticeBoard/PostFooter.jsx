import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars , faShareFromSquare } from "@fortawesome/free-solid-svg-icons";
import { faHeart , faCommentDots } from "@fortawesome/free-regular-svg-icons";
import { useNavigate } from "react-router-dom";
const PostFooter = () => {
    const navigate = useNavigate();
    
    return (
        <>
        <nav className ="footer-bar__container">
            <ul className ="bar-list__area">
                <li className ="bar-list">
                    <FontAwesomeIcon
                    style ={{ marginRight: "5px" }}
                    className ="writing-icon"
                    icon={ faBars }
                    size ="lg"/>
                    <span 
                    onClick ={ () => navigate(-1, { replace: true }) }
                    style ={{ cursor:"pointer",fontWeight:"600" }}>
                        목록으로 가기
                    </span>
                </li>

                <li className ="bar-list">
                    <FontAwesomeIcon
                    style ={{ color: "red" }}
                    className ="writing-icon"
                    icon ={ faHeart }
                    size ="lg"/>
                </li>

                <li className ="bar-list">
                    <FontAwesomeIcon
                    className ="writing-icon"
                    icon ={ faCommentDots }
                    size ="lg"/>
                </li>

                <li className ="bar-list">
                    <FontAwesomeIcon
                    className ="writing-icon"
                    icon ={ faShareFromSquare }
                    size ="lg"/>
                </li>

            </ul>
        </nav>
        </>
    );
};

export default PostFooter;