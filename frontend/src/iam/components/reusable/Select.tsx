import React from 'react'
import * as AiIcons from 'react-icons/ai'
import { SelectInterface } from '../interface/Input-select.interface'


const Select = ({title, options = [], onChange, value}: SelectInterface) => {
    return (
      <div className="flex flex-col gap-2 text-sm">
          <label className="whitespace-nowrap font-Poppins text-[13px] text-[#333] text-opacity-70">{title}</label>
          <div className='relative border'>
              <select 
                  className="input-md w-full py-[8px] h-[20vh] border-none border-l font-Poppins text-xs rounded-none bg-white" 
                  multiple
                  onChange={(event) => {
                      const selectedOption = options.find(option => option.username === event.target.value); 
                      if (selectedOption && onChange) {
                        onChange(selectedOption);
                      }
                    }} 
              >
                  {options.length === 0 && <option>Select {title}</option>}
                  {options.map((option, index) => (
                      <option key={index} value={option.username}>
                          {option.username}
                      </option>
                  ))}
              </select>
              <span className='flex justify-center items-center absolute top-0 right-0 text-gray-500 bg-green-50 h-full w-[20px] pointer-events-none cursor-pointer'>
                  <AiIcons.AiOutlineCaretDown  />
              </span>
          </div>
      </div>
    );
  };

export default Select
