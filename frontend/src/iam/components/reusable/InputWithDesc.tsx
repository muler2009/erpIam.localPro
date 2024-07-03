import React, { useState, useRef } from "react";
import { InputInterface } from "../interface/Input-select.interface";


const InputWithDesc = ({id, type, name, placeholder, onChange, value, label, className, label_description= "", desc="Optional", icon, disabled }: InputInterface) => {
  return (
    <div className="flex flex-col gap-2 text-sm w-full">
      <div className="flex flex-col gap-0">
        <label htmlFor={name} className="flex items-center text-[15px] whitespace-nowrap font-Rubik text-[#333] text-opacity-80">
          <span className="pr-1">{icon}</span>{label}
        </label>
        <p className="text-[12px] text-[#333] text-opacity-50">{label_description}</p>

      </div>
      <div className="flex flex-col gap-1">
        <input
            id={id}
            type={type}
            name={name}
            className={className}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            disabled={disabled}
        
        />
        <p className="text-[12px] text-[#333] text-opacity-50">{desc}</p>

      </div>
    </div>
  );
};



export default InputWithDesc
