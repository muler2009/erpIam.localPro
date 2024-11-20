import React, { useState, useEffect } from 'react'
import { FlexBox, Div, FlexBoxInner, Text } from '../../../../../components/common/StyledComponent'
import * as AiIcons from 'react-icons/ai'
import { IoIosSave } from "react-icons/io";
import { NotificationPreferenceSettingAPI, NotificationPreferenceSettingInterface } from '../../../../models/preference.setting';
import { useSetUpNotificationPreferenceMutation } from '../../../../services/notificationAPISlice';
import { useGetNotificationTemplateQuery } from '../../../../../iam/features/settingAPI';
import useNotificationPreference from '../../../../hooks/useNotificationPreference';

const NotificationPreferenceSetUpComponent = ({setSelect}: {setSelect: React.Dispatch<React.SetStateAction<boolean | null>>}) => {

  const {preferenceSetUp, handlePreferenceSetUpChange, canSave} = useNotificationPreference()
  const {data: templates} = useGetNotificationTemplateQuery()

  const [setUpNotificationPreference] = useSetUpNotificationPreferenceMutation()

  const onSaveClicked = async() => {
    try{
      const response = await setUpNotificationPreference(preferenceSetUp).unwrap()
      if(response.status_code === 201){
        setSelect(null)
      }

    }catch(error){
      console.log(error)
    }
  }

  return (
    <FlexBox className='h-full'>
        <table className='table table-sm mt-5 configure'>
          <thead>
            <tr> 
              <th>Notification Event Type</th>
              <th>Preferred Channel</th>
              <th>Enable </th> 
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <div className='relative'>
                  <select id={`template_input`} className="select-md rounded-sm font-Poppins py-2 w-full text-[12px]" name={`template`} value={preferenceSetUp?.template} onChange={handlePreferenceSetUpChange}>
                    <option className='text-[#333] text-opacity-50 bg-gray-100'><p className='text-[#333] text-opacity-50'>--Select--</p></option>
                      {
                        templates?.map((template, index) => (
                          <option value={template.eventType_name}>{template.eventType_name}</option>
                        ))
                      }
                  </select>   
                  <span className='flex justify-center items-center absolute top-0 border right-0 text-gray-500 bg-gray-50 h-full w-[30px] pointer-events-none '>
                      <AiIcons.AiOutlineCaretDown  />
                  </span>
                </div>
              </td>
              <td className=''>
                <div className='relative'>
                  <select id={`preffered_channel_input`} className="select-md rounded-sm font-Poppins py-2 w-full text-[12px]" name={`preffered_channel`} value={preferenceSetUp?.preffered_channel} onChange={handlePreferenceSetUpChange}>
                    <option className='text-[#333] text-opacity-50 bg-gray-100'><p className='text-[#333] text-opacity-50'>--Select--</p></option>
                    <option value={`in_app`}>In Application Notification</option>
                    <option value={`email`}>Email Notification</option>
                    <option value={`push`}>Push Notification</option>
                    <option value={`sms`}>SMS Notification</option>
                  </select>   
                  <span className='flex justify-center items-center absolute top-0 border right-0 text-gray-500 bg-gray-50 h-full w-[30px] pointer-events-none '>
                    <AiIcons.AiOutlineCaretDown  />
                  </span>
                </div>
              </td>
              <td className='flex space-x-10'>  
                <div className='ml-5 py-2'>
                  <label className='flex items-center justify-start space-x-3 cursor-pointer'>
                    <input type="checkbox" name='enabled' id="enabled_checkbox_input" className="w-[13px] h-[13px] rounded-[2px] flex items-center justify-center checked:appearance-none checked:bg-green-900 checked:border checked:border-black before:checked:text-[12px] before:checked:text-white before:checked:content-['']" checked={preferenceSetUp?.enabled} onChange={handlePreferenceSetUpChange} />                      <Text className='text-[12px] whitespace-nowrap font-Poppins text-[#333] text-opacity-80'>Enabled</Text>
                  </label>  
                </div> 
              </td>
              <td>
                <div className='flex space-x-5 justify-start items-center ml-10'>
                  <button className='px-5 btn-sm text-[13px] flex items-center duration-300 disabled:bg-gray-100 bg-button-primary disabled:text-gray-100 text-white' disabled={!canSave} onClick={onSaveClicked}>
                    <IoIosSave size={18} /><span className='pl-[6px]'>Save</span>
                  </button>
                  <button className='px-5 btn-sm text-[13px] flex items-center duration-300 disabled:bg-gray-100 bg-red-500 disabled:text-gray-100 text-white' disabled={!canSave} onClick={() => setSelect(null)}>
                    <IoIosSave size={18} /><span className='pl-[6px]'>Cancel</span>
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
    </FlexBox>
  )
}

export default NotificationPreferenceSetUpComponent