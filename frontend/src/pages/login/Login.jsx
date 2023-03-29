
import React, { useContext, useRef } from 'react'
import { Link } from 'react-router-dom';
import { loginCall } from '../../actionCalls';
import { AuthContext } from '../../state/AuthContext';
import "./Login.css"

export default function Login() {
  const email = useRef();
  const password = useRef();
  const { dispatch } = useContext(AuthContext);

  const handleSubmit = (e) => {
    //ログインボタンを押してもリロードされない
    e.preventDefault();
    loginCall(
      {
        email: email.current.value,
        password: password.current.value,
      },
      dispatch
    )
  };



  return (
    <div className="login">
      <div className="loginWrapper">
        <div className="loginLeft">
          <h3 className="loginLogo">SNS-APP</h3>
          <span className="loginDesc">SNSアプリ、始めました。</span>
        </div>
        <div className="loginRight">
          <form className="loginBox" onSubmit={(e) => handleSubmit(e)}>
            <p className="loginMsg">ログインはこちらから</p>
            <input type="email" className="loginInput" placeholder="メールアドレス" required ref={email} />
            <input type="password" className="loginInput" placeholder="パスワード" required minLength="5" ref={password} />
            <button className="loginButton">ログイン</button>
            {/* <span className="loginForgot">パスワードを忘れた方へ</span> */}
            <Link to="/register" style={{marginLeft:"110px"}}>
            <button className="LoginRegisterButton">アカウント作成</button>
            </Link>
          </form>
        </div>
      </div>
    </div>
  )
}
