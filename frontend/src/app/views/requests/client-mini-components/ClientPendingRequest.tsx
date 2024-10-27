import React from 'react'
import { Div } from '../../../../components/common/StyledComponent'
import { UnApprovedByOwner } from '../request-mini-components'
import RequestList from '../request-mini-components/RequestList'

const ClientPendingRequest = () => {
  return (
    <Div className='flex flex-col gap-12 px-10'>
        <UnApprovedByOwner />
        <RequestList />
    </Div>
  )
}

export default ClientPendingRequest