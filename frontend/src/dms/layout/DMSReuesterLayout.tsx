import React from 'react'
import DocumentManagmentHeader from '../components/reusable/DocumentManagmentHeader'
import { Footer } from '../../iam/components/reusable'
import ClientNavigation from '../views/requests/client-mini-components/ClientNavigation'

const DMSReuesterLayout = () => {
  return (
    <React.Fragment>
      <header className='border-b shadow-sm bg-gray-50 font-Poppins sticky top-0 z-50'>
        <DocumentManagmentHeader />
      </header>
      <main className='h-[90vh]  bg-white bg-opacity-50'>
        <ClientNavigation />
      </main>
      <footer className='grid content-center bottom-0'>
        <Footer />
      </footer>
    </React.Fragment>
  )
}

export default DMSReuesterLayout