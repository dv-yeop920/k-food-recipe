import React, { useEffect, useRef } from "react";
import ReactQuill , { Quill } from "react-quill";
import ImageUploader from "react-quill-image-uploader";
import "react-quill/dist/quill.snow.css";

Quill.register('modules/imageUploader', ImageUploader);

const modules = {
    toolbar: {
        container: [
            ["image"],
            ["video"],  
            [{ "header" : [1, 2, 3, 4, 5, 6, false] }],
            [{ "align" : [] }],
            ["bold"],
            ["underline"],
            ["strike"], 
            ["blockquote"],
            [{ "list" : "ordered" }],
            [{ "list" : "bullet" }],
            [{ "color" : [] }], 
            [{ "background" : [] }],
        ]
    },
    imageUploader: {
        upload: (file) => {
            return new Promise((resolve, reject) => {
              // 여기서 file 객체 대신에 서버에서 받아온 URL 값을 resolve() 함수의 인자로 넣어줍니다.
                resolve();
            });
        }
    }
}

const formats = [
    "header",
    "font",
    "size",
    "bold",
    "italic",
    "underline",
    "strike",
    "align",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "background",
    "color",
    "link",
    "image",
    "video",
    "width",
];




const Content = ({ setTitle , content , setContent ,}) => {

    const quillRef = useRef(null);


    return (
        <>
        <div className = "writing-container">

            <div className = "writing-container__column">

            <input 
            className = "editor-title" 
            type = "text" 
            placeholder = "제목"
            onChange = { (e) => setTitle(e.target.value) } />  

            </div>

            <div className = "writing-container__column">

                <ReactQuill  
                className = "content"
                ref = { quillRef } 
                value = { content }
                modules = { modules }
                formats = { formats }
                onChange = { (e) => setContent(e) } /> 

            </div>

        </div>
        </>
    );
};

export default Content;