import React from 'react'
import { FlexBox, FlexBoxInner, Div, Text } from '../../../../components/common/StyledComponent'
import {format} from "date-fns"
import { useSelector } from 'react-redux'
import { username } from '../../../api/auth'

const WelcomeComponent = () => {
    const username2 = useSelector(username)
    const today = new Date()
  return (
    <FlexBox className='bg-[#f9fafb] h-[100px] font-Poppins'>
        <FlexBoxInner className='flex justify-between items-center px-5 pt-5'>
            <Div className='flex flex-col'>
                <Text className='text-[35px]'>Welcome, <span className='text-green-800'>{username2}</span></Text>
                <Text className='text-[12px] text-[#333] text-opacity-60'>It's {format(today, "EEEE, dd MMMM yyyy")}</Text>
            </Div>

        </FlexBoxInner>
    </FlexBox>
  )
}

export default WelcomeComponent