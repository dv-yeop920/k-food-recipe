import React from "react";
import { useNavigate } from "react-router-dom";
import * as styled from "../../styles/styledComponents";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

const PostSearchInput = (
    { 
        userPostSearchValue ,
        setUserPostSearchValue , 
        onSubmitGetFilteredPostList 
    }
    ) => {

    const navigate = useNavigate();

    const onClickWritingButton = async () => {
        const response = await axios.get("/api/users/auth");
        console.log(response)
        if (response.data.isAuth === true) {
            navigate("/writing");
        }
        else {
            navigate("/");
        }
        
    }

    return (
        <>
        <styled.SearchContainer>

            <form
            className = "user-search__form"
            onSubmit = { onSubmitGetFilteredPostList } >

                <styled.Input
                id = "search-post"
                className = "user-search__input"
                type = "search"
                placeholder = "단어 단위로 입력..."
                value = { userPostSearchValue }
                name = { userPostSearchValue } 
                onChange = { (e) => { 

                    setUserPostSearchValue(e.target.value);

                }} />

                <styled.SubmitButton
                className = "default-btn"
                type = "submit" >
                    검색
                </styled.SubmitButton>

                <FontAwesomeIcon
                    className = "writing-icon"
                    icon = { faPenToSquare }
                    size = "2x"
                    onClick = { () => {
                        onClickWritingButton();
                        } } />

            </form>

        </styled.SearchContainer>
        </>
    );
};

export default PostSearchInput;