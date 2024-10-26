import React, { useState, useCallback } from 'react'
import * as MdIcons from "react-icons/md";
import { FlexBox, Div } from '../../../../../../components/common/StyledComponent';
import { userActionItems } from '../../../constants/iam-menu-items/account';
import UserActionModalTemplateComponent from '../user-modals/UserActionModalTemplateComponent';
import { FlexBoxInner } from '../../../../../components/reusable/StyledComponent';

const UserActionDropDownComponent = () => {
    const [drop, setDrops] = useState<boolean>(false)
    const [isOpen, setIsOpen] = useState<{[key: string]: boolean}>({})

    const handleOpenCloseActiononRoleHeader = useCallback((abbrevation: string) => {
      setIsOpen(prevState => ({
        ...prevState,
        [abbrevation]: !prevState[abbrevation]
      }));
      setDrops(prev => !prev)
    }, []);
  
  return (
    <FlexBox className='bg-text-primary text-[12px] text-[#fff] flex items-center py-2 px-4 rounded-[3px] cursor-pointer relative' onClick={() => setDrops(prevState => !prevState)}>Actions 
        <span className='ml-2'>{ !drop ? <MdIcons.MdOutlineArrowDropDown size={18} /> : <MdIcons.MdArrowDropUp size={18} /> }</span>
        <FlexBoxInner onClick={() => setDrops(prevState => !prevState)}>
          {
            drop && (
              <Div  className='flex flex-col gap-3 absolute top-11 w-[250px] border border-gray-100 bg-white mr-4 -right-4 shadow-sm text-[#333] z-50'>
                <div className='border-t py-3'>
                  {
                    userActionItems?.map((actions, index) => {
                      return(
                        <Div className="hover:bg-gray-50 px-3 flex border-b py-2" key={index} onClick={() => handleOpenCloseActiononRoleHeader(actions.abbrevation || "")}>
                            <span className='pr-1'>{actions.icon}</span>
                            {actions.label}
                        </Div>
                      )
                    })
                  }
                </div>
              </Div>
            )
          }
        </FlexBoxInner>        
        {
          Object.keys(isOpen).map((abbrevation) => isOpen[abbrevation] && (
              <UserActionModalTemplateComponent 
                key={abbrevation}
                isOpen={isOpen[abbrevation]}
                onRequestClose={() => handleOpenCloseActiononRoleHeader(abbrevation)}
                title={``}
                link_identifier={abbrevation}
              />
            )
          )
        }
    </FlexBox>
  )
}

export default UserActionDropDownComponent

