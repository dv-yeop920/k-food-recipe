const express = require("express");
const app = express();
const PORT = 7070;
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
//유저 모델을 가져옴
const { User } = require("./models/User.js");
const { auth } = require("./middleware/auth.js");

//클라이언트의 req 를 json 형태로 해석 하도록 도와줌
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cookieParser());

const mongoURI = "mongodb+srv://jyeop920:toddlf0826@cluster0.mvqy3yr.mongodb.net/?retryWrites=true&w=majority";
const mongoose = require("mongoose");
mongoose.connect(mongoURI , {
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

app.post("/api/users/register" , (req , res) => {
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




app.post("/api/users/login",(req , res) =>{
    // 요청된 이메일을 데이터베이스 찾기
    User.findOne({email: req.body.email})
    .then((docs) =>{
        if(!docs){
            return res.json({
                loginSuccess: false,
                messsage: "해당 이메일로 가입된 회원이 없습니다."
            });
        }
        //비번 비교
        docs.comparePassword(req.body.password, (error, isMatch) => {
            // Password가 일치하다면 토큰 생성
            if(isMatch) {
                docs.generateToken((err, user)=>{
                    if(error) {
                        res.status(400).send(error);
                    }
                    // 토큰을 저장
                        res.cookie("x_auth", user.token)
                        .status(200)
                        .json({
                            loginSuccess: true, 
                            userId: user._id,
                        });
                })
            }
            else {
                return res.json({
                    loginSuccess: false, 
                    messsage: "비밀번호가 틀렸습니다."
                });
            }
        })
    })
    .catch((error)=>{
        return res.status(400).send(error);
    })
});

//어느 페이지 접속할때 마다 유저 정보를 보내주어 회원 인증 하는 함수
app.get("/api/users/auth" , auth , (req , res) => {
    //이코드가 실행 되는것은 미들웨어인 auth가 성공적으로 실행 됐다는뜻
    //성공적으로 됐다면 유저 정보를 클라이언트로 보내줌 
    res.status(200)
    .json({
        _id: req.user._id,
        //어드민 유저 설정
        isAdmin: req.user.role === 0 ? false : true,
        isAuth: true,
        email: req.user.email,
        name: req.user.name,
        lastName: req.user.lastName,
        role: req.user.role,
        image: req.user.image
    });
});

app.get("/api/users/logout" , auth , (req , res) => {
    //db에서 정보를 찾아서 업데이트 시켜서 토큰을 삭제 한다
    User.findOneAndUpdate(
        { _id: req.user._id } ,
        { token: "" })
        .then((docs) => {
            if(docs){
                res.status(200)
                .send({
                    logoutSuccess: true,
                })
            }
            else {
                return res.json({
                    logoutSuccess: false,
                    messsage: "로그아웃 실패"
                });
            }
        })
        .catch((error)=>{
            return res.status(400).send(error);
        })
});



/*(error , user) => {
    if(error) return res.json({ success: false , error});
    return res.status(200)
    .send({
        success: true
    });
}*/