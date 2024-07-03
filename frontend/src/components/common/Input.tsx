import React, { useState, useRef } from "react";

interface InputProps {
  id: string;
  type: string;
  name: string;
  placeholder: string;
  value: string | number;
  label: string;
  className: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const Input = ({ id, type, name, placeholder, onChange, value, label, className }: InputProps) => {
  
  return (
    <div className="flex flex-col gap-4 text-sm w-full">
      <label htmlFor={name} className="text-[15px] whitespace-nowrap font-Rubik">
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
      />
    </div>
  );
};

export default Input;