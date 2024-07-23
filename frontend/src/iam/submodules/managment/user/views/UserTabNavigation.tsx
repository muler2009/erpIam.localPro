import React, {useState} from 'react'
import { userTabLink } from '../../constants/nav-links/usertabLink';
import { useGetAllUsersQuery } from '../../../../features/userAPI';

const UserTabNavigation = () => {
    const {data} = useGetAllUsersQuery()
    const [activeTabIndex, setActiveTabIndex] = useState<number>(0);  
    const changeTabIndex = (index: number): void => {
        setActiveTabIndex(index)
      }
  
    return ( 
      <>
        <div className='relative w-full font-Poppins text-[14px]'>
          <div className='flex justify-between items-center border-b-[1px] bg-gray-50 bg-opacity-50'>
            <div className='flex justify-start space-x-5 px-3 pl-5 flex-grow'>
              {
                  userTabLink?.map((roleTab, index) => (
                      <div key={index} onClick={() => changeTabIndex(index)} 
                          className={`relative cursor-pointer px-1 ${activeTabIndex === index ? "border-b-[2px] border-green-600 pt-5 pb-1.5 duration-500 transition ease-in-out": "pt-5 pb-1"}`}>
                              <div className={`flex justify-start items-center space-x-1 whitespace-nowrapS`}>
                                  <h1 className='text-[13px]'>{roleTab.label}</h1>
                                  {
                                      roleTab.total && ( 
                                          <div className={`${activeTabIndex === index ? 'relative -top-1 w-5 h-5 rounded-full bg-green-600 text-white flex justify-center items-center' : 'hidden w-4 h-4 rounded-full bg-gray-200 text-white'}`}>
                                              <p className='text-[13px]'>{data?.length}</p>
                                          </div>
                                      )
                                  }
                              </div>
                      </div>
                  ))
              }
            </div>                  
          </div>
          <div className="mx-1 my-2 bg-white">
            {userTabLink[activeTabIndex].tabContent}
          </div>     
        </div>
      </>      
    )
}

export default UserTabNavigation
