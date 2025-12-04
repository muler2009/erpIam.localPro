import React from 'react'
import { ModalComponentPropsInterface } from '../../../../models/common-models'
import { ModalBody, ModalContainer, ModalFooter, ModalHeader, ModalWrapper } from '../../../../components/reusable'
import * as Vsc from 'react-icons/vsc'
import * as AiIcons from 'react-icons/ai'
import { FlexBox } from '../../../../../components/common/StyledComponent'
import InputWithDesc from '../../../../../components/common/InputWithDesc'
import { FlexBoxInner, Div } from '../../../../../components/common/StyledComponent'
import { TextInput } from '../../../../../components/common'
import { IoCloseSharp } from "react-icons/io5";
import useSetting from '../../../../hooks/useSetting'
import { useCreateNotificationTemplateMutation } from '../../../../features/settingAPI'

const CreateNewTemplateModalComponent = ({title, open, handleIsOpenCloseMenuModal}: ModalComponentPropsInterface) => {

    const {notificatonTemplate, canSave, handleNotificationInputChange} = useSetting()
    const [createNotificationTemplate] = useCreateNotificationTemplateMutation()
    

    const onTemplateSave = async() => {
        try{
            const response = await createNotificationTemplate(notificatonTemplate).unwrap()
            if(response?.status_code === 201){
                handleIsOpenCloseMenuModal()
            }
        }catch(error){
            console.log(error)
        }
    }

  return open ? (
        <ModalWrapper>
            <ModalContainer className={`w-[30%] mx-auto bg-[#fff] flex flex-col relative top-[6%] shadow-2xl rounded-t-md`} >
                <ModalHeader className='flex justify-between items-center px-5 py-3 border-b-[1px]'>
                    <h1 className='font-Poppins text-text-primary font-semibold text-[14px] text-opacity-90 text-center pl-3 pr-5'>
                        {title}
                    </h1>
                    <div className="w-5 h-5 flex justify-center items-center cursor-pointer rounded-full hover:bg-gray-400 hover:text-white" onClick={handleIsOpenCloseMenuModal}>
                        {
                            Vsc.VscClose({
                                size: 18
                            })
                        }
                    </div>
                </ModalHeader>
                <ModalBody className='bg-white relative h-[55vh]'>
                    <FlexBox className='flex flex-col space-y-4 px-2 py-6 mx-5'>
                        <InputWithDesc
                            label='Subject'
                            id={`template_subject_input`}
                            type={`text`}
                            desc='insert the notification subject name (optional)'
                            placeholder='Subject'
                            className='input-md w-1/2 text-[12px]'
                            name={`subject`}
                            value={notificatonTemplate?.subject}
                            onChange={handleNotificationInputChange}  
                        />
                        <InputWithDesc
                            label='Notification Type'
                            id={`eventType_name_input`}
                            type={`text`}
                            desc='insert the notification template name'
                            placeholder='Enter name of template'
                            className='input-md text-[12px]'
                            name={`eventType_name`}
                            value={notificatonTemplate?.eventType_name}
                            onChange={handleNotificationInputChange}
                        />

                        <FlexBoxInner className='flex flex-col space-y-2 pt-2'>
                            <label className='font-Poppins text-[13px] text-text-primary'>Notification Channel</label>
                            <Div className='relative'>
                                <select 
                                    id={`tdefault_channel_input`}
                                    className="select-md rounded-sm font-Poppins py-2 w-full text-[12px]" 
                                    name={`default_channel`}
                                    value={notificatonTemplate?.default_channel} 
                                    onChange={handleNotificationInputChange}         
                                >
                                    <option className='text-[#333] text-opacity-50 bg-gray-100'><p className='text-[#333] text-opacity-50'>--Select--</p></option>
                                    <option value={`in_app`}>In Application Notification</option>
                                    <option value={`email`}>Email Notification</option>
                                    <option value={`push`}>Push Notification</option>
                                    <option value={`sms`}>SMS Notification</option>
                                </select>   
                                <span className='flex justify-center items-center absolute top-0 border right-0 text-gray-500 bg-gray-50 h-full w-[30px] pointer-events-none '>
                                    {AiIcons.AiOutlineCaretDown({})}
                                </span>
                            </Div>
                        </FlexBoxInner>

                        <TextInput 
                            label='Notification message'
                            type='text'
                            name={`notification_message`}
                            className='input-md text-[12px]'
                            placeholder='Notification message'
                            rows={5}
                            value={notificatonTemplate?.default_message}
                            onChange={handleNotificationInputChange}
                        />                     
                    </FlexBox>
                </ModalBody>
                <ModalFooter className='border-t py-4 flex space-x-3 justify-end pr-5 cursor-pointer'>
                    <Div className='border text-[13px] px-2 py-2 border-button-primary rounded-[3px] flex items-center hover:bg-red-500 hover:text-white hover:border-red-500' onClick={handleIsOpenCloseMenuModal}>
                        {IoCloseSharp({size: 18})}
                        <span className='pl-[4px]'>Cancel</span>
                    </Div>
                    <button className='border text-[13px] px-2 py-2 bg-button-primary border-button-primary hover:bg-button-hover rounded-[3px] flex items-center text-white disabled:bg-gray-100 disabled:text-[#333] disabled:border-none disabled:cursor-default' disabled={!canSave} onClick={onTemplateSave}>
                        {Vsc.VscSaveAs({size: 18})}
                        <span className='pl-[4px]'>Save template</span>
                    </button>

                </ModalFooter>
            </ModalContainer>
        </ModalWrapper>
      ) : null

}

export default CreateNewTemplateModalComponent