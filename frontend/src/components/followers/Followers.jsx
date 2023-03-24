import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { Link, useLocation, useParams } from 'react-router-dom';
// import "./Followings.css";
import Button from 'react-bootstrap/Button';


export default function Followers({ users }) {
    const PUBLIC_FOLDER = process.env.REACT_APP_PUBLIC_FOLDER;
    
    //set user_data to state
    const [followUser, setUser] = useState([]);

    //get user_data from database
    useEffect(() => {
        const fetchUser = async () => {
            const response = await axios.get(`/users?userId=${users}`);
            setUser(response.data);
        };
        fetchUser();
    }, [users]);



    return (
        <>
            <div className="follow">
                <div className="followWrapper">
                    <div className="followTop">
                        <div className="followTopLeft">
                            <Link to={`/profile/${followUser.username}`} style={{ textDecoration: "none", color: "black" }}>
                                <img src={followUser.profilePicture ? PUBLIC_FOLDER + followUser.profilePicture : PUBLIC_FOLDER + "/person/noAvatar.png"} alt="" className='followProfileImg' />
                                <span className="followUsername">{followUser.username}</span>
                            </Link>
                        </div>
                        <div className="followTopRight">
                            <Button variant="outline-secondary">follow</Button>
                        </div>
                    </div>

                    <div className="followCenter">
                        <span className="followText">{followUser.desc}</span>
                        <img src={PUBLIC_FOLDER + followUser.img} alt="" className="followImg" />
                    </div>
                </div>
            </div>
        </>
    )
};
