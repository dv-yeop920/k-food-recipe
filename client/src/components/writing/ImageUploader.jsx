import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCamera } from "@fortawesome/free-solid-svg-icons";
import styles from "./Writing.module.css";
import {
  onClickShowImageFile,
  onChangeUpload,
} from "../../utils/imageUploader";

const ImageUploader = ({ uploaderProps }) => {
  const fileInput = React.useRef(null);

  const {
    postPreviewImageSrc,
    setPostPreviewImageSrc,
    setPostPreviewImageFile,
  } = uploaderProps;

  const uploaderParams = {
    fileInput,
    setPostPreviewImageFile,
    setPostPreviewImageSrc,
  };

  return (
    <div
      className={styles.imageUploadContainer}
      onClick={() => onClickShowImageFile(fileInput)}
    >
      <input
        className="image-file-uploader"
        accept="image/*"
        type="file"
        style={{ display: "none" }}
        ref={fileInput}
        onChange={() => {
          onChangeUpload(uploaderParams);
        }}
      />
      <div className={styles.imgWrapper}>
        <img className={styles.image} src={postPreviewImageSrc} alt="" />
      </div>
      <FontAwesomeIcon className={styles.camera} icon={faCamera} size="5x" />
    </div>
  );
};

export default ImageUploader;
