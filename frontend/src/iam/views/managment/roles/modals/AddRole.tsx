import React from 'react'
import { ModalContainer, ModalHeader, ModalBody, ModalFooter } from '../../../../components/reusable'
import * as Vsc from 'react-icons/vsc'
import { RoleModalPropsInterface } from '../../../../models/role.models'
import { FlexBox } from '../../../../components/reusable/StyledComponent'
import * as GrIcons from 'react-icons/gr'
import useRoleContextProps from '../context/useRoleContextProps'
import BasicRoleInformation from './BasicRoleInformation'
import AttachUserRole from './AttachUserRole'
import Stepper from '@keyvaluesystems/react-vertical-stepper'
import { useCreateRoleMutation } from '../../../../features/roleAPI'
import AttachPolicyToRoleComponent from './AttachPolicyToRoleComponent'


const AddRole = ({onRequestClose, title, isOpen, link_identifier}: RoleModalPropsInterface) => {
  
    const [createRole] = useCreateRoleMutation()

    const {
      prevHide,
      submitHide,
      nextHide,
      disableNext,
      disablePrev,
      setPage,
      page,
      roleCreationStep,
      roleData
    } = useRoleContextProps();

  const display: {[key: number]: React.ReactNode} = {
      0: <BasicRoleInformation />,
      1: <AttachUserRole />,
      2: <AttachPolicyToRoleComponent />
  }

    // Changing the groupCreationStep structure to an array
    const displayComponent = Object.keys(roleCreationStep).map((key: any) => ({
      // label: groupCreationStep[key],
      component: display[key]
    }));

  const handlePrev = () => setPage(prev => prev - 1);
  const handleNext = () => setPage(prev => prev + 1);

  const onRoleSaveClicked = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    try{
        const response = await createRole(roleData).unwrap()
        if (response?.status_code === 201) {
          onRequestClose()
        }
    }catch(error){
        console.log(error)
    }
    console.log(roleData)
}

  return (
    
      <ModalContainer className={`w-[40%] mx-auto bg-[#fff] flex flex-col relative top-[6%] shadow-2xl rounded-t-md`} >
          <ModalHeader className='flex justify-between items-center px-5 py-3 border-b'>
              <h1 className='font-Poppins text-black font-semibold text-[15px] text-opacity-50 text-center px-5'>{title}</h1>
              <div className="w-5 h-5 flex justify-center items-center cursor-pointer rounded-full hover:bg-gray-400 hover:text-white" onClick={onRequestClose}>
                  <Vsc.VscClose size={15} />
              </div>
          </ModalHeader>
          <ModalBody className='h-[50vh] flex space-x-1 pt-4 pr-10 overflow-y-scroll'>
              <FlexBox className={`my-3`}>
                <Stepper
                    steps={displayComponent}
                    currentStepIndex={page}
                    labelPosition="bottom"
                    styles={{
                        LineSeparator: (step: any, index: any) => ({ height: "100px"}),
                        Bubble: (step: any, index: any) => ({ height: "40px", width: "40px", backgroundColor: "gray" }),
                        ActiveBubble:  (step: any, index: any) => ({ backgroundColor: "#2b4a6d"}),
                        InactiveLineSeparator: (step: any, stepIndex: any) => ({color: "blue"})
                    }}
                />
              </FlexBox>
          
            <FlexBox className='flex-grow px-3'>
              {
                displayComponent[page].component
              }
            </FlexBox>
          </ModalBody>

          <ModalFooter className='px-4 py-4 flex justify-end space-x-3 border-t'>
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

              <button className={`btn-sm text-[12px] px-3 py-1 border rounded-[3px] hover:bg-green-600 hover:text-white transition duration-500 ease-in-out ${submitHide}`} onClick={onRoleSaveClicked}>
                  <div className='flex justify-start items-center '>
                    <p className='font-Poppins text-[13px]'>Create Role</p>
                  </div>
              </button>
            </div>
          </ModalFooter>
      </ModalContainer>
   
  )
}

export default AddRole