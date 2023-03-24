import { MoreVert } from '@mui/icons-material'
import axios from 'axios';
import React, { useContext, useEffect, useRef, useState } from 'react'
import "./Post.css";
import { format, render, cancel, register } from 'timeago.js';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../state/AuthContext';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import Editpost from '../editpost/Editpost';
import Comments from '../comments/Comments';
import ModeCommentIcon from '@mui/icons-material/ModeComment';


export default function Post({ post }) {
    const PUBLIC_FOLDER = process.env.REACT_APP_PUBLIC_FOLDER;
    //ログインユーザーをuseContextで取得
    const { user: loginUser } = useContext(AuthContext);

    //投稿のユーザー情報を取得
    const [user, setUser] = useState([]);

    useEffect(() => {
        const fetchUser = async () => {
            const response = await axios.get(`/users?userId=${post.userId}`);
            setUser(response.data);
        };

        //ログインユーザーの情報は取得しない（パフォーマンス）
        if (post.userId !== loginUser._id) {
            fetchUser();
        }
    }, [post]);

    //いいね数の表示のState
    const [like, setLike] = useState(post.likes?.length);
    const [isLiked, setLiked] = useState(post.likes?.includes(loginUser._id));


    //既にいいねしていているか、いいねの状態をStateに保存
    useEffect(() => {
        { post.likes.includes(loginUser._id) ? setLiked(true) : setLiked(false) }
    }, [post]);


    //いいね機能
    const handleLike = async () => {
        try {
            //APIを叩いてＤＢに追加or解除
            await axios.put(`/posts/${post._id}/like`, { userId: loginUser._id });

            //いいねを押したときに状態によって表示数を変化。
            setLike(isLiked ? like - 1 : like + 1);
            setLiked(!isLiked);
        } catch (err) {
            console.log(`いいねできませんでした${err}`);
        }

    }


    //編集モーダル表示の状態
    const [show, setShow] = useState(false);
    const handleClick = () => setShow(!show);


    //コメントモーダル表示の状態
    const [showComment, setShowComment] = useState(false);
    const handleClickComment = () => setShowComment(!showComment);


    return (
        <div className="post">
            <div className="postWrapper">
                <div className="postTop">


                    {/* 投稿者情報(名前/アバター/投稿時刻/編集済みか/) */}
                    <div className="postTopLeft">
                        <Link to={`/profile/${post.userId !== loginUser._id ? user.username : loginUser.username}`} style={{ textDecoration: "none", color: "black" }}>
                            <img src={
                                post.userId !== loginUser._id
                                    ?
                                    //ログインユーザー以外
                                    user.profilePicture ? PUBLIC_FOLDER + user.profilePicture : PUBLIC_FOLDER + "person/noAvatar.png"
                                    :
                                    //ログインユーザー
                                    loginUser.profilePicture ? PUBLIC_FOLDER + loginUser.profilePicture : PUBLIC_FOLDER + "person/noAvatar.png"
                            } alt="" className='postProfileImg' />
                            <span className="postUsername">{post.userId !== loginUser._id ? user.username : loginUser.username}
                            </span>
                        </Link>
                        <span className="postDate">{format(post.createdAt, "ja_JP")}</span>
                        <span className="postEdited">{post.isEdited ? "編集済み" : ""}</span>
                    </div>


                    {/* 投稿者なら編集画面を表示 */}
                    <div className="postTopRight">
                        {loginUser._id === post.userId
                            ? <>
                                <button variant="light" style={{ backgroundColor: "transparent", border: "0", color: "gray" }} onClick={handleClick}>
                                    <MoreVert />
                                </button>
                                <Editpost post={post} loginUser={loginUser} show={show} handleClick={handleClick} key={post._id} />
                            </>
                            : ""}
                    </div>


                </div>
            </div>

            {/* 投稿文章、画像 */}
            <div className="postCenter">
                <span className="postText">
                    {post.desc}
                </span>
                <img src={post?.img ? PUBLIC_FOLDER + post.img : null} alt="" className="postImg" />
            </div>


            {/* いいね表示 */}
            <div className="postBottom">
                <div className="postBottomLeft" >
                    {isLiked
                        ? <FavoriteIcon className="likeIcon" htmlColor="red" onClick={() => handleLike()} />
                        : <FavoriteBorderIcon className="likeIcon" htmlColor="gray" onClick={() => handleLike()} />}
                    <span className="postLikeCounter" style={{ color: "gray" }}>
                        {like ? like : ""}
                    </span>
                </div>


                {/* コメント表示 */}
                <div className="postBottomRight">
                    <div className="postCommentText">
                        <button style={{ textDecoration: "none", border: "0", backgroundColor: "transparent", color: "gray" }} onClick={handleClickComment}>
                            <ModeCommentIcon /> {post.comments.length > 0 ? post.comments.length : ""}
                        </button>
                        <Comments showComment={showComment} handleClickComment={handleClickComment} post={post} user={user} key={post._id} loginUser={loginUser} show={show} handleClick={handleClick} />
                    </div>
                </div>


            </div>
        </div >
    );
}
