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
import { MdArrowDropDown, MdArrowDropUp } from "react-icons/md";
import { useGetNotificationQuery } from "../../../services/notificationAPISlice";


interface SideMenuListItemProps {
  listItem: MenuItemInterface;
  
}

interface DisplayChildrensInterface {
  [key: string]: boolean;
}


const SideMenuItem = ({ listItem }: SideMenuListItemProps) => {
  const [active, setActive] = useState(null)
  // a state for handling open and closing
  const loggedInUser = useSelector(username)
  const [displayChildrens, setDisplayCurrentChildren] = useState<DisplayChildrensInterface>({});
  const {data} = useGetNotificationQuery()
  const notifications = data || []
  const unread = notifications?.filter(notification => notification.notification_read === false)


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

  const handleActiveLink = useCallback((index : any) => {
    setActive(index)
  }, [active])

  return (
    <FlexBox className="flex flex-col ">
      <FlexBoxInner className="pl-7" >
            {
              listItem.path
              ? ( 
                  <Link to={listItem.path} className={`flex justify-between items-center  py-2 cursor-pointer font-Poppins text-sm px-3 hover:bg-gray-100  `} onClick={() => handleToggleChildren(listItem.label)}>
                    <FlexBoxInner className="flex space-x-3">
                        {
                          listItem.label === 'Dashboard' ? ( <AiFillDashboard size={20} className="text-gray-600"/> ) : (

                              listItem && listItem.children && listItem.children.length ? (
                                    <div className="flex justify-between">
                                      {
                                          displayChildrens[listItem.label] 
                                            ? (
                                                <>
                                                  {
                                                    listItem.icon ? (<>{listItem.icon}</>) : <GiIcons.GiOpenFolder size={17} className="text-gray-600" />

                                                  }
                                                </>
                                              )
                                            : (
                                                <>
                                                {
                                                  listItem.icon ? (<>{listItem.icon}</>) : <PiIcons.PiFolderSimplePlusFill size={17} className="text-gray-600" />
                                                }
                                              </>
                                            )
                                            
                                        }
                                    </div>
                                ): (
                                  <div className="flex items-center">
                                    {
                                      listItem.icon ? (<>{listItem.icon}</>) : <VscSymbolFile />
                                    }
                                  </div> 
                                )                         
                            )
                        }
                      <div className={`text-[12px]`}>
                        {listItem.label}
                      </div>
                    </FlexBoxInner>

                    <FlexBoxInner className="group">
                      {
                        listItem && listItem.children && listItem.children.length ? (
                          <>
                            {
                              displayChildrens[listItem.label] ? (<MdArrowDropUp />) : (<MdArrowDropDown />)
                            }
                          
                          </>
                        ) : null
                      }
                      {
                        listItem.label === "Notification" && (
                          <div className={`px-2 text-white text-[12px] rounded-[3px] ${unread.length > 0 ? 'bg-red-500': 'bg-gray-200'}`}>{unread?.length} New</div>
                         
                        )
                      }
                    </FlexBoxInner>
                  </Link>
              ) : (
                <P className="text-[12px] hover:bg-gray-50">{listItem.label}</P>
              )
            }

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