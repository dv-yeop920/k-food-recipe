const express = require("express");
const cors = require("cors");
const app = express();
//env 파일 값을 읽을 수 있게 해주는 모듈
require("dotenv").config();

const PORT = process.env.PORT_NUMBER;
const ORIGIN_PORT = process.env.ORIGIN_PORT;
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
//유저 모델을 가져옴
const { User } = require("./models/User.js");
//로그인 인증 미들웨어
const { auth } = require("./middleware/auth");
//댓글
const { Comment } = require("./models/Comment.js");
//게시판
const { Post } = require("./models/NoticeBoard.js");

//레시피
const { Recipe } = require("./models/Recipe.js");

//클라이언트의 req 를 json 형태로 해석 하도록 도와줌
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(
  cors({
    origin: ORIGIN_PORT,
    credentials: true,
  })
);

const MONGODB_URI = process.env.MONGODB_URI;
const mongoose = require("mongoose");

mongoose
  .connect(MONGODB_URI, {})
  .then((req, res) => {
    console.log("MongoDB Connected!");
  })
  .catch(error => {
    console.log(error);
  });

app.listen(PORT, (req, res) => {
  console.log("hello world");
});

app.get("/", (req, res) => {
  res.send("하이하잉");
});

app.post("/api/users/register", async (req, res) => {
  //인스턴스 객체 생성 후 클라이언트 요청을 담는다
  const user = new User(req.body);
  //정보를 db에 보내준다. 이때 , 성공하거나 에러가 나면 메세지를 json 형식으로 보내준다.
  //mongoDB 메서드, user모델에 저장
  //mongoose 6버전 부터는 save 에 콜백함수를 지원하지 않아 아래와 같이 코드 작성

  await User.find({
    $or: [{ id: user.id }, { email: user.email }],
  })
    .then(docs => {
      if (docs[0].email === user.email) {
        return res.json({
          success: false,
          messsage: "해당 이메일은 이미 사용중 입니다",
        });
      }
      if (docs[0].id === user.id) {
        return res.json({
          success: false,
          messsage: "해당 아이디는 이미 사용중 입니다",
        });
      }
    })
    .catch(() => {
      user
        .save()
        .then(() => {
          res.status(200).json({
            success: true,
            messsage:
              "회원가입을 성공적으로 하셨습니다. 로그인 하여 서비스를 이용해 보세요!",
          });
        })
        .catch(error => {
          console.log(docs);
          return res.json({
            success: false,
            messsage:
              "입력한 값이 틀리지 않았는지 다시 확인해 주세요",
            error,
          });
        });
    });
});

app.post("/api/users/login", async (req, res) => {
  // 요청된 아이디와 일치 하는 데이터베이스 찾기
  await User.findOne({ id: req.body.id })
    .then(docs => {
      if (!docs) {
        return res.json({
          isLogin: false,
          messsage: "해당 아이디로 가입된 회원이 없습니다.",
        });
      }
      //비번 비교
      docs.comparePassword(
        req.body.password,
        (error, isMatch) => {
          const currentTime = new Date();
          const oneHourInMilliseconds = 1000 * 60 * 100;
          const expirationTime = new Date(
            currentTime.getTime() + oneHourInMilliseconds
          );

          // Password가 일치하다면 리프레시 , 엑세스 토큰 생성
          if (isMatch) {
            docs.generateRefreshToken((err, user) => {
              if (err) {
                res.status(400).send(error);
              }

              docs.generateAccessToken(
                (err, accessToken) => {
                  if (err) {
                    res.status(400).send(error);
                  }

                  const cookieOptions = {
                    domain: "localhost",
                    path: "/",
                    expires: expirationTime,
                    httpOnly: true,
                    sameSite: "strict",
                  };

                  // 리프레시토큰을 브라우저에 저장
                  res
                    .cookie(
                      "user",
                      user.token,
                      cookieOptions
                    )
                    .status(200)
                    .json({
                      isLogin: true,
                      messsage: `안녕하세요 ${user.name}님!`,
                      userId: user.id,
                      userName: user.name,
                      userEmail: user.email,
                      //엑세스는 응답 값으로 전달
                      accessToken: accessToken,
                    });
                }
              );
            });
          } else {
            return res.json({
              isLogin: false,
              messsage: "비밀번호가 틀렸습니다.",
            });
          }
        }
      );
    })
    .catch(error => {
      return res.status(400).send(error);
    });
});

