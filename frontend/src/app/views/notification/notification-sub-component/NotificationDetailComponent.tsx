import React from 'react'
import { NotificationAPIResponse } from '../../../models/notification-models'
import { Div, FlexBox, FlexBoxInner, Text } from '../../../../components/common/StyledComponent'
import { IoArrowBackOutline } from "react-icons/io5";
import BottomTooltip from '../../../../components/common/BottomTooltip';
import {format} from 'date-fns'
import TimeAgo from '../../../../components/common/TimeAgo';
import { BsInfoLg } from "react-icons/bs";

interface NotificationDetailInterface {
    handleBackClick: () => void
    selectedNotification: NotificationAPIResponse
}

const NotificationDetailComponent = ({handleBackClick, selectedNotification} : NotificationDetailInterface) => {
  const received_at = selectedNotification.notification_received_at || new Date()
  
  return (
    <FlexBox className='bg-white h-full mx-1 pt-5'>
      <FlexBoxInner className='flex justify-between items-center border-b border-gray-50 px-3'>
        <Div onClick={handleBackClick} className="mb-4 px-2 cursor-pointer text-text-primary rounded-[3px] text-[12px] flex items-center space-x-1 font-Poppins border-[2px] border-text-primary py-[4px] hover:bg-button-primary hover:text-white hover:border-button-primary">
            <IoArrowBackOutline />
            <span>Back</span>
        </Div>
        <Div className='pr-10 flex'>
          <Text className='text-[13px] text-[#333] font-Poppins whitespace-nowrap'>
            {format(received_at, 'MMM, dd yyyy')} {format(received_at, 'HH:MM a')}
          </Text> 
          <Text className='text-[13px] text-[#333] font-Poppins '>
           <TimeAgo timestamp={received_at} className='' />
          </Text> 
        </Div>
      </FlexBoxInner>
      <FlexBoxInner className='pt-5 flex space-x-3 shadow-md h-[80%] px-4'>
        <Div className='flex justify-center items-center w-10 h-10 bg-gray-50 rounded-full'>
          <BsInfoLg size={25} />
        </Div>
        <Div className='flex flex-col gap-1'>
          <div className='flex flex-col'>
              <h2 className="text-[15px] font-semibold font-Poppins">From :<span className='font-normal text-sm pl-1 text-text-primary'>{selectedNotification.notification_sender}</span></h2>
              <h3 className='text-sm'>to: <span></span>you </h3>
          </div>
          <div className='pt-4'>
            <p className='font-Poppins text-sm'>{selectedNotification.notification_message}</p>
            

          </div>


        </Div>


      </FlexBoxInner>
    </FlexBox>
  )
}

export default NotificationDetailComponent