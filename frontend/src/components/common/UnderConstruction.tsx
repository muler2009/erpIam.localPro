import React from 'react'

const UnderConstruction:React.FC = () => {
  return (
    <div className='flex justify-center items-center h-full'>
        <div className='flex flex-col gap-2'>
            <h1 className='font-Oswald text-5xl text-red-300'>No Content Yet</h1>
            <p className='font-Poppins text-sm'>This page is Under construction</p>

        </div>
    </div>
  )
}

export default UnderConstruction
