import React from 'react'
import useGroupContext from '../context/useGroupContext'
import { FlexBox, FlexBoxInner } from '../../../../components/reusable/StyledComponent'

const Steeper = () => {
    const {  groupCreationStep, page } = useGroupContext()
  return (
    <FlexBox className="flex flex-col items-center  relative my-10">
        <FlexBoxInner className="flex flex-col justify-between relative w-full h-full">
            <div className="absolute h-full border bg-gray-200 left-1/2 transform -translate-x-1/2" />
                {
                    Object.keys(groupCreationStep).map((step, index) => {
                        const isActive = index === page;
                        return (
                        <div key={index} className="relative flex flex-col items-center justify-between mb-4 last:mb-0">
                            <div className={`w-8 h-8 rounded-full z-10 ${isActive ? 'bg-blue-600' : 'bg-blue-300'} flex items-center justify-center`}>
                                {index + 1}
                            </div>
                            {
                            index !== Object.keys(groupCreationStep).length - 1 && (
                                <div className={`absolute w-[2px] h-full ${isActive ? 'bg-blue-600' : 'bg-green-200'} left-1/2 transform -translate-x-1/2`} />
                            )
                            }
                        </div>
                        );
                    })
                }
        </FlexBoxInner>
    </FlexBox>
  )
}

export default Steeper