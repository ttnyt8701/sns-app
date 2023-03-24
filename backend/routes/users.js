const router = require("express").Router();
const User = require("../model/User");

//CRUD

//登録情報の更新
router.put("/:id",async(req,res)=>{
    //ログイン中か確認
    if(req.body.userId === req.params.id || req.body.isAdmin){
        try{
            const user = await User.findByIdAndUpdate(req.params.id,{//idのデータを探して、更新
                $set: req.body, //req.bodyのすべてを受け取る。$setでセット
            });
            res. status(200).json("ユーザー情報が更新されました。")
        }catch(err){
            return res.status(500).json(err);
        }

    }else{
        return res.status(403).json("ログイン中のアカウントのみ更新できます。");

    }
});

//登録情報の削除
router.delete("/:id",async(req,res)=>{
    //ログイン中か確認
    if(req.body.userId === req.params.id || req.body.isAdmin){
        try{
            const user = await User.findByIdAndDelete(req.params.id);
            res. status(200).json("ユーザー情報が削除されました。")
        }catch(err){
            return res.status(500).json(err);
        }

    }else{
        return res.status(403).json("ログイン中のアカウントのみ削除できます。");

    }
});

//登録情報の取得
// router.get("/:id",async(req,res)=>{
//     //ログイン中か確認
//     try{
//         const user = await User.findById(req.params.id);
//         const {password,updatedAt,...other} = user._doc;//ユーザー情報user._docを各変数に分割代入。
//         return res. status(200).json(other);//passと更新時以外をレスポンス
//     }catch(err){
//         return res.status(500).json(err);
//     }

// });

//クエリで登録情報の取得
//クエリ→　url→/~?userId=xxxx ←xxxxを見ている
router.get("/",async(req,res)=>{
    const userId = req.query.userId;
    const username = req.query.username;

    //ログイン中か確認
    try{
        const user = userId ? await User.findById(userId) : await User.findOne({username : username})

        const {password,updatedAt,email,...other} = user._doc;//ユーザー情報user._docを各変数に分割代入。
        return res. status(200).json(other);//passと更新時以外をレスポンス
    }catch(err){
        return res.status(500).json(err);
    }

});

//フォロー
//フォローする、外すを常に更新する→put
router.put("/:id/follow",async(req,res)=>{
    //自分はフォローできない（自分(req.body.userId)とフォロー対象(req.params.userId())が一致している場合）
    if (req.body.userId !== req.params.id){
        try{
            ////フォロー対象の情報
            const user = await User.findById(req.params.id);
            //自分の情報
            const currentUser = await User.findById(req.body.userId);

            //自分が既にフォローしていない場合フォローできる
            if(!currentUser.followings.includes(req.params.id)){
                //自分のフォローに相手のIDを追加
                await currentUser.updateOne({
                    $push:{
                        followings: req.params.id
                    }
                });
                //相手のフォロワーに自分のIDを追加
                await user.updateOne({
                    $push:{
                        followers: req.body.userId
                    }
                });
                return res.status(200).json("フォローに成功しました。");
            }else{
                return res.status(403).json("すでにこのユーザーをフォローしています");
            }

        }catch(err){
            return res.status(500).json(err);
        }

    }else{
        return res.status(500).json("自分自身をフォローできません");
    }
});

//アンフォロー
router.put("/:id/unfollow",async(req,res)=>{
    //自分はアンフォローできない（自分(req.body.userId)とフォロー対象(req.params.userId())が一致している場合）
    if (req.body.userId !== req.params.id){
        try{
            ////フォロー対象の情報
            const user = await User.findById(req.params.id);
            //自分の情報
            const currentUser = await User.findById(req.body.userId);

            //既にフォローしている場合アンフォローできる
            if(currentUser.followings.includes(req.params.id)){
                //自分のフォローから相手のIDを消す
                await currentUser.updateOne({
                    $pull:{
                        followings: req.params.id
                    }
                });
                //相手のフォロワーから自分のIDを消す
                await user.updateOne({
                    $pull:{
                        followers: req.body.userId
                    }
                });
                return res.status(200).json("アンフォローに成功しました。");
            }else{
                return res.status(403).json("このユーザーはフォローしていません");
            }

        }catch(err){
            return res.status(500).json(err);
        }

    }else{
        return res.status(500).json("自分自身をフォローできません");
    }
});

//すべてのユーザーから30件を取得
router.get("/search/all", async (req, res) => {
    try {
        const users = await User.find({}).sort({createdAt:-1}).limit(30);

        // ユーザー配列の各要素に対してパスワードや更新日時を除外
        const otherUsers = users.map(user => {
            const {email, password, updatedAt, ...other } = user._doc;
            return other;
        });

        return res.status(200).json(otherUsers);
    } catch (err) {
        return res.status(403).json(err);
    }
}); 


module.exports = router;