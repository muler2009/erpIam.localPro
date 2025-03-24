import React, {useState} from 'react'
import { FlexOuterContainer, FlexInnerContainer, FlexBox, Text, FlexBoxInner } from '../../../../components/reusable/StyledComponent'
import { InputWithDesc, TextInput } from '../../../../components/reusable'
import Select from '../../../../components/reusable/Select'
import useGroupContext from '../context/useGroupContext'
import Tooltip from '../../../../components/reusable/Tooltip'
import { useGetAllUsersQuery } from '../../../../features/userAPI'
import * as IoIcons from "react-icons/io5";
import * as BiIcons from "react-icons/bi";


const GroupDetailComponent = () => {

    const {
        abbreviateGroup, 
        groupData, 
        handleAutomaticallyTypeChange, 
        handleGroupAttributesChange, 
        handleGroupAutoChange,
        isOptionArray,
        handleBackButtonClick,
        handleSelectionChange,
        handleStoreToMembersClick,
        membersOfGroup,
        selectedOption,
        handleRemoveMember
    } = useGroupContext()

   // hook from the UserAPI 
   const {data} = useGetAllUsersQuery() 

  return (
    <FlexOuterContainer className='flex flex-col px-5'>
          <FlexInnerContainer className='px-10 pt-5 mx-5'>
                <FlexBox className='flex'>
                    <InputWithDesc 
                        label='Group name'
                        id='username_input'
                        type='text'
                        placeholder='Group Name'
                        className='input-md font-Poppins text-[13px]'
                        name='group_name'
                        desc='Group name which used to identify the group uniquely from others'
                        value={groupData?.group_name}
                        onChange={handleGroupAttributesChange}
                    />
                </FlexBox>
                <FlexBox className='flex flex-col my-5'>
                    <label className='flex items-center justify-start space-x-2 cursor-pointer'>
                        <input 
                            type="radio" 
                            name='abbreviateGroup'
                            value="auto"
                            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" 
                            checked={abbreviateGroup === 'auto'} 
                            onChange={handleAutomaticallyTypeChange}  
                            />
                        <Text className='text-[12px] whitespace-nowrap font-Poppins text-[#333] text-opacity-80'>Get Group Abbreviation</Text>
                    </label>  
                    <p className='text-[11px] px-6 text-[#333] text-opacity-60'>Click the radio box to generate the group_abbreviation automatically</p>
                    <div className='ml-5'>
                        <InputWithDesc 
                            id='group_abbreviation_input'
                            type='text'
                            placeholder='Group Abbreviation'
                            className='input-md font-Poppins text-[13px] w-[50%]'
                            name='group_abbreviation'
                            value={groupData?.group_abbreviation}
                            onChange={handleGroupAutoChange}
                            disabled={abbreviateGroup === 'auto'}
                            desc='example: AC000'
                        /> 
                    </div>
                </FlexBox>
            </FlexInnerContainer>
            <FlexInnerContainer className='px-10 pt-1 mx-5 relative'>
                <Text className='font-semibold text-[#26cc86] text-[15px] after:content-[""] after:absolute after:h-[1px] after:bg-gray-200 after:w-[80%] after:top-6 after:right-3'>Attach user to Group</Text>
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
                            title='Members'  
                            options={membersOfGroup} 
                            onChange={(option) => handleRemoveMember(option)}  
                        />
                    </FlexBoxInner>
                </FlexBox>
                <FlexBox className={`flex justify-between items-center space-x-3 pt-2`}>
                    <Tooltip content={`Select user`}>
                        <button onClick={handleStoreToMembersClick} className={`flex items-center border px-2 btn-sm`}>
                            <IoIcons.IoAdd size={20} />
                            <span className='pl-1'>
                                <Text className='text-[12px]'>Add Users to Group</Text>
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
            </FlexInnerContainer>
    </FlexOuterContainer>
  )
}

export default GroupDetailComponent