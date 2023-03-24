import { createContext, useEffect, useReducer } from "react";
import AuthReducer from "./AuthReducer";

//最初のユーザー状態を定義
const initialState ={
    user: JSON.parse(localStorage.getItem("user"))|| null,//ユーザー状態をローカルストレージから取り出す。なければnull→リロードしてもログイン維持
    // user:
    //     {
    //     _id:"63f366a75f6f0dcc6adfeead",
    //     username:"Yuta",
    //     email:"yuta@gmail",
    //     password:"1234567",
    //     profilePicture:"/person/1.jpeg",
    //     coverPicture:"/post/1.jpeg",
    //     followers:[],
    //     followings:["63f397b9d5d31801a50e52eb"],
    //     isAdmin:false,
    //     },
    isFetching:false,
    error:false,
};

//状態をグローバルで管理する
export const AuthContext = createContext(initialState);//グローバルコンテキストを作り出す→初期値のユーザー状態をどこでも使えるようにした

//プロバイダー→供給する→認証情報を供給する
export const AuthContextProvider = ({children}) =>{
    const [state,dispatch] = useReducer(AuthReducer,initialState);

    //ローカルストレージに状態保存
    useEffect(()=>{
        localStorage.setItem("user",JSON.stringify(state.user));
    },[state.user])//state.userの中身が変更されたときこの関数が発動すし、ローカルホストに"user"を保存
    return(
        <AuthContext.Provider 
        value={{
            user:state.user,
            isFetching:state.isFetching,
            error:state.error,
            dispatch,
        }}>
            {children} 
        </AuthContext.Provider>
    )
};

