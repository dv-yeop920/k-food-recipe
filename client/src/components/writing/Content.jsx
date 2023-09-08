import React from "react";
import ReactQuill , { Quill } from "react-quill";
import ImageUploader from "react-quill-image-uploader";
import "react-quill/dist/quill.snow.css";
import AWS from "aws-sdk";

Quill.register('modules/imageUploader', ImageUploader);

const handleImageUpload = async (imageFile) => {

    try {

        const s3 = new AWS.S3({
            accessKeyId: 'YOUR_ACCESS_KEY',
            secretAccessKey: 'YOUR_SECRET_ACCESS_KEY',
            region: 'YOUR_AWS_REGION',
        });

        const params = {
            Bucket: 'YOUR_S3_BUCKET_NAME',
            Key: imageFile.name,
            Body: imageFile,
        };
    
        await s3.upload(params).promise();

        const imageUrl = `https://${params.Bucket}.s3.amazonaws.com/${params.Key}`;

        return imageUrl;
    }
    catch (error) {
        console.error(error);
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



const Content = ({ setTitle , content , setContent }) => {


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