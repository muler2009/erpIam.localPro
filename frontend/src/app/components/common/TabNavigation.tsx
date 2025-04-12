import React, {useState} from 'react'
import { Div, FlexBox, FlexBoxInner } from '../../../components/common/StyledComponent';
import { TabComponentPropsInterface } from '../../models/common-models';
import * as VscIcons from "react-icons/vsc";


interface TabNavigationInterfce {
    tabs: TabComponentPropsInterface[]
    className: string;
    activeTab: string;  // style for active tab
    custom?:string;  // style fto underline the bottom or other 
    showSearchInput?: boolean;
    component?: React.ReactNode;
    viewDisplay?: boolean; // boolean to display the view
}

const TabNavigation = ({tabs, className, activeTab, custom, showSearchInput, component, viewDisplay}: TabNavigationInterfce) => {
  const [activeTabIndex, setActiveTabIndex] = useState<number>(0);  
  const [viewType, setViewType] = useState<'list' | 'table'>('list');
  const changeTabIndex = (index: number): void => {
      setActiveTabIndex(index)
  }

  const toggleView = () => {
    setViewType((prev) => (prev === 'list' ? 'table' : 'list'));
  };
  const currentTab = tabs[activeTabIndex];

  return ( 
    <>
      <div className='relative w-full font-Poppins text-[14px] mt-[2px] h-full'>
        <div className={`flex justify-between items-center bg-opacity-50 ${custom}`}>
          <div className="flex items-center space-x-3">
            {tabs.map((tab, index) => (
              <React.Fragment key={index}>
                <div onClick={() => changeTabIndex(index)} className={`px-2 py-2 ml-3 cursor-pointer transition-all duration-300 ease-in-out ${activeTabIndex === index ? activeTab : 'border-b-2 border-transparent text-gray-500' }`} >
                  <div className='flex items-center space-x-2'>
                    <span className='text-[15px]'>{tab.icon}</span>
                    <h1 className='text-[12px]'>{tab.label}</h1>
                  </div>
                </div>
                {index !== tabs.length - 1 && ( <div className="h-5 w-[1px] bg-gray-300" />  )}
              </React.Fragment>
            ))}
          </div>
          <div>
            {
              showSearchInput && (
                <div className='w-[50%] flex items-center'>
                  <input
                    type="text"
                    className='input-md text-[13px] rounded-full px-5 font-Poppins'
                    placeholder='Search Notification'
                  />
                </div>
              )
            }
          </div>
          <div className={``}>
            {
              viewDisplay && (
                <div className="flex items-center space-x-3">
                  <div onClick={toggleView} className="px-3 py-1 text-sm" >
                    {
                      viewType === 'list' ? (
                        <span className={`text-[12px] flex justify-start items-center`}>
                          <VscIcons.VscTable size={20}/><h1>Change View</h1>
                        </span>
                      ):(
                        <span className={`flex justify-start items-center text-[12px]`}><VscIcons.VscListFlat />List</span>
                      )
                    }
                  </div>
                </div>
              )
            }

          </div>
        </div>
        <div className="my-2 bg-inherit h-full">
       
          {/* {tabs[activeTabIndex].tabContent} */}
          <div className="my-2 bg-inherit h-full">
            {typeof currentTab.tabContent === 'function'
              ? currentTab.tabContent(viewType)
              : React.cloneElement(currentTab.tabContent, { viewType })}
          </div>


        </div>
      </div>
    </>      
        )
    }

export default TabNavigation



   