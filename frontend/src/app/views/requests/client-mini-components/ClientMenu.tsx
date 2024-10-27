import React, { useMemo } from 'react'
import { FlexBox, FlexBoxInner, FlexOuterContainer, Div, Text } from '../../../../components/common/StyledComponent'
import { clientMenu as defaultMenu } from '../../../constants/menu-items/client'
import { Link, NavLink } from 'react-router-dom'
import useUtils from '../../../hooks/useUtils'
import { SendRequest } from '../request-mini-components'
import { useGetUnApprovedRequestQuery } from '../../../services/requestAPISlice'
import { NavigationMenuProps } from '../../../../models/common-models'
import { useGetApprovedRequestQuery } from '../../../services/requestAPISlice'

export const ClientMenu = () => {

    const {handleIsOpenCloseMenuModal, open} = useUtils()
    const {data: pendingData, isSuccess: isDashboardSuccess} = useGetUnApprovedRequestQuery()
    const { data: approvedRequestData, isSuccess: isApprovedSuccess } = useGetApprovedRequestQuery({current_state: "approved"})

    const clientMenu: NavigationMenuProps[] = useMemo(() => {
        return defaultMenu.map(menuItem => {
            if(menuItem.label === "Pending Request" && isDashboardSuccess){
                return{
                    ...menuItem,
                    notify: pendingData.length || []
                }
            } else if (menuItem.label === "Approved Request" && isApprovedSuccess) {
                return {
                  ...menuItem,
                  notify: approvedRequestData.length  // Populate with approved request data
                };
              }
            return menuItem
        })
    }, [pendingData, approvedRequestData, isDashboardSuccess, isApprovedSuccess ])


  return (
    <FlexOuterContainer className='w-full border-b pt-5 pb-4 flex justify-between items-center'>
        <FlexBox className='container mx-auto flex space-x-3 divide-x-[1px]'>
            {
                clientMenu?.map((clientmenu, index) => {
                    return(
                        <FlexBoxInner className='flex cursor-pointer font-Poppins text-[13px] text-[#333] text-opacity-60' key={index}>
                            <NavLink to={clientmenu.path || ""} 
                                // className={`pl-2 flex space-x-2 items-center active:text-black }`}
                                className={({isActive}) => [
                                    isActive ? "text-black pl-2 flex space-x-2 items-center relative" : "relative pl-2 flex space-x-2 items-center "
                                ].join("")}
                            >
                                <span className='pr-2 flex'>{clientmenu.icon}</span>{clientmenu.label}
                                    <span className='absolute -top-[15px] left-[55%] flex pl-2 z-30 whitespace-nowrap'>
                                        { 
                                          
                                        
                                                clientmenu.notify ?(
                                                <div className='bg-primary-green rounded-md flex justify-center items-center w-full'>
                                                    <Text className='px-3 text-white text-[10px] font-IBMPlexSans py-[2px]'>
                                                        {clientmenu.notify} New
                                                        
                                                    </Text>
                                                </div>
                                            ): null   
                                        }
                                    </span>
                            </NavLink>
                        </FlexBoxInner>
                    )
                })
            }
        </FlexBox>
        <FlexBox className='pr-20'>
            <Text className='flex cursor-pointer font-Poppins text-[13px] text-[#333] text-opacity-60' onClick={handleIsOpenCloseMenuModal}>New Request</Text>
        </FlexBox>

        <SendRequest handleIsOpenCloseMenuModal={handleIsOpenCloseMenuModal} open={open} title={`Request for approval`} />


    </FlexOuterContainer>
  )
}

export default ClientMenu
