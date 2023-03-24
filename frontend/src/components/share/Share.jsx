import { Analytics, Face, Gif, Image } from '@mui/icons-material'
import axios from 'axios';
import React, { useContext, useEffect, useRef, useState } from 'react'
import { AuthContext } from '../../state/AuthContext';
import "./Share.css";

export default function Share({loginUser}) {
    const PUBLIC_FOLDER = process.env.REACT_APP_PUBLIC_FOLDER;

    // 入力した投稿・画像を受け取る
    const desc = useRef();
    const [file, setFile] = useState(null);
    const handleSubmit = async (e) => {
        e.preventDefault();
        const newPost = {
            userId: loginUser._id,
            desc: desc.current.value,

        };

        if (file) {
            const data = new FormData();
            const fileName = Date.now() + "-" + file.name;
            data.append("name", fileName);
            data.append("file", file);
            newPost.img = fileName;

            try {
                //画像APIを叩く
                await axios.post("/upload", data);
            } catch (err) {
                console.log(err);

            }

        }
        try {
            await axios.post("/posts", newPost);
            window.location.reload();
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div className="share">
            <div className="shareWrapper">
                <div className="shareTop">
                    <img src={loginUser.profilePicture  ? PUBLIC_FOLDER + loginUser.profilePicture : PUBLIC_FOLDER + "person/noAvatar.png"}
                        alt="" className="shareProfileImg" />
                    <input tye="text" className="shareInput" placeholder="今なにしてるの？" ref={desc} />
                </div>
                <hr className="shareHr" />
                <form className="shareBottons" onSubmit={(e) => handleSubmit(e)}>
                    <div className="shareOptions">
                        <label className="shareOption" htmlFor="file">
                            <Image className="shareIcon" htmlColor="#1da1f2" />
                            <span className="shareOptionText"></span>
                            <input
                                type="file"
                                id="file"
                                accept=".png,.jpeg,.jpg"
                                style={{ display: "none" }}
                                onChange={(e) => setFile(e.target.files ? e.target.files[0] : null)}
                            >
                            </input>
                        </label>
                    </div>
                    <button type="submit" className="shareButton">投稿</button>
                </form>
            </div>
        </div>
    )
}
