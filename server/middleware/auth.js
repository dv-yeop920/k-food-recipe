const { User } = require("../models/User.js");

const auth = (req, res, next) => {
  //인증처맇 하는 공간
  //클라이언트 쿠키에서 토큰을 가져온다
  const refreshToken = req.cookies.user;
  //const accessToken = req.headers.authorization;
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res
      .status(401)
      .json({ error: "No token provided" });
  }

  const parts = authHeader.split(" ");

  if (!parts.length === 2) {
    return res.status(401).json({ error: "Token error" });
  }

  const [scheme, token] = parts;

  if (!/^Bearer$/i.test(scheme)) {
    return res
      .status(401)
      .json({ error: "Token malformatted" });
  }

  // 이제 token에 "Bearer"를 제거한 accessToken이 저장됩니다.
  const accessToken = token;

  //토큰을 복호화 한 후에 유저를 찾는다
  User.findByToken(accessToken, function (error, user) {
    if (error) throw error;

    if (user) {
      //index.js에서도 사용할 수 있도록
      req.accessToken = accessToken;
      req.user = user;
      next();
    } else {
      //user 정보가 없다면 false
      return res.json({
        isAuth: false,
        error: true,
        message: "토큰 없음",
      });
    }
  });
};

module.exports = { auth };
