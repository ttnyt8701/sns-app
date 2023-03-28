import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';


export default function Editpost({ post, loginUser, show, handleClick }) {
    const PUBLIC_FOLDER = process.env.REACT_APP_PUBLIC_FOLDER;


    //編集対象のテキスト入力の値を参照
    const desc = useRef();


    //画像とテキストの状態をstateで管理
    const [imgState, setImgState] = useState();
    const [descState, setDescState] = useState();


    //モーダルが開いたときにdescStateとimgStateにセット
    useEffect(() => {
        setDescState(post.desc);
        setImgState(post.img);
    }, [show])


    //編集フォームが送信されたときに実行
    const handleEditSubmit = async (e) => {
        e.preventDefault();


        //新しい投稿を作成する
        const newEdit = {
            userId: loginUser._id,
            desc: desc.current.value,
            isEdited: true,
            img: imgState
        }


        try {
            //投稿を更新する
            await axios.put(`/posts/${post._id}`, newEdit);
        } catch (err) {
            console.log(err)
        }


        //ページを更新する。
        window.location.reload();
    }

    //削除ボタンが押されたときに実行する関数
    const handleDelete = async () => {

        //コメントならば、コメント先の紐づけ情報も削除
        if(post.commented){
            try{
                await axios.delete(`/posts/${post._id}/deleteComment`, { data: { loginUserId: loginUser._id ,postId:post.commented } });

            }catch(err){
                console.log(err)
            }
        }else{
        try {
            //投稿を削除する
            await axios.delete(`/posts/${post._id}/delete`, { data: { userId: loginUser._id} });
        } catch (err) {
            console.log(err);
        }
    }

        //ページを更新する
        window.location.reload();
    }


    return (
        <div className="modal">
            <div className="editModal">
                {/* showがtrueのときモーダルを表示 */}
                <Modal show={show} onHide={handleClick}>
                    <Modal.Header closeButton>
                        <Modal.Title></Modal.Title>
                    </Modal.Header>
                    <Modal.Body >
                        <Form onSubmit={(e) => handleEditSubmit(e)}>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                                <Form.Label>編集</Form.Label>
                                {/* 入力が変化したときstateにセット */}
                                <Form.Control as="textarea" rows={3} placeholder="Bio" value={descState} onChange={(e) => setDescState(e.target.value)} ref={desc} />
                            </Form.Group>
                            {/* 画像が存在する場合 */}
                            {imgState != null
                                ?
                                <Form.Group className="mb-3" controlId="exampleForm.ControlImg" >
                                    <div style={{ position: "relative" }}>
                                        <Form.Label ><img src={PUBLIC_FOLDER + imgState} style={{ width: "100%" }} /></Form.Label>
                                        <Button type="button" className="btn-close" style={{ margin: "0 0 140px 0" }} aria-label="Close" onClick={() => setImgState(null)}></Button></div>
                                </Form.Group>
                                :
                                <div>追加</div>}
                            <Button variant="primary" type="submit">
                                保存
                            </Button>
                            <Button variant="danger" onClick={() => handleDelete()}>
                                削除
                            </Button>
                        </Form>
                    </Modal.Body>
                </Modal>
            </div>
        </div>
    )
}
