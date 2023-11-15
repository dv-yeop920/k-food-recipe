const { User } = require("../models/User.js");




const auth = (req , res , next) => {
//인증처맇 하는 공간 
//클라이언트 쿠키에서 토큰을 가져온다
const refreshToken = req.cookies.x_auth;
//토큰을 복호화 한 후에 유저를 찾는다
User.findByToken(refreshToken , function(error , user) {
    if(error) throw error;

    if(user) {
        //index.js에서도 사용할 수 있도록 
        req.token = refreshToken;
        req.user = user;
        next();
    }
    else {
        //user 정보가 없다면 false
        return res.json({
            isAuth: false,
            error: true,
            message: "토큰 없음"
        });
    }

})
//유저가 있으면 인증 ok 없으면 no
}
/*const auth = (req , res , next) => {
    // 클라이언트 헤더에서 accessToken 가져오기
    const accessToken = req.headers.authorization;
    // accessToken이 있는 경우
    if (accessToken) {
      // accessToken을 복호화하고 유저를 찾기
        jwt.verify(accessToken, "accessToken", function(err, decoded) {
            if (err) {
            // accessToken이 만료된 경우, refreshToken으로 인증
                return authenticateWithRefreshToken();
            }
            // accessToken이 유효한 경우, 유저 정보 설정하고 다음 미들웨어로
            User.findOne({ "_id": decoded._id }, function(err, user) {
                if (err) throw err;

                if (!user) {
                    return res.json({ 
                        isAuth: false, 
                        error: true,
                        message: "유저 없음" 
                    });
                }
                req.user = user;
                next();
            });
        });
    } 
    else {
        // accessToken이 없는 경우, refreshToken으로 인증
        authenticateWithRefreshToken();
    }


    const authenticateWithRefreshToken = () => {
        // 클라이언트 쿠키에서 refreshToken 가져오기
        const refreshToken = req.cookies.x_auth;
        // refreshToken을 복호화하고 유저를 찾기
        User.findByToken(refreshToken , function(error , user) { 
            if(error) throw error;

                if(user) {
                    // 유저 정보 설정하고 새로운 accessToken 생성
                    user.generateAccessToken((err, accessToken) => {
                        if(err) {
                            return res.status(400).send(err);
                        }
                        // 새로 생성한 accessToken과 유저 정보를 응답에 담기
                        req.user = user;
                        req.accessToken = accessToken;
                        next();
                    });
                } 
                else {
                    // 유저 정보가 없다면 false
                    return res.json({ 
                        isAuth: false, 
                        error: true, 
                        message: "토큰 없음" 
                    });
                }
            });
        }
    }*/

module.exports = { auth };