import React, { FC, ReactNode, useState } from 'react'
import Counter from './Modal'
type Props = {
    name: string
    children?: ReactNode
}

const TestTS: React.FC<Props>  = ({name}) => {
  
  const [isOpen, setIsOpen] = useState<boolean>(false)

  return (
    <>
    <div className='flex flex-col'>
      <h1 className='font-popins'>{`Hello this is`}<span className='font-Oswald text-green-600 text-xl'>{name}</span></h1>
      <button onClick={() => setIsOpen(prev => !prev)}>Set Modal</button>
    </div>
     <Counter setIsOpen={setIsOpen} isOpen={isOpen} />
    </>
  )
}

export default TestTS