//어느 페이지 접속할때 마다 유저 정보를 보내주어 회원 인증 하는 함수
app.get("/api/users/auth", auth, (req, res) => {
  //이코드가 실행 되는것은 미들웨어인 auth가 성공적으로 실행 됐다는뜻
  //성공적으로 됐다면 유저 정보를 클라이언트로 보내줌
  res.status(200).json({
    _id: req.user._id,
    userId: req.user.id,
    userName: req.user.name,
    userEmail: req.user.email,
    isAuth: true,
    accessToken: req.accessToken,
    //어드민 유저 설정
    //isAdmin: req.user.role === 0 ? false : true,
    //role: req.user.role,
  });
});

app.post("/api/users/logout", auth, async (req, res) => {
  //db에서 정보를 찾아서 업데이트 시켜서 토큰을 삭제 한다
  await User.findOneAndUpdate(
    { _id: req.user._id },
    { token: "" }
  )
    .then(docs => {
      if (docs) {
        res.clearCookie("user");
        res.status(200).send({
          logoutSuccess: true,
          messsage: "로그아웃 되었습니다",
        });
      } else {
        return res.json({
          logoutSuccess: false,
          messsage: "로그아웃 실패",
        });
      }
    })
    .catch(error => {
      return res.status(400).send(error);
    });
});

//------------------------게시판------------------------------------------

app.post("/api/posts/register", async (req, res) => {
  try {
    const post = {
      id: req.body.id + "_" + Date.now(),
      title: req.body.title,
      content: req.body.content,
      image: req.body.image,
    };

    const posts = new Post(post);

    await posts.save();

    res.json({
      success: true,
      messsage: "게시물이 등록 되었습니다",
    });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      messsage: "게시물 등록 실패했습니다",
    });
  }
});

app.get("/api/posts/getPostList", async (req, res) => {
  const pageNumber = parseInt(req.query.pageNumber) - 1;

  const postPerPage = 5;

  const searchValue = req.query.search;

  //NOTE - 정규식 검사 해서 검색어가 특수문자가 들어가 있어도 검색 되도록
  const RegexValue = text => {
    return text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  };

  const RegexSearchValue = RegexValue(searchValue);

  try {
    const posts = await Post.find({
      title: {
        $regex: RegexSearchValue,
        $options: "i",
      },
    })
      .skip(pageNumber * postPerPage)
      .limit(postPerPage)
      .sort({ createdAt: -1 });

    const totalPostLength = await Post.countDocuments({
      title: { $regex: RegexSearchValue, $options: "i" },
    });

    const modifiedPosts = posts.map(post => {
      const parts = post.id.split("_");
      const userId = parts[0];

      return {
        ...post.toObject(),
        id: userId,
      };
    });

    res.json({
      totalPostLength: totalPostLength,
      list: modifiedPosts,
    });
  } catch (error) {
    res.json({
      messsage: "게시판 조회 실패했습니다",
    });
  }
});

app.get("/api/posts/getPost", async (req, res) => {
  const postId = req.query.id;

  try {
    if (postId) {
      const post = await Post.findOne({
        _id: postId,
      }).exec();

      res.json({
        list: post,
      });
    }
  } catch (error) {
    console.log(error);
  }
});

app.put("/api/posts/update", async (req, res) => {
  try {
    await Post.findOneAndUpdate(
      { _id: req.body._id },
      {
        $set: {
          title: req.body.title,
          content: req.body.content,
          image: req.body.image,
        },
      }
    ).exec();

    res.json({
      updateSuccess: true,
      messsage: "업데이트 되었습니다",
    });
  } catch (error) {
    console.log(error);

    res.json({
      updateSuccess: false,
      messsage: "업데이트 실패했습니다",
    });
  }
});

app.put(
  "/api/posts/viewCountupdate/:id",
  async (req, res) => {
    try {
      const postId = req.params.id;

      if (postId) {
        await Post.findByIdAndUpdate(postId, {
          $inc: { viewCount: 1 },
        }).exec();
      }
    } catch (error) {
      console.log(error);

      res.json({
        updateSuccess: false,
        messsage: "업데이트 실패했습니다",
      });
    }
  }
);

app.post("/api/posts/delete", async (req, res) => {
  const postId = req.body.postId;

  try {
    await Post.findOneAndDelete({
      _id: postId,
    }).exec();

    await Comment.deleteMany({
      postId: postId,
    }).exec();

    res.json({
      deleteSuccess: true,
      messsage: "삭제 되었습니다",
    });
  } catch (error) {
    res.json({
      deleteSuccess: false,
      messsage: "삭제 실패했습니다",
    });
  }
});

//------------------------댓글------------------------------------------

