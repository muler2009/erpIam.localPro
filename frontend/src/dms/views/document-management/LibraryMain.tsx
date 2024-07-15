import React from 'react'
import { FlexBox, FlexOuterContainer, Text, P, FlexBoxInner } from '../../../components/common/StyledComponent'
import { FlexInnerContainer } from '../../../iam/components/reusable/StyledComponent'
import { LibraryTopNavigation } from './LibraryTopNavigation'
import LibraryList from './LibraryList'

const LibraryMain = () => {
  return (
    <FlexOuterContainer className='flex flex-col mx-[1px] h-full' >
        <FlexInnerContainer className='border-b bg-[#fff] p-4'>
          <Text className='text-xl font-Rubik'>My Document</Text>
        </FlexInnerContainer>
        <LibraryTopNavigation />
        <FlexBox className='flex space-x-1 h-full'>
          <FlexBoxInner className='flex-grow'>
            <LibraryList />
          </FlexBoxInner>
          <FlexBoxInner className='border w-[20%] bg-[#fff] flex justify-center items-start m-1 rounded-[3px]'>
             <Text className='text-[52px]'>&#128193;</Text>
          </FlexBoxInner>
        </FlexBox>

      
    </FlexOuterContainer>
  )
}

export default LibraryMain