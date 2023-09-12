import React from "react";
import ReactQuill , { Quill } from "react-quill";
import ImageUploader from "react-quill-image-uploader";
import "react-quill/dist/quill.snow.css";
import AWS from "aws-sdk";

Quill.register('modules/imageUploader', ImageUploader);


const REGION = process.env.REACT_APP_REGION
const ACCESS_KEY_ID = process.env.REACT_APP_ACCESS_KEY_ID
const SECRET_ACCESS_KEY_ID = process.env.REACT_APP_SECRET_ACCESS_KEY_ID
const S3_BUCKET = "dv-yeop-imagebucket";

AWS.config.update({
    accessKeyId: ACCESS_KEY_ID,
    secretAccessKey: SECRET_ACCESS_KEY_ID,
});

const s3 = new AWS.S3({
    params: { Bucket: S3_BUCKET },
    region: REGION,
});

const handleImageUpload = async (file) => {

    const params = {

        Key: `image/${file.name}`,
        Body: file

    };

    try {

        const result = await s3.upload(params).promise();

        console.log("Image uploaded successfully:", result.Location);

        return result.Location; // 업로드된 이미지의 URL 반환

    }
    catch (error) {

        console.error("Error uploading image:", error);

        throw error;

    }
}

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
        ]
    },
    imageUploader: {
        upload: handleImageUpload,
        }
}



const Content = ({ setTitle , content , setContent ,}) => {

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
                value = { content }
                modules = { modules }
                onChange = { (e) => setContent(e) } /> 

            </div>

        </div>
        </>
    );
};

export default Content;