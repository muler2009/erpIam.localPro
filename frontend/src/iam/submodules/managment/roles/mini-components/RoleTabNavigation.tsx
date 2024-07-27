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
      // ${activeTabIndex === index ? "border-b-[2px] border-primary-green bg-gray-50 rounded-t-[5px] text-text-primary pt-[14px] pb-1.5 duration-500 transition ease-in-out": "pt-5 pb-1"}
    
        <FlexOuterContainer className='relative w-full font-Poppins text-[14px]'>
          <FlexBox className='flex justify-between items-center '>
            <FlexBoxInner className='flex justify-start space-x-2 px-3 flex-grow pt-3'>
              {
                  role_tab?.map((roleTab, index) => (
                      <div key={index} onClick={() => changeTabIndex(index)}  className={`relative cursor-pointer rounded-md border-[1px] py-2 px-3 bg-gray-50 ${activeTabIndex === index && 'border-primary-green  bg-white text-[#333]'}`}>
                             {
                              roleTab.total && (
                                <div className={`absolute -right-1 -top-2 z-10 w-[16px] h-[16px] bg-gray-500 text-white flex justify-center items-center rounded-md ${activeTabIndex === index && 'bg-primary-green text-white'}`} >
                                  <P className='text-[10px]'> {totalRoles?.length} </P> 
                                </div>
                              )
                             }
                              <div className={`flex justify-start items-center space-x-1 whitespace-nowrap`}>
                                  <h1 className='text-[13px]'>{roleTab.label}</h1>
                              </div>
                      </div>
                  ))
              }
            </FlexBoxInner> 
            <FlexBoxInner className='pr-10 flex-grow pt-3'>
              <input className='input-md' />
            </FlexBoxInner>                 
          </FlexBox>
          <FlexBox className="mx-1 my-2 bg-white pr-5 pt-5">
            {role_tab[activeTabIndex].tabContent}
          </FlexBox>     
        </FlexOuterContainer>
          
    )
}

export default RoleTabNavigation
