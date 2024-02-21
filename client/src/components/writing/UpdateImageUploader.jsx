import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCamera } from "@fortawesome/free-solid-svg-icons";
import styles from "./Writing.module.css";
import {
  onClickShowImageFile,
  onChangeUpload,
} from "../../utils/imageUploader";

const UpdateImageUploader = ({ uploaderProps }) => {
  const fileInput = React.useRef(null);

  const {
    postPreviewImageSrc,
    setPostPreviewImageSrc,
    setPostPreviewImageFile,
  } = uploaderProps;

  const updateUploaderParams = {
    fileInput,
    setPostPreviewImageSrc,
    setPostPreviewImageFile,
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
        ref={fileInput}
        style={{ display: "none" }}
        onChange={() => {
          onChangeUpload(updateUploaderParams);
        }}
      />

      <FontAwesomeIcon className={styles.camera} icon={faCamera} size="5x" />

      <div className={styles.imgWrapper}>
        <img className={styles.image} src={postPreviewImageSrc} alt="" />
      </div>
    </div>
  );
};

export default UpdateImageUploader;
