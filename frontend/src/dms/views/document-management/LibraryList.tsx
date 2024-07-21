import React from 'react'
import { FlexOuterContainer } from '../../../components/common/StyledComponent'
import { FlexInnerContainer } from '../../../iam/components/reusable/StyledComponent'
import FolderTable from '../../components/tables/FolderTable'
import useFolderColumns from '../../constants/columns/useFolderColumns'
import { useGetFolderQuery } from '../../services/dmsAPISlice'

const LibraryList = () => {

    const {data, isSuccess, isLoading} = useGetFolderQuery()
    const {folderColumn} = useFolderColumns()

  return (
    <FlexOuterContainer className='px-2 flex flex-col bg-white h-full'>
        
      {/* <Search /> */}
      {isLoading && <p>please wait it is loading ...</p>}
      {
          isSuccess ? (
              data?.length > 0 ? (
              <div>
                  <FolderTable 
                      columns={folderColumn}
                      data={data || []}                        
                  />
              </div>
              
              ) : (
                  <div className='flex flex-col'>
                      <FolderTable 
                      columns={folderColumn}
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

export default LibraryList