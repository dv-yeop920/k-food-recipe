import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCamera } from "@fortawesome/free-solid-svg-icons";

const ImageUploader = () => {

    return (
        <>
        <div className = "image-upload__container">

            <input
            type = "file"
            accept = "image/*"
            style = {{ display: "none" }} />

            <FontAwesomeIcon
            className = "camera-icon"
            icon = { faCamera }
            size = "5x" />
            
            <div className = "img-wrapper">

                <img src = "" alt = "" />

            </div>

        </div>
        </>
    );
};

export default ImageUploader;