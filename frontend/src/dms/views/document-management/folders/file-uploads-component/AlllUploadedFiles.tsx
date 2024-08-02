import React from 'react'
import { useGetAllFilesQuery } from '../../../../services/fileAPISlice'
import FileList from './FileList'
import { FlexOuterContainer } from '../../../../../components/common/StyledComponent'

const AlllUploadedFiles = () => {

  const {data} = useGetAllFilesQuery()

  return (
    <FlexOuterContainer className='pt-5'>

        <FileList />
    </FlexOuterContainer>
  )
}

export default AlllUploadedFiles