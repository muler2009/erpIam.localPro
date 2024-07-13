import React, { useCallback, useState } from 'react'
import * as LuIcons from 'react-icons/lu'
import * as IoIcons  from "react-icons/io5";
import { groupsDropdown } from '../../constants/groups';
import CreateGroups from '../../modals/CreateGroups';
import GroupList from './GroupList';
import { FlexBox, FlexBoxInner, FlexInnerContainer, FlexOuterContainer, P, Text } from '../../../../components/reusable/StyledComponent';
import CreateGroup from '../group-modal/CreateGroup';
import { MdGroups } from "react-icons/md";
import { GroupCreateContextProvider } from '../context/GroupCreateContext';

const GroupManagementDashboard = () => {
 
  // A state for handling the modal i.e. opening and closing 
  const [isOpen, setIsOpen] = useState<boolean>(false) 
  // a dropdown event handler state  
  const [dropdown, setDropItems] = useState<boolean>(false)

  const [activeTabIndex, setActiveTabIndex] = useState(0);

  // const {data: subgroup =[]} = useGetSubGroupsQuery()
  
  const handleDropdownItemClick = (index: number) => {
    setActiveTabIndex(index);
    setDropItems(false)
    setIsOpen(prevIsOpen => !prevIsOpen);
  }

  const handleIsOpenCloseMenu = useCallback(() => {setIsOpen(prevOpen => !prevOpen)}, [isOpen])



  return (
    <>
      <FlexOuterContainer className='bg-[#f9fafb] bg-opacity-60 h-full flex flex-col'>
        <FlexInnerContainer className='flex justify-between items-end'>
          <FlexBox className='px-10 font-Rubik mt-3 w-1/2'>
              <Text className='font-[600] text-[20px] text-[#333] '>Group Setup</Text>
              <p className='text-[13px] text-[#333] text-opacity-50'>Setup a major group where later you can add users in it</p>
          </FlexBox>
          <FlexBox className='mr-10 mt-3 divide-x-[1px] divide-black'>
            <FlexBoxInner className='flex justify-start items-center space-x-3 cursor-pointer'>
              <button className='border btn-sm rounded-[2px] bg-[#f9f9f9] px-3 py-2 text-[14px]'>
                <LuIcons.LuRefreshCw />
              </button>
              <div className='relative z-20 cursor-pointer'>
                <div className={`px-2 py-1.5 bg-gray-100 text-[#333] hover:bg-gray-200 rounded-[3px]
                   ${dropdown ? 'bg-opacity-70 text-[#333] transition duration-500 ease-in-out rounded-[2px]': 'text-gray-500'}`}  onClick={() => setDropItems(prevState => !prevState)}>
                    <Text className={`text-[12px] font-Poppins flex items-center px-2`}>
                      <span className='pr-2'><MdGroups size={20} /></span>
                      Actions
                      {/* <span className='pl-2'>{ isOpen ? <IoIcons.IoCaretBackSharp size={13} /> : <IoIcons.IoCaretForwardSharp size={13} /> } </span> */}
                    </Text>
                </div>
                
                {
                  dropdown && (
                    <div className='w-[200px] bg-white flex flex-col absolute top-9 right-0 shadow-lg cursor-pointer pb-2 pt-3 z-10 border transition duration-500 ease-in-out'>
                      {
                        groupsDropdown?.map((group, index) => (
                          <>
                            <div key={index} className="px-2 py-2 font-Poppins text-[12px] hover:bg-gray-50 hover:bg-opacity-50 hover:text-black hover:text-opacity-50" onClick={() => handleDropdownItemClick(index)} >
                              <div className='mr-3 flex items-center'>
                                  <span className='mr-1'>{group.icon}</span>
                                  {group.label}
                              </div>
                            </div>     
                          </>
                      ))}
                    </div>
                  )
                }     
              </div>
            </FlexBoxInner>
          </FlexBox>      
        </FlexInnerContainer>
        <FlexInnerContainer className='bg-[#ffffff] mx-2 my-5 shadow-sm h-full px-3 flex'>
          <FlexBox className='flex-grow px-2'>
            <GroupList />
          </FlexBox>
          <FlexBox className='w-1/5 border-l flex-wrap'>
            <h1 className=' text-wrap px-5 font-Poppins text-sm text-justify'>Add a New User</h1>
          </FlexBox>
        </FlexInnerContainer>
      </FlexOuterContainer>

      <GroupCreateContextProvider>
        { isOpen && groupsDropdown[activeTabIndex].abbrevation === 'NEW_GROUP' && ( <CreateGroup isOpen={isOpen} handleIsOpenCloseMenu={handleIsOpenCloseMenu} title="Creating New group" /> ) }

      </GroupCreateContextProvider>
    
      {/* { isOpen && groupsDropdown[activeTabIndex].abbrevation === 'EDIT_GROUP' && ( <CreateUserAccount1 isOpen={isOpen} setIsOpen={setIsOpen} title="For the notofivation" /> ) } */}
    </>
  )
}

export default GroupManagementDashboard
