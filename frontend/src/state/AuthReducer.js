const AuthReducer = (state, action) => {
    switch (action.type) {
        case "LOGIN_START":
            return {
                user: null,//新しい状態→ユーザーが存在しない
                isFetching: true,//情報を取得するかどうか
                error: false,
            };
        case "LOGIN_SUCCESS":
            return {
                user: action.payload,//ログインした状態
                isFetching: false,//ログインしたので新しい情報はいらない
                error: false,
            };
        case "LOGIN_ERROR":
            return {
                user: null,
                isFetching: false,
                error: action.payload,
            };
        case "UPDATE_USER":
            return {
                ...state,
                user: action.payload,
            };
        default:
            return state;
    }
};

export default AuthReducer;