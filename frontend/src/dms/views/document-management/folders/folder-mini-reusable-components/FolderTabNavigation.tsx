import React, {useState} from 'react'
import { folder_tab_menu } from '../../../../constants/menu-items/folderOptions';

const FolderTabNavigation = () => {
    // const {data} = useGetAllUsersQuery()
    const [activeTabIndex, setActiveTabIndex] = useState<number>(0);  
    const changeTabIndex = (index: number): void => {
        setActiveTabIndex(index)
      }
  
    return ( 
      <>
        <div className='relative w-full h-full font-Poppins text-[14px] pt-5'>
          <div className='flex justify-between items-center  bg-opacity-50'>
            <div className='flex justify-start flex-grow'>
              {
                  folder_tab_menu?.map((folder_tab, index) => (
                      <div key={index} onClick={() => changeTabIndex(index)} 
                          className={`relative cursor-pointer px-1 ${activeTabIndex === index ? "border-b-[2px] border-green-600 pt-[10px] pb-1.5 duration-500 transition ease-in-out": "pt-[10px] pb-1"}`}>
                              <div className={`flex justify-start items-center space-x-1 whitespace-nowrap`}>
                                  <h1 className='text-[13px] px-2'>{folder_tab.label}</h1>
                                  {/* {
                                      folder_tab.total && ( 
                                          <div className={`${activeTabIndex === index ? 'relative -top-1 w-5 h-5 rounded-full bg-green-600 text-white flex justify-center items-center' : 'hidden w-4 h-4 rounded-full bg-gray-200 text-white'}`}>
                                              <p className='text-[13px]'>{folder_tab?.length}</p>
                                          </div>
                                      )
                                  } */}
                              </div>
                      </div>
                  ))
              }
            </div>                  
          </div>
          <div className="mx-1 my-2 bg-white">
            {folder_tab_menu[activeTabIndex].tabContent}
          </div>     
        </div>
      </>      
    )
}

export default FolderTabNavigation
