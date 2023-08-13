const mongoose = require("mongoose");

const commentSchema = mongoose.Schema({
    id: {
        type: String,
        required: true,
        unique: true,
        ref: "User"
    },
    content: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        required: true,
        default: Date.now
    }
});

const Commnet = mongoose.model("Comment" , commentSchema);

module.exports = { Commnet };