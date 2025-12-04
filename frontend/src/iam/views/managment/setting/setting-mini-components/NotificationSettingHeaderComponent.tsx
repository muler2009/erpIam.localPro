import React from 'react'
import { Link } from 'react-router-dom'
import { FlexBox, FlexBoxInner, Div, Text} from '../../../../../components/common/StyledComponent'
import { LuUser } from 'react-icons/lu'
import TabNavigation from '../../../../../app/components/common/TabNavigation'
import { userTabLink } from '../../constants/iam-menu-items/account'
import { notificationSettingTab } from '../../constants/iam-menu-items/setting'
import useUtils from '../../../../../app/hooks/useUtils'
import { IoAddCircle } from "react-icons/io5";
import { CreateNewTemplateModalComponent } from '../setting-modals'

const NotificationSettingHeaderComponent = () => {

    const { open, handleIsOpenCloseMenuModal } = useUtils()


  return (
    <>
        <FlexBox className='flex justify-between items-start py-4 px-4 bg-gradient-to-b mx-1 bg-gray-100 border-b'>
            <FlexBoxInner className='flex flex-col gap-4 px-2'>
                <Div className='flex space-x-2 items-start'>
                    { LuUser({size: 25, className: 'text-primary-green'}) }
                    
                    <Text className='font-Poppins font-semibold text-2xl '>
                        Setting | <span className='text-[16px] font-normal'>Notification</span>
                    </Text>
                </Div>
            </FlexBoxInner>
            <FlexBox className='flex justify-center items-center divide-x-[1px] space-x-4 mr-10'>
                <Div className='flex items-center font-Poppins hover:bg-text-primary hover:text-white bg-gray-100 px-3 rounded-[3px] py-2 text-[13px] ml-4 text-[#333] border-[1px] border-text-primary ring-opacity-50 cursor-pointer' onClick={handleIsOpenCloseMenuModal}>
                   {
                    IoAddCircle({size: 18})
                   } 
                   <span className='pl-1'>New Template</span> 
                </Div>
            </FlexBox>
        </FlexBox>

        <FlexBox className='fle space-x-3 h-full'>
            <FlexBoxInner className='w-1/2 bg-gray-50 shadow-md h-full m-1 border'>
                <TabNavigation 
                    tabs={notificationSettingTab} 
                    className={`relative cursor-pointer px-3 border-button-primary border-opacity-55`} 
                    activeTab='border-b-[2px] pb-[5px]'
                />
            </FlexBoxInner> 
        </FlexBox>


        <CreateNewTemplateModalComponent 
            title={`Template Creation Wizard`}
            open={open}
            handleIsOpenCloseMenuModal={handleIsOpenCloseMenuModal}
        />

    </>
          
  )
}

export default NotificationSettingHeaderComponent