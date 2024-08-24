import React from 'react'
import { TextInputWithDescWithout } from '../../iam/components/interface/Input-select.interface';


const TextInput = ({id, type, name, placeholder, onChange, value, label, className, rows, desc="" }: TextInputWithDescWithout) => {
    return (
      <div className="flex flex-col gap-2 text-sm w-full">
        <label htmlFor={id} className='text-[12px] text-[#333] tracking-wide'>{label}</label>
        <div className="flex flex-col gap-1">
          <textarea
              id={`${name}_text`}
              name={name}
              className={className}
              placeholder={placeholder}
              value={value}
              onChange={onChange}
              rows={rows}         
          />
          <p className="text-[12px] text-[#333] text-opacity-50">{desc}</p>
  
        </div>
      </div>
    );
  };

export default TextInput