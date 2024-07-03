import React, { useCallback, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { SideBar } from "../../constants/sidebar";

interface SidemenuProps {
  sideParent: SideBar;
  controller: boolean;
  handleActiveLink: (index: any) => void
}


const Submenu = (props: SidemenuProps) => {
  
    const { sideParent, controller } = props
    const [active, setActive] = useState(null)
    const [subnav, setSubnav] = useState<boolean>(false);
    const showSubnav = () => setSubnav(!subnav);

    const handleActiveLink = useCallback((index : any) => {
      setActive(index)
    }, [active])
  
  
    return(
      <div className='flex flex-col text-[13px] font-Poppins' >
        <Link 
          to={sideParent.path || ""} 
          onClick={sideParent.submenu && showSubnav} 
          className={`flex justify-between ${!controller && 'text-[#333] hover:bg-inherit hover:border-none focus:border-none flex justify-center'} text-black text-opacity-50 font-semibold hover:bg-white hover:border-r-[5px] hover:bg-opacity-50 hover:text-[#333] hover:scale-[1.005] focus:text-[#333] focus:border-r-[5px] focus:border-green-700`}> 
              <div className={`flex items-center justify-center space-x-4 py-3 px-3 `}>
                <span className={`text-[18px]`}>{sideParent.icon}</span>
                <h2 className={`duration-500 font-Poppins font-normal text-[13px] ${!controller && 'opacity-0 translate-x-28 overflow-hidden'}`}>{sideParent.label}</h2>
              </div>
          
              <div className={`flex pr-4 items-center ${!controller && 'opacity-0 translate-x-28 overflow-hidden'}`}>
                {sideParent.submenu && subnav
                  ? sideParent.iconOpened
                  : sideParent.submenu
                  ? sideParent.iconClosed
                  : null}
                </div>
        </Link>
        <div className="" onClick={handleActiveLink}>
          {
            subnav && 
              sideParent.submenu?.map((item, index) => {
                return(
                  
                  <Link 
                    to={item.path} 
                    key={index} 
                    className={`pl-12 text-[#333] text-opacity-70 flex items-center space-x-3 hover:rounded-none focus:border-r-[5px] hover:bg-[#ebecf0]`} 
                  >
                  
                    <h1 className={`py-2 text-[13px] duration-500 font-Poppins  ${!controller && 'opacity-0 translate-x-28 overflow-hidden'}`}>{item.label}</h1>
                  </Link>
                )
              }) 
          }
        </div>
      </div>     
    )
}


  export default Submenu;
