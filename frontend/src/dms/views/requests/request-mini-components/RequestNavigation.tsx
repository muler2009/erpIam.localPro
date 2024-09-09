import React, { useState } from 'react'
import { FlexBox, FlexBoxInner, Text, P, Div } from '../../../../components/common/StyledComponent'
import { Link } from 'react-router-dom'
import { requestMenu } from '../../../constants/menu-items/requestMenu'
import {SendRequest} from '.'
import useUtils from '../../../hooks/useUtils'
import { HiHome } from "react-icons/hi2";
import Tooltip from '../../../../iam/components/reusable/Tooltip'
import { BiSolidMessage } from "react-icons/bi";

const RequestNavigation = () => {

  return (
    <FlexBox className='pt-3 pb-2 flex justify-between items-center px-5 bg-white mx-[2px] mb-[2px]'>
        <FlexBoxInner className='flex space-x-3 items-center'>
            <Link to='' className='text-[#333] text-opacity-70'>
              <Tooltip content={`Home`}>
                <HiHome size={20} />
              </Tooltip>
            </Link>
            <Text className='text-opacity-95 text-sm font-Poppins'>Request for Approval</Text>
        </FlexBoxInner>

        <FlexBoxInner className='pr-10'>
          <Div className='flex relative'>
            <Text className='font-Poppins text-[#333] text-[13px]'>Message</Text>
            <Div className='absolute -top-[5px] -right-[30%]  bg-red-600 rounded-[5px] px-2 flex justify-center items-center'> 
              1
            </Div>

          </Div>
        </FlexBoxInner>
        
        
    </FlexBox>
  )
}

export default RequestNavigation