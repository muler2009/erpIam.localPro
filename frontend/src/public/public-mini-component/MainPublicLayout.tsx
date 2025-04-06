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

      <main className={`h-[90vh] ${isLoginRoute ? "bg-gray-100" : "bg-gray-100"}`}>
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