import React from 'react'
import { NotificationHeader, NotificationListComponent } from './notification-sub-component'
import { Outlet } from 'react-router-dom'

const NotificationDashboard = () => {
  return (
    <>
      <NotificationHeader />
      <NotificationListComponent />
    </>
  )
}

export default NotificationDashboard