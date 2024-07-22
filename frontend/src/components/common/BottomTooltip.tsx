import React from 'react'

interface BottomTooltopInterface {
    children: React.ReactNode;
    content: string;
}


const BottomTooltip = ({children, content}: BottomTooltopInterface) => {
  return (
    <div className='tooltip relative inline-block'>
        {children}
        <span className='tooltip-text bg-black bg-opacity-50 text-white text-xs py-1 px-2 rounded absolute -bottom-7 whitespace-nowrap left-[90%] transform translate-x-1/2 opacity-0 transition-opacity duration-300'>{content}</span>
    </div>
  )
}

export default BottomTooltip
