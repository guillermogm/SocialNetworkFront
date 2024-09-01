import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { Home } from '../Home/Home'
import { NotFound } from '../NotFound/NotFound'
import { Login } from '../Login/Login'

export const Body = () => {

  return (
    <>
    <Routes>
        <Route path="*" element={<NotFound/>}/>
        <Route path="/" element={<Home/>}/>
        <Route path="/login" element={<Login/>}/>
    </Routes>
    </>
  )
}