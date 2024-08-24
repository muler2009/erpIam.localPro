import React from 'react'
import { FlexBox, FlexBoxInner, FlexOuterContainer, Text, P } from '../../../../components/common/StyledComponent'
import RequestList from './RequestList'
import SharedTable from '../../../components/tables/SharedTable'
import { useGetUnApprovedRequestQuery } from '../../../services/requestAPISlice'
import useRequestSendApproval from '../../../constants/columns/useRequestSendApproval'


const UnApprovedByOwner = () => { 
  const {data, isSuccess} = useGetUnApprovedRequestQuery()
  const { requestSendColumn } = useRequestSendApproval()
  
  return (
   <FlexOuterContainer className='bg-white flex flex-col'>
      <FlexBox className='pb-2 border-b mx-2 pl-5 pt-5'>
        <FlexBoxInner className='text-[15px] flex space-x-2 relative'>    
          <Text className='font-IBMPlexSans font-semibold text-[16px] leading-[1.5]'>Unapproved requests</Text>      
          <span className='absolute -top-2 left-[10%] flex pl-2'>
            { 
              isSuccess ? (
                data?.length && (
                  <div className='bg-red-600 rounded-full w-7 h-7 flex justify-center items-center'>
                    <Text className='px-3 text-white text-[12px] font-IBMPlexSans flex py-1'>
                      {data.length} 
                     
                    </Text>
                  </div>
                  )): null
            }
          </span>
        </FlexBoxInner>
        <p className='text-[11px] text-[#333] text-opacity-70 '>Saved request for owner approval</p>
      </FlexBox>
      <FlexBox className='pt-[1px] px-2 pb-5 h-[150px] w-full overflow-y-scroll'>
       
        {
          isSuccess ? (
            data?.length && (
              <FlexBoxInner className='request'>
                <SharedTable 
                  data={data || []}
                  columns={requestSendColumn}
                />
              </FlexBoxInner>
            
          )):(
              <FlexBox className='flex justify-center items-center h-full'>
                  <Text className='text-[#333] text-opacity-70 font-semibold'>No saved requests for approval</Text>
              </FlexBox>
            )
        }        
      </FlexBox>
   </FlexOuterContainer>
  )
}

export default UnApprovedByOwner