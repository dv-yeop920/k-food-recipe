const mongoose = require("mongoose");

const noticeBoardsSchema = mongoose.Schema({
    //id
    id: {
        type: String,
        required: true,
        maxlength: 15,
        minlength: 5,
        unique: true,
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

const Boards = mongoose.model("NoticeBoardsSchema" , noticeBoardsSchema);

module.exports = { Boards };