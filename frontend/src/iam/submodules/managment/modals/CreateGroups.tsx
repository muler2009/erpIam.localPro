import React from 'react';
import * as Vsc from 'react-icons/vsc';
import { ModalBody, ModalContainer, ModalFooter, ModalHeader, ModalWrapper, Input, InputWithDesc } from '../../../components/reusable'
import CreateGroupForm from '../groups/groupviews/CreateGroupForm';
import useGroup from '../groups/groupHooks/useGroup';
import { useCreateGroupsMutation } from '../../../features/groupsAPI';

export interface CreateGroupsProps  {
    isOpen: boolean,
    title: string,
    handleIsOpenCloseMenu: () => void
}

const CreateGroups = ({isOpen,title, handleIsOpenCloseMenu}: CreateGroupsProps) => {

   const { groupData, canSave, handleGroupInputChange } = useGroup()
   const [createGroups] = useCreateGroupsMutation()

   const onSaveClicked = async (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        try {
            const response = await createGroups(groupData).unwrap();
            if(response?.status === 201){
                // setIsOpen(prev => !prev)
                handleIsOpenCloseMenu()
        }
        console.log(`response: ${response?.status}`)
        //  setIsOpen(false)
        } catch (error) {
        console.log(error);
        }
  }
  

  return (
    isOpen ? (
        <ModalWrapper >
            <ModalContainer className={`w-[40%] mx-auto bg-[#fff] flex flex-col relative top-[5%] shadow-2xl rounded-[5px]`}>
                <ModalHeader className='flex justify-between items-center px-5 py-3 border-b-[1px] bg-[#efefef] bg-opacity-50 font-Poppins'>
                    <h1 className='font-Rubik text-[17px] text-black text-opacity-50 text-center px-5'>
                        {title}
                    </h1>
                    <div className="w-5 h-5 flex justify-center items-center cursor-pointer rounded-full hover:bg-red-400 hover:text-white" onClick={handleIsOpenCloseMenu} > 
                        <Vsc.VscClose size={15} />
                    </div>
                </ModalHeader>
                    <form className='' onSubmit={(e) => e.preventDefault()}>
                        <ModalBody className='flex flex-col gap-5 pb-5 pt-4 w-[80%] mx-auto'>
                            <InputWithDesc 
                                label='Group Abbreviation *'
                                id= 'groupid_input'
                                type='text'
                                placeholder='Group Abbreviation'
                                name='custom_group_abbreviation'
                                className='input-md font-Poppins text-[13px]'
                                desc='provide an abbreviation: GRP001'
                                value={groupData.group_abbreviation}
                                onChange={handleGroupInputChange}
                            />
                            <InputWithDesc 
                                label='Group Name *'
                                id= 'groupname_input'
                                type='text'
                                placeholder='Name '
                                name='custom_group_name'
                                className='input-md font-Poppins text-[13px]'
                                label_description='Enter a meaningful name to identify the group'
                                desc="Manimum 100 character. Don't use special charachers '+, $,#,% ...'"
                                value={groupData.group_name}
                                onChange={handleGroupInputChange}
                            />

                            <div className='flex flex-col '>
                                <label htmlFor="has_sub_group_input" className='flex items-center justify-start gap-2 cursor-pointer'>
                                    <input 
                                        id="recruitment_related_input" 
                                        type="checkbox" 
                                        className="w-4 h-4 " 
                                        name='has_sub_group' 
                                        checked={groupData?.has_sub_group || false}// Make sure this is bound to state
                                        onChange={handleGroupInputChange}
                                    />
                                    <h1 className='whitespace-nowrap text-[13px] whitespace-wrap font-Rubik text-[#333] text-opacity-80'>Add Subgroup</h1>
                                </label>
                                <p className="text-[12px] text-[#333] text-opacity-50">check the box if the group being created has sub-groups</p>
                            </div>

                            <div className=''>
                                {
                                    groupData?.has_sub_group ? (
                                        <div className='flex space-x-5'>
                                            <InputWithDesc 
                                                label='Sub Group Name *'
                                                id= 'sub_groupname_input'
                                                type='text'
                                                placeholder='Sub Group name '
                                                name='sub_group_name'
                                                className='input-md font-Poppins text-[13px]'
                                                
                                                desc="Manimum 100 character. Don't use special charachers '+, $,#,% ...'"
                                                // value={groupData?.sub_group_name}
                                                // onChange={handleGroupInputChange}
                                            />
                                            <InputWithDesc 
                                                label='SubGroup Abbreviation *'
                                                id= 'groupname_input'
                                                type='text'
                                                placeholder='Abbreviation'
                                                name='sub_group_abbreviation'
                                                className='input-md font-Poppins text-[13px]'
                                                desc='provide an abbreviation: SuGRP001'
                                                // value={groupData?.sub_group_abbreviation}
                                                // onChange={handleGroupInputChange}
                                            />
                                        </div>
                                    ) : null
                                }
                            </div>

                        </ModalBody>
                        <ModalFooter className='flex justify-start px-20 pt-3 pb-5 border-t space-x-3'>
                            <button className={`bg-opacity-70 bg-green-500 hover:bg-green-600 px-5 py-1 btn-sm text-white disabled:bg-gray-100`}
                                disabled={!canSave}
                                onClick={onSaveClicked}
                                >Save</button>
                            <button className='bg-opacity-70 bg-red-500 hover:bg-red-600 px-5 py-1 btn-sm text-white disabled:cursor-default disabled:bg-gray-100' disabled={!canSave}>Clear</button>
                        </ModalFooter>
                    </form>        
            </ModalContainer>
        </ModalWrapper>

    ): null
      
    
  )
}

export default CreateGroups
