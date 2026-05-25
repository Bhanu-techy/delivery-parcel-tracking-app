import React from 'react'
import { useState } from 'react'
import { Eye, EyeOff } from 'lucide-react'

const Login = () => {
  const [isLogin, setIsLogin] = useState(true)
  const [showPassword, setShowPassword] = useState(false)
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [role, setRole] = useState('')
  const [name, setName] = useState("")
  const [password, setPassword] = useState("")

  const onClickLogin = async (e) => {
    e.preventDefault()
    const url = 'https://delivery-parcel-tracking-app.onrender.com/login'
    const userDetails = {email, password}
    console.log(userDetails)
    const options = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, options)
    const data = await response.json()

    if (response.ok) {
    console.log("success")
    }else{
      console.log(data)
    }

  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center px-4 p-2">
      <div className="bg-white w-full max-w-4xl rounded-3xl shadow-2xl overflow-hidden grid grid-cols-1 md:grid-cols-2">
        
        <div className="hidden md:flex flex-col justify-center items-center bg-indigo-600 text-white p-10">
          <h1 className="text-4xl font-bold mb-4">
            {isLogin ? 'Welcome Back!' : 'Join With Us'}
          </h1>

          <p className="text-center text-lg opacity-90">
            {isLogin
              ? 'Login to continue your journey with us.'
              : 'Create your account and start exploring.'}
          </p>

          <button
            onClick={() => setIsLogin(!isLogin)}
            className="mt-8 border border-white px-6 py-2 rounded-full hover:bg-white hover:text-indigo-600 transition duration-300"
          >
            {isLogin ? 'Create Account' : 'Login'}
          </button>
        </div>

        <div className="p-8 md:p-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">
            {isLogin ? 'Login' : 'Register'}
          </h2>

          <p className="text-gray-500 mb-8">
            {isLogin
              ? 'Enter your credentials to access your account'
              : 'Fill the details to create your account'}
          </p>

          <form className="space-y-5">
            {!isLogin && (
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  Full Name
                </label>

                <input
                  type="text"
                  placeholder="Enter your name"
                  onChange={(e)=>setName(e.target.value)}
                  className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
            )}

            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">
                Email
              </label>

              <input
                type="email"
                placeholder="Enter your Phone Number"
                onChange={(e)=>setEmail(e.target.value)}
                className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            {!isLogin && (
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  Email
                </label>

                <input
                  type="text"
                  placeholder="Enter your Email"
                  onChange={(e)=>setEmail(e.target.value)}
                  className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
            )}

            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">
                Password
              </label>

              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Enter your password"
                  onChange={(e)=>setPassword(e.target.value)}
                  className="w-full border border-gray-300 rounded-xl px-4 py-3 pr-12 outline-none focus:ring-2 focus:ring-indigo-500"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-3.5 text-gray-500"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            {!isLogin && (
              <div className='w-[400px] mt-5'>
               <select className='w-[350px] h-[35px] border border-2 rounded'>
                <option value="Admin">Admin</option>
                <option value="Customer">Customer</option>
                <option value="Delivery-staff">Delivery-staff</option>
               </select>
              </div>
            )}

            <button
              type="submit"
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-xl font-semibold transition duration-300"
              onClick={onClickLogin}
            >
              {isLogin ? 'Login' : 'Create Account'}
            </button>
          </form>

          <div className="md:hidden mt-6 text-center">
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="text-indigo-600 font-medium"
            >
              {isLogin
                ? "Don't have an account? Register"
                : 'Already have an account? Login'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login