import React, { useState, useCallback } from "react";
import { MenuItemInterface } from "./side-bar-interface";
import SideMenuList from "./SideMenuList";
import * as FaIcons from "react-icons/fa";
import * as PiIcons from "react-icons/pi";
import { FlexBox, FlexBoxInner } from "../../../../iam/components/reusable/StyledComponent";
import { Link } from "react-router-dom";
import * as GiIcons from "react-icons/gi";
import { VscSymbolFile } from "react-icons/vsc";
import { P } from "../../../../components/common/StyledComponent";
import { Icon } from "../../../../components/common";
import { AiFillDashboard } from "react-icons/ai";
import { useSelector } from "react-redux";
import { username } from "../../../../iam/api/auth";


interface SideMenuListItemProps {
  listItem: MenuItemInterface;
  
}

interface DisplayChildrensInterface {
  [key: string]: boolean;
}


const SideMenuItem = ({ listItem }: SideMenuListItemProps) => {
  // a state for handling open and closing
  const loggedInUser = useSelector(username)
  const [displayChildrens, setDisplayCurrentChildren] = useState<DisplayChildrensInterface>({});

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
    <FlexBox className="py-1">
     
      <FlexBoxInner className="pl-5" >
            {
              listItem.path
              ? ( 
                  <Link to={listItem.path} className="flex items-center space-x-2 cursor-pointer font-Poppins text-sm px-3" onClick={() => handleToggleChildren(listItem.label)}>
                    {
                      listItem.label === 'Dashboard' ? 
                        (
                          <AiFillDashboard size={20} className="text-gray-600"/>
                        ) : (

                          listItem && listItem.children && listItem.children.length ? (
                                <div className="">
                                   {
                                      displayChildrens[listItem.label]  
                                        ? <GiIcons.GiOpenFolder size={17} className="text-gray-600" /> 
                                        : <PiIcons.PiFolderSimplePlusFill size={17} className="text-gray-600" />
                                    }
                                </div>
                            ): (
                              <>{
                                listItem.icon ? (<>{listItem.icon}</>) : <VscSymbolFile />
                              }</> 
                            )                         
                        )
                    }
                    <div className={`flex text-[12px] ${!listItem.children && 'hover:underline hover:text-blue-500'}`}>
                      {
                        listItem.label 
                      }
                    </div>
                  </Link>
              ) : (
                <P className="text-[12px] hover:underline hover:text-blue-500 hover:bg-gray-50">{listItem.label}</P>
              )}

            {
              listItem.children && listItem.children.length > 0 && displayChildrens[listItem.label] && (
                <SideMenuList list={listItem.children} />
              
              )
            }
      </FlexBoxInner>
        
      
    </FlexBox>
  );
};

export default SideMenuItem;


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