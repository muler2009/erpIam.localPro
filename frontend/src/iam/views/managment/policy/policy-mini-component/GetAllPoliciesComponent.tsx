import React from 'react'
import { useGetAllPoliciesQuery } from '../../../../features/policiesAPI'
import { PolicyAPIInterface } from '../../../../models/policy.model'
import SharedTable from '../../../../../dms/components/tables/SharedTable'
import usePolicyColumn from '../../constants/columns/usePolicyColumn'
import { FlexBox } from '../../../../components/reusable/StyledComponent'
import { Div } from '../../../../../components/common/StyledComponent'

const GetAllPoliciesComponent = () => {
    const {data: policies, isSuccess, isError} = useGetAllPoliciesQuery()
    const {policyColumn} = usePolicyColumn()
    
    console.log(policies)
  return (
    <FlexBox className='mx-4 mt-2 h-full '>
      {
        isSuccess && (
          policies.length > 0 ? (
            <Div className='policy'>
              <SharedTable 
                  data={policies || []}
                  columns={policyColumn}       
              />

            </Div>

          )  : null
        )
      }

    </FlexBox>
       
    )
}

export default GetAllPoliciesComponent


