import React from 'react'
import * as AiIcons from 'react-icons/ai'
import { SelectInterface } from '../interface/Input-select.interface'


const Select = ({title, options}: SelectInterface) => {
  return (
    <div className="flex flex-col gap-2 text-sm w-full ">
        <label className="text-[15px] whitespace-nowrap font-Rubik">{title}</label>
        <div className='relative border '>
            <select className="input-md w-full py-[8px] border-none border-l font-Poppins text-xs rounded-none bg-white">
                <option>Select {title} </option>
                {
                    options?.map((option, index) => {
                        return(
                            <option className='flex flex-col' key={index}>
                                {option.role_name}
                            </option>
                        )
                    })
                }
            </select>
        <span className='flex justify-center items-center absolute top-0 right-0 text-gray-500 bg-green-50 h-full w-[20px] pointer-events-none cursor-pointer'>
            <AiIcons.AiOutlineCaretDown  />
        </span>
    </div>
</div>
  )
}

export default Select
