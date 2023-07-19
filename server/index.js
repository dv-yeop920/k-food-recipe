const express = require("express");
const app = express();
const PORT = 7070;
const bodyParser = require("body-parser");
//유저 모델을 가져옴
const { User } = require("../models/User.js");

//클라이언트의 req 를 json 형태로 해석 하도록 도와줌
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

const db = "mongodb+srv://jyeop920:toddlf0826@cluster0.mvqy3yr.mongodb.net/?retryWrites=true&w=majority";
const mongoose = require("mongoose");
mongoose.connect(db , {
    //useNewUrlParser:true,
    //useUnifiedTopology:true,
    //useCreateIndex:true,
    //useFindAndModify:false
}).then((req , res) => {
    console.log("MongoDB Connected!");
}).catch((error) => {
    console.log(error);
});

app.listen(PORT , (req , res) => {
    console.log("hello world");
});

app.get("/" , (req , res) => {
    res.send("하이하잉");
});

app.post("/register" , (req , res) => {
    //인스턴스 객체 생성 후 클라이언트 요청을 담는다
    const user = new User(req.body);
    //정보를 db에 보내준다. 이때 , 성공하거나 에러가 나면 메세지를 json 형식으로 보내준다.
    //mongoDB 메서드, user모델에 저장
    //mongoose 6버전 부터는 save 에 콜백함수를 지원하지 않아 아래와 같이 코드 작성
    user.save()
    .then(()=>{
    res.status(200).json({
        success: true
    });
    })
    .catch((error)=>{
    res.json({ success: false, error });
    });
});