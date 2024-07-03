import React from 'react'

interface ButtonProps {
  label: string;
  className: string;
  disabled?: boolean | undefined;
  onClick?: () => void
}

const Button = ({label, className, onClick, disabled}: ButtonProps) => {
  return (
    <button className={className} onClick={onClick} disabled={disabled}>
        {label}
    </button>
  )
}

export default Button