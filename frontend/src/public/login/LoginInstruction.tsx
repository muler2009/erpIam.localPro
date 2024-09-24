import React from 'react'
import { Div, FlexBox, FlexBoxInner, Text } from '../../components/common/StyledComponent'
import logo from '../../assets/images/logo.png'


const LoginInstruction = () => {
  return (
    <FlexBox className='bg-[#f9fafc] w-[40%] bg-opacity-20'>
        <FlexBoxInner className='flex flex-col gap-1'>
            <Div className='flex justify-center items-center pt-5'>
                <Text className='text-4xl font-IBMPlexSans font-semibold'>Instruction</Text>
            </Div>
        </FlexBoxInner>
    </FlexBox>
  )
}

export default LoginInstruction