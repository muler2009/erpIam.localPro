import React,{useContext} from 'react'
import { Outlet } from 'react-router-dom'
import AdminRoutes from '../Routes/AdminRoutes'
import Sidebar from '../components/reusable/Sidebar'
import { Header, Footer } from '../components/reusable'
import TreeView from '../components/reusable/TreeView'
import menus from '../constants/data'
import SidebarMenu from '../components/reusable/SidebarMenu'
import { ThemeContextProvider } from '../../context/ThemeContext'
import { ThemeContext } from '../../context/ThemeContext'



const Dashboard = () => {
  const theme = useContext(ThemeContext)
  return (
    <ThemeContextProvider>
      <div className='bg-[#fff]'>
        <div className='flex flex-1 h-screen'>
            <Sidebar />
            {/* <SidebarMenu /> */}
            {/* <TreeView menu={menus} /> */}
            <div className='w-full flex flex-col'>
                <Header />
                <Outlet />
                <AdminRoutes />
            </div>
        </div>
      </div>
      <Footer />
    </ThemeContextProvider>
    
  )
}

export default Dashboard

