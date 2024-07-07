import React, { useState } from 'react'
import { GroupModalPropsInterface } from '../../../../models/group.model'
import { InputWithDesc, ModalBody, ModalContainer, ModalFooter, ModalHeader, ModalWrapper, TextInput } from '../../../../components/reusable'
import { FlexBox, FlexBoxInner, FlexInnerContainer, Text } from '../../../../components/reusable/StyledComponent'
import * as Vsc from 'react-icons/vsc'
import Select from '../../../../components/reusable/Select'
import { useGetAllUsersQuery } from '../../../../features/userAPI'
import { UserAccountInterfacee } from '../../../../models/user.model'
import useGroup from '../groupHooks/useGroup'

const CreateGroup = ({isOpen, handleIsOpenCloseMenu, title}: GroupModalPropsInterface) => {
   const {gernerate_group_abbreviation} = useGroup()
   const [group, setGroup] = useState("")

   const [abbreviateGroup, setAbbreviateGroup] = useState("none")

   const handleUsernameTypeChange =  (event: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>) => {
    const type = event.target.value;
    setAbbreviateGroup(type);
    if (type === 'auto') {
      const generatedUsername = gernerate_group_abbreviation();
      setGroup(generatedUsername)
  };}
  
  const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>) => {
    const group = event.target.value;
    setGroup(group);
  };

    // hook from the UserAPI 
   const {data} = useGetAllUsersQuery() 

    // function is a TypeScript type guard. 
    // Type guards are functions that allow you to determine if a value conforms to a specific type. 
   const isOptionArray = (data: any): data is typeof Option[] => {
    return Array.isArray(data) && data.every(item => 'username' in item);
  }
 
  return (
   <ModalWrapper>
    <ModalContainer className={`w-[40%] mx-auto bg-[#fff] flex flex-col gap-4 relative top-[5%] shadow-2xl border`}>
        <ModalHeader className='flex justify-between items-center px-5 py-3 border-b-[1px]'>
            <Text className='font-Rubik text-black font-semibold text-[15px] text-opacity-50 text-center px-5'>{title}</Text>
            <div className="w-5 h-5 flex justify-center items-center cursor-pointer rounded-full hover:bg-gray-400 hover:text-white" onClick={handleIsOpenCloseMenu}>
                <Vsc.VscClose size={15} />
            </div>
        </ModalHeader>
        <ModalBody className='bg-gray-50 relative h-[70vh]'>
            <FlexInnerContainer className='px-10 pt-5 mx-5'>
                <FlexBox className='flex'>
                    <InputWithDesc 
                        label='Group name'
                        id='username_input'
                        type='text'
                        placeholder='Group Name'
                        className='input-md font-Poppins text-[13px]'
                        name='username'
                        desc='Group name which used to identify the group uniquely from others'
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
                            onChange={handleUsernameTypeChange}  
                            />
                        <Text className='text-[12px] whitespace-nowrap font-Poppins text-[#333] text-opacity-80'>Get Group Abbreviation</Text>
                    </label>  
                    <p className='text-[11px] px-6 text-[#333] text-opacity-60'>Click the radio box to generate the group_abbreviation automatically</p>
                    <div className='ml-5'>
                        <InputWithDesc 
                            id='username_input'
                            type='text'
                            placeholder='Custom Username'
                            className='input-md font-Poppins text-[13px] w-[50%]'
                            name='group'
                            value={group}
                            onChange={handleUsernameChange}
                            disabled={abbreviateGroup === 'auto'}
                            desc='example: AC000'
                        /> 
                    </div>
                </FlexBox>
                <FlexBox>
                    <TextInput 
                        label='Description'
                        id='description_text'
                        type='text'
                        placeholder=''
                        className='input-md font-Poppins text-[13px]'
                        rows={5}
                        desc={`description about the group but optional`}
                        name='group_description'
                    
                    /> 

                </FlexBox>
            </FlexInnerContainer>
            <FlexInnerContainer className='px-10 pt-5 mx-5 border-t'>
                <FlexBox className='flex space-x-4 pt-4'>
                    <FlexBoxInner className='flex-grow'>
                        <Select title='Available users' options={isOptionArray(data) ? data : []} />
                    </FlexBoxInner>
                    <FlexBoxInner className='flex-grow'>
                        <Select title='Members'  options={[]} />
                    </FlexBoxInner>
                </FlexBox>       
            </FlexInnerContainer>
        </ModalBody>
        <ModalFooter className='px-4 py-4 flex justify-end space-x-3 border-t'>
            groups
        </ModalFooter>
    </ModalContainer>
   </ModalWrapper>
  )
}

export default CreateGroup






{/* <InputWithDesc 
label='Group Abbreviation'
id='group_abbreviation_input'
type='text'
placeholder='Group Abbreviation'
className='input-md font-Poppins text-[13px]'
name='group_abbreviation'
desc={`Group abbreviation starts with the first two letters of the groupname followed by number example: AC001`}
/> */}