import React, {useState} from 'react'
import { request_menu } from '../../../constants/menu-items/requestMenu'
import { Link, NavLink, Outlet } from 'react-router-dom'

const WorkflowDashboard = () => {
    const [activeLink, setActiveLink] = useState<number>(0)
    const handleActiveLink = (index: number) => {
        setActiveLink(index)
    }

  return (
    <div className='w-full h-full'>
        <div className='flex justify-between items-center space-x-4 shadow-md '>
            <div className='flex space-x-2 py-4 px-2'>
                {
                    request_menu?.map((request_menu,index) => {
                        return(
                            <NavLink 
                                key={index} 
                                className={`px-2 font-Poppins text-[13px] border-[2px] rounded-[3px]  border-button-primary py-2 ${index === activeLink ? "text-opacity-100 bg-button-primary text-white duration-150 -translate-x-1" : "text-[#333] text-opacity-50"}`} 
                                to={request_menu.path} 
                                onClick={() => handleActiveLink(index)}   
                            >
                                {request_menu.label}
                            </NavLink>
                        )
                    })
                }
            </div>
            <div className='pr-5 font-Poppins bg-gray-50'>
                <p className='px-5 py-2'>Filter</p>
                
            </div>
            <div className='flex-grow'>
                <input className='input-md text-sm px-2 font-Poppins' placeholder='Search' /> 
            </div>
           
        </div>
        <div className='pt-3'>
            <Outlet />
        </div>
    </div>
  )
}

export default WorkflowDashboard