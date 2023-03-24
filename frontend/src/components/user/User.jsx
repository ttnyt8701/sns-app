import React, { useContext} from 'react';
import { format, render, cancel, register } from 'timeago.js';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../state/AuthContext';
import "./User.css";

export default function User({ user }) {
    const PUBLIC_FOLDER = process.env.REACT_APP_PUBLIC_FOLDER;
    //ログインユーザーをuseContextで取得
    const { user: loginUser } = useContext(AuthContext);



    return (
        <div className="user">
            <div className="userWrapper">
                <div className="userTop">


                    {/* 投稿者情報(名前/アバター/投稿時刻/編集済みか/) */}
                    <div className="userTopLeft">
                        <Link to={`/profile/${user.username}`} style={{ textDecoration: "none", color: "black" }}>
                            <img src={user.profilePicture ? PUBLIC_FOLDER + user.profilePicture : PUBLIC_FOLDER + "person/noAvatar.png"} alt="" className='userProfileImg' />
                            <span className="userUsername">{user.username}
                            </span>
                        </Link>
                    </div>

                

                </div>
            </div>

            {/* 投稿文章、画像 */}
            <div className="userCenter">
                <span className="userText">
                    {user.desc}
                </span>
            </div>






        </div>

    );
}
