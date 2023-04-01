import { Chat, Notifications, Search } from '@mui/icons-material';
import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import "./Topbar.css";
import { AuthContext } from "../../state/AuthContext"
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

export default function Topbar() {
  const PUBLIC_FOLDER = process.env.REACT_APP_PUBLIC_FOLDER;
  const { user: loginUser } = useContext(AuthContext);

  //ログアウトモーダル表示
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);

  //ログアウト機能
  const handleLogout = async () => {
    try {

      //ローカルストレージを削除
      localStorage.removeItem("user");

      //更新
      window.location.reload();

    } catch (err) {
      console.log(`ログアウトできませんでした:${err}`)
    }

  }

  return (
    <div className="topbarContainer">
      <div className="topbarLeft">
        <Link to="/login" style={{ textDecoration: "none", color: "black" }}>
          <span className="logo">SNS-app</span>
        </Link>
      </div>

      <div className="topbarCenter">
        <div className="searchbar">
          <Search className="searchIcon" />
          <input
            type="text"
            className="searchInput"
            placeholder="探し物は何ですか？"
          />
        </div>
      </div>

      <div className="topbarRight">
        <div className="topbarItemIcons">
          <div className="topbarIconItem">
            <Chat />
            <span className="topbarIconBadge">1</span>
          </div>
          <div className="topbarIconItem">
            <Notifications />
            <span className="topbarIconBadge">2</span>
          </div>
          <img src={loginUser.profilePicture ? PUBLIC_FOLDER + loginUser.profilePicture : PUBLIC_FOLDER + "person/noAvatar.png"}
            alt="" className="topbarImg" onClick={handleClick} />
          {/* ログアウトモーダル */}
          <Modal show={show} onHide={handleClick} animation={false} dialogClassName="modal-90w">
            <Modal.Body  >
              <Button variant="danger" onClick={() => handleLogout()} >
                ログアウト
              </Button>
            </Modal.Body>
          </Modal>

        </div>
      </div>
    </div >
  );
}
