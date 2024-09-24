import React from 'react'
import { Div, FlexBox, FlexBoxInner } from '../../components/common/StyledComponent'
import Mainroutes from '../../Router/Mainroutes'
import MainScreenNavigation from './MainScreenNavigation'
import { Outlet } from 'react-router-dom'
import UnderConstruction from '../../components/common/UnderConstruction'
import logo from '../../assets/images/watermark-logo.png'
import useLogin from '../../iam/auth/login/useLogin'
import { useLocation, useMatch } from 'react-router-dom'



const MainPublicLayout = () => {
  const { isLoggingIn } = useLogin()
  const isLoginRoute = useMatch('/login');

  return (
    <React.Fragment>
      <header className='border-b shadow-sm font-Poppins sticky top-0 z-50'>
        <MainScreenNavigation />
      </header>
      <main className={`h-[90vh] ${isLoginRoute ? "bg-watermark-logo bg-opacity-30" : "bg-white"}`}>
        <Mainroutes />
      </main>
      <footer className='grid content-center bottom-0'>
        <p>texts</p>
      </footer>
   </React.Fragment>
  )
}

export default MainPublicLayout


export const Home = () => {
  return(
    <UnderConstruction />
  )
}