import React from 'react'

type ModalProps = {
    children: React.ReactNode,
    className?: string
}

const ModalContainer = ({children, className}: ModalProps) => {
  return (
    <div className={className} >
        {children}
    </div>
  )
}

export default ModalContainer
