import React, {useState} from 'react'
import { request_tab_menu } from '../../../constants/menu-items/requestMenu';
import { Div, FlexBox, FlexBoxInner, P } from '../../../../components/common/StyledComponent';

const RequestTabNavigation = () => {
    // const {data} = useGetAllUsersQuery()
    const [activeTabIndex, setActiveTabIndex] = useState<number>(0);  
    const changeTabIndex = (index: number): void => {
        setActiveTabIndex(index)
      }
  
    return (  
      <>
        <FlexBox className='relative font-IBMPlexSans font-semibold w-full text-[14px]'>
          <FlexBoxInner className='flex justify-between items-center bg-opacity-50 border-b-[2px] ' >
            <Div className='flex justify-start space-x-3 px-3 pl-5 flex-grow '>
              {
                  request_tab_menu?.map((request_tab, index) => (
                    <div key={index} onClick={() => changeTabIndex(index)}  
                    className={`relative cursor-pointer px-1 text-[#333] text-opacity-50 divide-x-[1px] ${activeTabIndex === index ? "text-opacity-100 border-b-[2px] border-black pt-5 pb-[2.5px] duration-500 transition ease-in-out": "pt-5 pb-1"}`}>
                      {/* {
                        request_tab.total && (
                          <div className={`absolute -right-[25%] -top-2 z-10 w-7 h-7 px-5 bg-gray-500 text-white flex justify-center items-center ${activeTabIndex === index ? 'bg-primary-green text-white': ''}`} >
                            <P className='text-[10px]'> New </P> 
                          </div>
                        )
                      } */}
                     <div className={`flex justify-start items-center space-x-1 whitespace-nowrap py-1`}>
                         <h1 className='text-[13px]'>{request_tab.label}</h1>
                     </div>
                    </div>
                  ))
              }
            </Div>                  
          </FlexBoxInner>
          <FlexBoxInner className="my-2 bg-white font-Poppins">
            {request_tab_menu[activeTabIndex].tabContent}
          </FlexBoxInner>     
        </FlexBox>
      </>      
    )
}


export default RequestTabNavigation
