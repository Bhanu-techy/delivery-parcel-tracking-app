import React from 'react'
import Cookies from 'js-cookie'
import { useNavigate } from 'react-router-dom'

function Header() {

    const navigate = useNavigate()

    const onClickLogout = () => {
        Cookies.remove('Id')
        Cookies.remove('jwt_token')
        navigate("/login")
    }

  return (
    <div className='h-[10vh] flex justify-between p-5'>
        <h1 className='text-red-400 text-lg font-bold font-serif'>Deliver-App</h1>
        <button className='bg-blue-600 text-white rounded w-[70px]' onClick={onClickLogout}>Logout</button>
    </div>
  )
}

export default Header