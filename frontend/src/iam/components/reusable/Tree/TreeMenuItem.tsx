import React, { useState, useCallback } from "react";
import { MenuItemInterface } from "./side-bar-interface";
import SideMenuList from "./TreeMenuList";
import * as FaIcons from "react-icons/fa";
import * as PiIcons from "react-icons/pi";
import { FlexBox, FlexBoxInner } from "../StyledComponent";
import { Link } from "react-router-dom";
import * as GiIcons from "react-icons/gi";
import { VscSymbolFile } from "react-icons/vsc";
import { P } from "../../../../components/common/StyledComponent";
import { Icon } from "../../../../components/common";
import { AiFillDashboard } from "react-icons/ai";
import { useSelector } from "react-redux";
import { username } from "../../../api/auth";
import { TreeMenuItemInterface } from "./tree-menu-interface";
import { SideMenuListItemProps, DisplayChildrensInterface } from "./tree-menu-interface";
import TreeMenuList from "./TreeMenuList";
import { FiChevronDown, FiChevronRight } from "react-icons/fi";


const TreeMenuItem = ({ listItem, controller, key }: SideMenuListItemProps) => {
  // a state for handling open and closing
  const loggedInUser = useSelector(username)
  const [displayChildrens, setDisplayCurrentChildren] = useState<DisplayChildrensInterface>({});
  const [activeTabIndex, setActiveTabIndex] = useState<number>(0); 

    const changeTabIndex = (key: number): void => {
        setActiveTabIndex(key)
      }

  // Toggle handler
  const handleToggleChildren = useCallback(
    (getCurrent: string) => {
      setDisplayCurrentChildren((prevState) => ({
        ...prevState,
        [getCurrent]: !prevState[getCurrent],
      }));
    },
    []
  );

  return (
    <div className={`${controller && 'pl-5'}`}>
      {
        listItem.path ? (
          <Link to={listItem.path} className="py-2 cursor-pointer font-Poppins text-sm" onClick={() => handleToggleChildren(listItem.label)} >
            <div className={`px-4 flex items-center justify-between py-2 ${controller && 'hover:bg-button-hover hover:text-black w-full'}`}>
              <div className="flex items-center space-x-3 text-[#fff]">
                {
                  listItem.label === 'Dashboard' ? ( <AiFillDashboard /> ) : listItem.children?.length 
                  ? (
                      displayChildrens[listItem.label] ? (
                        listItem.icon ? <div className="">{listItem.icon} </div> 
                        : <GiIcons.GiOpenFolder className=" text-opacity-70 text-[20px] " />
                      ) : (
                        listItem.icon ? listItem.icon : <PiIcons.PiFolderSimplePlusFill size={17} className=" text-opacity-70 " />
                      )
                    ) : (
                      listItem.icon ? (
                        <div className={` text-opacity-70 ${!controller ? 'text-[20px]' : 'text-[15px]'}`}>{listItem.icon}</div>
                      ) : <VscSymbolFile />
                    )
                }
                <div className={`text-[12px] font-Poppins font-normal text-[#fff] duration-500 ${!controller && 'opacity-0 translate-x-28 overflow-hidden'}`}>
                  {listItem.label}
                </div>
              </div>
    
              {
                listItem && listItem.children && listItem.children.length  && (
                  <div className="text-[#fff] ">
                    {
                      displayChildrens[listItem.label]
                        ? <FiChevronDown size={14} />
                        : <FiChevronRight size={14} />
                    }
                  </div>
                )
              }
            </div>
          </Link>
        ) : (
          <P className="text-[12px] hover:bg-gray-50 text-black">{listItem.label}</P>
        )
      }
  
      {
          listItem.children && listItem.children.length > 0 && displayChildrens[listItem.label]  && (
          <TreeMenuList list={listItem.children} controller={controller || true} />
        )
      }
    </div>  
  );
};

export default TreeMenuItem;


// {
//   listItem && listItem.children && listItem.children.length ? (
//     <span>
//       {
//         displayChildrens[listItem.label] 
//         ? <PiIcons.PiFolderSimpleMinusFill size={20} className="text-yellow-600" /> 
//         : <PiIcons.PiFolderSimplePlusFill size={20} className="text-yellow-600" />
//       }

//     </span>
//   ): null
  
// }
//    <p className="text-[12px] hover:bg-gray-100">{listItem.label}</p>