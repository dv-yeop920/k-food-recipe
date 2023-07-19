//user model 만들기 
const mongoose = require("mongoose");


//user 정보 설정하기
const userSchma = mongoose.Schema({
    //사용자 이름
    name: {
        type: String,
        maxlength: 50, //최대 글자수
        minlength: 5,
    },
    //이메일
    email: {
        type: String,
        trim: true, //이메일을 입력할 때 띄어쓰기가 있으면 띄어쓴 부분 없애줌
        unique: 1, //이메일 중복 안되게 설정
    },
    //비번
    password: {
        type: String,
        maxlength: 15,
        minlength: 8,//최소 글자수
    },
    //role의 숫자여부에 따라 관리자인지 일반 회원인지 판별 할 수 있게 설정
    role: {
        type: Number,
        default: 0
    },
    //사용자 이미지
    image: String,
    //유효성 검사 하기 위한 토큰 
    token: {
        type: String
    },
    //토큰 유효 기간
    tokenExp: {
        type: Number
    }
});

//스키마 작성 끝나면 모델안에 스키마 넣어주기
const User = mongoose.model("User",userSchma);

//다른 곳에서도 쓸 수 있게 모듈화 해줌
module.exports = { User };