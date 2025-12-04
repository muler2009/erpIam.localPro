import React from 'react'
import * as AiIcons from 'react-icons/ai'
import { ProcessAPIResponse, StateAPIResponse } from '../../app/models/request-model';
import { FlexBox, FlexBoxInner } from './StyledComponent';
import { UserAccountDataInterface, UserAPIResponse } from '../../iam/models/user.model';

interface RequestOptionType {
    [key: string]: string | number
}

export interface CustomSelectInterface {
    label: string;
    name?: string
    icon?: React.ReactElement
    options: StateAPIResponse[] | ProcessAPIResponse[] | UserAPIResponse[],
    value?: string | number;
    valueKey?: string,
    labelKey?: string,
    onChange?: (event: React.ChangeEvent<HTMLSelectElement>) => void,
 }

const SelectComponent = ({label, icon, options=[], name, valueKey='id', labelKey='name', onChange, value}: CustomSelectInterface) => {
  return (
   
    <FlexBox className='flex flex-col gap-2 flex-grow'>
        <label htmlFor={label} className='text-[12px] text-[#333] tracking-wide'>{label}</label>
        <FlexBoxInner className='relative'>
            <select 
                id={`${name}_input`}
                name={name} 
                className="select-md rounded-sm font-Poppins py-2 w-full text-[12px]" 
                value={value}
                onChange={onChange}        
            >
                <option className='text-[#333] text-opacity-50 bg-gray-100'><p className='text-[#333] text-opacity-50'>--Select {label}--</p></option>
                {
                    options?.map((option, index) => (
                        <option className='text-[12px]' key={index}  value={(option as any)[labelKey]}>
                            {(option as any)[labelKey]}
                        </option>
                    ))
                }
              
            </select>   
            <span className='flex justify-center items-center absolute top-0 border right-0 text-gray-500 bg-gray-50 h-full w-[30px] pointer-events-none '>
                {AiIcons.AiOutlineCaretDown({})}
            </span>
        </FlexBoxInner>
    </FlexBox> 
  )
}

export default SelectComponent