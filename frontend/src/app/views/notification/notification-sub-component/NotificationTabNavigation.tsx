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
        <div className='relative w-full h-full font-Poppins text-[14px] bg-white mt-[2px]'>
            <div className='flex justify-between items-center bg-opacity-50 border-b '>
                <div className='flex justify-start space-x-2 flex-grow px-4'>
                {
                    notification_item?.map((notification_tab, index) => (
                        <div 
                            key={index} 
                            onClick={() => changeTabIndex(index)}  
                            className={`relative cursor-pointer px-1 ${activeTabIndex === index ? "border-b-[2px] border-green-600 pt-5 pb-1.5 duration-500 transition ease-in-out": "pt-5 pb-1"}`}>
                            <div className={`flex justify-start items-center space-x-1 whitespace-nowrap px-3`}>
                                <h1 className={`text-[13px] ${activeTabIndex === index && 'font-semibold text-blue-500' }`}>{notification_tab.label}</h1>
                            </div>
                        </div>
                    ))
                }
                </div>                  
            </div>
            
            <div className="my-2 bg-white h-full">
                {notification_item[activeTabIndex].tabContent}
            </div>     
        </div>
      </>      
    )
}


export default NotificationTabNavigation
