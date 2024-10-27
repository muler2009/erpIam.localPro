import React from 'react'
import { FlexBox, FlexBoxInner, Text } from '../../../../components/common/StyledComponent'
import SharedTable from '../../../components/tables/SharedTable'
import { useGetApprovedRequestQuery } from '../../../services/requestAPISlice'
import useRequestColumns from '../../../constants/columns/useRequestColumns'


const GetApprovedRequest = () => {

    const { data } = useGetApprovedRequestQuery({current_state: "approved"})
    const {requestColumn} = useRequestColumns()

  return (
    <FlexBox className='pt-[1px] px-2 pb-5 w-full'>
      {
        data?.length ? (
          <FlexBoxInner className='request'>
            <SharedTable 
              data={data || []}
              columns={requestColumn}
              watermark='Approved'
            />
          </FlexBoxInner>
        ):(
          <FlexBox className='flex justify-center items-center'>
              <Text className='text-[#333] text-opacity-70 font-semibold'>No approved Request</Text>
          </FlexBox>
        )
      }
  </FlexBox>
  )
}

export default GetApprovedRequest