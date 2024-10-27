import React from 'react'
import { GetApprovedRequest } from '../request-mini-components'
import { Div } from '../../../../components/common/StyledComponent'

const ClientApproved = () => {
  return (
    <Div className='flex flex-col gap-12 px-10'>
      <GetApprovedRequest />
    </Div>
  )
}

export default ClientApproved