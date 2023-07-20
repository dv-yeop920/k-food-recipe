const { User } = require("../models/User.js");




const auth = (req , res , next) => {
//인증처맇 하는 공간 
//클라이언트 쿠키에서 토큰을 가져온다
const token = req.cookies.x_auth;
//토큰을 복호화 한 후에 유저를 찾는다
User.findByToken(token , function(error , user) {
    if(error) throw error;

    if(user) {
        //index.js에서도 사용할 수 있도록 
        req.token = token;
        req.user = user;
        next();
    }
    else {
        //user 정보가 없다면 false
        return res.json({
            isAuth: false,
            error: true
        });
    }

})
//유저가 있으면 인증 ok 없으면 no
}


module.exports = { auth };