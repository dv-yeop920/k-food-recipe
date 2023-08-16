
const mongoose = require("mongoose");



const noticeBoardSchema = mongoose.Schema({
    //id
    id: {
        type: String,
        required: true,
        ref: "User"
    },
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
    createdAt: {
        type: Date,
        required: true,
        default: Date.now
    }
});


const Post = mongoose.model("Post" , noticeBoardSchema);

module.exports = { Post };