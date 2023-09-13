import AWS from "aws-sdk";




const REGION = process.env.REACT_APP_REGION
const ACCESS_KEY_ID = process.env.REACT_APP_ACCESS_KEY_ID
const SECRET_ACCESS_KEY_ID = process.env.REACT_APP_SECRET_ACCESS_KEY_ID
const S3_BUCKET = "dv-yeop-imagebucket";


AWS.config.update({
    accessKeyId: ACCESS_KEY_ID,
    secretAccessKey: SECRET_ACCESS_KEY_ID,
});

export const s3 = new AWS.S3({
    params: { Bucket: S3_BUCKET },
    region: REGION,
});


