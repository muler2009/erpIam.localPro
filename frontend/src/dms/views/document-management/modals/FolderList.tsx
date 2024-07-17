import React, { useState } from 'react'
import { Input, ModalBody, ModalContainer, ModalHeader } from '../../../../iam/components/reusable'
import { Text, FlexBox, FlexBoxInner, FlexInnerContainer } from '../../../../components/common/StyledComponent'
import * as Vsc from 'react-icons/vsc'
import * as Fa6Icons from "react-icons/fa6";
import { FolderGridView, FolderListView } from './ListGridView';
import { LuListVideo } from "react-icons/lu";
import { TfiLayoutGrid2Alt } from "react-icons/tfi";
import Tooltip from '../../../../iam/components/reusable/Tooltip';
import { MdViewList } from "react-icons/md";


interface FolderListProps {
  handleOptionsAction: () => void,
  title: string;
  folder_data: any;
  abbreviation: string;
  
}

const FolderList = ({ handleOptionsAction, title, folder_data, abbreviation}: FolderListProps) => {
  
  const [viewMode, setViewMode] = useState<'grid' | 'list'>("grid")

  return (
    <ModalContainer className={`w-[50%] h-[75vh] mx-auto bg-gray-100 border  flex flex-col relative top-[9%] shadow-2xl rounded-t`}>
      <ModalHeader className='flex flex-col pl-5 border-b-[1px] font-Poppins gap-2 rounded-t-md'>
        <FlexBox className='flex justify-between items-center'>
          <Text className='font-Poppins text-[15px] text-center px-5 text-[#333] text-opacity-60'>{title}</Text>
          <FlexBoxInner className='pb-4'>
            <FlexBoxInner className="flex justify-between items-center cursor-pointer border rounded-t hover:bg-[#bf503c] hover:text-white"> 
              <div className='flex px-5 py-[2px]' onClick={handleOptionsAction}><Vsc.VscClose size={15} /></div>
            </FlexBoxInner>
          </FlexBoxInner>
        </FlexBox>

        <FlexBox className='flex justify-between items-center space-x-3 pr-2'>
          <FlexBoxInner className='flex justify-center items-center space-x-2 py-2'>
            <Fa6Icons.FaCircleArrowLeft size={25} />
            <Fa6Icons.FaCircleArrowRight size={25} />
          </FlexBoxInner>
         
          <FlexBoxInner className='flex flex-grow'>
              <Input
                id="text"
                type='text'
                name='search'
                placeholder='search'
                className='bg-gray-50 bg-opacity-40 text-sm input-sm focus:bg-opacity-60 text-[#333]'
              />
          </FlexBoxInner>
          <FlexInnerContainer className='flex items-center justify-center space-x-1 cursor-pointer pr-5'>
            <Tooltip content={`Show Grid View`}>
              <TfiLayoutGrid2Alt onClick={() => setViewMode("grid")} className={`${viewMode === 'grid' ? "text-[#26cc86] text-xl transition duration-500 ease-in-out" : "tetxt-[#333]"}`} />
            </Tooltip>
            <Tooltip content={`List View`}>
              <MdViewList className={`${viewMode === 'list' ? "text-[#26cc86] text-3xl transition duration-500 ease-in-out" : "tetxt-[#333] text-xl"}`} onClick={() => setViewMode("list")} />
            </Tooltip>
        </FlexInnerContainer>
        </FlexBox>
      </ModalHeader>
      <ModalBody className='bg-[#fff] h-full px-1 py-2 w-full'>
        <FlexInnerContainer className='flex-wrap'>
            {
              folder_data.subfolder.length ? (
                <div>
                  {
                    viewMode === 'grid' ? (
                        <FolderGridView folder_data={folder_data} />
                    ) : (
                        <FolderListView folder_data={folder_data} />
                    )
                  }
                </div>

              ): (
                <div className="flex justify-center items-center">
                    <Text>Folder is empty</Text>
                </div>
              )
            }
        </FlexInnerContainer>
      </ModalBody>
    </ModalContainer>
  )
}

export default FolderList


