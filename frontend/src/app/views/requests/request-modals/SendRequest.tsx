import React, {useState} from 'react'
import { ModalBody, ModalContainer, ModalWrapper, ModalHeader, ModalFooter } from '../../../../iam/components/reusable'
import { Text, FlexBox, FlexBoxInner } from '../../../../components/common/StyledComponent'
import * as VscIcons from 'react-icons/vsc'
import { SendRequestModalProps } from '../../../models/request-model'
import { useGetStateQuery, useGetProcessesQuery } from '../../../services/requestAPISlice'
import { useGetAllUsersQuery } from '../../../../iam/features/userAPI'
import {InputWithDesc} from '../../../../iam/components/reusable'
import SelectComponent from '../../../../components/common/SelectComponent'
import TextInput from '../../../../components/common/TextInput'
import { Input } from '../../../../components/common'
import useRequests from '../../../hooks/useRequests'
import { useCreatedUnapprovedRequestMutation } from '../../../services/requestAPISlice'
import { ErrorResponseInterface } from '../../../../iam/models/error.model'
import { LoginErrorMessageModal } from '../../../../iam/components/errors/LoginError'


const SendRequest = ({handleIsOpenCloseMenuModal, title, open}: SendRequestModalProps) => {
    const [uploadProgress, setUploadProgress] = useState(0);

    const {data: processData} = useGetProcessesQuery()
    const {data: users} = useGetAllUsersQuery()

    const [createdUnapprovedRequest] = useCreatedUnapprovedRequestMutation()

    const { requestData, handleRequestInputHandler, handleFileChange} = useRequests()

    const [loginErrorMessage, setLoginErrorMessage] = useState<ErrorResponseInterface | null>(null);
    const [loginError, setLoginError] = useState<boolean>(false);
    const [loginFailed, setLoginFailed] = useState<boolean>(false);

    const onSaveClicked = async () => {
        const formData = new FormData();
        formData.append('request_assigned_to_user', requestData.request_assigned_to_user);
        formData.append('request_type', requestData.request_type);
        formData.append('title', requestData.title);
      
        if (requestData.file) {
            formData.append('file_for_approval', requestData.file);
        }
      
        try {
          const response = await createdUnapprovedRequest(formData).unwrap();
          if (response?.status_code === 201) {
            handleIsOpenCloseMenuModal(); // Function to handle successful submission
          }
        } catch (error: any) {
            if (!error) {
              console.log(error);
            } else if (error.data.status_code === 404) {
              setLoginErrorMessage({
                error_type: error.data?.error_type,
                message: error.data?.message,
                status_code: error.status_code
              });
              setLoginError(true);
              setLoginFailed(prev => !prev);
            } else if (error.data.status_code === 402) {
              setLoginErrorMessage({
                error_type: error.data?.error_type,
                message: error.data?.message,
                status_code: error.status_code
              });
              setLoginError(true);
              setLoginFailed(prev => !prev);
            } else {
              setLoginErrorMessage({
                error_type: error.response?.data?.error_type || "Unknown Error",
                message: error.response?.data?.message || "An error occurred. Please try again.",
                status_code: error.status
              });
              setLoginError(true);
              setLoginFailed(prev => !prev);
            }
          }
      
        console.log(requestData); // Debugging: Check the data being sent
      };
      
  return (
        open ? (
            <ModalWrapper>
                <ModalContainer className={`w-[40%] mx-auto bg-[#fff] flex flex-col relative top-[15%] shadow-2xl rounded-md`}>
                    <ModalHeader className='flex justify-between items-center px-5 py-3 border-b-[1px] bg-[#efefef] bg-opacity-50 font-Poppins rounded-md'>
                        <Text className='font-Poppins text-center pr-5 text-[#333] text-opacity-60 text-[13px]'>
                            {title}
                        </Text>

                        <div className="w-5 h-5 flex justify-center items-center cursor-pointer rounded-full hover:bg-red-400 hover:text-white" onClick={handleIsOpenCloseMenuModal} > 
                            {
                                VscIcons.VscClose({
                                    size: 15
                                })
                            } 
                        </div>
                    </ModalHeader>
                    <ModalBody className='pl-5 py-3 pr-10'>
                        <form encType="multipart/form-data">
                            <FlexBox className='flex flex-col gap-4'>
                                <FlexBoxInner className='flex space-x-4'>
                                    <FlexBoxInner className='flex-grow'>
                                        <SelectComponent
                                            label='Request type'
                                            options={processData || []}
                                            name='request_type'
                                            valueKey='protocol_id'
                                            labelKey='protocol_name'  
                                            value={requestData?.request_type}
                                            onChange={handleRequestInputHandler}                
                                        />
                                    </FlexBoxInner>
                                    <FlexBoxInner className='flex-grow'>
                                        <InputWithDesc 
                                            label='Request Title'
                                            id= 'role_name'
                                            type='text'
                                            placeholder='Title'
                                            name='title'
                                            className='input-md font-Poppins text-[13px]'
                                            desc='enter title for the request example: Project proposal request'
                                            value={requestData?.title}
                                            onChange={handleRequestInputHandler}
                                        />
                                    </FlexBoxInner>
                                </FlexBoxInner>

                                {/* <SelectComponent
                                    label='Approval assigned to:'
                                    options={users || []}
                                    valueKey='user_account_id'
                                    labelKey={`username`}
                                    name='request_assigned_to_user'
                                    value={requestData?.request_assigned_to_user}
                                    onChange={handleRequestInputHandler}
                                /> */}
                                <>
                                    <Input 
                                        label='Upload Document for Aprroval'
                                        id='file_for_approval'
                                        type='file'
                                        name="file_for_approval"
                                        className="w-full text-gray-400 text-[12px] bg-white border border-gray-200 file:cursor-pointer cursor-pointer file:border-0 file:py-2 file:px-4 file:mr-4 file:bg-gray-100 file:hover:bg-gray-200 file:text-black " 
                                        placeholder=''
                                        onChange={handleFileChange}
                            
                                    />
                                    <div className="mt-2">
                                        {uploadProgress > 0 && (
                                            <div className="w-full bg-gray-200 rounded-full h-2.5">
                                            <div 
                                                className="bg-blue-600 h-2.5 rounded-full" 
                                                style={{width: `${uploadProgress}%`}}
                                            ></div>
                                            </div>
                                        )}
                                        {uploadProgress > 0 && uploadProgress < 100 && (
                                            <p className="text-sm text-gray-500 mt-1">Uploading: {uploadProgress}%</p>
                                        )}
                                        {uploadProgress === 100 && (
                                            <p className="text-sm text-green-500 mt-1">Upload complete!</p>
                                        )}
                                    </div>
                                </>
                                
                                <TextInput 
                                    label='Description about the request'
                                    type='text'
                                    placeholder='Description'
                                    name='dec'
                                    className="input-md text-sm"
                                    rows={5}
                                    desc='optional'
                                
                                />
                            </FlexBox>      
                        </form>
                    </ModalBody>
                    <ModalFooter className='py-3 border-t flex space-x-5 justify-end items-center pr-10'>
                        <button className='bg-primary-green text-[#fff] rounded-[3px]' onClick={onSaveClicked}>  
                            <Text className='text-[12px]  px-3 rounded-[3px] py-2 flex items-center'>
                                Save Request
                            </Text>
                        </button>
                        <button className='bg-primary-green text-[#fff] rounded-[3px]' onClick={handleIsOpenCloseMenuModal}>  
                            <Text className='text-[12px]  px-3 rounded-[3px] py-2 flex items-center'>
                                Cancel Request
                            </Text>
                        </button>
                        
                    </ModalFooter>
                </ModalContainer>
                <LoginErrorMessageModal 
                    loginErrorMessage={loginErrorMessage}
                    setLoginFailed={setLoginFailed} 
                    loginFailed={loginFailed} 
                />
            </ModalWrapper>

        ) : null
   
  )
 


}

export default SendRequest

