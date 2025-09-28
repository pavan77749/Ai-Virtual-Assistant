import React,{useContext} from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import SignUp from './pages/signup';
import Login from './pages/login';
import Customize from './pages/Customize';
import Customize2 from './pages/Customize2'
import { UserDataContext } from './context/UserContext';
import Home from './pages/Home';


const App = () => {
  const { userData , setUserData } = useContext(UserDataContext);
  return (
    <Routes>
      <Route path="/" element={(userData?.assistantName && userData?.assistantImage) ? <Home/> : <Navigate to="/customize" />} />
      <Route path="/login" element={!userData?<Login/> : <Navigate to="/" />} />
      <Route path="/signup" element={!userData?<SignUp/> : <Navigate to="/"/>} />
      <Route path="/customize" element={userData? <Customize/> : <Navigate to="/login" />} />
      <Route path="/customize2" element={userData? <Customize2/> : <Navigate to="/login" />} />
    </Routes>
  )
}

export default App
