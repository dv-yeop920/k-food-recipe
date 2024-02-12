const { Post } = require("../models/notice-board.model");
const { Comment } = require("../models/comment.model");

exports.getPostList = async (req, res) => {
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
};

exports.getPost = async (req, res) => {
  const postId = req.query.id;

  try {
    if (postId) {
      const post = await Post.findOne({
        _id: postId,
      });

      res.json({
        list: post,
      });
    }
  } catch (error) {
    console.log(error);
  }
};

exports.registerPost = async (req, res) => {
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
};

exports.updatePost = async (req, res) => {
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
};

exports.deletePost = async (req, res) => {
  const postId = req.body.postId;

  try {
    await Post.findOneAndDelete({
      _id: postId,
    });

    await Comment.deleteMany({
      postId: postId,
    });

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
};
