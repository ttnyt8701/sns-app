import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { format, render, cancel, register } from 'timeago.js';
import { Link } from 'react-router-dom';
import { MoreVert } from '@mui/icons-material'
import Editpost from '../editpost/Editpost';
import Spinner from 'react-bootstrap/Spinner';


export default function Comments({ post, showComment, handleClickComment, user, loginUser, show, handleClick }) {
    const PUBLIC_FOLDER = process.env.REACT_APP_PUBLIC_FOLDER;

    //コメントとユーザーを取得するための状態管理
    const [commentState, setCommentState] = useState([]);

    //ローディング画面
    const [loading, setLoading] = useState(true);


    //ユーザーとコメントを取得してcommentStateに保存
    useEffect(() => {
        const fetchData = async () => {
            try {

                //受け取ったpostのcommentsのidから情報を取得。また、コメント・ユーザーの取得を同期させる。
                const comments = await Promise.all(post.comments.map(async (commentId) => {


                    //コメント取得
                    const commentresponsePromise = await axios.get(`/posts/${commentId}`);


                    //コメント取得するまで待機（コメント取得→ユーザー取得のように同期させる）
                    const commentresponse = await commentresponsePromise;


                    if (commentresponse?.data) {

                        //ユーザー取得
                        const userresponse = await axios.get(`/users?userId=${commentresponse.data.userId}`);


                        //コメントとユーザーの情報をオブジェクトとしてセット
                        return {
                            commentdata: commentresponse.data,
                            userdata: userresponse.data
                        };
                    }


                    //コメントがない場合nullを返す
                    return null;
                }
                ));

                //取得したcommentsをstateに保存
                if (comments) {
                    setCommentState(comments.reverse())
                }

                //取得完了している場合、loading画面を非表示
                setLoading(false);


            } catch (error) {
                console.log(`コメント・ユーザーの取得に失敗しました。:${error}`);
                setLoading(false);
            }


        };
        fetchData();


        //コメントが開かれたとき、画面が変わったときに実行
    }, [showComment, user.username]);


    // 入力したコメントをuseRefで受け取る
    const comment = useRef();

    //コメント投稿する関数
    const handleSubmit = async (e) => {
        e.preventDefault();


        try {
            //コメント投稿
            const newComment = await axios.post("/posts", {
                userId: loginUser._id,
                desc: comment.current.value,
                commented: post._id,
            })

            console.log(newComment)



            //投稿にコメント情報を追加
            await axios.put(`/posts/${post._id}/comment`, { commentId: newComment.data._id })



            //commentStateに追加する。配列スプレッド演算子を使用して既存の値を取得し新しい配列を作成
            setCommentState(
                [{
                    commentdata: newComment.data,
                    userdata: loginUser,
                }, ...commentState,]

            )

            //入力をリセットする。
            comment.current.value = "";




        } catch (err) {
            console.log(`投稿できませんでした。:${err}`);
        }
    };

    return (
        <div className="modal">
            <div className="editModal">
                {/* コメントがクリックされたときにモーダル表示 */}
                <Modal show={showComment} onHide={handleClickComment}>
                    <Modal.Header closeButton></Modal.Header>
                    <Modal.Body >
                        {/* 投稿情報 */}
                        <div className="postWrapper">
                            <div className="postTop">
                                <div className="postTopLeft">
                                    <img src={user.profilePicture ? PUBLIC_FOLDER + user.profilePicture : PUBLIC_FOLDER + "person/noAvatar.png"} alt="" className='postProfileImg' />
                                    <span className="postUsername">{user.username}</span>
                                    <span className="postDate">{format(post.createdAt, "ja_JP")}</span>
                                    <span className="postEdited">{post.edited ? "編集済み" : ""}</span>
                                </div>
                            </div>
                        </div>
                        <div className="postCenter">
                            <span className="postText">
                                {post.desc}
                            </span>
                            <img src={post?.img ? PUBLIC_FOLDER + post.img : null} alt="" className="postImg" />
                        </div>
                        {/* コメントフォーム */}
                        <Form onSubmit={(e) => handleSubmit(e)}>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                                <Form.Control as="textarea" rows={3} ref={comment} />
                            </Form.Group>
                            <Button variant="primary" type="submit">コメント</Button>
                        </Form>
                        {/* コメント欄 */}
                        {!loading ? commentState.map((comment) => {
                            return (
                                <React.Fragment key={comment.commentdata._id}>
                                    <div className="postWrapper">
                                        <div className="postTop">
                                            <div className="postTopLeft">
                                                <Link to={`/profile/${comment.userdata.username}`} style={{ textDecoration: "none", color: "black" }}>
                                                    <img src={comment.userdata.profilePicture ? PUBLIC_FOLDER + comment.userdata.profilePicture : PUBLIC_FOLDER + "person/noAvatar.png"} alt="" className='postProfileImg' />
                                                    <span className="postUsername">{comment.userdata.username}
                                                    </span>
                                                </Link>
                                                <span className="postDate">{format(comment.commentdata.createdAt, "ja_JP")}</span>
                                                <span className="postEdited">{comment.commentdata.isEdited ? "編集済み" : ""}</span>
                                            </div>
                                            <div className="postTopRight">
                                                {loginUser._id === comment.commentdata.userId
                                                    ?
                                                    <>
                                                        <Button variant="light" onClick={handleClick}>
                                                            <MoreVert />
                                                        </Button>
                                                        <Editpost post={comment.commentdata} loginUser={loginUser} show={show} handleClick={handleClick} key={comment.commentdata._id} />
                                                    </>
                                                    : ""
                                                }

                                            </div>
                                        </div>
                                    </div>
                                    <div className="postCenter">
                                        <span className="postText">
                                            {comment.commentdata.desc}
                                        </span>
                                    </div>

                                    <div className="postBottom">
                                        <div className="postBottomRight">
                                            <div className="postCommentText">
                                            </div>
                                        </div>
                                    </div>
                                </React.Fragment>
                            )
                        })
                            :
                            // ローディング画面
                            <Spinner animation="border" variant="secondary" />
                        }


                    </Modal.Body>
                </Modal>
            </div>
        </div>
    )
}

