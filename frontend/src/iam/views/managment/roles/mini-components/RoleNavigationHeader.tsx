import React, { useCallback, useState } from 'react'
import { FlexBox, FlexBoxInner, Text } from '../../../../components/reusable/StyledComponent'
import { FaFaceAngry } from 'react-icons/fa6'
import { LuUsers } from "react-icons/lu";
import { role_tab, roles } from '../../constants/iam-menu-items/roles';
import RoleModal from '../modals/RoleModal';

const RoleNavigationHeader = () => {

  const [triggerModal, setTriggerModal] = useState<{[key: string]: boolean}>({});
  const [activeIndex, setActiveIndex] = useState<number>(0)

  const handleOpenCloseActiononRoleHeader = useCallback((label: string) => {
    setTriggerModal(prevState => ({
      ...prevState,
      [label]: !prevState[label]
    }))
  }, []);

  return (
    <FlexBox className='flex justify-between items-center pt-4 pb-3 px-4 bg-gradient-to-b mx-1 from-white to-gray-100'>
      <FlexBoxInner className='flex space-x-2 items-start'>
         { LuUsers({size: 25, className: 'text-primary-green'}) }
       
        <Text className='font-Poppins font-semibold text-2xl'>
          IAMs | <span className='text-[14px] font-normal text-primary-green'>Role Management</span>
        </Text>
      </FlexBoxInner>

      <FlexBoxInner className='flex space-x-3 rounded-sm pb-1 pr-4'>
          {
            roles?.map((role, index) => {
              return(
                <FlexBoxInner key={role.label} className={`flex justify-start px-2 border border-black border-opacity-15 rounded-md items-center py-[8px] cursor-pointer hover:bg-text-primary hover:text-white`} onClick={() => handleOpenCloseActiononRoleHeader(role.label)}>
                    {role.icon} <span className='font-Poppins text-[12px] px-1'>{role.label}</span>
                </FlexBoxInner>
              )
            })
          }
      </FlexBoxInner>

        {
          Object.keys(triggerModal).map(label => 
            triggerModal[label] && (
              <RoleModal 
                key={label}
                isOpen={triggerModal[label]}
                onRequestClose={() => handleOpenCloseActiononRoleHeader(label)}
                title={label}
                link_identifier={label}
              />
            )
          )}
     </FlexBox>
  )
}

export default RoleNavigationHeader