app.post(
  "/api/posts/comment/register",
  async (req, res) => {
    try {
      const commentBody = {
        postId: req.body.postId,
        id: req.body.id + "_" + Date.now(),
        content: req.body.content,
      };

      const comment = new Comment(commentBody);

      await comment.save();

      await Post.findOneAndUpdate(
        { _id: commentBody.postId },
        { $inc: { commentCount: 1 } }
      ).exec();

      res.json({
        success: true,
        messsage: "댓글이 등록 되었습니다",
      });
    } catch (error) {
      console.log(error);
      res.json({
        success: false,
        messsage: "댓글 등록 실패했습니다",
      });
    }
  }
);

app.get(
  "/api/posts/comment/getComment",
  async (req, res) => {
    try {
      const comments = await Comment.find().exec();

      const modifiedComments = comments.map(comment => {
        const parts = comment.id.split("_");
        const userId = parts[0];

        return {
          ...comment.toObject(),
          id: userId,
        };
      });

      res.json({
        list: modifiedComments,
      });
    } catch (error) {
      res.json({
        messsage: "게시판 조회 실패했습니다",
      });
    }
  }
);

app.put(
  "/api/posts/comment/updateComment",
  async (req, res) => {
    try {
      await Comment.findOneAndUpdate(
        { _id: req.body._id },
        {
          $set: {
            content: req.body.content,
          },
        }
      ).exec();

      res.json({
        updateSuccess: true,
        messsage: "업데이트 되었습니다",
      });
    } catch (error) {
      console.log(error);

      res.json({
        updateSuccess: false,
        messsage: "업데이트 실패했습니다",
      });
    }
  }
);

app.post(
  "/api/posts/comment/deleteComment",
  async (req, res) => {
    try {
      await Comment.findOneAndDelete({
        _id: req.body._id,
      }).exec();

      await Post.findOneAndUpdate(
        { _id: req.body.postId },
        {
          $inc: {
            commentCount: -1,
          },
        }
      ).exec();

      res.json({
        deleteSuccess: true,
        messsage: "삭제 되었습니다",
      });
    } catch (error) {
      console.log(error);
      res.json({
        deleteSuccess: false,
        messsage: "삭제 실패했습니다",
      });
    }
  }
);

//const data = [];

//Recipe.insertMany(data)
//.then(() => console.log("데이터 삽입 성공"))
//.catch(error => console.log(error));

app.get("/api/recipeList", async (req, res) => {
  const { search, tab, cursor = 1 } = req.query;
  const limit = 40; // 한 페이지에 표시할 아이템 수
  const skip = (cursor - 1) * limit; // 건너뛸 아이템 수

  let recipeList;
  let query = {};

  const TAB_VALUE = tab.trim();

  const regexTabValue = new RegExp(`.*${tab}.*`);

  const regexSearchValue = new RegExp(
    `.*${search.trim()}.*`
  );

  try {
    if (TAB_VALUE === "전체" || TAB_VALUE === "null") {
      if (search.trim() !== "null") {
        query.$or = [{ RCP_NM: regexSearchValue }];
      }
    } else {
      if (search.trim() !== "null") {
        query.$or = [
          {
            $and: [
              { RCP_NM: regexTabValue },
              { RCP_NM: regexSearchValue },
            ],
          },
          {
            $and: [
              { HASH_TAG: regexTabValue },
              { RCP_NM: regexSearchValue },
            ],
          },
          {
            $and: [
              { RCP_WAY2: regexTabValue },
              { RCP_NM: regexSearchValue },
            ],
          },
          {
            $and: [
              { RCP_PAT2: regexTabValue },
              { RCP_NM: regexSearchValue },
            ],
          },
        ];
      } else {
        query.$or = [
          { RCP_NM: regexTabValue },
          { HASH_TAG: regexTabValue },
          { RCP_WAY2: regexTabValue },
          { RCP_PAT2: regexTabValue },
        ];
      }
    }

    recipeList = await Recipe.find(query)
      .skip(skip)
      .limit(limit);

    res.json({
      recipeList: recipeList,
      cursor: cursor + 1,
    });
  } catch (error) {
    res.json({
      messsage: "레시피를 불러오지 못했습니다",
    });
  }
});

app.get("/api/recipeList/recipe", async (req, res) => {
  const recipeId = req.query.id;

  try {
    if (recipeId) {
      const recipe = await Recipe.findOne({
        _id: recipeId,
      });

      res.json({
        recipe: recipe,
      });
    }
  } catch (error) {
    res.json({
      messsage: "레시피를 불러오지 못했습니다",
    });
  }
});
