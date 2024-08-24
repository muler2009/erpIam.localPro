import React, { useState } from 'react'
import { FlexBox, FlexBoxInner, Text, P } from '../../../../components/common/StyledComponent'
import { Link } from 'react-router-dom'
import { requestMenu } from '../../../constants/menu-items/requestMenu'
import {SendRequest} from '.'
import useUtils from '../../../hooks/useUtils'
import { HiHome } from "react-icons/hi2";
import Tooltip from '../../../../iam/components/reusable/Tooltip'

const RequestNavigation = () => {

  const {handleIsOpenCloseMenuModal, open} = useUtils()

  return (
    
    <FlexBox className='pt-3 pb-2 flex justify-between items-center px-5 bg-white mx-[2px] mb-[2px]'>
        <FlexBoxInner className='flex space-x-3 items-center'>
            <Link to='' className='text-[#333] text-opacity-70'>
              <Tooltip content={`Home`}>
                <HiHome size={20} />
              </Tooltip>
            </Link>
            <Text className='text-primary-green text-opacity-95 text-sm'>Request for Approval</Text>
        </FlexBoxInner>
        <FlexBox className='flex space-x-4 cursor-pointer'>
            {
              requestMenu?.map((requests, index) => {
                return(
                  <FlexBoxInner className='' key={index}>
                      {
                        requests.miniWindow ? (
                            <div className='flex justify-center items-center space-x-3 bg-primary-green text-[#fff] border-primary-green rounded-[5px]' onClick={handleIsOpenCloseMenuModal}>  
                              <Text className='text-[12px] border px-3 rounded-[3px] py-2 flex items-center'>
                                <span className='pr-2'>{requests.icon}</span>
                                {requests.label}
                              </Text>
                            </div>
                          ) : (
                            <Link className='flex justify-center items-center space-x-3 rounded-[5px]' to={requests.path || ""}>
                              <Text className='text-[12px] border px-3 rounded-[3px] hover:bg-gray-200 py-2'>{requests.label}</Text>
                            </Link>
                        )
                      }
                  </FlexBoxInner>
                )
              })
            }
        </FlexBox>
        <SendRequest handleIsOpenCloseMenuModal={handleIsOpenCloseMenuModal} open={open} title={`Request for approval`} />
    </FlexBox>
  )
}

export default RequestNavigation