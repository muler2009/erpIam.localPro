import React from 'react'

type ModalWrapperProps = {
    children: React.ReactNode,
}
const ModalWrapper = ({children}: ModalWrapperProps) => {
  return (
    <div className='bg-black bg-opacity-30 inset-0 fixed top-0 z-50 font-Poppins'>
      {children}
    </div>
  )
}

export default ModalWrapper
