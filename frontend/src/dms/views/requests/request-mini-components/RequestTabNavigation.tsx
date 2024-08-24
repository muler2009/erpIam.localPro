import React, {useState} from 'react'
import { request_tab_menu } from '../../../constants/menu-items/requestMenu';

const RequestTabNavigation = () => {
    // const {data} = useGetAllUsersQuery()
    const [activeTabIndex, setActiveTabIndex] = useState<number>(0);  
    const changeTabIndex = (index: number): void => {
        setActiveTabIndex(index)
      }
  
    return ( 
      <>
        <div className='relative w-full h-full font-Poppins text-[14px] bg-white mt-[2px]'>
          <div className='flex justify-between items-center bg-opacity-50 border-b mx-5'>
            <div className='flex justify-start space-x-2 flex-grow pt-3 pb-3'>
              {
                  request_tab_menu?.map((request_tab, index) => (
                    <div key={index} onClick={() => changeTabIndex(index)}  className={`relative cursor-pointer rounded-[3px] border-[1px] py-1 px-3 bg-gray-50 ${activeTabIndex === index && 'border-primary-green  bg-white text-[#333]'}`}>
                    {/* {
                     request_tab.total && (
                       <div className={`absolute -right-1 -top-2 z-10 w-[16px] h-[16px] bg-gray-500 text-white flex justify-center items-center rounded-md ${activeTabIndex === index && 'bg-primary-green text-white'}`} >
                         <P className='text-[10px]'> {totalRoles?.length} </P> 
                       </div>
                     )
                    } */}
                     <div className={`flex justify-start items-center space-x-1 whitespace-nowrap`}>
                         <h1 className='text-[13px]'>{request_tab.label}</h1>
                     </div>
             </div>
                  ))
              }
            </div>                  
          </div>
          <div className="my-2 bg-white h-full">
            {request_tab_menu[activeTabIndex].tabContent}
          </div>     
        </div>
      </>      
    )
}


export default RequestTabNavigation
