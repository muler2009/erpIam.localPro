import React from 'react'
import { useGetAllDelegationQuery } from '../../../services/delegationAPI'
import SharedTable from '../../../components/tables/SharedTable'
import useDelegationColumn from '../../../constants/columns/useDelegationColumn'
import { FlexBox, Text, Div } from '../../../../components/common/StyledComponent'

const GetAllActiveDelegation = () => {
  const { data: delegationData, isSuccess, error} = useGetAllDelegationQuery()
  const {delegationColumn} = useDelegationColumn(delegationData)

  return (
    <FlexBox className="mx-1 mt-1 relative flex flex-col">
        <Text className='px-5 py-3 font-Poppins font-semibold text-[#000] text-[15px] '>
            Active Delegation
            <span className='block font-normal text-[12px] text-[#333] text-opacity-50 whitespace-nowrap'>your current active delegation </span>
        </Text>
        <Div className="policy">
            <SharedTable 
                data={delegationData || []} // Pass empty data if none available
                columns={delegationColumn}
            />
        </Div>
    
        {
            // Display error or no data messages as needed
            error ? (
                <Div className="flex flex-col items-center gap-2">
                    <Text className="font-IBMPlexSans font-semibold text-[20px] text-red-800">
                        {(error as any)?.data?.message || "Error fetching policies!"}
                    </Text>
                    <p className="text-[12px] text-[#333] text-opacity-60">You haven't made any delegation currently</p>
                </Div>
            ) : (
                isSuccess && delegationData?.length === 0 && (
                    // Show message when no policies are available
                    <p>No policies available</p>
                )
            )
        }
    </FlexBox>
  )
}

export default GetAllActiveDelegation