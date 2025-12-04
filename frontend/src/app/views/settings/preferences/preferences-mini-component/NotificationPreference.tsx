import React, { useState } from 'react'
import { FlexBox, FlexBoxInner, Div, Text } from '../../../../../components/common/StyledComponent'
import { Link, Outlet } from 'react-router-dom'
import { GetAllNotificationTemplate } from '../../../../../iam/views/managment/setting/setting-mini-components';
import NotificationPreferenceSetUpComponent from './NotificationPreferenceSetUpComponent';
import { IoArrowBackSharp } from "react-icons/io5";
import { GrConfigure } from "react-icons/gr";
import AllNotificationPrefencesComponent from './AllNotificationPrefencesComponent';

const NotificationPreference = () => {
    const [select, setSelect] = useState<null | boolean>(null);
    
  return (
    <FlexBox className='px-5 pt-4'>
        <FlexBoxInner className='flex space-x-3 items-center border-b pb-2 divide-x-[1px]'>
            <div className={`w-8 h-8 flex justify-center items-center rounded-full ${select ? 'bg-button-primary text-white border-[2px] border-button-primary': 'bg-gray-300 cursor-default'}`} 
                onClick={() => setSelect(null)}>
                {
                    IoArrowBackSharp({
                        size:15
                    })
                }
            </div>
            <Div className={`px-3 py-1 rounded-[3px] ${select ? ' text-black cursor-pointer': 'cursor-pointer text-[#333] text-opacity-80'}`}>
                <Text className='flex justify-end items-center text-[12px]' onClick={() => setSelect(true)}>
                    {
                        GrConfigure({
                            size:15
                        })
                    }
                    
                    <span className='pl-2'>Configure preference</span>
                </Text>
            </Div>
           

        </FlexBoxInner>
        <FlexBoxInner className='h-full'>
            {
                select ? <NotificationPreferenceSetUpComponent setSelect={setSelect} /> : <AllNotificationPrefencesComponent />
            }

        </FlexBoxInner>

       
       

    </FlexBox>
  )
}

export default NotificationPreference