import React from "react";



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
            <textarea
            className="content"
            placeholder="내용을 입력하세요"/>  
            </div>          
        </div>
        </>
    );
};

export default Content;