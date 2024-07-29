import React from 'react'
import { ModalContainer, ModalWrapper, ModalHeader, ModalBody, InputWithDesc, TextInput, ModalFooter } from '../../../../components/reusable'
import * as Vsc from 'react-icons/vsc'
import { RoleModalPropsInterface } from '../../../../models/role.models'
import { FlexBox, FlexBoxInner } from '../../../../components/reusable/StyledComponent'
import * as GrIcons from 'react-icons/gr'
import CustomSelect from '../../../../components/reusable/CustomSelect'



const options: {label: string}[] = [
  {label: "active"},
  {label: "inactive"},
  {label: "deprecated"}

]

const AddRole = ({onRequestClose, title, isOpen, link_identifier}: RoleModalPropsInterface) => {
  console.log(`AddRole isOpen: ${isOpen}, title: ${title}, link_identifier: ${link_identifier}`);

  return (
    <ModalContainer className={`w-[30%] mx-auto bg-[#fff] flex flex-col relative top-[6%] shadow-2xl rounded-t-md`} >
        <ModalHeader className='flex justify-between items-center px-5 py-3 border-b'>
            <h1 className='font-Poppins text-black font-semibold text-[15px] text-opacity-50 text-center px-5'>{title}</h1>
            <div className="w-5 h-5 flex justify-center items-center cursor-pointer rounded-full hover:bg-gray-400 hover:text-white" onClick={onRequestClose}>
                <Vsc.VscClose size={15} />
            </div>
        </ModalHeader>
        <ModalBody>
            <FlexBox className='px-5 pt-4 flex flex-col gap-3 relative'>
              <InputWithDesc 
                label='Role name *'
                id= 'role_name'
                type='text'
                placeholder='Role name'
                name='role_name'
                className='input-md font-Poppins text-[13px]'
                desc='Name of the user'
                // value={userData?.first_name}
                // onChange={handleUserIdentityCreationInputChanges}
              />

              <FlexBoxInner className='flex space-x-3'>
                  <InputWithDesc 
                    label='Role name *'
                    id= 'role_name'
                    type='text'
                    placeholder='Role name'
                    name='role_name'
                    className='input-md font-Poppins text-[13px]'
                    desc='Name of the user'
                    // value={userData?.first_name}
                    // onChange={handleUserIdentityCreationInputChanges}
                  />

                  <CustomSelect 
                    label="role_status"
                    name='role_status'
                    options={options}
                    
                  
                  />
              

              </FlexBoxInner>
              <TextInput
                id='role_description'
                type='text'
                name='role_descroption'
                desc='description about the role'
                placeholder='sos'
                className='input-md'
                rows={4}
              />
            </FlexBox>
        </ModalBody>

          <ModalFooter className='px-4 py-4 flex justify-end space-x-3 border-t'>
              <div className="flex justify-end space-x-5 pr-5 ">
                  <button className={`btn-sm text-[12px] px-3 py-1 border rounded-[3px] text-[#333] hover:bg-green-600 hover:text-white transition duration-500 ease-in-out`}>
                      <div className='flex justify-start items-center'>
                          <GrIcons.GrFormPrevious  size={15}/>
                          <p className='font-Poppins text-[13px]'>Cancel</p>
                      </div>
                  </button>

                  <button  className={`btn-sm text-[12px] px-3 py-1 border rounded-[3px] hover:bg-green-600 hover:text-white transition duration-500 ease-in-out`}>
                      <div className='flex justify-start items-center '>
                          <p className='font-Poppins text-[13px]'>Create Role</p>
                          <GrIcons.GrFormNext size={15} />
                      </div>
                  </button>

              </div>
          </ModalFooter>
    </ModalContainer>
  )
}

export default AddRole