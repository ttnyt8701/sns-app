import axios from 'axios';
import React, { useContext, useEffect, useRef, useState } from 'react';
import Rightbar from '../../components/rightbar/Rightbar';
import Sidebar from '../../components/sidebar/Sidebar';
import TimeLine from '../../components/timeline/TimeLine';
import Topbar from "../../components/topbar/Topbar";
import "./Profile.css";
import { useParams } from 'react-router-dom';
import { FmdGood } from '@mui/icons-material';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import { AuthContext } from '../../state/AuthContext';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Follow from '../../components/Follow/Follow';
import Form from 'react-bootstrap/Form';



export default function Profile() {
  const PUBLIC_FOLDER = process.env.REACT_APP_PUBLIC_FOLDER;

  //ログイン情報を取得
  const { user: loginUser } = useContext(AuthContext);

  //ログイン情報更新の関数
  const { dispatch } = useContext(AuthContext);
  const updateUser = async () => {
    const newUser = await axios.get(`/users/?userId=${loginUser._id}`)
    dispatch({ type: "UPDATE_USER", payload: newUser.data });
  };


  //ユーザー情報の状態
  const [user, setUser] = useState([]);

  //ユーザー名
  const username = useParams().username;

  //ユーザー名が変更されたときユーザー情報を取得
  useEffect(() => {
    const fetchUser = async () => {
      const response = await axios.get(`/users?username=${username}`);
      setUser(response.data);
    };
    fetchUser();
  }, [username]);


  //フォロー数の状態
  const [follow, setFollow] = useState(user?.followers?.length);

  //フォローの状態
  const [followed, setFollowed] = useState(loginUser.followings.includes(user?._id));

  //ユーザー情報を取得したときにフォロー状態、フォロー数をセット
  useEffect(() => {
    setFollowed(loginUser.followings.includes(user._id));
    setFollow(user.followers?.length)
  }, [user]);


  //フォローしたときの関数
  const handleClickFollow = async () => {
    try {
      if (followed) {
        await axios.put(`/users/${user._id}/unfollow`, { userId: loginUser._id, });
        setFollow(follow - 1)
        setFollowed(!followed);
      } else {
        await axios.put(`/users/${user._id}/follow`, { userId: loginUser._id, });
        setFollow(follow + 1)
        setFollowed(!followed);
      }

      //ログインユーザーの情報を更新
      updateUser();


    } catch (err) {
      console.log(`フォローできませんでした。${err}`);
    }

  };

  //フォロー＆フォロワーのモーダル表示
  const [showFollowings, setFollowingsShow] = useState(false);
  const [showFollowers, setFollowersShow] = useState(false);
  const handleFollowings = () => setFollowingsShow(!showFollowings);
  const handleFollowers = () => setFollowersShow(!showFollowers);

  //ユーザー名が変更されたときフォローモーダルを閉じる
  useEffect(() => {
    setFollowingsShow(false);
    setFollowersShow(false);
  }, [username])

  //プロフィール編集のモーダル表示
  const [showEdit, setShowEdit] = useState(false);
  const handleClick = () => setShowEdit(!showEdit);
  useEffect(() => {
    setShowEdit(false);
  }, [username])

  //編集画面の入力値を受け取る
  const name = useRef();
  const desc = useRef();
  const city = useRef();

  const [profileFile, setProfileFile] = useState(null);
  const [coverFile, setCoverFile] = useState(null);


  //入力値をstateにセット
  const [nameState, setNameState] = useState();
  const [descState, setDescState] = useState();
  const [cityState, setCityState] = useState();

  useEffect(() => {
    setNameState(user.username);
    setDescState(user.desc);
    setCityState(user.city);
  }, [showEdit])


  const handleEditSubmit = async (e) => {
    e.preventDefault();

    //変数に入力値を代入
    const newEdit = {
      userId: loginUser._id,
      username: name.current.value,
      desc: desc.current.value,
      city: city.current.value,
    }

    //upload&set profile_img to public&newEdit
    if (profileFile) {
      const data = new FormData();
      const fileName = Date.now() + "-" + profileFile.name;
      data.append("name", fileName);
      data.append("file", profileFile);
      newEdit.profilePicture = fileName;

      try {
        await axios.post("/upload", data);
      } catch (err) {
        console.log(err);
      }
    }
    //upload&set cover_img to public&newEdit
    if (coverFile) {
      const data = new FormData();
      const fileName = Date.now() + "-" + coverFile.name;
      data.append("name", fileName);
      data.append("file", coverFile);
      newEdit.coverPicture = fileName;

      try {
        await axios.post("/upload", data);
      } catch (err) {
        console.log(err);
      }
    }

    //更新する。
    try {
      await axios.put(`/users/${user._id}`, newEdit);
    } catch (err) {
      console.log(err)
    }

    //ログインユーザーの情報を更新
    updateUser();

    //更新
    window.location.reload();
  }




  return (
    <>
      <Topbar />
      <div className="Profile">
        <Sidebar />
        <div className="profileRight">
          <div className="profileRightTop">
            <div className="profileCover">
              <img src={user.coverPicture ? PUBLIC_FOLDER + user.coverPicture : PUBLIC_FOLDER + "person/noAvatar.png"} alt="" className="profileCoverImg" />
              <img src={user.profilePicture ? PUBLIC_FOLDER + user.profilePicture : PUBLIC_FOLDER + "person/noAvatar.png"} alt="" className="profileUserImg" />
            </div>
            <div className="profileInfo">
              <div className="profileFollow">
                {user._id !== loginUser._id && (
                  <Button className="rightbarFollowButton" onClick={() => handleClickFollow()} variant={followed ? "outline-dark" : "dark"}>
                    {followed ? "フォロー中" :"フォロー" }
                  </Button>
                )}
                {user._id === loginUser._id && (
                  <Button className="rightbarFollowButton" variant="outline-secondary" onClick={handleClick}>プロフィール編集</Button>
                )}
              </div>
              <h4 className="profileInfoName">
                {user.username}
              </h4>
              <span className="profileInfoDesc">
                {user.desc}
              </span>
              <div className="profileInfoDetails">
                <span className="profileInfoCity">
                  {user.city ? (<FmdGood />) : " "}
                  {user.city ? user.city + "   " : " "}
                </span>
                <span className="profileInfoCreatedAt">
                  <CalendarMonthIcon />
                  {`jointed ${new Date(user.createdAt).toDateString().split(" ")[1]} ${new Date(user.createdAt).toDateString().split(" ")[3]}`}
                </span>
                <div className="profileInfoFollow">
                  <Button style={{ textDecoration: "none", color: "black" }} variant="outline-light" onClick={handleFollowings}>
                    <span className="profileFollow">
                      {user.followings ? user.followings.length : 0}
                    </span>
                    <span className="profileFollowText" >フォロー</span>
                  </Button>
                  <Button style={{ textDecoration: "none", color: "black" }} variant="outline-light" onClick={handleFollowers}>
                    <span className="profileFollow">
                      {follow ? follow : 0}
                    </span>
                    <span className="profileFollowText" >フォロワー</span>
                  </Button>
                  <div className="profilefollowingsModal">
                    <Modal show={showFollowings} onHide={handleFollowings}>
                      <Modal.Header closeButton>
                        <Modal.Title>フォロー</Modal.Title>
                      </Modal.Header>
                      <Modal.Body>
                        {user.followings ? user.followings.map((users) => (
                          <Follow users={users} key={users} />
                        )) : []}
                      </Modal.Body>
                      <Modal.Footer>
                        <Button variant="secondary" onClick={handleFollowings}>
                          閉じる
                        </Button>
                      </Modal.Footer>
                    </Modal>
                  </div>
                  <div className="profileFollowersModal">
                    <Modal show={showFollowers} onHide={handleFollowers}>
                      <Modal.Header closeButton>
                        <Modal.Title>フォロワー</Modal.Title>
                      </Modal.Header>
                      <Modal.Body>
                        {user.followers ? user.followers.map((users) => (
                          <Follow users={users} key={users} />
                        )) : []}
                      </Modal.Body>
                      <Modal.Footer>
                        <Button variant="secondary" onClick={handleFollowers}>
                          閉じる
                        </Button>
                      </Modal.Footer>
                    </Modal>
                  </div>
                  <div className="profileEditModal">

                    {/* プロフィール編集モーダル */}
                    <Modal show={showEdit} onHide={handleClick} backdrop="static">
                      <Modal.Header closeButton>
                        <Modal.Title>プロフィール編集</Modal.Title>
                      </Modal.Header>
                      <Modal.Body>
                        <div className="profileCover">
                          <label htmlFor='coverPictureFile'>
                            <img src={user.coverPicture ? PUBLIC_FOLDER + user.coverPicture : PUBLIC_FOLDER + "/person/noAvatar.png"} className="profileCoverImg" />
                            <input type="file" id="profilePictureFile" accept=".png,.jpeg,.jpg" style={{ display: "none" }} onChange={(e) => setProfileFile(e.target.files ? e.target.files[0] : null)} />
                          </label>
                          <label htmlFor='profilePictureFile'>
                            <img src={user.profilePicture ? PUBLIC_FOLDER + user.profilePicture : PUBLIC_FOLDER + "/person/noAvatar.png"} className="profileUserImg" />
                            <input type="file" id="coverPictureFile" accept=".png,.jpeg,.jpg" style={{ display: "none" }} onChange={(e) => setCoverFile(e.target.files ? e.target.files[0] : null)} />
                          </label>
                        </div>
                        <Form onSubmit={(e) => handleEditSubmit(e)}>
                          <Form.Group className="mb-3" controlId="formBasicName">
                            <Form.Label>名前</Form.Label>
                            <Form.Control type="text" placeholder="Name" value={nameState} onChange={(e) => setNameState(e.target.value)} ref={name} />
                          </Form.Group>
                          <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                            <Form.Label>プロフィール</Form.Label>
                            <Form.Control as="textarea" rows={3} placeholder="Bio" value={descState} onChange={(e) => setDescState(e.target.value)} ref={desc} />
                          </Form.Group>
                          <Form.Group className="mb-3" controlId="formBasicLocation">
                            <Form.Label>場所</Form.Label>
                            <Form.Control type="text" placeholder="Location" value={cityState} onChange={(e) => setCityState(e.target.value)} ref={city} />
                          </Form.Group>
                          <Button variant="primary" type="submit">
                            保存
                          </Button>
                          <Button variant="secondary" onClick={handleClick}>
                            キャンセル
                          </Button>
                        </Form>
                      </Modal.Body>
                    </Modal>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="profileRightBottom">
            <TimeLine profile username={username} />
            <Rightbar profile user={user} key={user._id} />
          </div>
        </div>
      </div>

    </>
  );
}
