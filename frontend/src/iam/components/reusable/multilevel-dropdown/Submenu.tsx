import React, { useCallback, useState } from "react";
import * as IoIcons from "react-icons/io5";

import { SidemenuProps } from "./mult-level.model";
import { Div, FlexBox, FlexBoxInner, Text } from "../../../../components/common/StyledComponent";



const Submenu = ({ subMenu, parentIndexPath, openMenus, toggleSubMenu }: SidemenuProps) => {
  return (
      <FlexBox className="pl-3 flex flex-col gap-2 py-3">

          {subMenu.map((subItem, index) => {
              const currentPath = `${parentIndexPath}-${index}`; // Construct a unique path for each submenu
              const isOpen = openMenus[currentPath]; // Check if this submenu is open

              return (
                    <FlexBoxInner key={currentPath} className="pl-3 ">
                      <Div className="cursor-pointer flex items-center space-x-1" onClick={() => toggleSubMenu(currentPath)} >
                        <span className="text-[13px]">
                            {isOpen ? <IoIcons.IoCaretDown /> : <IoIcons.IoCaretForwardSharp />}
                        </span>
                         <Text className='text-[13px] text-[#5e2f05]'>{subItem.label}</Text> {/* Display the submenu item's label */}
                      </Div>
                      {/* Render nested submenu if open and has children */}
                        {
                            subItem.children && isOpen && (
                                <Submenu
                                    subMenu={subItem.children}
                                    parentIndexPath={currentPath}
                                    openMenus={openMenus}
                                    toggleSubMenu={toggleSubMenu}
                                />
                            )
                        }

                        {subItem.content && isOpen && (
                            <Div className="pl-5 mt-2">
                                {subItem.content}
                            </Div>
                            )}
            </FlexBoxInner>
              );
          })}
      </FlexBox>
  );
};

export default Submenu;



