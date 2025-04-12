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
import { iamSidebarItems } from '../constants/menu-items/iam-side-meniItems'
import MainTree from '../components/reusable/Tree/MainTree'



const Dashboard = () => {
  const theme = useContext(ThemeContext)
  return (
    <ThemeContextProvider>
      <div className='bg-[#fff] flex flex-col"'>
        <div className='flex flex-1 sticky top-0 h-screen overflow-y-auto shadow-lg bg-white z-20'>
            {/* <Sidebar /> */}
            <MainTree  menu={iamSidebarItems}/>
            {/* <SidebarMenu /> */}
            {/* <TreeView menu={menus} /> */}
            <div className='w-full flex flex-col overflow-y-auto'>
                <Header />
                <Outlet />
                <AdminRoutes />
            </div>
        </div>
        <Footer />
      </div>
    </ThemeContextProvider>
    
  )
}

export default Dashboard

