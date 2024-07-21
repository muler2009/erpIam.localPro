import React from 'react'
import { FlexBox, FlexBoxInner, FlexOuterContainer } from '../../../components/common/StyledComponent'
import SharedCard from './sub-components/SharedCard'
import AllSharedDocument from './sub-components/AllSharedDocument'

const SharedMainDashboard = () => {
  return (
    <FlexOuterContainer className='m-1 flex flex-col gap-1 h-full relative'>
        <SharedCard />
        <FlexBox className='before:content-[""] before:bg-black before:w-full before:h-[1px] after:py-3'>
          <AllSharedDocument />
        </FlexBox>
    </FlexOuterContainer>
  )
}

export default SharedMainDashboard