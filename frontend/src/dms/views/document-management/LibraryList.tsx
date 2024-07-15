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
    <FlexOuterContainer className='mt-1 px-2 py-3 flex flex-col bg-white h-full'>
        <div>  
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
    
  </div>
        
    </FlexOuterContainer>
  )
}

export default LibraryList