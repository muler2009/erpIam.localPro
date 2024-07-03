import React, { useState, useRef } from "react";
import { InputInterface } from "../interface/Input-select.interface";


const Input = ({id, type, name, placeholder, onChange, value, label, className }: InputInterface) => {
  return (
    <div className="flex flex-col gap-2 text-sm w-full">
      <label htmlFor={name} className="text-[15px] whitespace-nowrap font-Rubik">{label}</label>
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