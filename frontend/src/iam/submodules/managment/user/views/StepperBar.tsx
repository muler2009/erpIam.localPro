import React from 'react'
import useCreateUserAccount from '../context/useCreateUserAccount'
import { FaFacebook, FaUsb } from 'react-icons/fa'

const StepperBar = () => {

    const {userCreationStep, page, setPage} = useCreateUserAccount()


  return (
    <div className='flex justify-between px-16 border-b pb-4 border-opacity-80 border-gray-100 sticky top-0 '>
    {
        Object.values(userCreationStep)?.map((title, index) => {
            const isActive = index === page
            return(
                <div key={index} className={`flex space-x-3 py-3 cursor-pointer relative  ${index < page && "complete"} ${Object.keys(userCreationStep).length - 1 !== index && 'after:content-[""] after:absolute after:w-[150px] after:bg-black after:top-[50%] after:left-[150px] after:border after:border-dashed'} ${isActive && 'after:content-[""] after:absolute after:w-[150px] after:bg-black after:top-[50%] after:left-[150px]' }`}>
                    <div className={`border rounded-full flex justify-center items-center w-12 h-12 ${isActive ? 'bg-white' : 'bg-green-500 '}`}>
                        <FaUsb />
                    </div>
                    <div className={`flex flex-col items-start`} >  
                        <h1 className='text-sm uppercase'>Step - <span>{index + 1}</span></h1>
                        {/* <h1 className='text-sm text-green-600'>{userCreationStep[index]}</h1> */}
                                      
                        {/* <h5 className='text-center text-[13px] px-5 font-Poppins' onClick={() => setPage(index)}>{userCreationStep[index]}</h5> */}
                    </div>          
                </div>        
            )
        })
    }
</div>                           

  )
}

export default StepperBar
