import { resizeFile } from "./awsS3Setting";

export const onClickShowImageFile = fileInput => {
  fileInput.current.click();
};

export const onChangeUpload = async params => {
  const { e, setPostPreviewImageFile, setPostPreviewImageSrc } = params;
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
