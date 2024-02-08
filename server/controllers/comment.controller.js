const { Comment } = require("../models/comment.model");
const { Post } = require("../models/notice-board.model");

exports.getCommentList = async (req, res) => {
  const { cursor = 1, postId } = req.query;
  const limit = 6; // 한 페이지에 표시할 아이템 수
  const skip = (cursor - 1) * limit; // 건너뛸 아이템 수

  try {
    const comments = await Comment.find({ postId: postId })
      .skip(skip)
      .limit(limit);

    const modifiedComments = comments.map(comment => {
      const parts = comment.id.split("_");
      const userId = parts[0];

      return {
        ...comment.toObject(),
        id: userId,
      };
    });

    console.log(modifiedComments);

    res.json({
      commentList: modifiedComments,
      cursor: cursor + 1,
    });
  } catch (error) {
    res.json({
      messsage: "댓글 조회 실패했습니다",
    });
  }
};

exports.registerComment = async (req, res) => {
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
    );

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
};

exports.updateComment = async (req, res) => {
  try {
    await Comment.findOneAndUpdate(
      { _id: req.body._id },
      {
        $set: {
          content: req.body.content,
        },
      }
    );

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

exports.deleteComment = async (req, res) => {
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
    );

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
};
