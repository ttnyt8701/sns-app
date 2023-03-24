import React, { useEffect, useState } from 'react';
import "./Rightbar.css";
import axios from "axios";
import { Link } from 'react-router-dom';

export default function Rightbar({ user }) {
  const PUBLIC_FOLDER = process.env.REACT_APP_PUBLIC_FOLDER;

  //全ユーザー情報取得
  const [users, setUser] = useState();
  useEffect(() => {
    const fetchUser = async () => {
      const response = await
        axios.get(`/users/search/all`)

      setUser(response.data);
    };
    fetchUser();
  }, [user]);






// ホーム画面の場合
  const HomeRightbar = () => {
    return (
      <><div className="rightbar">
        <h4 className="rightbarTitle">最新ユーザー</h4>
        {users?.map((users) => (
          <ul className="rightbarFriendList" key={users._id}>
            <li className="rightbarFriend">
              <Link  to={`/profile/${users.username}`} style={{ textDecoration: "none", color: "black" }}>
                <img src={users.profilePicture ? PUBLIC_FOLDER + users.profilePicture : PUBLIC_FOLDER + "/person/noAvatar.png"} alt="" className='followProfileImg' />
                <span className="followUsername">{users.username}</span>
              </Link>
            </li>
          </ul>
        )
        )}
      </div>
      </>
    );
  }

  //プロフィール画面の場合
  const ProfileRightbar = () => {
    return (
      <>
        <div className="rightbarInfo">
          <h4 className="rightbarTitle">オンライン中の友達</h4>
          <div className="rightbarFollowings">

            <div className="rightbarFollowing">
            </div>
          </div>
        </div>
      </>
    );
  }

  //ユーザークエリがあるかでプロフィールとホームで表示を切り替える。
  return (
    <div className="Rightbar">
      <div className="rightbarWrapper">
        {user ? <ProfileRightbar /> : <HomeRightbar />}
      </div>
    </div>
  );

}
