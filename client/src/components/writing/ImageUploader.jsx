import React , { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCamera } from "@fortawesome/free-solid-svg-icons";


const ImageUploader = ({ setImageFile }) => {

    const [imageSrc, setImageSrc] = useState(null);

    const fileInput = React.useRef(null);


    const onClickShowImageFile = (e) => {
        fileInput.current.click();
    }


    const onChangeUpload = async (e) => {
        const file = e.target.files[0];

        setImageFile(file);

        const reader = new FileReader();
        reader.readAsDataURL(file);

        return new Promise((resolve) => { 
            reader.onload = () => {	
                setImageSrc(reader.result || null);
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

                <img src = { imageSrc } alt = "" />

            </div>

        </div>
        </>
    );
};

export default ImageUploader;