import React from 'react'
import * as IoIcons from "react-icons/io5";

const MFANotifier = () => {
  return (
    <div className='flex justify-between py-5 bg-red-50 bg-opacity-50 shadow-sm'>
        <div className='flex space-x-5 justify-start items-start px-10 mt-5'>
            <div className='flex text-red-600'>
                <IoIcons.IoWarning size={45} />
            </div>
            <div className='flex-grow '>
                <div className='flex flex-col'>
                    <h1 className='font-Rubik font-[600] text-[18px]'>Add MFA for root user</h1>
                    <p className='font-Poppins text-[13px] text-[#333] text-opacity-50'>Add MFA for the root user- Enable multi-factor authentication (MFA) for the root user to improve securing accounts</p>
                </div>

            </div>
        </div>

        <div className='pr-10 mt-5'>
            <button className='btn-sm bg-green-600 px-5 text-white'>Add MFA</button>
        </div>
      
    </div>
  )
}

export default MFANotifier
