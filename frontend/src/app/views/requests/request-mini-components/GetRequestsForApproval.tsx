import React from 'react'
import { FlexBox, FlexBoxInner, Text } from '../../../../components/common/StyledComponent'
import SharedTable from '../../../components/tables/SharedTable'
import { useGetRequestsRecivedForApprovalQuery } from '../../../services/requestAPISlice'
import useRequestReceivedColumn from '../../../constants/columns/useRequestReceivedColumn'

const GetRequestsForApproval = () => {
    const { data } = useGetRequestsRecivedForApprovalQuery({ current_state: 'pending for approval' })
    const {requestApprovalColumn} = useRequestReceivedColumn()
    return (
        <FlexBox className='pt-[1px]  pb-5 w-full overflow-y-scroll'>
           
          {
            data?.length ? (
              <FlexBoxInner className='request-recieved'>
                <SharedTable 
                  data={data || []}
                  columns={requestApprovalColumn}
                />
              </FlexBoxInner>
            ):(
              <FlexBox className='flex justify-center items-center h-full'>
                  <Text className='text-[#333] text-opacity-70'>ለማጽደቅ ምንም ጥያቄዎች የሉዎትም</Text>
              </FlexBox>
            )
          }
     
        
      </FlexBox>
      )
}

export default GetRequestsForApproval