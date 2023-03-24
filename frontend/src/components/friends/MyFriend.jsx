import axios from 'axios';
import React, { useEffect, useState } from 'react'

export default function MyFriend({userIds}) {
  const PUBLIC_FOLDER = process.env.REACT_APP_PUBLIC_FOLDER;

  const [user,setUser] = useState([]);
  useEffect(()=>{
    const fetchUser = async () => {
      const response = await axios.get(`/users?userId=${userIds}`);
      setUser(response.data);
    };

    fetchUser();
  },[userIds]);

  return (
    <div>
      <ul className="sidebarFriendList">
        <li className="sidebarFriend">
          <img src={user.profilePicture ? PUBLIC_FOLDER + user.profilePicture : PUBLIC_FOLDER+"/person/noAvatar.png"} alt="" className="sidebarFriendsImg" />
          <span className="sidebarFriendName">{user.username}</span>
        </li>
      </ul>
    </div>
  )
}
