import React from 'react'
import * as GrIcons from 'react-icons/gr'
import useCreateUserAccount from '../context/useCreateUserAccount'
import UserDetail from './UserDetail'



const UserCreationContainer = () => {

 const {prevHide, submitHide, nextHide, disableNext, disablePrev, setPage} = useCreateUserAccount()


 const handlePrev = () => setPage(prev => prev - 1)

 const handleNext = () => setPage(prev => prev + 1)


   return (
    <>
    
        <div className=''>
            <UserDetail />
        </div>

        <div className="flex justify-end space-x-5 pr-5 ">
            <button className={`btn-sm text-[12px] px-3 py-1 border text-[#333] hover:bg-[#005bb3] hover:text-white ${prevHide}`} onClick={handlePrev} disabled={disablePrev}>
                <div className='flex justify-start items-center'>
                    <GrIcons.GrFormPrevious  size={15}/>
                    <p className='font-Poppins text-[14px]'>Prev</p>
                </div>
            </button>

            <button  className={`btn-sm text-[12px] px-3 py-1 border hover:bg-[#005bb3] hover:text-white text-[#333] ${nextHide}`} onClick={handleNext} disabled={disableNext}>
                <div className='flex justify-start items-center hover:text-whites'>
                    <p className='font-Poppins text-[14px]'>Next</p>
                    <GrIcons.GrFormNext size={15} />
                </div>
            </button>

            <button 
                className={`btn-sm stext-[12px] px-4 bg-[#005bb3] text-white ${submitHide}`} 
                // onClick={onRequirementDetailSubmitClicked}
            >
                Submit
            </button>
        </div>
    </>
  )
}

export default UserCreationContainer
