import React, {useState} from 'react'
import { FlexBox, FlexBoxInner } from '../../../components/common/StyledComponent';
import { TabComponentPropsInterface } from '../../models/common-models';

interface TabNavigationInterfce {
    tabs: TabComponentPropsInterface[]
    className: string;
    activeTab: string;
    custom?:string;
}

const TabNavigation = ({tabs, className, activeTab, custom}: TabNavigationInterfce) => {
        const [activeTabIndex, setActiveTabIndex] = useState<number>(0);  
        const changeTabIndex = (index: number): void => {
            setActiveTabIndex(index)
          }
      
        return ( 
          <>
            <FlexBox className='relative w-full font-Poppins text-[14px] mt-[2px]'>
              <FlexBoxInner className={`flex justify-between items-center bg-opacity-50 ${custom}`}>
                <FlexBoxInner className='flex justify-start space-x-2 flex-grow pt-3'>
                  {
                      tabs?.map((tab, index) => (
                        <div key={index} onClick={() => changeTabIndex(index)}  className={`${className} ${activeTabIndex === index && activeTab}`}>
                         <div className={`flex justify-start items-center space-x-1 whitespace-nowrap py-1`}>
                             <h1 className='text-[13px] flex items-center'>
                              <span className='text-[18px] pr-2'>{tab.icon}</span>
                              {tab.label}
                            </h1>
                         </div>
                        </div>
                      ))
                  }
                </FlexBoxInner>                  
              </FlexBoxInner>
              <FlexBoxInner className="my-2 bg-inherit">
                {tabs[activeTabIndex].tabContent}
              </FlexBoxInner>     
            </FlexBox>
          </>      
        )
    }

export default TabNavigation