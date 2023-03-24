const router = require("express").Router();
const User = require("../model/User");
//ログイン
router.post("/login",async(req,res)=>{
    try{
        //入力されたemailがDBに登録されているか確認
        const user = await User.findOne({email: req.body.email});
        if(!user) return res.status(400).send("ユーザーが見つかりません");

        //入力されたpasswordがDBのパスワードと一致するか確認
        const vailedPassword = req.body.password === user.password;
        if(!vailedPassword) return res.status(400).json("パスワードが違います");

        return res.status(200).json(user);
    }catch(err){
        return res.status(500).json(err);
        }
    });

//登録
router.post("/register",async(req,res)=>{
    try{
        const newUser = await new User({
            username:req.body.username,
            email:req.body.email,
            password:req.body.password,
        });

        const user = await newUser.save();

        return res.status(200).json(user);

    }catch(err){
        return(res.status(500).json(err))
    }

})

module.exports = router;