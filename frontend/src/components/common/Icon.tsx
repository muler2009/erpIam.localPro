import React from 'react'


interface IconProps {
    content: string;
    className: string;
    disabled?: boolean | undefined;
    onClick?: () => void
  }

const Icon = ({content, className, disabled, onClick}: IconProps) => {
  return (
    <div className={className} onClick={onClick}>
        {content}
    </div>
  )
}

export default Icon