import React from 'react'
import { UserActionMenuItemsProps, UserModalActionInterface } from '../../../../../models/user.model'
import { ModalContainer, ModalHeader, ModalBody, ModalFooter, ModalWrapper } from '../../../../../components/reusable'
import * as Vsc from 'react-icons/vsc'
import { FlexBoxInner, FlexBox } from '../../../../../../components/common/StyledComponent'
import useDeactivation from '../../../constants/columns/useDeactivation'
import UserTable from '../../../../../components/Table/UserTable'
import { useGetAllUsersQuery } from '../../../../../features/userAPI'
import PolicyTable from '../../../../../components/Table/PolicyTable'

const DeactivateAccountComponent = ({onRequestClose, title, isOpen, link_identifier}: UserModalActionInterface) => {
  const {userDeactivationColumns} = useDeactivation()
  const {data} = useGetAllUsersQuery()

  return (
        <ModalContainer className={`w-[40%] mx-auto bg-gradient-to-t from-gray-300 to-white flex flex-col relative top-[15%] shadow-2xl rounded-t-md`} >
            <ModalHeader className='flex justify-between border-b-[1px]'>
                <h1 className='font-Poppins text-black text-[13px] text-opacity-50 text-center px-5 py-2'>{`Deactivating Accounts`}</h1>
                <div className="w-[50px] h-5 border flex justify-center items-center cursor-pointer text-white bg-red-600 hover:bgr-red-700 rounded-tr-md " onClick={onRequestClose}>
                    <Vsc.VscClose size={15} />
                </div>
            </ModalHeader>
            <ModalBody className='bg-white text-black relative h-full m-1'>
                <FlexBox className={`flex flex-col gap-2`}>
                  <FlexBoxInner className={`py-2 px-5`}>
                    <input
                      className='input-md '
                      placeholder='Search User'
                    />
                  </FlexBoxInner>
                  <FlexBoxInner>
                    <PolicyTable 
                      columns={userDeactivationColumns}
                      data={data || []}
                    
                    />

                  </FlexBoxInner>

                </FlexBox>
            
            </ModalBody>

           
        </ModalContainer>
  )
}

export default DeactivateAccountComponent