import React from 'react'
import { FlexBox, FlexBoxInner } from '../../components/common/StyledComponent'
import Mainroutes from '../../Router/Mainroutes'
import MainScreenNavigation from './MainScreenNavigation'
import { Outlet } from 'react-router-dom'
import UnderConstruction from '../../components/common/UnderConstruction'



const MainScreeen = () => {
  return (
    <>
      <FlexBox className='flex flex-col h-full'>
          <MainScreenNavigation />
          <Mainroutes />
      </FlexBox>
    </>
  )
}

export default MainScreeen


export const Home = () => {
  return(
    <UnderConstruction />
  )
}