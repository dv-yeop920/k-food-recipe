const mongoose = require("mongoose");

const RecipeSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  image: {
    type: String,
  },
});

const Post = mongoose.model("Post", noticeBoardSchema);

module.exports = { Post };
