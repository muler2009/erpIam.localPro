import React from 'react'
import SharedTable from '../../../components/tables/SharedTable'
import useRequestColumns from '../../../constants/columns/useRequestColumns'
import { useGetAllRequestQuery, useGetPendingRequestOfSenderQuery } from '../../../services/requestAPISlice'
import { FlexOuterContainer } from '../../../../components/common/StyledComponent'
import { RequestDataInterface } from '../../../models/request-model'
import { FlexBox, FlexBoxInner, Text } from '../../../../components/common/StyledComponent'

const RequestList = () => {
    const {requestColumn} = useRequestColumns()
    const {data, isSuccess, isLoading} = useGetPendingRequestOfSenderQuery()
  return (
    <FlexOuterContainer className='px-2 flex flex-col bg-white h-full'>
        
      {/* <Search /> */}
      {isLoading && <p>please wait it is loading ...</p>}
      {
          isSuccess ? (
              data?.length > 0 ? (
                <div className='request'>
                    <SharedTable
                        columns={requestColumn}
                        data={data || []}                        
                    />
                </div>
              ) : (
               
                <FlexBox className='flex flex-col justify-center items-center request border h-full'>
                  <SharedTable
                        columns={requestColumn}
                        data={data || []}                        
                    />
                  <Text className='text-[#333] text-opacity-70 font-semibold'> No Pending requests</Text>
              </FlexBox>
              )
          ) : null
      }
    
  
        
    </FlexOuterContainer>
  )
}

export default RequestList