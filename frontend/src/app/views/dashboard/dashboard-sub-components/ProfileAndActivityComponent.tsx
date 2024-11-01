import React from 'react'
import { FlexBox, FlexBoxInner, Text } from '../../../../components/common/StyledComponent'

const ProfileAndActivityComponent = () => {
  return (
    <FlexBox className='flex flex-col gap-2 px-2 py-2'>
        <FlexBoxInner className='bg-gray-200 py-10'>
            asdasd
        </FlexBoxInner>
        <FlexBoxInner className='flex flex-col relative'>
            <Text className='font-Poppins text-[#333] text-[14px] text-center before:content-[""] before:absolute before:h-[1px] before:bg-gray-300 before:w-16 before:top-[50%] before:left-4 after:content-[""] after:absolute after:h-[1px] after:bg-gray-300 after:w-16 after:top-[50%] after:right-4'>Recent Activity</Text>

        </FlexBoxInner>

    </FlexBox>
  )
}

export default ProfileAndActivityComponent