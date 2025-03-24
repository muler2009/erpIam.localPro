import React, {useState} from 'react'
import { userTabLink } from '../../../constants/iam-menu-items/account';
import { useGetAllUsersQuery } from '../../../../../features/userAPI';
import { Div, FlexBox, FlexBoxInner, Text } from '../../../../../../components/common/StyledComponent';
import UserActionDropDownComponent from './UserActionDropDownComponent';
import useCommonUtils from '../../../../../../hooks/useCommonUtils';
import AccountDeactivationComponent from '../user-modals/AccountDeactivationComponent';
import * as MdIcons from "react-icons/md";


const UserTabNavigation = () => {
    const [activeTabIndex, setActiveTabIndex] = useState<number>(0);  
    const changeTabIndex = (index: number): void => {
        setActiveTabIndex(index)
      }
  
    return ( 
      <FlexBox className='relative w-full font-Poppins text-[14px] pt-3'>
          <div className='flex justify-start items-center space-x-1 flex-grow border-b pt-2 px-2 cursor-pointer'>
            {
              userTabLink?.map((userTab, index) => (
                <div key={index} onClick={() => changeTabIndex(index)}  className={`relative py-[6px] ${activeTabIndex === index ? 'pb-1 border-b-[2px] border-black' : ''}`}>
                    <div className={`flex justify-start items-center space-x-2 whitespace-nowrap pb-1 px-2 ${activeTabIndex === index ? 'text-text-primary' : 'text-[#333] text-opacity-70'}`}>
                      <span>{userTab.icon}</span>
                      <Text className={`text-[13px]`}>
                        {userTab.label}
                      </Text>
                    </div>
                  </div>
              ))
            }
          </div>      
          <FlexBoxInner className="mx-1 my-2 bg-white">
            {userTabLink[activeTabIndex].tabContent}
          </FlexBoxInner> 
      </FlexBox>
    )
}

export default UserTabNavigation
