import React ,{ useState }from 'react';
import Navbar from "../components/navbar/Navbar";
import ScrollToTopButton from "../components/ScrollToTopButton";
import ImageUploader from "../components/writing/ImageUploader";
import * as styled from "../styles/styledComponents";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const WritingPage = () => {
    const navigate = useNavigate();

    return (
        <>
        <Navbar/>
        <div className ="editor-container">
            <form 
            className = "editor-form"
            onSubmit = {(e) => {e.preventDefault()}}>
                <ImageUploader/>

                <div className ="writing-container">

                    <input 
                    className ="editor-title" 
                    type="text" 
                    placeholder = "제목" />  

                    <div className ="content-container">
                        <textarea
                        className="content"
                        placeholder="내용을 입력하세요"/>            
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
                </div>
            </form>
        </div>
        <ScrollToTopButton/>
        </>
    );
};

export default WritingPage;