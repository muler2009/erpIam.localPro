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

const LibraryMain = () => {
  return (
    <FlexOuterContainer className='flex flex-col mx-[1px] h-full' >
        <FlexInnerContainer className='border-b bg-[#fff] p-4'>
          <Text className='text-xl font-semibold p-1'>My Document</Text>
        </FlexInnerContainer>
        <LibraryTopNavigation />

        
            <LibraryList />
    </FlexOuterContainer>
  )
}

export default LibraryMain

{/* <FlexBoxInner className='flex justify-end items-center pr-10'>
            <FlexBoxInner className='flex space-x-2'>
              <Text className='text-[12px] font-semibold p-1'>Suggested</Text> 
              <FlexBoxInner className='flex divide-x-[1px] cursor-pointer border rounded-r-full rounded-l-full'>
                 <div className='btn-sm px-5 hover:bg-gray-50 rounded-none flex items-center justify-center'>
                    <span className='pr-1'><BsFileEarmark /></span>Files
                  </div>
                  <div className='btn-sm px-5 hover:bg-gray-50 rounded-none  flex items-center justify-center'>
                    <span className='pr-1'><GiOpenFolder size={18} /></span>Folders
                  </div>
              </FlexBoxInner>
            </FlexBoxInner>
          </FlexBoxInner> */}


{/* <FlexBox>
fsdfdfdsfd
</FlexBox>

<FlexBox className='flex space-x-1 h-full'>
<FlexBoxInner className='flex-grow'>
  <LibraryList />
</FlexBoxInner>

</FlexBox> */}



 {/* <FlexBoxInner className='flex divide-x-[1px] cursor-pointer border rounded-r-full rounded-l-full'>
            <div className='btn-sm px-5 hover:bg-gray-50 rounded-none flex items-center justify-center'>
                    <span className='pr-1'><BsCardList /></span>
                  </div>
                  <div className='btn-sm px-5 hover:bg-gray-50 rounded-none  flex items-center justify-center'>
                    <span className='pr-1'><TfiLayoutGrid2Alt size={18} /></span>
                  </div> 
            </FlexBoxInner> */}