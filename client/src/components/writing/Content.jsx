import React from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const modules = {
    toolbar: {
        container: [
            [{ "header" : [1, 2, 3, 4, 5, 6, false] }],
            [{ "align" : [] }],
            ["bold" , "underline" , "strike" , "blockquote"],
            [{ "list" : "ordered" }, { "list" : "bullet" }],
            [{ "color" : [] }, { "background" : [] }],
            ["image", "video"], 
        ],
    }
}

const Content = () => {


    return (
        <>
        <div className ="writing-container">
            <div className="writing-container__column">
            <input 
            className ="editor-title" 
            type="text" 
            placeholder = "제목" />  
            </div>
            <div className="writing-container__column">
                <ReactQuill  className="content" modules={modules}/> 
            </div>          
        </div>
        </>
    );
};

export default Content;