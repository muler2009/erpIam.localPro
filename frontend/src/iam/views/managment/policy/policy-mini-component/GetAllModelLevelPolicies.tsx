import React from 'react'
import { Link } from 'react-router-dom'
import { useGetModelLevelPoliciesQuery } from '../../../../features/policiesAPI'
import usePolicyColumn from '../../constants/columns/usePolicyColumn'
import { FlexBox, Div, Text } from '../../../../../components/common/StyledComponent'
import PolicyTable from '../../../../components/Table/PolicyTable'


const GetAllModelLevelPolicies = () => {

const { data: modelLevelPolicyData, isSuccess, error} = useGetModelLevelPoliciesQuery()
const { policyColumn } = usePolicyColumn()

  return (
    <FlexBox className='mx-4 mt-2 h-full flex flex-col justify-center'>   
        {
        // Check if there is an error and handle it
        error ? (
            // Check if the error is a CustomExceptionForError from your backend
            <div className='flex flex-col items-center gap-2 mt-[12%]'>
                <Text className='flex justify-center items-center font-IBMPlexSans font-semibold text-[20px]'>
                    {(error as any)?.data?.message || "Error fetching policies!"}
                </Text>
                <p className='text-[12px] text-[#333] text-opacity-60'>you can create a new model level permission </p>
                <Link to={`create_policy`} className='pt-3'>
                    <button className='bg-blue-500 text-white px-5 rounded-[3px] text-[12px] ml-4 border ring-opacity-50 cursor-pointer'>
                        Create Policy
                    </button>
                </Link>

            </div>
        ) : (
            // Check if the data was successfully fetched and policies are available
            isSuccess && modelLevelPolicyData?.length > 0 ? (
                <Div className='policy'>
                    <PolicyTable 
                        data={modelLevelPolicyData || []}
                        columns={policyColumn}
                    />
                </Div>
            ) : (
                // Show a message when there are no policies available
                isSuccess && <p>No policies available</p>
            )
        )
    }
  </FlexBox>
  )
}

export default GetAllModelLevelPolicies

