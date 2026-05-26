import React from 'react'
import { useState } from 'react'
import { replace, useNavigate } from 'react-router-dom'

import { Mail, Lock, Eye, EyeOff } from "lucide-react";
import Cookies from 'js-cookie';

const Login = () => {
  const [showPassword, setShowPassword] = useState(false)
  const [email, setEmail] = useState("sai@gmail.com")
  const [role, setRole] = useState("")
  const [password, setPassword] = useState("sai@1234")
  const [showErr, setShowErr] = useState(false)
  const [error, seterror] = useState("")

  const navigate = useNavigate();

  const onClickLogin = async (e) => {
    e.preventDefault()
    const url = 'https://delivery-parcel-tracking-app.onrender.com/login'
    const userDetails = {email, password, role}
    
    const options = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userDetails),
    }

    const response = await fetch(url, options)
    const data = await response.json();

    if (response.ok) {
      switch (role) {
        case "Admin":
          navigate('dashboard')
          break;
        case "Customer":
          navigate("/home")
          break;
        case "Delivery-staff":
          navigate("/shipments")
          break
        default:
          break;
      }
      Cookies.set('userId', data.id)
      Cookies.set('jwt_token', data.jwt_token)


    }else{
      console.log(data)
      setShowErr(true)
      seterror(data.error_msg)
    }

  }

  return (
   <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      
      <div className="bg-white w-full max-w-md rounded-3xl shadow-xl p-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">
            Welcome Back
          </h1>

          <p className="text-gray-500 mt-2">
            Login to continue
          </p>
        </div>

        <form  className="space-y-5">
          <div>
            <label className="text-sm font-medium text-gray-600">
              Email
            </label>

            <div className="flex items-center border rounded-xl px-3 mt-2">
              <Mail className="text-gray-400" size={20} />

              <input
                type="email"
                placeholder="Enter your email"
                className="w-full p-3 outline-none"
                required value={email}
                onChange={(e)=>setEmail(e.target.value)}
              />
            </div>
          </div>

          <div>
            <label className="text-sm font-medium text-gray-600">
              Password
            </label>

            <div className="flex items-center border rounded-xl px-3 mt-2">
              <Lock className="text-gray-400" size={20} />

              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                className="w-full p-3 outline-none"
                required
                onChange={(e)=>setPassword(e.target.value)}
                value={password}
              />

              <button
                type="button"
                onClick={() =>
                  setShowPassword(!showPassword)
                }
              >
                {showPassword ? (
                  <EyeOff
                    className="text-gray-400"
                    size={20}
                  />
                ) : (
                  <Eye
                    className="text-gray-400"
                    size={20}
                  />
                )}
              </button>
            </div>
          </div>

          <div className='border w-[385px] h-[45px] rounded-lg'>
          <select className='w-[100%] h-[100%]' onChange={(e)=>setRole(e.target.value)}>
            <option value="">Select role</option>
            <option value="Admin">Admin</option>
            <option value="Delivery-staff">Delivery-staff</option>
            <option value="Customer">Customer</option>
          </select>
          </div>
          {showErr ? <p className='text-red-600 w-[400px] text-center'>{error}</p>:<p></p>}
          <button
            type="button" onClick={onClickLogin}
            className="w-full bg-blue-600 hover:bg-blue-700 transition-all text-white py-3 rounded-xl font-semibold"
          >
            Login
          </button>
        </form>

      </div>
    </div>
  )
}

export default Login