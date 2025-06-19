import React, {useState}  from 'react'
import { FaBars, FaHome } from 'react-icons/fa'
import { FaGear } from 'react-icons/fa6'
import { FiActivity } from 'react-icons/fi'
import { dashboard } from '../constants/dashboard'


const ERPDashboardHeader = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)

  return (
    <aside className={`fixed left-0 top-0 z-40 h-screen bg-white border-r border-slate-200 transition-all duration-300 ${sidebarCollapsed ? "w-16" : "w-64"}`}>
    <div className="flex h-16 items-center justify-between px-4 border-b border-slate-200">
      {!sidebarCollapsed && (
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
            <FaHome className="h-5 w-5 text-white" />
          </div>
          <span className="font-bold text-slate-900">ERP Pro</span>
        </div>
      )}
      <button   
        onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
        className="h-8 w-8"
      >
        <FaBars className="h-4 w-4" />
      </button>
    </div>

    <nav className="p-4 space-y-2 mt-5 px-3">
        {
            dashboard?.map((dashboard, index) => {
                return(
                    <div key={index} className={`px-2 w-full flex justify-start items-center space-x-3 py-2 hover:bg-gray-50 cursor-pointer ${sidebarCollapsed ? "px-2" : ""}`}>
                        <div className={`w-4 h-4`}>
                            {dashboard.icons}
                        </div>
                        <h1 className='font-Poppins'>
                            {!sidebarCollapsed && `${dashboard.label}`}
                        </h1>
                    </div>
                )
            })
        }
      
    </nav>
  </aside>
  )
}

export default ERPDashboardHeader