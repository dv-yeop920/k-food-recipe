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

const UpdateContent = ({selectedPosts , setNewTitle , newContent, setNewContent}) => {
    return (
        <>
        <div className ="writing-container">
            <div className="writing-container__column">
            <input 
            className ="editor-title" 
            type="text" 
            value ={ selectedPosts[0].title }
            placeholder = "제목"
            onChange ={(e) => setNewTitle(e.target.value)}
            />  
            </div>
            <div className="writing-container__column">
                <ReactQuill  
                className="content" 
                value={ selectedPosts[0].content }
                modules={ modules }
                onChange ={(e) => setNewContent(e)}
                /> 
            </div>          
        </div>
        </>
    );
};

export default UpdateContent;