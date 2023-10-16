import React from "react";
import * as styled from "../../styles/styledComponents";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import useAuth from "../../hooks/useAuth";




const PostSearchInput = (
    { 
        userPostSearchValue ,
        onSubmitGetFilteredPostList
    }
    ) => {

    const { authAndNavigate } = useAuth("");

    return (
        <>
        <styled.SearchContainer>

            <form
            className = "user-search__form"
            onSubmit = { onSubmitGetFilteredPostList } >

                <styled.Input
                id = "search-post"
                className = "user-search__input"
                ref = { userPostSearchValue }
                type = "search"
                placeholder = "단어 단위로 입력..."
                name = { userPostSearchValue } />

                <styled.SubmitButton
                className = "default-btn"
                type = "submit" >
                    검색
                </styled.SubmitButton>

                <FontAwesomeIcon
                id = "writing-icon"
                className = "writing-icon"
                icon = { faPenToSquare }
                size = "2x"
                onClick = { () => {
                    authAndNavigate("/writing");
                }} />
            </form>

        </styled.SearchContainer>
        </>
    );
};

export default PostSearchInput;