import AWS from "aws-sdk";
import Resizer from "react-image-file-resizer";

const REGION = process.env.REACT_APP_REGION;
const ACCESS_KEY_ID = process.env.REACT_APP_ACCESS_KEY_ID;
const SECRET_ACCESS_KEY_ID = process.env.REACT_APP_SECRET_ACCESS_KEY_ID;
const S3_BUCKET = "dv-yeop-imagebucket";

AWS.config.update({
  accessKeyId: ACCESS_KEY_ID,
  secretAccessKey: SECRET_ACCESS_KEY_ID,
});

export const s3 = new AWS.S3({
  params: { Bucket: S3_BUCKET },
  region: REGION,
});

export const uploadPostPreviewImageToS3 = async file => {
  const params = {
    Key: `image/${file.name}`,
    Body: file,
  };

  try {
    const result = await s3.upload(params).promise();
    console.log("Image uploaded successfully:", result.Location);

    return result.Location; // 업로드된 이미지의 URL 반환
  } catch (error) {
    console.error("Error uploading image:", error);

    throw error;
  }
};

export const deletePostPreviewImageToS3 = async postImageUrl => {
  const imageUrl = postImageUrl.split("/").pop();

  return await s3
    .deleteObject({
      Key: `image/${imageUrl}`,
    })
    .promise();
};

export const uploadContentImageToS3 = async file => {
  const params = {
    Key: `contentImage/${file.name}`,
    Body: file,
  };

  try {
    const result = await s3.upload(params).promise();
    console.log("Image uploaded successfully:", result.Location);

    return result.Location; // 업로드된 이미지의 URL 반환
  } catch (error) {
    console.error("Error uploading image:", error);

    throw error;
  }
};

export const deleteContentImageToS3 = async postImageUrl => {
  const imageUrl = postImageUrl.split("/").pop();

  return await s3
    .deleteObject({
      Key: `contentImage/${imageUrl}`,
    })
    .promise();
};

export const resizeFile = async file => {
  const resizedFile = await new Promise(resolve => {
    Resizer.imageFileResizer(
      file,
      400,
      400,
      "JPEG",
      100,
      0,
      uri => {
        resolve(uri);
      },
      "file"
    );
  });

  // 고유한 파일 이름 생성 (예: 현재 시간을 기반으로 함)
  const uniqueFileName = `resized_${Date.now()}.jpeg`;

  // Blob을 이용하여 새로운 파일 객체 생성
  const newFile = new File([resizedFile], uniqueFileName, {
    type: "image/jpeg",
  });

  return newFile;
};
