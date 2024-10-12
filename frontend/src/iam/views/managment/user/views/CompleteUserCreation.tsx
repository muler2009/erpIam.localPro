import React from 'react'
import { BsCheckCircleFill } from "react-icons/bs";

const CompleteUserCreation = () => {
  return (
    <div className='flex flex-col px-16 pt-5'>
        <div className='border border-green-500 bg-green-50 pt-5 pb-6 rounded-[5px] px-5 flex space-x-4'>
            <div className='flex'>

            <BsCheckCircleFill size={20} />
            </div>
          
          <div className='flex flex-col gap-4'>
            <h1 className='text-[20px] text-green-600'>Success</h1>
            <p className='text-[12.5px] text-[#333] text-opacity-50 text-justify leading-5'>
              You successfully created the user below with information. You can view and download user security credentials. You can also email users instructions for signing into IAM Management system console. This is the laast time these credentials will be available to download. However, you can create new credentials any time needed.
            </p>
          </div>

     
        </div>
    </div>
  )
}

export default CompleteUserCreation
