import React from 'react'
import { FlexBox, FlexBoxInner, Text } from '../../../../components/common/StyledComponent'
import { TbDots } from "react-icons/tb";
import { BsBellFill } from "react-icons/bs";
import NotificationTabNavigation from './NotificationTabNavigation';

const NotificationListComponent = () => {
  return (
    <FlexBox className='mt-5 bg-[#f9f9f9] h-full mx-1 rounded-t-[5px]'>
        <FlexBoxInner className='flex justify-between items-center py-4 bg-[#eeeeee] px-5 rounded-t-[5px]'>
            <Text className='text-black font-semibold font-Poppins flex'>
               <BsBellFill size={20}/> <span className='pl-3'>Notification List</span>
            </Text>
            <TbDots />

        </FlexBoxInner>
        <FlexBoxInner className='flex justify-between items-center py-4 px-5 bg-[#f9f9f9] '>
            <Text className='text-black font-normal font-Poppins text-sm'>112 Notification</Text>
            <div className=''>
                <input 
                    className='input-sm bg-inherit font-Poppins rounded-full px-3'
                    placeholder='search notification'
                />
            </div>
        </FlexBoxInner>
        <FlexBoxInner>
            <NotificationTabNavigation />
        </FlexBoxInner>
    </FlexBox>
  )
}

export default NotificationListComponent