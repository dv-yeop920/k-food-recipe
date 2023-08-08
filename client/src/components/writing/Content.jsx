import React from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const modules = {
    toolbar: {
        container: [
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
            ["image"], 
            ["video"], 
        ],
    }
}

const Content = ({ setTitle , content , setContent }) => {

    const handleChangeTitle = (e) => {
        console.log(e.target.value);
        return setTitle(e.target.value);
    };

    const handleChangeContent = (e) => {
        console.log(e);
        return setContent(e);
    }

    return (
        <>
        <div className ="writing-container">
            <div className="writing-container__column">
            <input 
            className ="editor-title" 
            type="text" 
            placeholder = "제목"
            onChange={ handleChangeTitle } />  
            </div>
            <div className="writing-container__column">
                <ReactQuill  
                className="content" 
                value={ content }
                modules={ modules }
                onChange ={ handleChangeContent }/> 
            </div>          
        </div>
        </>
    );
};

export default Content;