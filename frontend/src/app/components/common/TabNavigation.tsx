import React, {useState} from 'react'
import { TabComponentPropsInterface } from '../../models/common-models';
import * as FaIcons from 'react-icons/fa';
import * as MdIcons from "react-icons/md";
import BottomTooltip from '../../../components/common/BottomTooltip';


interface TabNavigationInterfce {
    tabs: TabComponentPropsInterface[]
    className: string;
    activeTab: string;  // style for active tab
    custom?:string;  // style fto underline the bottom or other 
    showSearchInput?: boolean;
    viewDisplay?: boolean; // boolean to display the view
    viewExportDownload?: boolean;
}

const TabNavigation = ({tabs, className, activeTab, custom, showSearchInput, viewDisplay, viewExportDownload}: TabNavigationInterfce) => {
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
      <div className='relative w-full font-Poppins text-[14px]'>
        <div className={`flex justify-between items-center  bg-[#fff] z-40 ${custom}`}>
          <div className="flex items-center space-x-3 mt-5">
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
          <div className={`pr-4 cursor-pointer flex space-x-2 items-center`}>
            <div className=''>
              {
                viewDisplay && (
                  <div className="flex items-center space-x-3">
                    <div onClick={toggleView} className="px-3 text-sm py-2 w-[35px] h-[35px] bg-button-primary flex justify-center items-center rounded-sm text-white" >
                      {
                        viewType === 'list' ? (
                          <BottomTooltip content='Table View'>
                            <span className={`text-[12px] flex justify-start items-center`}>
                              {
                                FaIcons.FaTable({
                                  size: 18
                                }) 
                              }
                              
                            </span>
                          </BottomTooltip>
                        ):(
                          <BottomTooltip content='List View'>
                            <span className={`flex justify-start items-center text-[12px]`}>
                              {
                                FaIcons.FaListAlt({
                                  size: 18
                                }) 
                              }
                             
                            </span>
                          </BottomTooltip>
                        )
                      }
                    </div>
                  </div>
                )
              }
            </div>
            <div className={`pr-2`}>
              {
                viewExportDownload && (
                  <div className={`flex space-x-1 items-center  py-2 px-4 bg-button-primary text-white rounded-sm`}>
                    {
                      MdIcons.MdCloudDownload({
                        size: 20
                      })
                    }
                    <p className={`text-[12px]`}>Download PDF</p>
                  </div>
                )
              }
            </div>
          </div>
        </div>
        <div className="bg-inherit h-full">
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



   