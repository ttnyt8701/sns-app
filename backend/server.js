const express = require("express");
const app = express();
const PORT = 8000;
const userRouter = require("./routes/users");
const authRouter = require("./routes/auth");
const postRouter = require("./routes/posts");
const uploadRouter = require("./routes/upload");
const mongoose = require("mongoose");
require("dotenv").config();
const path = require("path");

//データベース接続
mongoose.connect(process.env.MONGOURL)
.then(()=>{
    console.log("DBと接続中");
})
.catch((err)=>{
    console.log(err);
});

app.get("/",(req,res)=>{
    res.send("hello backend");
})

//middle ware
app.use("/images",express.static(path.join(__dirname,"public/images")));
app.use(express.json());
app.use("/api/users",userRouter);
app.use("/api/auth",authRouter);
app.use("/api/posts",postRouter);
app.use("/api/upload",uploadRouter);


app.listen(PORT,()=>{
    console.log("running OK");
})
