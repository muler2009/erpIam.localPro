import React from 'react'
import { useGetExpiredDelegationQuery } from '../../../services/delegationAPI'
import SharedTable from '../../../components/tables/SharedTable'
import useDelegationColumn from '../../../constants/columns/useDelegationColumn'
import { FlexBox, Text, Div } from '../../../../components/common/StyledComponent'

const GetAllDelegationHistory = () => {
  const { data: expiredDelegationData, isSuccess, error} = useGetExpiredDelegationQuery()
  const {delegationColumn} = useDelegationColumn()

  return (
    <FlexBox className="mx-1 mt-1 h-[350px] border-b relative flex flex-col">
        <div className='after:content-[""] after:absoulte after:w-[50%] after:top-[50%] after:h-[1px]  after:bg-black'>
            <Text className='px-5 py-3 font-Poppins font-semibold text-[#000] text-[15px] '>
                Delegation History
                <span className='block font-normal text-[12px] text-[#333] text-opacity-50'>your delegation history </span>
            </Text>

        </div>

        <Div className="policy">
            <SharedTable 
                data={expiredDelegationData || []} // Pass empty data if none available
                columns={delegationColumn}
            />
        </Div>
    
        {
            // Display error or no data messages as needed
            error ? (
                <Div className="flex flex-col items-center gap-2 mt-[5%]">
                    <Text className="font-IBMPlexSans font-semibold text-[20px] text-red-800">
                        {(error as any)?.data?.message || "Error fetching policies!"}
                    </Text>
                    <p className="text-[12px] text-[#333] text-opacity-60">You can create a new model-level permission.</p>
                </Div>
            ) : (
                isSuccess && expiredDelegationData?.length === 0 && (
                    // Show message when no policies are available
                    <p>No policies available</p>
                )
            )
        }
    </FlexBox>
  )
}


export default GetAllDelegationHistory