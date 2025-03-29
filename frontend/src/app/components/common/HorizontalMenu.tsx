import { useState } from 'react';
import { CommonMenuItemsProps } from '../../../iam/models/role.models';
import { Link } from 'react-router-dom';

interface HorizontalMenuInterface {
    menuItems: CommonMenuItemsProps[]
    className: string;
    active: string;  // style for active tab
    custom?:string;  // style fto underline the bottom or other 
}

const HorizontalMenu = ({menuItems, className, active} : HorizontalMenuInterface) => {
    const [activeTabIndex, setActiveTabIndex] = useState<number>(0);  
    const changeTabIndex = (index: number): void => {
        setActiveTabIndex(index)
    }
  return (
    <div className='flex justify-start py-3 shadow-sm ml-2'>
            {
              menuItems?.map((menu, index) => (
                <Link key={index} to={menu.path || ''} onClick={() => changeTabIndex(index)}  className={`px-1 ${activeTabIndex === index ? active : className}`}>
                  <div className={`flex justify-center items-center whitespace-nowrap py-2 px-2 `}>
                      <h1 className='text-[13px] flex items-center'>
                      <span className='text-[15px] pr-2'>{menu.icon}</span>
                      {menu.label}
                    </h1>
                  </div>
                </Link>
              ))
            }
          </div> 
  )
}

export default HorizontalMenu