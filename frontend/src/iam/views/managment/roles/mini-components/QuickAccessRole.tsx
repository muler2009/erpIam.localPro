import React from 'react'
import { FlexBox, FlexBoxInner } from '../../../../components/reusable/StyledComponent'
import CommonTable from '../../../../components/Table/Table'
import { useGetAllRolesQuery } from '../../../../features/roleAPI'
import useRoleColumn from '../../constants/columns/useRoleColumn'

const QuickAccessRole = () => {
    const { data, isLoading, isSuccess } = useGetAllRolesQuery()
    const {roleColumn} = useRoleColumn()
  return (
   <FlexBox className=''>
      {isLoading && <p>please wait it is loading ...</p>}
      <FlexBoxInner className='role'>
        {
            isSuccess ? (
                data?.length > 0 ? (
               
                    <CommonTable 
                        columns={roleColumn}
                        data={data || []}                        
                    />
                ) : (
                    <div className='flex flex-col'>
                        <CommonTable 
                          columns={roleColumn}
                          data={data || []}                                          
                       />
                        <p className='text-black text-center text-[18px] text-opacity-50'>No Role Found.</p>                      
                    </div>
                )
            ) : null
        }

      </FlexBoxInner>
    
   </FlexBox>
  )
}

export default QuickAccessRole

