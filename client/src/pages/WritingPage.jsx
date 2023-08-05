import React ,{ useState }from 'react';
import * as styled from "../styles/styledComponents";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/navbar/Navbar";
import ScrollToTopButton from "../components/ScrollToTopButton";
import ImageUploader from "../components/writing/ImageUploader";
import Content from '../components/writing/Content';

const WritingPage = () => {
    const navigate = useNavigate();
    return (
        <>
        <Navbar/>
        <div className ="editor-container">
            <form 
            className = "editor-form"
            onSubmit = {(e) => {e.preventDefault()}}>
                <div className = "content-container">
                    <ImageUploader/>
                    <Content/>
                </div>
                
                <div className ="writing-button__container">
                    <styled.DeleteButton
                    className ="writing-button delete-btn"
                    onClick={() => {
                        if(window.confirm("게시글 작성을 취소 하시겠어요?"))
                            return navigate(-1, { replace: true });
                        }
                    }>
                        취소
                    </styled.DeleteButton>

                    <styled.SubmitButton
                    type = "submit"
                    className = "writing-button default-btn">
                        등록
                    </styled.SubmitButton>
                </div>
            </form>
        </div>
        <ScrollToTopButton/>
        </>
    );
};

export default WritingPage;