import { useState } from 'react'
import { GroupModalPropsInterface, GroupMultiStepInterface } from '../../../../models/group.model'
import * as GrIcons from 'react-icons/gr'
import { InputWithDesc, ModalBody, ModalContainer, ModalFooter, ModalHeader, ModalWrapper, TextInput } from '../../../../components/reusable'
import { FlexBox, FlexBoxInner, FlexInnerContainer, Text } from '../../../../components/reusable/StyledComponent'
import * as Vsc from 'react-icons/vsc'
import GroupDetailComponent from './GroupDetailComponent'
import PolicyAssignment from './PolicyAssignment'
import useGroupContext from '../context/useGroupContext'
import Stepper from '@keyvaluesystems/react-vertical-stepper'
import { useCreateGroupsMutation } from '../../../../features/groupsAPI'


const CreateGroup = ({handleIsOpenCloseMenu, title}: GroupModalPropsInterface) => {

    const [ createGroups, {isSuccess, isError} ] = useCreateGroupsMutation()

    const {
        prevHide,
        submitHide,
        nextHide,
        disableNext,
        disablePrev,
        setPage,
        page,
        groupCreationStep,
        groupData, 
        membersOfGroup
      } = useGroupContext();
    
    const display: GroupMultiStepInterface = {
        0: <GroupDetailComponent />,
        1: <PolicyAssignment />,
    }


    // Changing the groupCreationStep structure to an array
    const displayComponent = Object.keys(groupCreationStep).map((key: any) => ({
        // label: groupCreationStep[key],
        component: display[key]
      }));

    const handlePrev = () => setPage(prev => prev - 1);
    const handleNext = () => setPage(prev => prev + 1);

    const onSaveClicked = async (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        try{
            const response = await createGroups(groupData).unwrap()
            if (response?.status === 201) {
                handleIsOpenCloseMenu()
            }
        }catch(error){
            console.log(error)
        }
  }


  return (
   <ModalWrapper>
    <ModalContainer className={`w-[60%] mx-auto bg-[#fff] flex flex-col relative top-[5%] shadow-2xl border rounded-t-[5px]`}>
        <ModalHeader className='flex justify-between items-center px-5 py-3 border-b-[1px]'>
            <Text className='font-Rubik text-black font-semibold text-[15px] text-opacity-50 text-center px-5'>{title}</Text>
            <div className="w-5 h-5 flex justify-center items-center cursor-pointer rounded-full hover:bg-gray-400 hover:text-white" onClick={handleIsOpenCloseMenu}>
                <Vsc.VscClose size={15} />
            </div>
        </ModalHeader>
        <ModalBody className='bg-gray-50 relative h-[60vh]'>
            <FlexInnerContainer className='flex py-5'>
                <FlexBox className={`my-5`}>
                    <Stepper
                        steps={displayComponent}
                        currentStepIndex={page}
                        labelPosition="bottom"
                        styles={{
                            LineSeparator: (step: any, index: any) => ({ height: "400px"}),
                            Bubble: (step: any, index: any) => ({ height: "40px", width: "40px", backgroundColor: "gray" }),
                            ActiveBubble:  (step: any, index: any) => ({ backgroundColor: "#2b4a6d"}),
                            InactiveLineSeparator: (step: any, stepIndex: any) => ({color: "blue"})
                        }}
                    />
                </FlexBox>
                <FlexBox className='flex-grow pr-10'>
                    {/* {display[page]} */}
                    {displayComponent[page].component}
                </FlexBox>
            </FlexInnerContainer>
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

                <button className={`btn-sm text-[12px] px-3 py-1 border rounded-[3px] hover:bg-green-600 hover:text-white transition duration-500 ease-in-out ${submitHide}`} onClick={onSaveClicked}>
                    <div className='flex justify-start items-center '>
                        <p className='font-Poppins text-[13px]'>Save</p>
            
                    </div>
                </button>
                </div>
        </ModalFooter>
    </ModalContainer>
   </ModalWrapper>
  )
}

export default CreateGroup






{/* <InputWithDesc 
label='Group Abbreviation'
id='group_abbreviation_input'
type='text'
placeholder='Group Abbreviation'
className='input-md font-Poppins text-[13px]'
name='group_abbreviation'
desc={`Group abbreviation starts with the first two letters of the groupname followed by number example: AC001`}
/> */}