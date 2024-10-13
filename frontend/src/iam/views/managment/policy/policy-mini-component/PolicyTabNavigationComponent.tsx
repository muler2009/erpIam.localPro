import React, { useState }  from 'react'
import { TabComponentPropsInterface } from '../../../../../dms/models/common-models';
import {  FlexBox, FlexBoxInner, Div, Text } from '../../../../../components/common/StyledComponent';

interface TabNavigationInterfce {
    tabs: TabComponentPropsInterface[]
}

const PolicyTabNavigationComponent = ({tabs}: TabNavigationInterfce) => {
    const [activeTabIndex, setActiveTabIndex] = useState<number>(0);  
    const changeTabIndex = (index: number): void => {
        setActiveTabIndex(index)
      }
  
    return ( 
      <>
        <FlexBox className='relative w-full font-Poppins text-[14px] bg-white mt-[2px]'>
          <FlexBoxInner className='flex justify-between items-center bg-opacity-50 border-b mx-4'>
            <Div className='flex flex-col justify-end'>
              <Text>Permission editor</Text>

            </Div>
            <FlexBoxInner className='flex justify-end space-x-2 flex-grow pt-3 pb-3'>
              {
                  tabs?.map((request_tab, index) => (
                    <div key={index} onClick={() => changeTabIndex(index)}  className={`relative cursor-pointer rounded-[3px] py-[2px] bg-gray-50 ${activeTabIndex === index && 'bg-green-900 text-white'}`}>
                     <div className={`flex justify-start items-center space-x-1 whitespace-nowrap py-1 px-4`}>
                         <h1 className='text-[13px]'>{request_tab.label}</h1>
                     </div>
                    </div>
                  ))
              }
            </FlexBoxInner>                  
          </FlexBoxInner>
          <FlexBoxInner className="my-2 bg-white">
            {tabs[activeTabIndex].tabContent}
          </FlexBoxInner>     
        </FlexBox>
      </>      
    )
}



export default PolicyTabNavigationComponent