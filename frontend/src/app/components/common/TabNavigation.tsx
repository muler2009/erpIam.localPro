import React, {useState} from 'react'
import { Div, FlexBox, FlexBoxInner } from '../../../components/common/StyledComponent';
import { TabComponentPropsInterface } from '../../models/common-models';

interface TabNavigationInterfce {
    tabs: TabComponentPropsInterface[]
    className: string;
    activeTab: string;  // style for active tab
    custom?:string;  // style fto underline the bottom or other 
    showSearchInput?: boolean;
}

const TabNavigation = ({tabs, className, activeTab, custom, showSearchInput}: TabNavigationInterfce) => {
  const [activeTabIndex, setActiveTabIndex] = useState<number>(0);  
  const changeTabIndex = (index: number): void => {
      setActiveTabIndex(index)
    }

  return ( 
    <>
      <div className='relative w-full font-Poppins text-[14px] mt-[2px] h-full'>
        <div className={`flex justify-between items-center bg-opacity-50 ${custom}`}>
          <div className='flex justify-center px-2 pt-3 pb-2'>
            {
              tabs?.map((tab, index) => (
                <div key={index} onClick={() => changeTabIndex(index)} >
                  <div  className={`px-3 border-r ${tabs.length - 1 === index ? 'border-none' : 'border-r'}`}>
                    <div className={`flex justify-center items-center whitespace-nowrap ${activeTabIndex === index ? activeTab : className}`}>
                        <h1 className='text-[13px] flex items-center'>
                        <span className='text-[15px] pr-2'>{tab.icon}</span>
                        {tab.label}
                      </h1>
                    </div>

                  </div>
                </div>
              ))
            }
          </div> 

          {
            showSearchInput && (
              <div className='w-[50%] flex items-center'>   
                  <input type="text"  className='input-md text-[13px] rounded-full px-5 font-Poppins' placeholder='Search Notification'/>
              </div>                    
            )
          }
        </div>
        <div className="my-2 bg-inherit h-full">
          {tabs[activeTabIndex].tabContent}
        </div>     
      </div>
    </>      
        )
    }

export default TabNavigation