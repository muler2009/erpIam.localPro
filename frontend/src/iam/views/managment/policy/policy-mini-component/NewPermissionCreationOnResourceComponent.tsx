import React from 'react'
import { useOutletContext, Link, useNavigate } from 'react-router-dom'
import * as MdIcons from 'react-icons/md'
import { FlexOuterContainer, Text, FlexBox, Div, P } from '../../../../../components/common/StyledComponent';
import * as FaIcons from "react-icons/fa6";
import * as GrIcons from 'react-icons/gr'
import { usePolicyContext } from '../context/usePolicyContext';
import { PolicyContextProvider } from '../context/PolicyContext';
import PolicyInformationComponent from './PolicyInformationComponent';
import Stepper from '@keyvaluesystems/react-vertical-stepper'
import SelectPolicyActionComponent from './SelectPolicyActionComponent';


interface OutletContextType {
  selectedResource: string;
 
}

const NewPermissionCreationOnResourceComponent = () => {
    const { selectedResource } = useOutletContext<OutletContextType>();

    const {
      policyData,
      page,
      canSave,
      disableNext,
      disablePrev,
      prevHide,
      nextHide,
      submitHide,
      canSubmit,
      policyCreationStep,
      setPage,
      setPolicyData

     } = usePolicyContext()
   

     const display: {[key: number]: React.ReactNode} = {
      0: <PolicyInformationComponent />,
      1: <SelectPolicyActionComponent />,
  }

  const handlePrev = () => setPage(prev => prev - 1);
    const handleNext = () => setPage(prev => prev + 1);

     // Changing the groupCreationStep structure to an array
     const displayComponent = Object.keys(policyCreationStep).map((key: any) => ({
      // label: groupCreationStep[key],
      component: display[key]
    }));

  
  return (
    <>
      {
        selectedResource && (
            <FlexOuterContainer className='flex justify-between items-center px-4 border-b'>
              <FlexBox className='flex flex-col'>
                <Div className='flex'>
                    <MdIcons.MdPolicy size={20} />
                    <Text className='text-[16px] font-semibold text-[#5e2f05] ml-2 relative'>
                      {selectedResource}
                      <span className='ml-8 w-10 h-5 bg-primary-green flex justify-center items-center absolute -top-2 left-[75%] rounded-[4px]'>
                          <p className='px-3 text-white text-[12px]'>Allow</p>
                      </span>
                    </Text> 
                </Div>
                <P className='text-[12px] font-IBMPlexSans ml-7 text-[#333] text-opacity-55'>Specify what actions can be performed on selected ressources</P>
              </FlexBox>
              <FaIcons.FaTrashCan size={16}  onClick={() => window.location.reload()} className='cursor-pointer' />              
            </FlexOuterContainer>
          )
        }

        <FlexBox className='h-[50vh] flex gap-10 overflow-y-scroll'>
          <FlexBox className={`mt-5 mb-3`}>
            <Stepper
                steps={displayComponent}
                currentStepIndex={page}
                labelPosition="bottom"
                styles={{
                    LineSeparator: (step: any, index: any) => ({ height: "300px"}),
                    Bubble: (step: any, index: any) => ({ height: "40px", width: "40px", backgroundColor: "gray" }),
                    ActiveBubble:  (step: any, index: any) => ({ backgroundColor: "#5e2f05"}),
                    InactiveLineSeparator: (step: any, stepIndex: any) => ({color: "blue"})
                }}
            />
         </FlexBox>
          <Div className='flex-grow '>
            {displayComponent[page].component}

          </Div>
        </FlexBox>
       
     
        <>
          <div className="flex justify-start ml-10 mt-2 space-x-5 pr-5 ">
            <button className={`btn-sm text-[12px] px-3 py-1 border rounded-[3px] text-[#333] hover:bg-green-600 hover:text-white transition duration-500 ease-in-out ${prevHide}`} onClick={handlePrev} disabled={disablePrev}>
              <div className='flex justify-start items-center'>
                  <GrIcons.GrFormPrevious  size={15}/>
                  <p className='font-Poppins text-[13px]'>Previous</p>
              </div>
            </button>

            <button  className={`btn-sm text-[12px] px-3 py-1 border rounded-[3px] hover:bg-green-600 hover:text-white transition duration-500 ease-in-out ${nextHide}`} onClick={handleNext} disabled={disableNext}>
              <div className='flex justify-start items-center '>
                  <p className='font-Poppins text-[13px]'>Next</p>
                  <GrIcons.GrFormNext size={15} />
              </div>
            </button>

            <button className={`btn-sm text-[12px] px-3 py-1 border rounded-[3px] hover:bg-green-600 hover:text-white transition duration-500 ease-in-out ${submitHide}`}>
              <div className='flex justify-start items-center space-x-2'>
                <GrIcons.GrAdd  size={12}/>
                <p className='font-Poppins text-[13px]'>Add permissions</p>
              </div>
            </button>
          </div>
        </>
    
    </>
  )
}

export default NewPermissionCreationOnResourceComponent