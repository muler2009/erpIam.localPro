import React, { useState }  from 'react'
import { TabComponentPropsInterface } from '../../../../../app/models/common-models';
import {  FlexBox, FlexBoxInner, Div, Text } from '../../../../../components/common/StyledComponent';

interface TabNavigationInterfce {
    tabs: TabComponentPropsInterface[]
    className?: string;
    description?: boolean;
    title?: string;
    component?: React.ReactNode;
}

const PolicyTabNavigationComponent = ({tabs, className, description, title, component}: TabNavigationInterfce) => {
    const [activeTabIndex, setActiveTabIndex] = useState<number>(0);  
    const changeTabIndex = (index: number): void => {
        setActiveTabIndex(index)
      }
  
    return ( 
      <>
        <FlexBox className='w-full font-Poppins text-[14px] bg-white mt-[2px]'>
          <FlexBoxInner className='flex justify-between items-end bg-opacity-50 border-b mx-4'>
            <Div className=''>
                {
                  description ? component : null
                }
            </Div>
            <Div className={className}>
              {
                  tabs?.map((request_tab, index) => (
                    <div key={index} onClick={() => changeTabIndex(index)}  className={`relative border cursor-pointer rounded-[3px] py-[2px] bg-gray-50 ${activeTabIndex === index && 'bg-green-900 text-white'}`}>
                     <div className={`flex justify-start items-center space-x-1 whitespace-nowrap py-1 px-4`}>
                         <h1 className='text-[13px]'>{request_tab.label}</h1>
                     </div>
                    </div>
                  ))
              }
            </Div>                  
          </FlexBoxInner>
          <FlexBoxInner className="my-2 bg-white">
            {tabs[activeTabIndex].tabContent}
          </FlexBoxInner>     
        </FlexBox>
      </>      
    )
}



export default PolicyTabNavigationComponent