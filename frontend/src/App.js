import Home from "./pages/home/Home";
import {BrowserRouter as Router,Navigate,Route,Routes} from "react-router-dom";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import Profile from "./pages/profile/Profile";
import { useContext } from "react";
import { AuthContext } from "./state/AuthContext";
import ProfileEdit from "./components/profileEdit/ProfileEdit";
import Followings from "./components/followings/Followings";
import Followers from "./components/followers/Followers";
import 'bootstrap/dist/css/bootstrap.min.css';
import Editpost from "./components/editpost/Editpost";
import Search from "./pages/search/Search";





function App() {
  const {user} = useContext(AuthContext);

  return(
    <Router >
      <Routes >
        <Route path="/" element={user ? <Home /> : <Login />}/>
        <Route path="/login" element={user ? <Navigate to="/" /> : <Login />}/>
        <Route path="/register" element={user ? <Navigate to="/" /> :<Register />}/>
        <Route path="/profile/:username" element={user ? <Profile /> : <Login />}/>
        <Route path="/Search"  element={user ? <Search /> : <Login />}/>
      </Routes>
    </Router>
  );
}

export default App;
