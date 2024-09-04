import React from 'react'
import ProgressBar from './ProgressBar'
import { useGetApprovedRequestQuery } from '../../../services/requestAPISlice'
import { FlexBox, FlexBoxInner, Text } from '../../../../components/common/StyledComponent'

const DashboardStateStastics = () => {
    const {data} = useGetApprovedRequestQuery({current_state: 'approved'})
  
    const ldata = data || []
    const totalLength = 100; 
    const progress = ldata.length > 0 ? Math.min((ldata.length / totalLength) * 100, 100) : 0;
  return (
    <div className='flex flex-col space-y-2 w-full border rounded-[2px] px-2 pt-5'>
         <Text className='font-semibold pb-2 pt-2 pl-3 text-blue-800'>Document Stastics</Text>
        <FlexBox className='border-b rounded-[2px] w-full flex flex-col'>
            <FlexBoxInner className='flex flex-col gap-2 px-5 pb-2'>
                <Text className=''>{ldata.length}</Text>
                <ProgressBar progress={progress} color="bg-blue-700" />
                <Text className='text-[12px] font-IBMPlexSans font-semibold text-[#333] text-opacity-50 '>Approved</Text>
            </FlexBoxInner>    
        </FlexBox>

        <FlexBox className='border-b rounded-[2px] w-full flex flex-col'>
            <FlexBoxInner className='flex flex-col gap-2 px-5 py-4'>
                <Text className=''>{ldata.length}</Text>
                <ProgressBar progress={progress} color="bg-blue-700" />
                <Text className='text-[12px] font-IBMPlexSans font-semibold text-[#333] text-opacity-50 '>Pending for Approval</Text>
            </FlexBoxInner>    
        </FlexBox>

        <FlexBox className='w-full flex flex-col'>
            <FlexBoxInner className='flex flex-col gap-2 px-5 py-4'>
                <Text className=''>{ldata.length}</Text>
                <ProgressBar progress={progress} color="bg-blue-700" />
                <Text className='text-[12px] font-IBMPlexSans font-semibold text-[#333] text-opacity-50'>Rejected</Text>
            </FlexBoxInner>    
        </FlexBox>
      
    
    </div>
  )
}

export default DashboardStateStastics
