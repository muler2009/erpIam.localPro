import React, { useState, useRef } from "react";

interface InputProps {
  id: string;
  type: string;
  name: string;
  placeholder: string;
  value?: string | number;
  label?: string;
  className?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean
}

const Input = ({ id, type, name, placeholder, onChange, value, label, className, disabled }: InputProps) => {
  
  return (
    <div className="flex flex-col gap-2 text-sm w-full">
      <label htmlFor={name} className="text-[13px] whitespace-nowrap font-Poppins text-[#333] text-opacity-80 relative">
        {label}
      </label>
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
    </div>
  );
};

export default Input;