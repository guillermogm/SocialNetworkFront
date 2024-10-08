import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { Home } from '../Home/Home'
import { NotFound } from '../NotFound/NotFound'
import { Login } from '../Login/Login'
import { Register } from '../Register/Register'
import { Post } from '../Post/Post'
import { Profile } from '../Profile/Profile'
import { MyPosts } from '../MyPosts/MyPosts'
import { Admin } from '../Admin/Admin'

export const Body = () => {

  return (
    <>
    <Routes>
        <Route path="*" element={<NotFound/>}/>
        <Route path="/" element={<Home/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/posts" element={<Post/>}/>
        <Route path="/profile" element={<Profile/>}/>
        <Route path="/myposts" element={<MyPosts/>}/>
        <Route path="/admin" element={<Admin/>}/>
    </Routes>
    </>
  )
}