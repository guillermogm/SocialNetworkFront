import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { Home } from '../Home/Home'
import { NotFound } from '../NotFound/NotFound'
import { Login } from '../Login/Login'
import { Register } from '../Register/Register'
import { Post } from '../Post/Post'

export const Body = () => {

  return (
    <>
    <Routes>
        <Route path="*" element={<NotFound/>}/>
        <Route path="/" element={<Home/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/posts" element={<Post/>}/>
    </Routes>
    </>
  )
}