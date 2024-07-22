import React from 'react'
import { FlexBox, FlexBoxInner, FlexOuterContainer } from '../../../components/common/StyledComponent'
import { SharedDocument, SharedNavigation } from './sub-components'

const SharedMainDashboard = () => {
  return (
    <FlexOuterContainer className='m-1 flex flex-col relative h-full'>
        <SharedNavigation />
        <FlexBox className=' h-full before:content-[""] before:bg-black before:w-full before:h-[1px] after:py-3'>
          <SharedDocument />
        </FlexBox>
    </FlexOuterContainer>
  )
}

export default SharedMainDashboard