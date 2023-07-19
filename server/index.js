const express = require("express");
const app = express();
const PORT = 7070;

const db = "mongodb+srv://jyeop920:toddlf0826@cluster0.mvqy3yr.mongodb.net/?retryWrites=true&w=majority";
const mongoose = require("mongoose");
mongoose.connect(db , {
    useNewUrlParser:true,
    useUnifiedTopology:true,
    useCreateIndex:true,
    useFindAndModify:false
}).then((req , res) => {
    console.log("MongoDB Connected!");
}).catch((error) => {
    console.log(error);
});

app.listen(PORT , (req , res) => {
    console.log('hello world');
});

app.get('/' , (req , res) => {
    res.send('하이하잉');
});