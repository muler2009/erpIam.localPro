import React from 'react'
import TreeView from '../../components/reusable/TreeView'
import SidebarMenu from '../../components/reusable/SidebarMenu'
import MFANotifier from './views/MFANotifier'
import IAMResources from './views/IAMResources'


const Dashboard = () => {
  return (
    <>
      <MFANotifier />
      <IAMResources />
    </>

      

    
  )
}

export default Dashboard
