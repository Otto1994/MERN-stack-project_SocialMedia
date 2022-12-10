import Home from "./page/home/Home";
import Profile from "./page/Components/Profile/Profile";
import "./App.css"
import React from 'react'
import Auth from "./page/Auth/Auth";
import {useSelector} from 'react-redux'
import {Navigate,Routes,Route} from  'react-router-dom'
function App() {
  const user=useSelector((state)=>state.AuthReducer.authData)
  return (
    <div className="App">
       <div className="blur" style={{top:"-18%" ,right:"0"}}></div>
       <div className="blur" style={{top:"36%" ,left:"-8rem"}}>    </div>
       <Routes>
     <Route path="/" element={user ? <Navigate to="home" /> : <Navigate to="auth" />}/>
     <Route path="/home" element={user ? <Home /> : <Navigate to="../auth" />}/>
     <Route path="/auth" element={user ? <Navigate to="../home" /> : <Auth />}/>
     <Route path="/profile/:id"element={user ? <Profile /> : <Navigate to="../auth" />}/>
     </Routes>
    </div>
  );
}  

export default App;
