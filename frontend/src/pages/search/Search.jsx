import React, { useEffect, useState } from 'react';
import Rightbar from '../../components/rightbar/Rightbar';
import Sidebar from '../../components/sidebar/Sidebar';
import Topbar from "../../components/topbar/Topbar";
import axios from "axios";
import Post from '../../components/post/Post';
import "./Search.css";
import ManageSearchIcon from '@mui/icons-material/ManageSearch';
import { InputGroup, Form, Button } from 'react-bootstrap';
import User from '../../components/user/User';



export default function Search() {

  //ポストのタイプを切り替える（Posts/Media/Likes）
  const [searchType, setSearchType] = useState("newPosts");
  const handleSearchClick = (type) => {
    setSearchType(type);
  }



  //全投稿取得
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    const fetchPosts = async () => {

      const responses = await axios.get(`/posts/search/all`);

      //コメントは非表示
      const filteredResponses = responses.data.filter((response) => {
        return !response.commented;
      });


      //ソート
      const sortedPosts = filteredResponses.sort((post1, post2) => {
        return new Date(post2.createdAt) - new Date(post1.createdAt);
      });
      setPosts(sortedPosts);

    }
    fetchPosts();
  }, []);

  //全ユーザー情報取得
  const [users, setUser] = useState();
  useEffect(() => {
    const fetchUser = async () => {
      const response = await axios.get(`/users/search/all`)
      setUser(response.data);
    };
    fetchUser();
  }, []);

  console.log(users)





  //全ユーザー取得

  //投稿検索 全投稿からフォームのキーワードと一致するもの。

  //ユーザー検索　全ユーザーからフォームのキーワードと一致するもの。







  return (
    <>
      {/* トップバー */}
      <Topbar />
      <div className="search">
        <div className="serachWrapper">
          <div className="searchTop">


            <div className="searchCenter">
              {/* サイドバー */}
              <Sidebar />


              {/* サーチバー */}
              <div className="searchPost">
                <div className="searchTopbar">
                  <div className="searh-bar">
                    <InputGroup className="mb-3" style={{ width: "100%" }}>
                      <Button variant="outline-secondary" id="button-addon1">
                        <ManageSearchIcon />
                      </Button>
                      <Form.Control
                        aria-label="11s"
                        aria-describedby="basic-addon1"
                      />
                    </InputGroup>
                  </div>


                  {/* メニュー */}
                  <div className="search-postMenues">
                    <div className="postAll">
                      <button type="button" className="btn btn-light" style={{ color: searchType === "newPosts" ? "black" : "gray" }} onClick={() => handleSearchClick("newPosts")}>最新の投稿</button>
                    </div>
                    <div className="postMedia">
                      <button type="button" className="btn btn-light" style={{ color: searchType === "newUsers" ? "black" : "gray" }} onClick={() => handleSearchClick("newUsers")}>最新のユーザー</button>
                    </div>
                  </div>
                  <hr></hr>
                </div>



                {/* 投稿 */}
                {
                  searchType === "newPosts"
                  ?
                    posts.map((post) => (
                      <Post post={post} key={post._id} />
                    ))
                  :

                  users.map((user) => (
                    <><User user={user} key={user._id}/></>
                  ))
                  
                }

              </div>


              {/* サイドバー */}
              {/* <Rightbar /> */}


            </div>
          </div>
        </div>

      </div>
    </>
  );


}
