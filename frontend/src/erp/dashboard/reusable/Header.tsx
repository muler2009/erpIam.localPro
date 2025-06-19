import React from 'react'
import { FaHome } from 'react-icons/fa'
const Header = () => {
  return (
    <header className='w-full h-[80px] border-b'>
        <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
        <FaHome className="h-5 w-5 text-white" />
        </div>
        <span className="font-bold text-slate-900">ERP Pro</span>
    </header>
  )
}

export default Header