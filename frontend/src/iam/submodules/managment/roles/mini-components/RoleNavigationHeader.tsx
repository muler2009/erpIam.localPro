import React, { useCallback, useState } from 'react'
import { FlexBox, FlexBoxInner, Text } from '../../../../components/reusable/StyledComponent'
import { FaFaceAngry } from 'react-icons/fa6'
import { LuUsers2 } from "react-icons/lu";
import { role_tab, roles } from '../../constants/iam-menu-items/roles';
import RoleModal from '../modals/RoleModal';

const RoleNavigationHeader = () => {

  const [triggerModal, setTriggerModal] = useState<{[key: string]: boolean}>({});
  const [activeIndex, setActiveIndex] = useState<number>(0)

  const handleOpenCloseActiononRoleHeader = useCallback((label: string) => {
    setTriggerModal(prevState => ({
      ...prevState,
      [label]: !prevState[label]
    }));
  }, []);

  return (
    <FlexBox className='flex flex-col gap-4 px-2 p pt-4 pb-3'>
      <FlexBoxInner className='flex space-x-2 items-start'>
        <LuUsers2 size={25} className='text-primary-green' />
        <Text className='font-Poppins font-semibold text-2xl'>
          OiAMs | <span className='text-[16px] font-normal'>Role Management</span>
        </Text>
      </FlexBoxInner>

      <FlexBoxInner className='flex border-b pb-1 pr-4'>
          {
            roles?.map((role, index) => {
              return(
                <FlexBoxInner key={role.label} className={`flex space-x-2 justify-start px-2 items-center py-[5px] cursor-pointer hover:bg-gray-100 rounded-t-md`} onClick={() => handleOpenCloseActiononRoleHeader(role.label)}>
                    <span className='text-[15px]'>{role.icon}</span>
                    <span className='font-Poppins text-[13px] px-1'>{role.label}</span>
                </FlexBoxInner>
              )
            })

          }
      </FlexBoxInner>

          {/* {
            role_tab.map(role => (
              triggerModal[role.label] && (
                <RoleModal 
                  key={role.label}
                  isOpen={triggerModal[role.label]}
                  onRequestClose={() => handleOpenCloseActiononRoleHeader(role.label)}
                  title={role.label}
                />
              )
            ))
            
          } */}

        {Object.entries(triggerModal) // This convert trigger modal object to an array
          .filter(([_, isOpen]) => isOpen) //This filters the array of entries, keeping only those where isOpen is true
          .map(([label, isOpen]) => {
             const role = role_tab.find(role => role.label === label)
            return (  
            <RoleModal 
              key={label}
              isOpen={isOpen}
              onRequestClose={() => handleOpenCloseActiononRoleHeader(label)}
              title={label}
              link_identifier={role?.link_identifier}
            />
          )
          }
            
        
        )
        }
     </FlexBox>
  )
}

export default RoleNavigationHeader