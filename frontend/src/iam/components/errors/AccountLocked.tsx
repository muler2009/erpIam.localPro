import React, {useState, useEffect} from 'react'
import { AccountLockedInterface } from '../interface/modal.interfaces'
import { ModalBody, ModalContainer, ModalHeader, ModalWrapper } from '../reusable'
import * as VscIcons from 'react-icons/vsc'
import { useLockedCoolOffTimeQuery } from '../../auth/login/loginAPI'
import { interval } from 'date-fns'

const AccountLocked = ({isLocked, setIsLocked, loginErrorMessage}: AccountLockedInterface) => {
  
  const {data} = useLockedCoolOffTimeQuery()
  const [remainingTime, setRemainingTime] = useState<number | null>(null);

  useEffect(() => {
    if (data?.locked) {
      setRemainingTime(Math.floor(data.remaining_time)); // Set API time
    } else {
      setRemainingTime(null); // Reset when unlocked
    }
  }, [data]);

  useEffect(() => {
    if (remainingTime === null || remainingTime <= 0) {
      setIsLocked(false); // Unlock when countdown hits 0
      return;
    }

    const interval = setInterval(() => {
      setRemainingTime((prev) => (prev !== null ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(interval);
  }, [remainingTime, setIsLocked]);

  // const hours = Math.floor((remainingTime ?? 0) / 3600); // 1 hour = 3600 seconds
  // const minutes = Math.floor(((remainingTime ?? 0) % 3600) / 60);
  // const seconds = (remainingTime ?? 0) % 60;

  const hours = String(Math.floor((remainingTime ?? 0) / 3600)).padStart(2, '0');
  const minutes = String(Math.floor(((remainingTime ?? 0) % 3600) / 60)).padStart(2, '0');
  const seconds = String((remainingTime ?? 0) % 60).padStart(2, '0');
  

  return (
    isLocked ? (
      <ModalWrapper>
        <ModalContainer className='w-[35%] mx-auto my-10 flex flex-col border-[1px] border-[#ddd] shadow-xl rounded-[10px] relative top-[25%]'>
          {/* <ModalHeader className='py-[10px] px-5 flex justify-between items-center cursor-pointer bg-[#e6e6e6] rounded-t-[10px] border-b border-gray-400 border-opacity-50'>
            <p className=' text-[15px] font-Poppins flex justify-center items-center'>
              <span className='mr-2'>
                {loginErrorMessage?.error_type}
              </span>
            </p>
            <VscIcons.VscClose size={20} onClick={() => setIsLocked(prevState => !prevState)} />
          </ModalHeader> */}
          <ModalBody className='px-5 py-5 bg-[#f5f5f5] h-[30vh] '>
            <div className={`flex flex-col items-center`}>
              <div className={`pt-5 pb-3`}>
                <h1 className={`font-IBMPlexSans text-[25px] font-semibold text-red-500`}>{loginErrorMessage?.error_type}</h1>
              </div>
              <div className={`px-4 p-3 flex flex-col justify-center items-center`}>
                <p className={`leading-[22px] text-[15px] text-[#333] text-opacity-75`}>{loginErrorMessage?.message}</p>
                <p className='text-[13px]'>please try again later or <span className='text-blue-400 hover:underline '>contact system administrator</span></p>
              </div>
              <div className={``}>
                {
                  remainingTime !== null ? (
                    <div className='flex space-x-2 justify-center items-center font-semibold'>
                      <div className='flex flex-col'>
                        <div className='flex items-center'>
                          <p className={`flex justify-center items-center border-[2px] border-button-primary w-12 h-12 text-[20px]`}>
                            {hours}
                          </p> <span className='pl-2'>{":"}</span>
                        </div>
                        <p className='text-[12px] text-[#333] text-opacity-60 text-center'>HH</p>
                      </div> 
                      <div className=' flex flex-col'>
                      <div className='flex items-center'>
                          <p className={`flex justify-center items-center border-[2px] border-button-primary w-12 h-12 text-[20px]`}>
                            {minutes}
                          </p> <span className='pl-2'>{":"}</span>
                        </div>
                        <p className='text-[12px] text-[#333] text-opacity-60 text-center'>MM</p>
                      </div> 
                      <div className=' flex flex-col'>
                        <p className={`flex justify-center items-center border-[2px] border-button-primary w-12 h-12 text-[20px]`}>
                          {seconds}
                        </p> 
                        <p className='text-[12px] text-[#333] text-opacity-60 text-center'>SS</p>
                      </div>
                    </div>
                  ) : (
                    <p>Loading cooldown time...</p>
                  )
                }
              </div>
              

            </div>
            
          </ModalBody>     
        </ModalContainer>
      </ModalWrapper>
    ) : null
  )
}

export default AccountLocked