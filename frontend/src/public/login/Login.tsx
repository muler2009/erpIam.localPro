import React from 'react'
import LoginInputs from './LoginInputs'
import { FlexBox, FlexBoxInner, Text } from '../../components/common/StyledComponent'

const Login = () => {
  return (
    <FlexBox className='h-full'>
      <LoginInputs />
    </FlexBox>
  )
}

export default Login
