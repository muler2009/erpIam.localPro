import React from 'react'
import { Link } from 'react-router-dom'
import { FlexBox, FlexBoxInner, P, Text } from '../../../../components/common/StyledComponent'
import useUtils from '../../../hooks/useUtils'
import { NewDelegationModalComponent } from '../delegation-modal'
import { DelegationContextProvider } from '../context/DelegationContext'

const DelegationHeader = () => {
    const {open, handleIsOpenCloseMenuModal} = useUtils()
  return (
    <FlexBox className='flex justify-between mx-1 border-b px-5 bg-gradient-to-b from-gray-50 to-gray-200'>
        <FlexBoxInner className={`flex flex-col gap-2 py-5`}>
            <Text className='text-xl font-Poppins font-semibold text-black'>e-IsMs {">"}   
                <Link to="../delegation" className='pl-3 font-normal text-sm'>Home</Link>
            </Text>
        </FlexBoxInner>
        
        <FlexBoxInner className='flex items-end pb-2'>
           
                <button className='px-4 py-2 text-[#fff] font-Poppins text-[12px] bg-text-primary' onClick={handleIsOpenCloseMenuModal}>New Delegation</button>
          
            <Link to="me2">
                <button className='px-4 py-2 text-black font-Poppins text-[12px]'>New</button>
            </Link>
        </FlexBoxInner>

        <DelegationContextProvider>
            <NewDelegationModalComponent 
                open={open}
                handleIsOpenCloseMenuModal={handleIsOpenCloseMenuModal}
                title={`Delegation Control Wizard`}
            />
        </DelegationContextProvider>


    </FlexBox>
  )
}

export default DelegationHeader