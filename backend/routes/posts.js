const router = require("express").Router();
const Post = require("../model/Post");
const User = require("../model/User");


//投稿を作成する。
router.post("/", async (req, res) => {
    const newPost = new Post(req.body);
    try {
        const savePost = await newPost.save();
        return res.status(200).json(savePost);
    } catch (err) {
        return res.status(500).json(err);
    }
});

//投稿を更新する。
router.put("/:postId", async (req, res) => {
    try {
        //postIdから投稿を取得
        const post = await Post.findById(req.params.postId);


        //投稿ユーザーと編集者が一致していれば編集可能
        if (post.userId === req.body.userId) {
            await post.updateOne({ $set: req.body });
            return res.status(200).json("編集しました");
        } else {
            return res.status(403).json("編集できません");
        }

    } catch (err) {
        return res.status(403).json(err);
    }
});

//投稿を削除する。
router.delete("/:postId/delete", async (req, res) => {
    try {
        //削除する投稿を取得
        const post = await Post.findById(req.params.postId);


        //投稿者と編集者が一致していれば削除可能
        if (post.userId === req.body.userId) {
            await post.deleteOne();
            return res.status(200).json("削除しました");
        } else {
            return res.status(403).json("削除できません");
        }

    } catch (err) {
        return res.status(403).json(err);
    }
});

//投稿を取得する。
router.get("/:postId", async (req, res) => {
    try {
        //投稿を取得
        const post = await Post.findById(req.params.postId);
        return res.status(200).json(post);
    } catch (err) {
        return res.status(403).json(err);
    }
});

//投稿にいいねをする。
router.put("/:id/like", async (req, res) => {
    try {
        //投稿とログイン中のユーザーデータから取得
        const post = await Post.findById(req.params.id);


        //いいねしたユーザー取得
        const user = await User.findById(req.body.userId);


        //未いいねの場合、いいねをする
        if (!post.likes.includes(req.body.userId)) {
            await post.updateOne({
                $push: {
                    likes: req.body.userId
                }
            });


            //いいね一覧（いいねしたユーザーのlikedにpost._idを追加）
            await user.updateOne({
                $push: {
                    liked: post._id
                }
            });
            return res.status(200).json("いいねしました");
        } else {
            //既にいいねが押されている場合、解除する。
            await post.updateOne({
                $pull: {
                    likes: req.body.userId
                }
            });


            //いいね一覧（いいね解除したユーザーのlikedからpost._idを解除）
            await user.updateOne({
                $pull: {
                    liked: post._id
                }
            });

            return res.status(200).json("いいねを解除しました");
        }

    } catch (err) {
        return res.status(500).json(err);

    }
});

//タイムライン（HOME）を取得する。
router.get("/timeline/:userId", async (req, res) => {
    try {
        //自分の投稿
        const currentUser = await User.findById(req.params.userId);
        const userPosts = await Post.find({ userId: currentUser._id });


        //フォローしているユーザーの投稿
        const friendPosts = await Promise.all(


            //自分のフォローしている人のIDを個々に取り出す
            currentUser.followings.map((friendId) => {


                //投稿を参照してfriendPostsに返す
                return Post.find({ userId: friendId });
            })
        );


        //friendPostsはユーザーの投稿別の二次元配列なので、一つ一つ取り出す
        return res.status(200).json(userPosts.concat(...friendPosts));
        

    } catch (err) {
        return res.status(403).json(err);
    }
});


//タイムライン（profile）を取得する。
router.get("/profile/:username", async (req, res) => {
    try {
        //ユーザー情報を取得
        const user = await User.findOne({ username: req.params.username });

        //投稿を取得 
        const posts = await Post.find({ userId: user._id });


        return res.status(200).json(posts);
    } catch (err) {
        return res.status(403).json(err);
    }

});


//すべての投稿から30件を取得
router.get("/search/all", async (req, res) => {
    try {
        //全投稿取得
        const posts = await Post.find({}).sort({createdAt:-1});
        return res.status(200).json(posts);
    } catch (err) {
        return res.status(403).json(err);
    }
});


//投稿にコメント情報を追加
router.put("/:postId/comment", async (req, res) => {
    try {
        //投稿データ取得
        const post = await Post.findById(req.params.postId);


        //投稿にコメントを紐付ける
        await post.updateOne({
            $push: {
                comments: req.body.commentId
            }
        });
        return res.status(200).json("コメントしました");
    } catch (err) {
        return res.status(500).json(err);
    }
});

//コメントを削除する。
router.delete("/:commentId/deleteComment", async (req, res) => {
    try {
        //削除するコメントを取得
        const comment= await Post.findById(req.params.commentId);

        //コメント先の投稿を取得
        const post = await Post.findById(req.body.postId);


        //投稿者と削除者が一致していて、commentsにcommentIdが含まれるとき
        if (comment.userId === req.body.loginUserId&&post.comments.includes(req.params.commentId)) {

            //commentsのcommentIdを削除
            await post.updateOne({$pull:{comments:req.params.commentId}})

            //コメントを削除
            await comment.deleteOne();

            return res.status(200).json("コメント削除しました");
        } else {
            return res.status(403).json("コメント削除できません");
        }

    } catch (err) {
        return res.status(403).json(err);
    }
});






module.exports = router;