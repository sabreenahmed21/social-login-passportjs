import React from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './components/Home'
import Login from './components/Login'
import { useSelector } from 'react-redux'

export default function App() {
  const userData = useSelector((state) => state.user.currentUser);
  return (
    <BrowserRouter>
    <Navbar/>
    <Routes>
      <Route path='/' element={<Home />}/>
      <Route path='/login' element={userData ? <Navigate to="/" />:<Login />} />
    </Routes>
    </BrowserRouter>
  )
}
