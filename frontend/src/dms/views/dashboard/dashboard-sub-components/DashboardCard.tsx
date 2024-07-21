import React from 'react'
import { FaFile, FaFolder } from 'react-icons/fa';
import { FlexBox, FlexBoxInner, FlexInnerContainer, Text } from '../../../../components/common/StyledComponent';
import { Button } from '../../../../components/common';

interface DashboardCardProps {
  label: string;
  icon:  React.ReactElement;
  text?: string;
  total?: number
}

const card_data = [
  {
    label: "Folders",
    icons: <FaFolder />,
    text: "Folder",
    total: 500
  },
  {
    label: "Files",
    icons: <FaFile />,
    text: "Files",
    total: 523
  },
  {
    label: "Shared Documents",
    icons: <FaFolder />,
    text: "Folder",
    total: 635
  },
  {
    label: "Proposals",
    icons: <FaFolder />,
    text: "Folder",
    total: 500
  }
]


const DashboardCard = () => {
  return (
    <FlexInnerContainer className='bg-white rounded-md'>
      <FlexBoxInner className='flex flex-col'>
        <FlexBox className='flex justify-between items-center px-5 mb-5'>
          <Text className='font-semibold'>Total Documents</Text>
          <Button className='btn-sm text-[#286149]' label='View all'/>
        </FlexBox>
        <FlexBox className='flex justify-between items-center px-5'>
          {
            card_data?.map((cards, index) => (
            <FlexBox key={index} className='flex gap-5'>
                <div className='text-[25px] w-12 h-12 flex justify-center items-center rounded-full text-[#26cc86] bg-gray-100 '>{cards.icons}</div>
                <FlexBoxInner className='flex flex-col'>
                  <Text className='text-[13px] text-[#333]'>{cards.label}</Text>
                  <Text className='text-[20px] text-[#333] font-semibold'>{cards.total}</Text>

                </FlexBoxInner>
            </FlexBox>

            ))
          }

        </FlexBox>
      </FlexBoxInner>
    
    </FlexInnerContainer>
  )
}

export default DashboardCard

