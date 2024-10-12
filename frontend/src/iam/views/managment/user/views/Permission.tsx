import React from 'react'
import UserTab from '../../../../components/nav-tabs/UserTab'
import { user_add } from '../../constants/nav-links/useLink'

const Permission = () => {
  return (
    <div className='flex flex-col gap-2'>
        <UserTab tabs={user_add} />
    </div>
  )
}

export default Permission
