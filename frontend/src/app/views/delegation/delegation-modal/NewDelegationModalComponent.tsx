import React, { useState } from 'react'
import { ModalComponentPropsInterface } from '../../../models/common-models'
import { ModalWrapper, ModalBody, ModalContainer, ModalHeader, ModalFooter } from '../../../../iam/components/reusable'
import { FlexBox, Text } from '../../../../components/common/StyledComponent'
import * as VscIcons from 'react-icons/vsc'
import DatePickerw from './DatePicker'
import { DelegationContextProvider } from '../context/DelegationContext'
import useDelegationContext from '../context/useDelegationContext'
import * as GrIcons from 'react-icons/gr'
import BasicDelegationInformation from './BasicDelegationInformation'
import DelegationPermissionComponent from './DelegationPermissionComponent'
import { usePostDelegationMutation } from '../../../services/delegationAPI'
import useErrorState from '../../../../components/errors/useErrorState'
import ErrorNotifierModal from '../../../../components/errors/ErrorNotifierModal'

const NewDelegationModalComponent = ({open, handleIsOpenCloseMenuModal, title}: ModalComponentPropsInterface ) => {

  const [postDelegation, {isError, error}] = usePostDelegationMutation()

  const {setErrorMessage, setErrors, setTriggerMessageModal, triggerMessageModal, errorMessage} = useErrorState()

  const {
    delegationStep, 
    setPage,
    prevHide,
    submitHide,
    nextHide,
    disableNext,
    disablePrev,
    page,
    delegationData
  } = useDelegationContext()

  const display: {[key: number]: React.ReactNode} = {
    0: <BasicDelegationInformation />,
    1: <DelegationPermissionComponent />,
  }
   const displayComponent = Object.keys(delegationStep).map((key: any) => ({
      component: display[key]
    }));

  const handlePrev = () => setPage(prev => prev - 1);
  const handleNext = () => setPage(prev => prev + 1);

 
  const canSave = [...Object.values(delegationData)].every(Boolean)
  
  const onDelegateButtonEventClicked = async() => {
    try{
      const response = await postDelegation(delegationData).unwrap()
      if (response.status_code === 201){
        handleIsOpenCloseMenuModal()
      }

    }catch(error: any){
      console.log(error)
      if(!error) {
        console.log(error)
      } else if(error.data.status_code === 409 ){
        setErrorMessage({
          error_type: error.data?.error_type,
          message: error.data?.message,
          status_code: error.status_code
        });
        setErrors(true);
        setTriggerMessageModal(prev => !prev);
      } else if(error.data.status_code === 400 ){
        setErrorMessage({
          error_type: error.data?.error_type,
          message: error.data?.message,
          status_code: error.status_code
        });
        setErrors(true);
        setTriggerMessageModal(prev => !prev);
      }
    }
    

  }

  

  return (
    
      open ? (
        
          <ModalWrapper>
            <ModalContainer className={`w-[35%] mx-auto bg-gray-50 flex flex-col relative top-[20%] shadow-2xl rounded-[3px]`}>
                <ModalHeader className='flex justify-between items-center px-2 py-[10px] font-Poppins rounded-t-md border-b'>
                    <Text className='font-Poppins text-left px-5 text-[14px] flex-grow text-[#333]'>{title}</Text>
                    <div className="w-5 h-5 flex justify-center items-center cursor-pointer rounded-full hover:bg-red-400 hover:text-white text-[#333]" onClick={handleIsOpenCloseMenuModal} > 
                        <VscIcons.VscClose size={15} />
                    </div>
                </ModalHeader>
                <ModalBody className='flex flex-col h-[350px] mx-[1px]'>  
                  {displayComponent[page].component}                  
                </ModalBody> 
                <ModalFooter className='px-4 py-4 flex justify-end space-x-3 border-t mx-1 bg-white'>
                  <div className="flex justify-end space-x-5 pr-5 ">
                    <button className={`btn-sm text-[12px] px-3 py-1 border rounded-[3px] text-[#333] hover:bg-green-600 hover:text-white transition duration-500 ease-in-out ${prevHide}`} onClick={handlePrev} disabled={disablePrev}>
                        <div className='flex justify-start items-center'>
                            <GrIcons.GrFormPrevious  size={15}/>
                            <p className='font-Poppins text-[13px]'>Prev</p>
                        </div>
                    </button>

                    <button  className={`btn-sm text-[12px] px-3 py-1 border rounded-[3px] hover:bg-green-600 hover:text-white transition duration-500 ease-in-out ${nextHide}`} onClick={handleNext} disabled={disableNext}>
                        <div className='flex justify-start items-center '>
                            <p className='font-Poppins text-[13px]'>Next</p>
                            <GrIcons.GrFormNext size={15} />
                        </div>
                    </button>

                    <button className={`btn-sm text-[12px] px-3 py-1 border-[2px] border-text-primary rounded-[3px] transition duration-500 ease-in-out disabled:bg-gray-50 disabled:cursor-default ${submitHide}`}  onClick={onDelegateButtonEventClicked}>
                        <div className='flex justify-start items-center '>
                          <p className='font-Poppins text-[13px]'>Delegate</p>
                        </div>
                    </button>
                  </div>
                </ModalFooter>
            </ModalContainer>

            <ErrorNotifierModal 
              triggerMessageModal={triggerMessageModal} 
              errorMessage={errorMessage}
              setTriggerMessageModal={setTriggerMessageModal}
            />
          </ModalWrapper>
      ): null
  )
}

export default NewDelegationModalComponent



 {/* <FlexBox className='flex space-x-4'>
                            {
                              Object.values(delegationStep)?.map((title, index) => {
                              const isActive = index === page;
                                return (
                                  <div key={index} className={`flex flex-grow py-2 cursor-pointer ${isActive && 'border-b-[2px] font-semibold bg-white'}`}>
                                    <div className="flex">                     
                                        <Text className='text-center text-[14px] font-Poppinds' onClick={() => setPage(index)}>{delegationStep[index]}</Text>
                                    </div>          
                                  </div>           
                                );
                            })}
                    </FlexBox> */}