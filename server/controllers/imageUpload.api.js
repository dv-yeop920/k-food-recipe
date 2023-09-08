const express = require("express");
const multer = require("multer");
const multerS3 = require("multer-s3");
const aws = require("aws-sdk");


// AWS SDK 설정
aws.config.update({
    accessKeyId: 'YOUR_ACCESS_KEY',
    secretAccessKey: 'YOUR_SECRET_ACCESS_KEY',
});

//S3 스토리지 생성
const s3 = new aws.S3();

// Multer 설정 (파일 업로드 관련)
const upload = multer({
    storage: multerS3({
        s3,
        bucket:' YOUR_S_#_BUCKET_NAME',
        acl:'public-read', // 파일 접근 권한 설정 (public-read)
        key(req, file, cb) { // 파일명 설정
        cb(null, Date.now().toString() + '-' + file.originalname);
        },
    }),
});