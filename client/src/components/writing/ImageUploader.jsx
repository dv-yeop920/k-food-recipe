import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCamera } from "@fortawesome/free-solid-svg-icons";


const ImageUploader = (
    { 
        imageUrl , 
        setImageUrl ,
        imageSrc , 
        setImageSrc ,  
        uploadImageToS3 
    }
    ) => {

    const fileInput = React.useRef(null);


    const onClickShowImageFile = (e) => {
        fileInput.current.click();
    }


    const onChangeUpload = async (e) => {
        const file = e.target.files[0];

        try {
            const imageUrl = await uploadImageToS3(file);

            setImageUrl(imageUrl);

        }
        catch (error) {

            console.error("Error uploading image:", error);
            throw error;
        }

        /*const reader = new FileReader();
        reader.readAsDataURL(file);

        return new Promise((resolve) => { 
            reader.onload = () => {	
                setImageSrc(reader.result || null); // 파일의 컨텐츠
                resolve();
            };
        });*/
    }

    return (
        <>
        <div 
        className = "image-upload__container"
        onClick = { onClickShowImageFile } >

            <input
            accept = "image/*"
            type = "file"
            ref = { fileInput }
            style = {{ "display": "none" }}
            onChange = { onChangeUpload } />
            
            <FontAwesomeIcon
            className = "camera-icon"
            icon = { faCamera }
            size = "5x" />
            
            <div className = "img-wrapper">

                <img src = { imageUrl } alt = "" />

            </div>

        </div>
        </>
    );
};

export default ImageUploader;