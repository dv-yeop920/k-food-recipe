import React, { useMemo, useRef } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";




const Content = (
    { 
        setTitle , 
        content , 
        setContent , 
        resizeFile , 
        uploadImageToS3
    }
    ) => {

    const quillRef = useRef(null);

    const imageHandler = async () => {

        const input = document.createElement("input");

        input.setAttribute("type", "file");
        input.setAttribute("accept", "image/*");
        input.click();
        input.addEventListener("change", async () => {
          //이미지를 담아 전송할 file을 만든다
            const file = input.files?.[0];

            const compressedFile = await resizeFile(file)

            try {

                const imageUrl = await uploadImageToS3(compressedFile);

                //이미지 업로드 후
                //곧바로 업로드 된 이미지 url을 가져오기
                //useRef를 사용해 에디터에 접근한 후
                //에디터의 현재 커서 위치에 이미지 삽입
                const editor = quillRef.current.getEditor();
                const range = editor.getSelection();
                // 가져온 위치에 이미지를 삽입한다
                editor.insertEmbed(range.index, "image", imageUrl);

            }
            catch (error) {
                console.log(error);
            }
        });
    };


    const modules = useMemo(() => {
        return {
            
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
                    ],
                    handlers: {
                        image: imageHandler
                    }
                }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    } , []);


    const formats = [
        "image",
        "video",
        "header",
        "align",
        "bold",
        "underline",
        "strike",
        "blockquote",
        "list",
        "bullet",
        "ordered",
        "color",
        "background",
    ];


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