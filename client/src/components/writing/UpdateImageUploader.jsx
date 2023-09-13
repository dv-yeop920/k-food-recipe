import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCamera } from "@fortawesome/free-solid-svg-icons";

const UpdateImageUploader = (
    {
        editImageSrc , 
        setEditImageSrc , 
        setEditPreviewImageFile , 
        resizeFile
    }
    ) => {

    const fileInput = React.useRef(null);


    const onClickShowImageFile = () => {

        fileInput.current.click();

    }


    const onChangeUpload = async (e) => {

        const file = e.target.files[0];

        const compressedFile = await resizeFile(file);

        setEditPreviewImageFile(compressedFile);

        const reader = new FileReader();

        reader.readAsDataURL(compressedFile);

        return new Promise((resolve) => { 

            reader.onload = () => {	

                setEditImageSrc(reader.result || null);
                resolve();

            };

        });
    }

    return (
        <>
        <div 
        className = "image-upload__container"
        onClick = { onClickShowImageFile } >

            <input
            className = "image-file-uploader"
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

                <img src = { editImageSrc } alt = "" />

            </div>

        </div>
        </>
    );
};

export default UpdateImageUploader;