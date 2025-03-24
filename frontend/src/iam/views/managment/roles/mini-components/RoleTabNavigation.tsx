import React, {useState} from 'react'
import { role_tab } from '../../constants/iam-menu-items/roles';
import { FlexBox, FlexBoxInner, FlexOuterContainer, P } from '../../../../components/reusable/StyledComponent';
import { useGetAllRolesQuery } from '../../../../features/roleAPI';

const RoleTabNavigation = () => {
    const [activeTabIndex, setActiveTabIndex] = useState<number>(0);  
    const {data: totalRoles } = useGetAllRolesQuery()
    const changeTabIndex = (index: number): void => {
        setActiveTabIndex(index)
      }
  
    return ( 
      <div className='relative w-full font-Poppins text-[14px]'>
        <div className='flex justify-between items-center shadow-sm pt-2 mx-1'>
          <div className='flex justify-start space-x-2 flex-grow pt-3 pl-2 divide-x-[1px]'>
            {
                role_tab?.map((roleTab, index) => (
                    <div key={index} onClick={() => changeTabIndex(index)}  className={`relative cursor-pointer py-[5px] rounded-sm ${activeTabIndex === index ? 'bg-blue-900 text-white': 'text-[#333] text-opacity-70'}`}>
                            {
                              roleTab.total && (
                                <div className={`absolute -right-1 -top-2 z-10 w-[16px] h-[16px] bg-gray-500 text-white flex justify-center items-center rounded-md ${activeTabIndex === index && 'bg-primary-green text-white'}`} >
                                  <P className='text-[10px]'> {totalRoles?.length} </P> 
                                </div>
                              )
                            }
                            <div className={`flex justify-start items-center space-x-1 whitespace-nowra px-3 py-[3px]`}>
                                <h1 className='text-[13px]'>{roleTab.label}</h1>
                            </div>
                    </div>
                ))
            }
          </div> 
          <div className={`flex-grow`}>
            <input 
              className='px-5 py-[8px] text-[12px] rounded-full font-normal text-gray-700 bg-white border border-solid border-gray-300 transition ease-in-out m-0 focus:text-gray-700 focus:outline-none focus:bg-white ' 
              placeholder='Search roles'
            />
          </div>

                          
        </div>
        <div className="mx-1 my-2 bg-white pr-5 pt-5">
          {role_tab[activeTabIndex].tabContent}
        </div>     
      </div>   
    )
}

export default RoleTabNavigation
