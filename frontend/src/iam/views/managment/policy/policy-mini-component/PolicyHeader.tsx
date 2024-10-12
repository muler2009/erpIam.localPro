import React from 'react'
import { FlexBox, FlexBoxInner, Text } from '../../../../components/reusable/StyledComponent'
import { Link } from 'react-router-dom'
import { LuUser2 } from 'react-icons/lu'
import { useGetAllPoliciesQuery } from '../../../../features/policiesAPI'


export const PolicyHeader = () => {
    const {data: total_policies} = useGetAllPoliciesQuery()
    return (
        <FlexBox className='flex justify-between items-start pt-4 px-4 mx-4 bg-gradient-to-b from-white to-gray-300'>
            <FlexBox className='flex flex-col gap-4 px-2'>
                <FlexBoxInner className='flex space-x-2 items-start'>
                    <LuUser2 size={25} className='text-primary-green' />
                    <Text className='font-Poppins font-semibold text-2xl '>
                    OiAMs | <span className='text-[16px] font-normal'>Policies ({total_policies?.length})</span>
                    <span className='text-[#333] text-[12px] font-Poppins text-opacity-50 flex flex-col font-normal'>
                        Policy is an object in edms used to define a custom permisssion and attach to user</span>
                    </Text>
                </FlexBoxInner>
            </FlexBox>
            <FlexBox className='flex justify-center items-center divide-x-[1px] space-x-4 mr-10'>
                <h6 className='font-Rubik font-semibold text-sm'>
                    <Link to={`./`}>Home</Link>
                </h6>
                <FlexBoxInner>
                    <Link to={`create_policy`}>
                        <button className='btn-sm bg-green-500 text-white px-5 rounded-[3px] btn-sm text-[12px] ml-4 hover:bg-green-600 border ring-opacity-50 cursor-pointer'>
                            New Policy
                        </button>
                    </Link>
                </FlexBoxInner> 
            </FlexBox>
    
            {/* {
                isOpen && ( 
                    <UserAccountContextProvider>
                        <CreateUserIdentity isOpen={isOpen} openCreateIdentity={openCreateIdentity} title="New identity" /> 
                    </UserAccountContextProvider>
                )
            } */}
              
        </FlexBox>
      )
}
