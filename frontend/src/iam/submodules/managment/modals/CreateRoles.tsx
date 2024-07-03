import React from 'react'
import { CreateRoleI } from '../../../models/role.models';
import * as Vsc from 'react-icons/vsc'
import { Input } from '../../../components/reusable';
import {ModalBody, ModalHeader, ModalFooter} from '../../../components/reusable';
import useRoles from '../../../hooks/useRoles';
import { useCreateRolesMutation } from '../../../features/roleAPI';

const CreateRoles = ({isOpen, setIsOpen, title}: CreateRoleI) => {
    const { roleState, handleRoleCreationInputChange, clearInputs } = useRoles()
    const cancelButtonClicked = (event: React.MouseEvent<HTMLButtonElement>) => {
        setIsOpen(prevState => !prevState)
    }

    
    const [createRoles, {error}] = useCreateRolesMutation()

    const onSaveClicked = async (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        try {
          const response = await createRoles(roleState).unwrap();
          if(response?.status === 201){
            setIsOpen(prev => !prev)
          }
        console.log(`response: ${response?.status}`)
        setIsOpen(false)
        } catch (error) {
          console.log(error);
        }
      }
      

    return isOpen ? (
        <div className="bg-black bg-opacity-5 inset-0 fixed top-0 z-50 font-Poppins">
            <div className={`w-[40%] mx-auto bg-[#fff] flex flex-col gap-4 relative border-[1px] top-[8%] shadow-xl rounded-t-[5px] border-gray-200`}>
                <ModalHeader className='flex justify-between items-center px-5 py-3 border-b-[1px] bg-[#f5f5f5] rounded-t-[5px]'>
                    <h1 className='font-Rubik text-[17px] text-black text-opacity-50 text-center'>
                        {title}
                    </h1>
                    <div className="w-5 h-5 flex justify-center items-center cursor-pointer rounded-full hover:bg-red-400 hover:text-white" 
                        onClick={() => setIsOpen(prevState => !prevState)}>
                        <Vsc.VscClose size={17} />
                    </div>
                </ModalHeader>
                <ModalBody className='mx-5 mb-5'>
                    <Input 
                        id= 'role_name_input'
                        type='text'
                        name="role_name"
                        placeholder='Role Name'
                        label='Role Name'
                        className={`input-md text-[13px] focus:outline-none focus:border-inherit `}
                        value={roleState.role_name}
                        onChange={handleRoleCreationInputChange}
                    />
                </ModalBody>
                <ModalFooter className="px-4 py-4 border-t">
                    <div className='mx-5 flex space-x-3'>
                        <button className='px-5 bg-[#005bb3] text-slate-200 text-sm disabled:bg-gray-50'
                                onClick={onSaveClicked}
                        >Save</button>
                        <button 
                            className='px-5 text-[#333] text-sm border-[1px] border-gray-500 border-opacity-40 disabled:bg-gray-50'
                            onClick={(event) => cancelButtonClicked(event)}
                        >
                            Cancel
                        </button>

                    </div>
                </ModalFooter>
            </div>
        </div>
      ) : null;
}


export default CreateRoles
