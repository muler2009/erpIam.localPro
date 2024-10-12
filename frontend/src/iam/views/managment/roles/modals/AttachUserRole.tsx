import React from 'react'
import * as BiIcons from 'react-icons/bi'
import * as IoIcons from 'react-icons/io5'
import { FlexBox, Text, FlexBoxInner } from '../../../../components/reusable/StyledComponent'
import Select from '../../../../components/reusable/Select'
import Tooltip from '../../../../components/reusable/Tooltip'
import { useGetAllUsersQuery } from '../../../../features/userAPI'
import useRoleContextProps from '../context/useRoleContextProps'


const AttachUserRole = () => {

  const { data } = useGetAllUsersQuery()
  const { 
    isOptionArray,
    handleSelectionChange,
    membersOfGroup,
    handleRemoveMember,
    handleStoreToMembersClick,
    handleBackButtonClick
  } = useRoleContextProps()

  return (
   <FlexBox className='px-5 pt-4 relative'>
        <Text className='font-semibold  text-[15px] after:content-[""] after:absolute after:h-[1px] after:bg-gray-200 after:w-[75%] after:top-7 after:right-8'>
          Attach user to Role
        </Text>
        <FlexBox className='pt-3'>
          <FlexBox className='flex space-x-4 pt-4'>
            <FlexBoxInner className='w-1/2'>
                <Select 
                    title='Available users' 
                    options={isOptionArray(data) ? data : []} 
                    onChange={handleSelectionChange} 
                />
            
            </FlexBoxInner>
            <FlexBoxInner className='w-1/2'>
                <Select 
                    title='Members attached to the Role'  
                    options={membersOfGroup} 
                    onChange={(option) => handleRemoveMember(option)}  
                />
            </FlexBoxInner>
          </FlexBox>
            <FlexBox className={`flex justify-between items-center space-x-3 pt-5`}>
                <Tooltip content={`Select user`}>
                    <button onClick={handleStoreToMembersClick} className={`flex items-center border px-2 btn-sm`}>
                        <IoIcons.IoAdd size={20} />
                        <span className='pl-1'>
                            <Text className='text-[12px]'>Attach user to role</Text>
                        </span>
                    </button>
                </Tooltip>
                <Tooltip content={`Undo the user`}>
                    <button onClick={handleBackButtonClick} className={`flex items-center border px-2 btn-sm`}>
                        <BiIcons.BiUndo size={20}/>
                        <span className='pl-1'>
                            <Text className='text-[12px]'>Undo</Text>
                        </span>
                    </button>
                </Tooltip>
            </FlexBox>       

        </FlexBox>
   </FlexBox>
  )
}

export default AttachUserRole