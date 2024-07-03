import React, {useState} from 'react'
import * as PiIcons from 'react-icons/pi'
import { roleDropDown, roleTabLink } from '../../constants/nav-links/roleConstant'
import * as RxIcons from 'react-icons/rx'
import CreateRoles from '../../modals/CreateRoles'


const RoleTab = () => {
  const [dropItems, setDropItems] = useState<boolean>(false)
  const [activeTabIndex, setActiveTabIndex] = useState<number>(0);
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false)
  const [isOpenComp, setIsOpenComp] = useState<boolean>(false)
  const [isOpen, setIsOpen] = useState<boolean>(false)


  const handleDropdownItemClick = (index: number): void => {
    setActiveTabIndex(index);
    setDropItems(false)
    setIsOpenModal(true);
  }

const changeTabIndex = (index: number): void => {
    setActiveTabIndex(index)
  }

  return ( 
    <>
    
      <div className='relative w-full font-Poppins text-[14px] '>
        <div className='flex justify-between items-center border-b-[1px] bg-gray-50 bg-opacity-50'>
          <div className='flex justify-start space-x-3 px-3 pl-5 flex-grow'>
            {
                roleTabLink?.map((roleTab, index) => (
                  <div key={index} onClick={() => changeTabIndex(index)} 
                  className={`cursor-pointer px-1  ${activeTabIndex === index ? "border-b-[2px]  bg-gray-50 border-green-600 pt-5 pb-1.5 duration-500 transition ease-in-out": "pt-5 pb-1"}`}>
                            <div className={`flex justify-start items-center space-x-1 whitespace-nowrap px-2 `}>
                              <span>{roleTab.icon}</span>
                                <h1 className='text-[13px]'>{roleTab.label}</h1>
                                {/* {
                                    roleTab.total && ( 
                                        <div className='w-4 h-4 rounded-[3px] bg-green-600 text-white flex justify-center items-center'>
                                            4
                                        </div>
                                    )
                                } */}
                            </div>
                    </div>
                ))
            }
          </div>

          <div className='relative z-20 w-[15%] justify-end flex mr-5' onClick={() => setDropItems(prev => !prev)}>
            <button className="px-2 text-[13px] flex justify-center items-center text-[#333] space-x-1 ">
            {
              isOpen ? <RxIcons.RxCaretUp size={20} /> : <RxIcons.RxCaretDown size={20} /> 
            } 
            </button> 
            {
              dropItems && (
                <div className='w-full bg-white flex flex-col absolute top-[45px] left-0 shadow-lg cursor-pointer py-2 z-10'>
                  {
                    roleDropDown.map((tab, index) => (
                      <>
                        <div key={index} 
                            className="px-2 py-2 font-Poppins text-[12px] hover:bg-gray-50 hover:bg-opacity-50 hover:text-[#333] hover:text-opacity-50"
                            onClick={() =>setIsOpen(prev => !prev)} 
                        >
                          {tab.label}
                        </div>
                        
                      </>
                  ))}
                </div>
              )
            }
          </div>
        </div>
        <div className="mx-1 bg-white p-5">
          {roleTabLink[activeTabIndex].tabContent}
        </div>     
      </div>

      <CreateRoles 
        title="Create Role"
        isOpen={isOpen}
        setIsOpen={setIsOpen}
      />

    </>
        
  )
}

export default RoleTab
