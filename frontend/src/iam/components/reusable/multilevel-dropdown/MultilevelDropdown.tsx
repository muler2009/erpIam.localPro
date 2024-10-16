import React, {useState, useCallback} from 'react'
import { DropDownMenuItemInterface, MultilevelDropdownInterfac } from './mult-level.model'
import * as IoIoIcons from "react-icons/io5";
import Submenu from './Submenu'
import { Div, FlexBox, Text, FlexBoxInner } from '../../../../components/common/StyledComponent';



const MultilevelDropdown = ({ menu }: MultilevelDropdownInterfac) => {
  const [openMenus, setOpenMenus] = useState<{[key: string]: boolean }>({});

  const toggleSubMenu = (indexPath: string) => {
      setOpenMenus((prevState) => ({
          ...prevState,
          [indexPath]: !prevState[indexPath], // Toggle the open state for the specific menu
      }));
  };

  return (
      <FlexBox className="flex flex-col gap-1">
         
              {menu.map((item, index) => {
                  const isOpen = openMenus[index]; // Check if this menu is open

                  return (
                      <FlexBoxInner key={index}>
                          <div className="cursor-pointer flex justify-start items-center" onClick={() => toggleSubMenu(`${index}`)} >  
                            { isOpen ? <IoIoIcons.IoCaretDown/> : <IoIoIcons.IoCaretForwardSharp /> }
                            <Text className='text-[14px] text-[#5e2f05] pl-[3px]'>
                                {item.label} {/* Display the menu item's label */}
                            </Text> 
                          </div>
                          {/* Render submenu if open and has children */}
                          {item.children && isOpen && (
                              <Submenu
                                  subMenu={item.children} // Pass children to Submenu
                                  parentIndexPath={`${index}`} // Pass current path
                                  openMenus={openMenus} // Pass openMenus state
                                  toggleSubMenu={toggleSubMenu} // Pass toggle function
                              />
                          )}
                      </FlexBoxInner>
                  );
              })}
          
      </FlexBox>
  );
};

export default MultilevelDropdown;
