import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import SignUp from './pages/signup';
import Login from './pages/login';


const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
    </Routes>
  )
}

export default App
