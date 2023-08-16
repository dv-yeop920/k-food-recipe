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


const UpdateContent = ({ newDetail , setNewDetail}) => {
    //구조 분해 할당해서 title 과 content 로 분해
    const { title , content } = newDetail;


    const handelChangeTitle = (e) => {
        //event.target에서 value 가져옴
        const { value } = e.target; 
        console.log(newDetail)
        return setNewDetail({
            ...newDetail,
            title: value,
        });
    }

    const handleChangeContent = (e) => {
        return setNewDetail({
            ...newDetail,
            content: e
        });
    }

    return (
        <>
        <div className ="writing-container">
            <div className="writing-container__column">
                <input 
                className ="editor-title" 
                type="text" 
                value ={ title }
                onChange ={ handelChangeTitle }
                />  
            </div>

            <div className="writing-container__column">
                <ReactQuill  
                className="content"
                name = "content"
                value={ content }
                modules={ modules }
                onChange ={ handleChangeContent }
                /> 
            </div>          
        </div>
        </>
    );
};

export default UpdateContent;