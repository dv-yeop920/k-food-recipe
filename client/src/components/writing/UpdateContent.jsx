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


const UpdateContent = (
    { 
        originalDetail , 
        setOriginalDetail ,
        titleValue , 
        setTitleValue , 
        contentValue ,
        setContentValue
    }
    ) => {



    const handelChangeTitle = (e) => {

        setTitleValue(e.target.value);

        return setOriginalDetail({
            ...originalDetail,
            title: titleValue,
        });
    }


    const handleChangeContent = (e) => {

        setContentValue(e);

        return setOriginalDetail({
            ...originalDetail,
            content: contentValue
        });
    }

    return (
        <>
        <div className = "writing-container">

            <div className = "writing-container__column">

                <input 
                className = "editor-title" 
                type = "text" 
                value = { titleValue }
                onChange = { handelChangeTitle } />  

            </div>

            <div className = "writing-container__column">

                <ReactQuill  
                className = "content"
                value = { contentValue }
                modules = { modules }
                onChange = { handleChangeContent } /> 

            </div>       

        </div>
        </>
    );
};

export default UpdateContent;