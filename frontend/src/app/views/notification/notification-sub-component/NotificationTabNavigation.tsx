import React, {useState} from 'react'
import { request_tab_menu } from '../../../constants/menu-items/requestMenu';
import { notification_item } from '../../../constants/menu-items/notification-menu';

const NotificationTabNavigation = () => {
    // const {data} = useGetAllUsersQuery()
    const [activeTabIndex, setActiveTabIndex] = useState<number>(0);  
    const changeTabIndex = (index: number): void => {
        setActiveTabIndex(index)
      }
  
    return ( 
      <>
        <div className='relative w-full h-full font-Poppins text-[14px] bg-[#f9f9f9] mt-[2px]'>
            <div className='flex justify-between items-center bg-opacity-50 border-b '>
                <div className='flex justify-start flex-grow pl-4 pr-2'>
                {
                    notification_item?.map((notification_tab, index) => (
                        <div 
                            key={index} 
                            onClick={() => changeTabIndex(index)}  
                            className={`relative cursor-pointer ${activeTabIndex === index ? "border-b-[2px] border-text-primary pt-5 pb-[10px] duration-500 transition ease-in-out": "pt-5 pb-1"}`}
                        >
                            <div className={`flex justify-start items-center space-x-4 whitespace-nowrap px-3`}>
                                <h1 className={`text-[13px] ${activeTabIndex === index && 'font-semibold text-text-primary' }`}>{notification_tab.label}</h1>
                            </div>
                        </div>
                    ))
                }
                </div>                  
            </div>
            
            <div className="my-2 bg- h-full">
                {notification_item[activeTabIndex].tabContent}
            </div>     
        </div>
      </>      
    )
}


export default NotificationTabNavigation
