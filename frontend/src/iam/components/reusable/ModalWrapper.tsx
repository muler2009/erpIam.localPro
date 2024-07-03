import React from 'react'

type ModalWrapperProps = {
    children: React.ReactNode,
}
const ModalWrapper = ({children}: ModalWrapperProps) => {
  return (
    <div className='bg-black bg-opacity-20 inset-0 fixed top-0 z-50 font-Poppins border'>
      {children}
    </div>
  )
}

export default ModalWrapper
