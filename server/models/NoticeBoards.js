const mongoose = require("mongoose");

const noticeBoardsSchema = mongoose.Schema({
    //id
    id: {
        type: String,
        required: true,
        maxlength: 15,
        minlength: 5,
        unique: true
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
        default: Date.now
    }
})