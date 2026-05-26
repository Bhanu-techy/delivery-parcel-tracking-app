import { useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from './components/Login';
import Home from './components/Home';
import Dashboard from './components/Dashboard';
import Shipments from './components/Shipments';
import UpdateStatus from './components/UpdateStatus';
import ProtectedRoute from './components/ProtectedRoute';
import './App.css'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/login' element={<Login/>} />
        <Route path='/' element={<ProtectedRoute><Home/></ProtectedRoute>} />
        <Route path='/dashboard' element={<ProtectedRoute><Dashboard/></ProtectedRoute>} />
        <Route path="/shipments" element={<ProtectedRoute><Shipments/></ProtectedRoute>} />
        <Route path='/update-shipment/:id' element={<ProtectedRoute><UpdateStatus/></ProtectedRoute>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
