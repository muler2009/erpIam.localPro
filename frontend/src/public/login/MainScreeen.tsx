import React from 'react'
import { Div, FlexBox, FlexBoxInner } from '../../components/common/StyledComponent'
import Mainroutes from '../../Router/Mainroutes'
import MainScreenNavigation from './MainScreenNavigation'
import { Outlet } from 'react-router-dom'
import UnderConstruction from '../../components/common/UnderConstruction'



const MainScreeen = () => {
  return (
    <React.Fragment>
      <header className='border-b shadow-sm  font-Poppins sticky top-0 z-50'>
        <MainScreenNavigation />
      </header>
      <main className='h-[90vh]  bg-white bg-opacity-50'>
        <Mainroutes />
      </main>
      <footer className='grid content-center bottom-0'>
        <p>texts</p>
      </footer>
   </React.Fragment>
  )
}

export default MainScreeen


export const Home = () => {
  return(
    <UnderConstruction />
  )
}