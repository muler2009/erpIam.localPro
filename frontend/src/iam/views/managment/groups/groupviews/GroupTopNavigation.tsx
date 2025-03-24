import React, {useState, useCallback} from 'react'
import * as LuIcons from 'react-icons/lu'
import { FlexInnerContainer, FlexBox, Text, FlexBoxInner } from '../../../../components/reusable/StyledComponent'
import { groupsDropdown } from '../../constants/iam-menu-items/groups'
import { MdGroups } from "react-icons/md";
import { GroupCreateContextProvider } from '../context/GroupCreateContext';
import CreateGroup from '../group-modal/CreateGroup';
import * as RxIcons from "react-icons/rx";

const GroupTopNavigation = () => {
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
    <div className='flex justify-between items-center pt-4 pb-3 px-4 bg-gradient-to-b mx-1 from-white to-gray-100'> 
        <div className='flex space-x-2 items-start'>
            <MdGroups size={25} className='text-primary-green' />
            <Text className='font-Poppins font-semibold text-2xl'>
              IAMs | <span className='text-[14px] font-normal text-primary-green'>Group Setup</span>
                <p className='text-[13px] text-[#333] text-opacity-50 font-normal -mt-2'>Setup a major group where later you can add users in it</p>
            </Text>
        </div>
        <div className='mr-10 mt-3 divide-x-[1px] divide-black'>
            <div className='flex justify-start items-center space-x-3 cursor-pointer'>
                <div className='relative z-20 cursor-pointer'>
                    <div className={`px-2 py-1.5 bg-text-primary text-white rounded-[3px] border ${dropdown ? 'bg-opacity-70 text-[#333] transition duration-500 ease-in-out rounded-[2px]': 'text-gray-500'}`}  onClick={() => setDropItems(prevState => !prevState)}>
                        <Text className={`text-[12px] font-Poppins flex items-center px-2 py-1`}>
                           Group actions <span className='pl-5'> {dropdown ? <RxIcons.RxCaretUp />: <RxIcons.RxCaretDown /> } </span>
                        </Text>
                    </div>
                    {
                        dropdown && (
                            <div className='w-[200px] bg-white flex flex-col absolute top-10 right-0 shadow-lg cursor-pointer pb-2 pt-3 z-10 border transition duration-500 ease-in-out'>
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
            </div>
        </div>      

        <GroupCreateContextProvider>
            { 
                isOpen 
                && groupsDropdown[activeTabIndex].abbrevation === 'NEW_GROUP' && ( 
                    <CreateGroup isOpen={isOpen} handleIsOpenCloseMenu={handleIsOpenCloseMenu} title="Creating New group" /> 
                ) 
            }
        </GroupCreateContextProvider>

    </div>
  )
}

export default GroupTopNavigation