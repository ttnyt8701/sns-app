import React, { useContext, useEffect, useState } from 'react'
import { Bookmark, Home, MessageRounded, Notifications, Person, Search, Settings } from '@mui/icons-material';
import "./Sidebar.css";
import { Link } from 'react-router-dom';
import { AuthContext } from '../../state/AuthContext';
import AddIcon from '@mui/icons-material/Add';
import Modal from 'react-bootstrap/Modal';
import Share from '../share/Share';
import VideocamIcon from '@mui/icons-material/Videocam';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';


export default function Sidebar() {
  const { user: loginUser } = useContext(AuthContext);

  //投稿モーダル表示
  const [state, setState] = useState(false);
  const handleClick = () => setState(!state);
  useEffect(() => {
    setState(false);
  }, [])



  return (
    <div>
      <div className="sidebar">
        <div className="sidebarWrapper">
          <ul className="sidebarList">
            <li className="sidebarListItem">
              <Link to="/" style={{ textDecoration: "none", color: "black" }}>
                <Home className="sidebarIcon" />
              </Link>
            </li>
            <li className="sidebarListItem">
              <Link to="/Search" style={{ textDecoration: "none", color: "black" }}>
                <Search className="sidebarIcon" />
              </Link>
            </li>
            <li className="sidebarListItem">
              <Link to={`/profile/${loginUser.username}`} style={{ textDecoration: "none", color: "black" }}>
                <PermIdentityIcon className="sidebarIcon" />
              </Link>
            </li>
            <li className="sidebarListItem">
              <MailOutlineIcon className="sidebarIcon" />
            </li>
            <li className="sidebarListItem">
              <VideocamIcon className="sidebarIcon" />
            </li>
            <li className="sidebarListItem">
              <NotificationsNoneIcon className="sidebarIcon" />
            </li>
            <li className="sidebarListItem">
              <Settings className="sidebarIcon" />
            </li>
            <li className="sidebarListItem">
              <AddIcon className="AddIcon" onClick={handleClick} />
            </li>
          </ul>
        </div>
      </div>
      <div className="createModal">
        <Modal show={state} onHide={handleClick} backdrop="static">
          <Modal.Header closeButton>
          </Modal.Header>
          <Modal.Body>
            <Share loginUser={loginUser}/>
          </Modal.Body>
        </Modal>
      </div>
    </div>
  )
}
