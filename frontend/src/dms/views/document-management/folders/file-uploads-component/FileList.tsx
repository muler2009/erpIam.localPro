import React from 'react'
import { FlexOuterContainer } from '../../../../../components/common/StyledComponent'
import { useGetAllFilesQuery } from '../../../../services/fileAPISlice'
import SharedTable from '../../../../components/tables/SharedTable'
import useFileColumns from '../../../../constants/columns/useFileColumns'
import FileTable from '../../../../components/tables/FileTable'


const FileList = () => {

    const { data, isLoading, isSuccess } = useGetAllFilesQuery()
    const {fileColumn} = useFileColumns()
    return (
        <FlexOuterContainer className='px-2 flex flex-col bg-white h-full'>
            
          {/* <Search /> */}
          {isLoading && <p>please wait it is loading ...</p>}
          {
              isSuccess ? (
                  data?.length > 0 ? (
                  <div>
                      <FileTable 
                          columns={fileColumn}
                          data={data || []}                        
                      />
                  </div>
                  
                  ) : (
                      <div className='flex flex-col'>
                          <FileTable 
                          columns={fileColumn}
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

export default FileList