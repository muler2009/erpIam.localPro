import React from 'react'
import * as AiIcons from 'react-icons/ai'
import { CustomSelectInterface } from '../interface/Input-select.interface'
import { FlexBox, FlexBoxInner } from './StyledComponent'


const CustomSelect = ({label, icon, options=[], name, onChange, value}: CustomSelectInterface) => {
  return (
    <FlexBox className="flex flex-col gap-2 text-sm w-full">
        <label htmlFor={name} className="flex items-center text-[13px] whitespace-nowrap font-Poppins text-[#333] text-opacity-80">
          <span className="pr-1">{icon}</span>{label}
        </label>

        <FlexBoxInner className='relative'>
            <select 
                id='role_select_input' 
                className="select-md text-[13px] rounded-sm font-MonaSans pt-2.5"    
                name={name} 
                value={value}
                onChange={onChange}
            >
                <option><p className='text-sm font-Poppins'>--select--</p></option>
                    {
                        options?.map((opt, index) => (
                            <option key={index}>{opt.label}</option>
                        ) )
                    }
                
                </select>   
                <span className='flex justify-center items-center absolute top-0 border right-0 text-gray-500 bg-gray-50 h-full w-[30px] pointer-events-none '>
                    {AiIcons.AiOutlineCaretDown({})}
                </span>
        </FlexBoxInner>
    </FlexBox>
  )
}

export default CustomSelect