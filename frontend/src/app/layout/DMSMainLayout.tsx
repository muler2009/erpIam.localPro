import React from 'react'
import { FlexBox } from '../../components/common/StyledComponent'
import { Footer } from '../../iam/components/reusable'
import { Outlet } from 'react-router-dom'
import DocumentManagmentHeader from '../components/reusable/DocumentManagmentHeader'
import DMSDashboard from './DMSDashboard'

const DMSMainLayout = () => {
  return (
    <React.Fragment>
      <header className='border-b shadow-sm bg-gray-50 font-Poppins sticky top-0 z-50'>
        <DocumentManagmentHeader />
      </header>
      <main className='h-[90vh]'>
        <DMSDashboard />
      </main>
      <footer className='grid content-center bottom-0'>
        <Footer />
      </footer>
    </React.Fragment>
  )
}

export default DMSMainLayout