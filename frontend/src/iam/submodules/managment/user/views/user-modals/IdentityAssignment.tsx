import React from 'react'
import { FlexOuterContainer, FlexInnerContainer, Text } from '../../../../../components/reusable/StyledComponent'
import { InputWithDesc } from '../../../../../components/reusable'
import { AssignGroupToIdentityContextProvider } from '../../context/AssignGroupIdentityContext'
import CustomTable from '../../../../../components/Table/CustomTable'
import { useUserAccountContext } from '../../context/useUserAccountContext'

const IdentityAssignment = () => {
  const { userData, handleUserIdentityCreationInputChanges } = useUserAccountContext()
  
  return (
    <FlexOuterContainer className='flex flex-col px-5'>
      <FlexInnerContainer className='flex gap-5 px-10'>
        <InputWithDesc 
            label='User Home directory *'
            id= 'home_directory'
            type='text'
            placeholder='/user/home'
            name='home_directory'
            className='input-md font-Poppins text-[13px]'
            desc='Set the user home directory if you are using the Unix like operating system'
            value={userData?.home_directory}
            onChange={handleUserIdentityCreationInputChanges}
        />
      </FlexInnerContainer>
      <FlexInnerContainer className='px-5'>
        <Text className='font-Rubik text-[#333] text-opacity-50 text-[15px] py-3'>Attach User to Group</Text> 
        <AssignGroupToIdentityContextProvider>
          <CustomTable />
        </AssignGroupToIdentityContextProvider>
      </FlexInnerContainer>
      <FlexInnerContainer className='flex flex-col border-t-[1px] gap-3 bg-gray-50'>
          <div className='flex flex-col pt-3'>
            <label className='flex items-center justify-start space-x-3 cursor-pointer'>
              <input 
                  type="checkbox" 
                  name='is_staff'
                  id="is_staff" 
                  // value={userData?.is_staff}
                  className="w-4 h-4 rounded-[2px] appearance-auto checked:appearance-none checked:bg-gray-500before:checked:text-white checked:border checked:border-black"
                  checked={userData?.is_staff} 
                  onChange={handleUserIdentityCreationInputChanges}  
              />
              <Text className='text-[12px] whitespace-nowrap font-Poppins text-[#333] text-opacity-80'>
                  Allow a user to login to system
              </Text>
            </label>  
            <p className='text-[11px] px-6 text-[#333] text-opacity-60'>Tick the check box to allow the user to login to systemr</p>
          </div>

          <div className='flex flex-col pt-3'>
            <label className='flex items-center justify-start space-x-3 cursor-pointer'>
              <input 
                  type="checkbox" 
                  name='is_staff'
                  id="is_staff" 
                  className="w-4 h-4 rounded-[2px] appearance-auto checked:appearance-none checked:bg-gray-500before:checked:text-white checked:border checked:border-black" 
                  checked={userData?.is_active} 
                  onChange={handleUserIdentityCreationInputChanges}  
              />
              <Text className='text-[12px] whitespace-nowrap font-Poppins text-[#333] text-opacity-80'>
                  Make the user <span className='text-blue-500'>Active</span>
              </Text>
            </label>  
            <p className='text-[11px] px-6 text-[#333] text-opacity-60'>Tick the check box to allow the user to login to systemr</p>
          </div>

          <div className='flex flex-col pt-3'>
            <label className='flex items-center justify-start space-x-3 cursor-pointer'>
              <input 
                  type="checkbox" 
                  name='is_staff'
                  id="is_staff" 
                  className="w-4 h-4 rounded-[2px] appearance-auto checked:appearance-none checked:bg-gray-500before:checked:text-white checked:border checked:border-black"
                  checked={userData?.is_superuser} 
                  onChange={handleUserIdentityCreationInputChanges}  
              />
              <Text className='text-[12px] whitespace-nowrap font-Poppins text-[#333] text-opacity-80'>
                  Make the user <span className='text-blue-500'>Superuser</span>
              </Text>
            </label>  
            <p className='text-[11px] px-6 text-[#333] text-opacity-60'>Tick the check box to allow the user to full access to administration</p>
          </div>
      </FlexInnerContainer>
    </FlexOuterContainer>
  )
}

export default IdentityAssignment