import React from 'react'

export default function Online({user}) {
  const PUBLIC_FOLDER = process.env.REACT_APP_PUBLIC_FOLDER;

  return (
    <div>
        <li className="rightbarFriend">
            <div className="rightbarProfileImgContainer">
            <img src={PUBLIC_FOLDER + user.profilePicture} alt="" className='rightbarProfileImg'/>
            <span className="rightbarOnline"> </span>
            <span className="rigthbarUsername">{user.username}</span>
            </div>
        </li>
    </div>
  )
}


