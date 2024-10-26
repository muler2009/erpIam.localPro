import React from 'react'
import useRolePolicyAttachmentColumn from '../../constants/columns/useRolePolicyAttachmentColumn'
import { FlexBox, FlexBoxInner, Text, Div } from '../../../../../components/common/StyledComponent'
import { useGetModelLevelPoliciesQuery, useGetAppLevelPolicicesQuery } from '../../../../features/policiesAPI'
import PolicyTable from '../../../../components/Table/PolicyTable'


interface ModelLevelPropsInterface {
    showEntries?: boolean;
    showSearch?: boolean;
    showActions?: boolean; 
}

const GetApplicationLevelPolicyForRole = ({showEntries, showSearch, showActions}: ModelLevelPropsInterface) => {
    const { data: appLevelPoliciesData, isSuccess, error} = useGetAppLevelPolicicesQuery()
    const { policyColumn } = useRolePolicyAttachmentColumn()

  return (
    <FlexBox className='h-full flex flex-col justify-center'>   
        {
        // Check if there is an error and handle it
        error ? (
            // Check if the error is a CustomExceptionForError from your backend
            <div className='flex flex-col items-center gap-2 mt-[12%]'>
                <Text className='flex justify-center items-center font-IBMPlexSans font-semibold text-[20px]'>
                    {(error as any)?.data?.message || "Error fetching policies!"}
                </Text>
                <p className='text-[12px] text-[#333] text-opacity-60'>you can create a new model level permission </p>


            </div>
        ) : (
            // Check if the data was successfully fetched and policies are available
            isSuccess && appLevelPoliciesData?.length > 0 ? (
                <Div className='policy'>
                    <PolicyTable 
                        data={appLevelPoliciesData || []}
                        columns={policyColumn}
                        showEntries={showEntries}
                        showSearch={showSearch}
                        showActions={showActions}
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

export default GetApplicationLevelPolicyForRole
