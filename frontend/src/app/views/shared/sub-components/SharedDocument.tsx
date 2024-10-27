import React from 'react'
import { FlexBox, FlexBoxInner } from '../../../../components/common/StyledComponent'
import SharedTable from '../../../components/tables/SharedTable'
import { data } from '../../../constants/columns/useSharedColumns'
import useSharedColumns from '../../../constants/columns/useSharedColumns'

const SharedDocument = () => {
  const {sharedColumn} = useSharedColumns()
  return (
    <FlexBoxInner className='w-full h-full bg-white pt-5'>
        <SharedTable 
          data={data}
          columns={sharedColumn}
        />
    </FlexBoxInner>
  )
}

export default SharedDocument