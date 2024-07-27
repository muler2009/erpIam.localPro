import React, {useCallback, useState} from 'react'
import { LuUser2 } from 'react-icons/lu'
import { FlexBox, FlexBoxInner, Text, P } from '../../../../../../components/common/StyledComponent'
import { Link } from 'react-router-dom'
import CreateUserIdentity from '../user-modals/CreateUserIdentity'
import { UserAccountContextProvider } from '../../context/UserAccountContext'

const UserNavigationHeader = () => {

    const [isOpen, setIsOpen] = useState<boolean>(false)
    // const [dropdown, setDropItems] = useState<boolean>(false)
    // const [activeTabIndex, setActiveTabIndex] = useState(0);
    
    // const handleDropdownItemClick = (index: number) => {
    //   setActiveTabIndex(index);
    //   setDropItems(false)
    //   setIsOpen(prevIsOpen => !prevIsOpen);
    // }

    const openCreateIdentity = useCallback(() => { setIsOpen(prev => !prev) }, [isOpen])

  return (
    <FlexBox className='flex justify-between items-start pt-4'>

        <FlexBox className='flex flex-col gap-4 px-2'>
            <FlexBoxInner className='flex space-x-2 items-start'>
                <LuUser2 size={25} className='text-primary-green' />
                <Text className='font-Poppins font-semibold text-2xl '>
                OiAMs | <span className='text-[16px] font-normal'>User Management</span>
                <span className='text-[#333] text-[12px] font-Poppins text-opacity-50 flex flex-col font-normal'>An identity of user with long-term credentials given for the users</span>
                </Text>
            </FlexBoxInner>
        </FlexBox>
        <FlexBox className='flex justify-center items-center divide-x-[1px] space-x-4 mr-10'>
            <h6 className='font-Rubik font-semibold text-sm'>
                <Link to={`/iam`}>Home</Link>
            </h6>
            <FlexBoxInner>
              <button className='btn-sm bg-gray-100 px-5 rounded-[3px] btn-sm text-[12px] ml-4 text-[#333] hover:bg-gray-200 border ring-opacity-50 cursor-pointer' 
                onClick={openCreateIdentity}>
                  Create account
              </button>
            </FlexBoxInner> 
        </FlexBox>

        {
            isOpen && ( 
                <UserAccountContextProvider>
                    <CreateUserIdentity isOpen={isOpen} openCreateIdentity={openCreateIdentity} title="New identity" /> 
                </UserAccountContextProvider>
            )
        }
          
    </FlexBox>
  )
}

export default UserNavigationHeader