import React from 'react'
import { FlexBox, FlexOuterContainer, Text, P, FlexBoxInner } from '../../../components/common/StyledComponent'
import { FlexInnerContainer } from '../../../iam/components/reusable/StyledComponent'
import { LibraryTopNavigation } from './LibraryTopNavigation'
import LibraryList from './LibraryList'
import { FaFile } from 'react-icons/fa'
import { BsFileEarmark } from "react-icons/bs";
import { GiOpenFolder } from "react-icons/gi";
import { BsCardList } from "react-icons/bs";
import { TfiLayoutGrid2Alt } from "react-icons/tfi";
import { Outlet } from 'react-router-dom'
import Routes, { DocumentRoutes } from '../../Routes/Routes'

const LibraryMain = () => {
  return (
    <FlexOuterContainer className='flex flex-col h-full' >
        {/* <FlexBoxInner className='bg-[#fff] '>
          <Text className='text-xl font-semibold px-5 pt-2'>My Document</Text>
        </FlexBoxInner> */}
        <LibraryTopNavigation />
      
        <FlexBoxInner className='mt-[3px] h-full'>
          <Outlet />
        </FlexBoxInner>
    </FlexOuterContainer>
  )
}

export default LibraryMain

