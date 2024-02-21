import { resizeFile } from "./awsS3Setting";

export const onClickShowImageFile = fileInput => {
  fileInput.current.click();
};

export const onChangeUpload = async params => {
  const { fileInput, setPostPreviewImageFile, setPostPreviewImageSrc } = params;

  const file = fileInput.current.files[0];
  if (file !== undefined) {
    const compressedFile = await resizeFile(file);

    setPostPreviewImageFile(compressedFile);

    const reader = new FileReader();

    reader.readAsDataURL(compressedFile);
    return new Promise(resolve => {
      reader.onload = () => {
        setPostPreviewImageSrc(reader.result);
        resolve();
      };
    });
  } else {
    return;
  }
};
