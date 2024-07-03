import React from 'react'
import * as AiIcons from 'react-icons/ai'

const StatusChanger = () => {
  return (
    <div className='flex justify-start items-center'>

            <div className='relative'>
            <select className="input-md py-[8px] border-none border-l font-Poppins text-xs rounded-none bg-white">
                <option>Active</option>
                <option>deActive</option>
                <option>Active</option>
            </select>
            <span className='flex justify-center items-center absolute top-0 right-0 text-gray-500 bg-green-50 h-full w-[20px] pointer-events-none cursor-pointer'>
                <AiIcons.AiOutlineCaretDown  />
            </span>
            

        </div>
    </div>
  )
}

export default StatusChanger
