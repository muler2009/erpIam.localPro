import React from 'react'
import { useGetAllCustomManagedPolicesQuery } from '../../../../features/policiesAPI'
import usePolicyColumn from '../../constants/columns/usePolicyColumn'
import { Div, FlexBox, Text } from '../../../../../components/common/StyledComponent'
import PolicyTable from '../../../../components/Table/PolicyTable'

const GetAllPoliciesComponent = () => {
    const {data: custom_policies, isSuccess, isError} = useGetAllCustomManagedPolicesQuery()
    const {policyColumn} = usePolicyColumn()
    
  return (
    <FlexBox className='mx-4 mt-2 h-full'>
    
      {
        isSuccess && (
          custom_policies.length > 0 ? (
            <Div className='policy'>
              <PolicyTable 
                  data={custom_policies || []}
                  columns={policyColumn}       
              />
            </Div>

          )  : (
            <>
              <Div className='policy '>
              <Text className='flex justify-center items-center text-[20px] text-red-800 font-IBMPlexSans font-semibold'>Policy not found</Text> 
              </Div>
            
            </>
          )
        )
      }

    </FlexBox>
       
    )
}

export default GetAllPoliciesComponent


