import React, {useState} from 'react'
import { TabItem, user_add } from '../../views/managment/constants/nav-links/useLink';
import { FaUsb } from 'react-icons/fa';

interface UserTabProps {
  tabs : TabItem[]
}

const UserTab = ({ tabs }: UserTabProps) => {
  const [activeTabIndex, setActiveTabIndex] = useState<number>(0);  

  const changeTabIndex = (index: number): void => {
      setActiveTabIndex(index);
  };

  return ( 
      <div className='relative w-full font-Poppins text-[14px]'>
          <div className='flex justify-between items-center border-b-[1px] bg-gray-50 bg-opacity-50 px-16'>
              <div className='flex justify-start'>
                  {tabs && tabs.map((link, index) => (
                      <div key={index} onClick={() => changeTabIndex(index)} 
                          className={`relative cursor-pointer px-1 ${activeTabIndex === index ? "border-b-[2px] border-green-600 pt-5 pb-2 duration-500 transition ease-in-out": "pt-5 pb-1"}`}>
                              <div className={`flex flex-col gap-2 justify-center items-center space-x-1 whitespace-nowrap`}>
                                  <h1 className='text-[13px] text-[#333] text-opacity-80'>{link.label}</h1>
                              </div>
                      </div>
                  ))}
              </div>  
          </div>
          <div className="mx-1 bg-white py-5">
              {tabs && tabs[activeTabIndex]?.tabContent}
          </div>     
      </div>    
  );
};

export default UserTab;
