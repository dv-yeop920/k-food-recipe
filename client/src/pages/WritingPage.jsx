import React from 'react';
import Navbar from "../components/navbar/Navbar";
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import ScrollToTopButton from "../components/ScrollToTopButton";
import * as styled from "../styles/styledComponents";

const WritingPage = () => {
    return (
        <>
        <Navbar/>
        <div className ="editor-container">
            <input className ="editor-title" type="text" placeholder = "제목" />

            <CKEditor
            className ="editor"
            editor={ ClassicEditor }
            config={{
                placeholder:"내용을 입력하세요!",
            }}
            data=""
            onReady={ editor => {
                // You can store the "editor" and use when it is needed.
                console.log( 'Editor is ready to use!', editor );
            } }
            onChange={ ( event, editor ) => {
                const data = editor.getData();
                console.log( { event, editor, data } );
            } }
            onBlur={ ( event, editor ) => {
                console.log( 'Blur.', editor );
            } }
            onFocus={ ( event, editor ) => {
                console.log( 'Focus.', editor );
            } }
            />

            <div className ="writing-button__container">
                <styled.DeleteButton
                className ="writing-button delete-btn">
                    취소
                </styled.DeleteButton>

                <styled.SubmitButton
                className ="writing-button default-btn">
                    등록
                </styled.SubmitButton>
            </div>
        </div>

        <ScrollToTopButton/>
        </>
    );
};

export default WritingPage;