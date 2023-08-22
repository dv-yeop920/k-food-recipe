import React from "react";
import { useNavigate } from "react-router-dom";
import * as styled from "../../styles/styledComponents";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";

const PostSearchInput = () => {
    const navigate = useNavigate();

    return (
        <>
        <styled.SearchContainer>

            <form
            className = "user-search__form">

                <styled.Input
                className = "user-search__input"
                type = "text"
                placeholder = "단어 단위로 입력..." />

                <styled.SubmitButton
                className = "default-btn"
                type = "submit" >
                    검색
                </styled.SubmitButton>

                <FontAwesomeIcon
                    className = "writing-icon"
                    icon = { faPenToSquare }
                    size = "2x"
                    onClick = { () => navigate("/writing") } />

            </form>

        </styled.SearchContainer>
        </>
    );
};

export default PostSearchInput;