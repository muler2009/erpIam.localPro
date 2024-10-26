import React, {useState} from 'react'
import { userTabLink } from '../../../constants/iam-menu-items/account';
import { useGetAllUsersQuery } from '../../../../../features/userAPI';
import { Div, FlexBox, FlexBoxInner, Text } from '../../../../../../components/common/StyledComponent';
import UserActionDropDownComponent from './UserActionDropDownComponent';
import useCommonUtils from '../../../../../../hooks/useCommonUtils';
import AccountDeactivationComponent from '../user-modals/AccountDeactivationComponent';


const UserTabNavigation = () => {
    const {data} = useGetAllUsersQuery()
    const [activeTabIndex, setActiveTabIndex] = useState<number>(0);  
    const {handleIsOpenCloseMenuModal, open} = useCommonUtils()
    const changeTabIndex = (index: number): void => {
        setActiveTabIndex(index)
      }
  
    return ( 
      
        <FlexBox className='relative w-full font-Poppins text-[14px] pt-3'>
          <FlexBoxInner className='flex justify-between items-center border-b'>
            <Div className='flex justify-start items-center space-x-1 flex-grow  px-5 pt-4 pb-2'>
              {
                userTabLink?.map((roleTab, index) => (
                    <Div key={index} onClick={() => changeTabIndex(index)} className={`relative cursor-pointer px-1 py-[6px] rounded-[4px] ${activeTabIndex === index && "bg-text-primary text-white px-3 duration-500 transition ease-in-out"}`}>
                      <Div className={`flex justify-start items-center space-x-2 whitespace-nowrap`}>
                        <Text className='text-[13px]'>{roleTab.label}</Text>
                        <span>
                            {
                                roleTab.total && ( 
                                    <Div className={`${activeTabIndex === index ? 'relative w-4 h-4 rounded-full bg-[#fff] text-text-primary flex justify-center items-center' : 'hidden w-4 h-4 rounded-full bg-gray-200 text-white'}`}>
                                        <p className='text-[12px]'>{data?.length}</p>
                                    </Div>
                                )
                            }

                        </span>
                      </Div>
                    </Div>
                ))
              }
            </Div>  
            <Div className="pr-2 flex space-x-3">

                <div className='bg-text-primary text-[12px] text-[#fff] flex items-center py-2 px-5 rounded-[3px] cursor-pointer relative' onClick={handleIsOpenCloseMenuModal}>
                  <p>
                    Deactivate/ Activate
                  </p>
                </div>
                <UserActionDropDownComponent />
            </Div>               

          </FlexBoxInner>
          
          <FlexBoxInner className="mx-1 my-2 bg-white">
            {
              userTabLink[activeTabIndex].tabContent
            }
          </FlexBoxInner> 

          <AccountDeactivationComponent 
            open={open}
            handleIsOpenCloseMenuModal={handleIsOpenCloseMenuModal}
            title={`Account deactivation`}
          
          />

        </FlexBox>
         
    )
}

export default UserTabNavigation
