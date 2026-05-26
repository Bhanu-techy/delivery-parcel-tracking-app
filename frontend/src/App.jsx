import { useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from './components/Login';
import Home from './components/Home';
import Dashboard from './components/Dashboard';
import Shipments from './components/Shipments';
import UpdateStatus from './components/UpdateStatus';
import './App.css'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login/>} />
        <Route path='/home' element={<Home/>} />
        <Route path='/dashboard' element={<Dashboard/>} />
        <Route path="shipments" element={<Shipments/>} />
        <Route path='/update-shipment/:id' element={<UpdateStatus/>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
