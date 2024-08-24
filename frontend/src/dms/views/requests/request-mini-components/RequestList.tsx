import React from 'react'
import SharedTable from '../../../components/tables/SharedTable'
import useRequestColumns from '../../../constants/columns/useRequestColumns'
import { useGetAllRequestQuery } from '../../../services/requestAPISlice'
import { FlexOuterContainer } from '../../../../components/common/StyledComponent'
import { RequestDataInterface } from '../../../models/request-model'

const RequestList = () => {
    const {requestColumn} = useRequestColumns()
    const {data, isSuccess, isLoading} = useGetAllRequestQuery()
  return (
    <FlexOuterContainer className='px-2 flex flex-col bg-white h-full'>
        
      {/* <Search /> */}
      {isLoading && <p>please wait it is loading ...</p>}
      {
          isSuccess ? (
              data?.length > 0 ? (
                <div className='shared'>
                    <SharedTable
                        columns={requestColumn}
                        data={data || []}                        
                    />
                </div>
              ) : (
                <div className='flex flex-col shared'>
                    <SharedTable 
                        columns={requestColumn}
                        data={data || []}                                          
                    />
                    <p className='text-black text-center text-[18px] text-opacity-50'>No User Registered available.</p>                      
                </div>
              )
          ) : null
      }
    
  
        
    </FlexOuterContainer>
  )
}

export default RequestList