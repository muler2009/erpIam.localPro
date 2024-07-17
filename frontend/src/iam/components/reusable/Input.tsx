import React, { useState, useRef } from "react";
import { InputInterface } from "../interface/Input-select.interface";
import { FlexBox, FlexInnerContainer } from "./StyledComponent";


const Input = ({id, type, name, placeholder, onChange, value, label, className, disabled }: InputInterface) => {
  return (
    <FlexInnerContainer className="flex flex-col gap-2 text-sm w-full">
      <FlexBox className="flex flex-col gap-0">
        <label htmlFor={name} className="flex items-center text-[15px] whitespace-nowrap font-Rubik text-[#333] text-opacity-80">{label}</label>
      </FlexBox>
      <FlexBox className="flex flex-col gap-1">
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
      </FlexBox>
    </FlexInnerContainer>
  );
};

export default Input;