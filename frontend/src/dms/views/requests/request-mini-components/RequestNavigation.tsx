import React from 'react'
import { FlexBox, FlexBoxInner, Text, P } from '../../../../components/common/StyledComponent'
import { Link } from 'react-router-dom'

const RequestNavigation = () => {
  return (
    
    <FlexBox className='pt-3 flex justify-between items-center px-5 bg-white mx-[2px] mb-[2px]'>
        <FlexBoxInner className='mx-5'>
            <Text className='font-semibold text-primary-green text-opacity-95 text-[23px]'>Request <span className='text-[#333]'>Library</span></Text>
            {/* <P className='text-[9px] text-[#333] text-opacity-65'>Request</P> */}
        </FlexBoxInner>
        <FlexBox>
            <Link to="test_request">Doc Creater</Link>
            <Link to="test_request">New Request</Link>

        </FlexBox>
    
    </FlexBox>
  )
}

export default RequestNavigation