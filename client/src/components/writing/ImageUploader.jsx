import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCamera } from "@fortawesome/free-solid-svg-icons";
import styles from "./Writing.module.css";

const ImageUploader = ({
  setPostPreviewImageFile,
  resizeFile,
  PostPreviewImageSrc,
  setPostPreviewImageSrc,
}) => {
  const fileInput = React.useRef(null);

  const onClickShowImageFile = () => {
    fileInput.current.click();
  };

  const onChangeUpload = async e => {
    const file = e.target.files[0];
    const compressedFile = await resizeFile(file);

    setPostPreviewImageFile(compressedFile);

    const reader = new FileReader();

    reader.readAsDataURL(compressedFile);

    return new Promise(resolve => {
      reader.onload = () => {
        setPostPreviewImageSrc(reader.result || null);
        resolve();
      };
    });
  };

  return (
    <>
      <div
        className={styles.imageUploadContainer}
        onClick={onClickShowImageFile}
      >
        <input
          className="image-file-uploader"
          accept="image/*"
          type="file"
          ref={fileInput}
          style={{ display: "none" }}
          onChange={onChangeUpload}
        />

        <FontAwesomeIcon
          className={styles.camera}
          icon={faCamera}
          size="5x"
        />

        <div className={styles.imgWrapper}>
          <img
            className={styles.image}
            src={PostPreviewImageSrc}
            alt=""
          />
        </div>
      </div>
    </>
  );
};

export default ImageUploader;
