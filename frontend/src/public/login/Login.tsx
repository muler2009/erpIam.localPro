import React from 'react'
import LoginInputs from './LoginInputs'
import { Div, FlexBox, FlexBoxInner, Text } from '../../components/common/StyledComponent'
import watermark_logo from '../../assets/images/watermark-logo.png'
import LoginInstruction from './LoginInstruction'


const Login = () => {
  return (
    <FlexBox className='w-[50%] mx-auto h-full'>
      <LoginInputs />     
    </FlexBox>
  )
}

export default Login
