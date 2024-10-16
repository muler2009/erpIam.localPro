import React, { useState } from 'react'
import { useGetAllActionQuery } from '../../../../features/policiesAPI'
import { FlexBox, Text, Div } from '../../../../../components/common/StyledComponent'
import { FlexBoxInner } from '../../../../components/reusable/StyledComponent'
import MultilevelDropdown from '../../../../components/reusable/multilevel-dropdown/MultilevelDropdown'
import { accecc_level } from '../../constants/iam-menu-items/policy'

const SelectPolicyActionComponent = () => {

  const [drop, setDrop] = useState<boolean>(false)

  const {data} = useGetAllActionQuery()
  console.log(data)
  return (
    <FlexBox className='flex flex-col gap-5 mt-4'>
      <FlexBoxInner className='border-b pb-1'>
         <Text className='pt-2 font-semibold text-[16px] text-[#5e2f05]'>
            Action Allowed <span className='block font-normal text-[11px] text-[#333] text-opacity-50'>
              Specify action allowed associated with teh policy</span>
          </Text>
      </FlexBoxInner>    
      <MultilevelDropdown menu={accecc_level} />
    </FlexBox>
  )
}

export default SelectPolicyActionComponent


// <Text className='text-[14px] text-[#5e2f05]'>Access Level</Text>
// <FlexBoxInner className='flex flex-col gap-1'>
//   {
//     accecc_level?.map((access, index) => {
//       return(
//         <Div key={index} className=''>
//             <Text className='text-[12px]'>{access.label}</Text>
//         </Div> 
//       )
//     })
//   }
// </FlexBoxInner>