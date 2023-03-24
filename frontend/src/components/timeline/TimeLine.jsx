import React, { useContext, useEffect, useState } from 'react';
import Post from '../post/Post';
import Share from '../share/Share';
import "./TimeLine.css";
import axios from "axios";
import { AuthContext } from '../../state/AuthContext';
import { Search } from '@mui/icons-material';

export default function TimeLine({ username }) {
  //ログインユーザー取得
  const { user: loginUser } = useContext(AuthContext)

  //ユーザー名からユーザー情報取得
  const [user, setUser] = useState();
  useEffect(() => {
    const fetchUser = async () => {
      const response = await
        axios.get(`/users?username=${username}`)
      setUser(response.data);
    };
    if (username) {
      fetchUser();
    }
  }, []);


  //ポストのタイプを切り替える（Posts/Media/Likes）
  const [typeState, setTypeState] = useState("Posts");
  const handlePost = (type) => {
    setTypeState(type);
  }

  //別のユーザーに移動したときPostsに移動
  useEffect(() => {
    setTypeState("Posts")
  }, [username])



  const [posts, setPosts] = useState([]);

  //ユーザーが変更されたとき投稿データを取得
  useEffect(() => {
    const fetchPosts = async () => {
      let responses;


      //プロフィールの投稿（自分のみ）or ホームの投稿（フォロー中＋自分)を取得
      if (username) {
        responses = await axios.get(`/posts/profile/${username}`);
      } else {
        responses = await axios.get(`/posts/timeline/${loginUser._id}`);
      }

      //コメントは非表示
      const filteredResponses = responses.data.filter((response) => {
        return !response.commented;
      });


      //ソート
      const sortedPosts = filteredResponses.sort((post1, post2) => {
        return new Date(post2.createdAt) - new Date(post1.createdAt);
      });

      //投稿状態を保存
      setPosts(sortedPosts);
    };
    fetchPosts();

    //ユーザ-が変わったときデータを更新する。
  }, [username]);


  //メディア投稿
  const [mediaPosts,setMediaPosts] = useState([]);

  useEffect(()=>{
  if (username) {
    const mediaPost = posts.filter((post) => post.img);
    setMediaPosts(mediaPost)
  } },[posts])



  //取得したいいね一覧を保持
  const [likedPosts, setLikedPosts] = useState([]);

  //いいねした投稿を取得
  useEffect(() => {
    const fetchPost = async () => {
      const promises = user?.liked?.map((postId) => {
        return axios.get(`/posts/${postId}`);
      });
      if (promises && promises.length > 0) {
        const results = await Promise.all(promises);
        const posts = results.map((result) => result.data);
        setLikedPosts(posts.reverse());
      }
    };
    if (username) {
      fetchPost();
    }

  }, [user]);



  //プロフィール画面での切り替えメニュー（posts/media/likes）
  const PostMenue = () => {
    return (
      <>
        <div className="postMenues">
          <div className="postAll">
            <button type="button" className="btn btn-light" style={{ color: typeState === "Posts" ? "black" : "gray" }} onClick={() => handlePost("Posts")}>ツイート</button>
          </div>
          <div className="postMedia">
            <button type="button" className="btn btn-light" style={{ color: typeState === "Media" ? "black" : "gray" }} onClick={() => handlePost("Media")}>メディア</button>
          </div>
          <div className="postlikes">
            <button type="button" className="btn btn-light" style={{ color: typeState === "Likes" ? "black" : "gray" }} onClick={() => handlePost("Likes")}>いいね</button>
          </div>
        </div>
      </>
    );

  }

  // 表示
  return (
    <div className="timeline">
      <div className="timelineWrapper">
        {/* profile画面ならメニュー表示 */}
        {
          username
            ? <PostMenue />
            : <Share loginUser={loginUser} />
        }


        {/* いいねタブが押されたときいいねした投稿を受け渡し、そうでない場合、通常の投稿を受けす。 */}
        {
          typeState == "Likes"
            ?
            likedPosts.map((post) => (
              <Post post={post} key={post._id} />
            ))
            :
            typeState == "Posts"
            ?
            posts.map((post) => (
              <Post post={post} key={post._id} />
            ))
            :
            mediaPosts.map((post) => (
              <Post post={post} key={post._id} />
            ))

        }
      </div>
    </div>
  )
}
