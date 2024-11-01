import React from 'react'
import { FlexBox, FlexBoxInner, Text } from '../../../../components/reusable/StyledComponent'
import { Link , useLocation} from 'react-router-dom'
import { LuUser2 } from 'react-icons/lu'
import { RxCaretLeft } from "react-icons/rx";
import { useGetAllCustomManagedPolicesQuery } from '../../../../features/policiesAPI'


export const PolicyHeader = () => {
    const {data: total_policies} = useGetAllCustomManagedPolicesQuery()
    const location = useLocation()
    const currentPath = location.pathname === '/iam/policies'
    console.log(currentPath)

    return (
        <FlexBox className='flex justify-between items-start pt-4 px-4 mx-1 bg-gradient-to-b from-white to-gray-300 sticky top-[58px] z-40 w-full'>
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
            <FlexBox className='flex justify-center items-center divide-x-[1px] divide-black divide-opacity-50 space-x-4 mr-10'>
                    <Link to={`./`}>
                        <button className='font-semibold text-sm flex items-center text-[#5e2f05]'><RxCaretLeft size={20} />Back</button>
                    </Link>
                <FlexBoxInner>
                    <Link to={`create_policy`}>
                        <button className='btn-sm bg-green-900 text-white px-5 rounded-[3px] btn-sm text-[12px] ml-4 hover:bg-green-800 border ring-opacity-50 cursor-pointer'>
                            New Policy
                        </button>
                    </Link>
                </FlexBoxInner> 
            </FlexBox>              
        </FlexBox>
      )
}
