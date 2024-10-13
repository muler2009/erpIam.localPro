import React from 'react'
import { useOutletContext, Link, useNavigate } from 'react-router-dom'
import * as MdIcons from 'react-icons/md'
import { FlexOuterContainer, Text, FlexBox, Div, P } from '../../../../../components/common/StyledComponent';
import * as FaIcons from "react-icons/fa6";

interface OutletContextType {
  selectedResource: string;
 
}

const NewPermissionCreationOnResourceComponent = () => {
    const { selectedResource } = useOutletContext<OutletContextType>();
   

  
  return (
    <>
      {
        selectedResource && (
            <FlexOuterContainer className='flex justify-between items-center px-4 border-b'>
              <FlexBox className='flex flex-col'>
                <Div className='flex'>
                    <MdIcons.MdPolicy size={20} />
                    <Text className='text-[16px] font-semibold text-[#5e2f05] ml-2 relative'>
                      {selectedResource}
                      <span className='ml-8 w-10 h-5 bg-primary-green flex justify-center items-center absolute -top-2 left-[70%] rounded-[4px]'>
                          <p className='px-3 text-white text-[12px]'>Allow</p>
                      </span>
                    </Text> 
                </Div>
                <P className='text-[12px] font-IBMPlexSans ml-7 text-[#333] text-opacity-55'>Specify what actions can be performed on selected ressources</P>
              </FlexBox>
              <FaIcons.FaTrashCan size={16}  onClick={() => window.location.reload()} />              
            </FlexOuterContainer>
          )
        }

        <FlexBox className='flex flex-col'>

        </FlexBox>
    
    </>
  )
}

export default NewPermissionCreationOnResourceComponent