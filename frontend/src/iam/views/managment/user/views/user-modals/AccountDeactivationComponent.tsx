import React, { useState } from 'react'
import { ModalWrapper, ModalContainer, ModalBody, ModalHeader,ModalFooter } from '../../../../../components/reusable';
import * as Vsc from 'react-icons/vsc'
import { FlexBox, FlexBoxInner, Div, Text } from '../../../../../../components/common/StyledComponent';
import { useGetAllUsersQuery } from '../../../../../features/userAPI';
import useDeactivation from '../../../constants/columns/useDeactivation';
import { RiUserForbidFill } from "react-icons/ri";
import { useSearchUsersQuery } from '../../../../../features/userAPI';
import AccountActivateDeactivateInformation from './AccountActivateDeactivateInformation';

interface DeactivateAccountInterface {
    title: string;
    handleIsOpenCloseMenuModal: () => void;
    open: boolean;
}

const AccountDeactivationComponent = ({title, handleIsOpenCloseMenuModal, open}: DeactivateAccountInterface) => {

    const {data: userData, isSuccess, isError, error} = useGetAllUsersQuery()
    const [isSearching, setIsSearching] = useState(false);
    const [search, setSearch] = useState('');

    const handleSearchUserChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        setSearch(value);
        setIsSearching(value.length > 0); // Only search when there's input
    };
    
    const { data: searchUser, isSuccess: isSearchSuccess, isError: isSearchError, error: searchError } = useSearchUsersQuery(
        { first_name: search, last_name: search },
        { skip: !search } // Skip if not searching
    );

    console.log(userData)

  return (
    open ? (
        <ModalWrapper>
            <ModalContainer className={`w-[60%] mx-auto bg-[#fff] flex flex-col relative top-[6%] shadow-2xl rounded-t-md `} >
                <ModalHeader className='flex justify-between items-center px-5 py-3 border-b-[1px]'>
                    <h1 className='font-Rubik text-black font-semibold text-[15px] text-opacity-50 text-center px-5'>{title}</h1>
                    <div className="w-5 h-5 flex justify-center items-center cursor-pointer rounded-full hover:bg-gray-400 hover:text-white" 
                    onClick={handleIsOpenCloseMenuModal}>
                        <Vsc.VscClose size={15} />
                    </div>
                </ModalHeader>
                <ModalBody className='bg-white text-black relative h-[50vh] m-1 overflow-y-scroll px-2'>
                    <FlexBox className={`flex flex-col gap-2 pt-4`}>
                        <FlexBoxInner>
                            <input 
                                className='px-2 py-[7px] text-[12px] font-normal text-gray-700 bg-white border border-solid border-gray-300 transition ease-in-out m-0 focus:text-gray-700 focus:outline-none focus:bg-white rounded-[3px]' 
                                placeholder='Search user to deactivate'
                                value={search}
                                onChange={handleSearchUserChange}
                            />
                        </FlexBoxInner>
                        <FlexBoxInner className='flex space-x-10 py-3 px-3 bg-gradient-to-t from-gray-300 to-gray-100 text-[12px]'>
                            <Div className="flex space-x-5">
                                <Text>No</Text>
                                <Text>User ID</Text>
                                <Text className='w-[50px]'>Status</Text>
                            </Div>
                            <Div className='flex-grow'>
                                <div className='flex justify-between items-center'>
                                    <Text>Full Name</Text>
                                    <Text>Action</Text>
                                </div>
                            </Div>
                            
                        </FlexBoxInner>
                        <FlexBoxInner className='flex flex-col  text-[12px] cursor-pointer'>
                            {
                                isSearching ? (
                                    <FlexBox>
                                         {isSearchError && <p className="error">Error</p>}
                                        {
                                            isSearchSuccess && searchUser && searchUser.length > 0 ? (
                                                <AccountActivateDeactivateInformation 
                                                    userData={searchUser}
                                                    handleIsOpenCloseMenuModal={handleIsOpenCloseMenuModal}
                                                />
                                            ) : (
                                                <div className=''>Not Available</div>
                                            )
                                        }
                                    </FlexBox>
                                ) : (
                                    
                                    <AccountActivateDeactivateInformation 
                                        userData={userData}
                                        handleIsOpenCloseMenuModal={handleIsOpenCloseMenuModal}

                                    
                                    />
                                  
                                )
                            }

                            

                            
                        </FlexBoxInner>
                    </FlexBox>
                </ModalBody> 
                <ModalFooter className='border-t flex justify-end py-3 pr-2'>
                    <button className='btn-sm bg-red-500 text-white px-4 text-[12px]' onClick={handleIsOpenCloseMenuModal}>Close</button>  
                </ModalFooter> 
            </ModalContainer>
        </ModalWrapper>

    ): null
  )
}

export default AccountDeactivationComponent