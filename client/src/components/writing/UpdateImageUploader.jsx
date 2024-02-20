import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCamera } from "@fortawesome/free-solid-svg-icons";
import styles from "./Writing.module.css";

const UpdateImageUploader = ({ uploaderProps }) => {
  const {
    editPostPrevuewImageSrc,
    setEditPostPrevuewImageSrc,
    setEditPostPreviewImageFile,
    resizeFile,
  } = uploaderProps;

  const fileInput = React.useRef(null);

  const onClickShowImageFile = () => {
    fileInput.current.click();
  };

  const onChangeUpload = async e => {
    const file = e.target.files[0];
    const compressedFile = await resizeFile(file);

    setEditPostPreviewImageFile(compressedFile);

    const reader = new FileReader();
    reader.readAsDataURL(compressedFile);

    return new Promise(resolve => {
      reader.onload = () => {
        setEditPostPrevuewImageSrc(reader.result || null);
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

        <FontAwesomeIcon className={styles.camera} icon={faCamera} size="5x" />

        <div className={styles.imgWrapper}>
          <img className={styles.image} src={editPostPrevuewImageSrc} alt="" />
        </div>
      </div>
    </>
  );
};

export default UpdateImageUploader;
